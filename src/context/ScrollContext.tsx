import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundEngine } from '../audio/SoundEngine';
import { useTheme } from './ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollStore {
  scrollProgress: number; // 0.0 to 1.0
  velocity: number;
  mousePos: { x: number; y: number; normX: number; normY: number };
  fps: number;
  drawCalls: number;
}

export type TelemetryListener = (store: ScrollStore) => void;

interface ScrollContextType {
  // High-frequency mutable store & listener subscription
  scrollStore: React.MutableRefObject<ScrollStore>;
  subscribeTelemetry: (listener: TelemetryListener) => () => void;

  // Low-frequency React state
  currentSection: number; // 1 to 6
  currentBeat: number; // Compatibility alias
  isUnlocked: boolean;
  unlockExperience: () => void;
  scrollToSection: (sectionIndex: number) => void;
  scrollToBeat: (beatIndex: number) => void; // Compatibility alias
  lenisInstance: Lenis | null;
  activeSpecimenId: string | null;
  setActiveSpecimenId: (id: string | null) => void;
  isAudioMuted: boolean;
  toggleAudio: () => void;
  isReducedMotion: boolean;
  isMobile: boolean;
  isWebGLAvailable: boolean;

  // Compatibility getters/setters for legacy callers
  scrollProgress: number;
  velocity: number;
  mousePos: { x: number; y: number; normX: number; normY: number };
  fps: number;
  setFps: (fps: number) => void;
  drawCalls: number;
  setDrawCalls: (calls: number) => void;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

const SECTION_IDS = [
  'section-hero',
  'section-about',
  'section-team',
  'section-projects',
  'section-skills',
  'section-contact',
];

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toggleTheme } = useTheme();

  // High-frequency data stored in mutable ref (NO React re-renders on scroll/mouse/telemetry)
  const scrollStoreRef = useRef<ScrollStore>({
    scrollProgress: 0,
    velocity: 0,
    mousePos: { x: 0, y: 0, normX: 0, normY: 0 },
    fps: 60,
    drawCalls: 18,
  });

  const listenersRef = useRef<Set<TelemetryListener>>(new Set());

  const subscribeTelemetry = useCallback((listener: TelemetryListener) => {
    listenersRef.current.add(listener);
    // Provide immediate snapshot
    listener(scrollStoreRef.current);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  const notifyTelemetry = useCallback(() => {
    const store = scrollStoreRef.current;
    listenersRef.current.forEach((fn) => {
      try {
        fn(store);
      } catch (err) {
        console.error('Error in telemetry listener:', err);
      }
    });
  }, []);

  // Low-frequency application state
  const [currentSection, setCurrentSection] = useState(1);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeSpecimenId, setActiveSpecimenId] = useState<string | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isWebGLAvailable, setIsWebGLAvailable] = useState(true);

  const lenisRef = useRef<Lenis | null>(null);
  const lastSectionRef = useRef<number>(1);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsWebGLAvailable(!!gl);
    } catch {
      setIsWebGLAvailable(false);
    }
  }, []);

  // Check prefers-reduced-motion and screen width
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Mouse tracking & spatial audio panning - mutates store ref directly, NO re-renders
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      scrollStoreRef.current.mousePos = { x: e.clientX, y: e.clientY, normX, normY };
      soundEngine.updateCursorPan(normX);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Section Detection via IntersectionObserver (replaces getBoundingClientRect layout thrashing)
  useEffect(() => {
    if (!isUnlocked) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        }

        if (bestEntry) {
          const sectionIdx = SECTION_IDS.indexOf(bestEntry.target.id);
          if (sectionIdx !== -1) {
            const activeSec = sectionIdx + 1;
            if (activeSec !== lastSectionRef.current) {
              lastSectionRef.current = activeSec;
              setCurrentSection(activeSec);
              soundEngine.playSectionTick();
            }
          }
        }
      },
      {
        root: null,
        rootMargin: '-25% 0px -35% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isUnlocked]);

  // Initialize Lenis & synchronize with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: isReducedMotion ? 0.2 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !isReducedMotion,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.4,
    });

    lenisRef.current = lenis;

    let lastScrollNotify = 0;
    lenis.on('scroll', (e: { progress: number; velocity: number }) => {
      ScrollTrigger.update();
      const progress = Math.max(0, Math.min(1, e.progress));
      scrollStoreRef.current.scrollProgress = progress;
      scrollStoreRef.current.velocity = e.velocity;
      soundEngine.updateScrollVelocity(e.velocity);

      // Throttled notification (~12Hz / 80ms) for subscribers like the HUD progress bar
      const now = performance.now();
      if (now - lastScrollNotify >= 80) {
        lastScrollNotify = now;
        notifyTelemetry();
      }
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isReducedMotion, notifyTelemetry]);

  // Ensure the page always starts cleanly at the top (scrollY = 0)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const unlockExperience = useCallback(() => {
    soundEngine.init();
    soundEngine.playIgnitionSequence();
    setIsUnlocked(true);
    setCurrentSection(1);
    lastSectionRef.current = 1;
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, []);

  const scrollToSection = useCallback((sectionIndex: number) => {
    if (!lenisRef.current) return;
    soundEngine.playClickBeep();

    if (sectionIndex === 1) {
      lenisRef.current.scrollTo(0, {
        duration: isReducedMotion ? 0.2 : 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const targetId = SECTION_IDS[sectionIndex - 1];
      const target = document.getElementById(targetId);
      if (target) {
        lenisRef.current.scrollTo(target, {
          offset: -40,
          duration: isReducedMotion ? 0.2 : 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }
  }, [isReducedMotion]);

  const toggleAudio = useCallback(() => {
    const muted = soundEngine.toggleMute();
    setIsAudioMuted(muted);
  }, []);

  // Telemetry setters (mutate store and notify subscribers without triggering React re-renders)
  const setFps = useCallback((val: number) => {
    scrollStoreRef.current.fps = val;
    notifyTelemetry();
  }, [notifyTelemetry]);

  const setDrawCalls = useCallback((calls: number) => {
    scrollStoreRef.current.drawCalls = calls;
    notifyTelemetry();
  }, [notifyTelemetry]);

  // Demo Mode Keyboard Shortcuts:
  // 1-6 to jump to sections, T to toggle theme, M to toggle sound
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return;
      }

      const key = e.key.toUpperCase();

      if (['1', '2', '3', '4', '5', '6'].includes(key)) {
        e.preventDefault();
        const sec = parseInt(key, 10);
        scrollToSection(sec);
      } else if (key === 'T') {
        e.preventDefault();
        toggleTheme();
        soundEngine.playClickBeep();
      } else if (key === 'M') {
        e.preventDefault();
        toggleAudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollToSection, toggleTheme, toggleAudio]);

  return (
    <ScrollContext.Provider
      value={{
        scrollStore: scrollStoreRef,
        subscribeTelemetry,
        currentSection,
        currentBeat: currentSection,
        isUnlocked,
        unlockExperience,
        scrollToSection,
        scrollToBeat: scrollToSection,
        lenisInstance: lenisRef.current,
        activeSpecimenId,
        setActiveSpecimenId,
        isAudioMuted,
        toggleAudio,
        isReducedMotion,
        isMobile,
        isWebGLAvailable,

        // Backwards compatibility properties (read directly from store ref)
        get scrollProgress() {
          return scrollStoreRef.current.scrollProgress;
        },
        get velocity() {
          return scrollStoreRef.current.velocity;
        },
        get mousePos() {
          return scrollStoreRef.current.mousePos;
        },
        get fps() {
          return scrollStoreRef.current.fps;
        },
        get drawCalls() {
          return scrollStoreRef.current.drawCalls;
        },
        setFps,
        setDrawCalls,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollEngine = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollEngine must be used within a ScrollProvider');
  }
  return context;
};

// Custom hook for subscribing to throttled telemetry without re-rendering high-frequency loops
export const useScrollTelemetry = () => {
  const { scrollStore, subscribeTelemetry } = useScrollEngine();
  const [telemetry, setTelemetry] = useState<ScrollStore>(() => ({ ...scrollStore.current }));

  useEffect(() => {
    let lastUpdate = 0;
    const unsubscribe = subscribeTelemetry((store) => {
      const now = performance.now();
      // Cap telemetry updates to ~12Hz (every 80ms)
      if (now - lastUpdate >= 80) {
        lastUpdate = now;
        setTelemetry({ ...store });
      }
    });
    return unsubscribe;
  }, [subscribeTelemetry, scrollStore]);

  return telemetry;
};
