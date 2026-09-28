import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundEngine } from '../audio/SoundEngine';

gsap.registerPlugin(ScrollTrigger);

interface ScrollContextType {
  scrollProgress: number; // 0.0 to 1.0
  velocity: number;
  currentBeat: number; // 0 to 4
  isUnlocked: boolean;
  unlockExperience: () => void;
  scrollToBeat: (beat: number) => void;
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
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeSpecimenId, setActiveSpecimenId] = useState<string | null>(null);
  const [fps, setFps] = useState(60);
  const [drawCalls, setDrawCalls] = useState(18);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normX: 0, normY: 0 });

  const lenisRef = useRef<Lenis | null>(null);
  const lastBeatRef = useRef<number>(0);

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

  // Determine active beat dynamically from DOM elements
  const detectActiveBeat = useCallback(() => {
    const beats = [1, 2, 3, 4];
    const triggerThreshold = window.innerHeight * 0.45;
    for (let i = beats.length - 1; i >= 0; i--) {
      const el = document.getElementById(`beat-${beats[i]}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerThreshold) {
          return beats[i];
        }
      }
    }
    return 1;
  }, []);

  // Initialize Lenis & synchronize with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.4,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', (e: { progress: number; velocity: number }) => {
      ScrollTrigger.update();
      setScrollProgress(Math.max(0, Math.min(1, e.progress)));
      setVelocity(e.velocity);
      soundEngine.updateScrollVelocity(e.velocity);

      const activeBeat = detectActiveBeat();
      if (activeBeat !== lastBeatRef.current) {
        lastBeatRef.current = activeBeat;
        setCurrentBeat(activeBeat);
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
  }, [detectActiveBeat]);

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
    setCurrentBeat(1);
    lastBeatRef.current = 1;
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, []);

  const scrollToBeat = useCallback((beat: number) => {
    if (!lenisRef.current) return;
    soundEngine.playClickBeep();

    if (beat === 1) {
      lenisRef.current.scrollTo(0, {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const target = document.getElementById(`beat-${beat}`);
      if (target) {
        lenisRef.current.scrollTo(target, {
          offset: -40,
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }
  }, []);

  const toggleAudio = useCallback(() => {
    const muted = soundEngine.toggleMute();
    setIsAudioMuted(muted);
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        scrollProgress,
        velocity,
        currentBeat,
        isUnlocked,
        unlockExperience,
        scrollToBeat,
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
