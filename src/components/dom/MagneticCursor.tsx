import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const MagneticCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // GSAP quickTo setters for high-performance spring interpolation
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });

    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('input') ||
        target?.closest('textarea') ||
        target?.closest('.cursor-pointer')
      ) {
        setIsHoveringInteractive(true);
      } else {
        setIsHoveringInteractive(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Central Cursor Point */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full transition-transform duration-150 ${
          isHoveringInteractive
            ? 'bg-cherenkov-glow scale-150'
            : 'bg-white scale-100'
        }`}
        style={{ transform: 'translate(-100px, -100px)' }}
      />

      {/* Trailing Physics Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border border-cherenkov-glow/60 transition-all duration-300 pointer-events-none ${
          isHoveringInteractive
            ? 'scale-150 bg-cherenkov-blue/15 border-cherenkov-glow'
            : 'scale-100 bg-transparent'
        }`}
        style={{ transform: 'translate(-100px, -100px)' }}
      />
    </div>
  );
};
