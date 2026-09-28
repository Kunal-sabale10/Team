import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundEngine } from '../audio/SoundEngine';
import { useTheme } from './ThemeContext';

gsap.registerPlugin(ScrollTrigger);

interface ScrollContextType {
  scrollProgress: number; // 0.0 to 1.0
  velocity: number;
  currentSection: number; // 1 to 6
  currentBeat: number; // Compatibility alias
  isUnlocked: boolean;
  unlockExperience: () => void;
  scrollToSection: (sectionIndex: number) => void;
  scrollToBeat: (beatIndex: number) => void; // Compatibility alias
  lenisInstance: Lenis | null;
  activeSpecimenId: string | null;
  setActiveSpecimenId: (id: string | null) => void;
  fps: number;
  setFps: (fps: number) => void;
  drawCalls: number;
  setDrawCalls: (calls: number) => void;
  mousePos: { x: number; y: number; normX: number; normY: number };
  isAudioMuted: boolean;
  toggleAudio: () => void;
  isReducedMotion: boolean;
  isMobile: boolean;
  isWebGLAvailable: boolean;
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeSpecimenId, setActiveSpecimenId] = useState<string | null>(null);
  const [fps, setFps] = useState(60);
  const [drawCalls, setDrawCalls] = useState(18);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normX: 0, normY: 0 });

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

  // Mouse tracking & spatial audio panning
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x: e.clientX, y: e.clientY, normX, normY });
      soundEngine.updateCursorPan(normX);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Determine active section dynamically from DOM elements
  const detectActiveSection = useCallback(() => {
    const triggerThreshold = window.innerHeight * 0.42;
    for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
      const el = document.getElementById(SECTION_IDS[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerThreshold) {
          return i + 1; // 1-indexed (1 to 6)
        }
      }
    }
    return 1;
  }, []);

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

    lenis.on('scroll', (e: { progress: number; velocity: number }) => {
      ScrollTrigger.update();
      setScrollProgress(Math.max(0, Math.min(1, e.progress)));
      setVelocity(e.velocity);
      soundEngine.updateScrollVelocity(e.velocity);

      const activeSec = detectActiveSection();
      if (activeSec !== lastSectionRef.current) {
        lastSectionRef.current = activeSec;
        setCurrentSection(activeSec);
        soundEngine.playSectionTick();
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
  }, [detectActiveSection, isReducedMotion]);

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

  // Demo Mode Keyboard Shortcuts:
  // 1-6 to jump to sections, T to toggle theme, M to toggle sound
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input or textarea
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return;
      }

      const key = e.key.toUpperCase();

      // Number keys 1-6 jump to corresponding sections
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
        scrollProgress,
        velocity,
        currentSection,
        currentBeat: currentSection,
        isUnlocked,
        unlockExperience,
        scrollToSection,
        scrollToBeat: scrollToSection,
        lenisInstance: lenisRef.current,
        activeSpecimenId,
        setActiveSpecimenId,
        fps,
        setFps,
        drawCalls,
        setDrawCalls,
        mousePos,
        isAudioMuted,
        toggleAudio,
        isReducedMotion,
        isMobile,
        isWebGLAvailable,
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
