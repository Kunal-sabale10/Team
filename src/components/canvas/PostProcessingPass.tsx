import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Noise,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useScrollEngine } from '../../context/ScrollContext';
import { useTheme } from '../../context/ThemeContext';

export const PostProcessingPass: React.FC = () => {
  const { scrollStore, subscribeTelemetry, isMobile, isReducedMotion } = useScrollEngine();
  const { isDark } = useTheme();

  // Hysteresis State: Degrade when FPS < 35, only restore when FPS >= 50 for 3 continuous seconds
  const [isDegraded, setIsDegraded] = useState(isMobile || isReducedMotion);
  const highFpsStreakRef = useRef(0);

  useEffect(() => {
    if (isMobile || isReducedMotion) {
      setIsDegraded(true);
      return;
    }

    const unsubscribe = subscribeTelemetry((store) => {
      const currentFps = store.fps;
      if (currentFps < 35) {
        highFpsStreakRef.current = 0;
        setIsDegraded(true);
      } else if (currentFps >= 50) {
        highFpsStreakRef.current += 1;
        // 6 ticks at 500ms = 3 continuous seconds above 50 FPS
        if (highFpsStreakRef.current >= 6) {
          setIsDegraded(false);
        }
      } else {
        highFpsStreakRef.current = 0;
      }
    });

    return unsubscribe;
  }, [subscribeTelemetry, isMobile, isReducedMotion]);

  // Memoized Vector2 to eliminate per-render allocation
  const aberrationOffset = React.useMemo(() => new THREE.Vector2(), []);

  if (isDegraded) {
    return (
      <EffectComposer multisampling={0}>
        <Vignette eskil={false} offset={0.15} darkness={isDark ? 0.35 : 0.06} />
      </EffectComposer>
    );
  }

  // Modulate chromatic aberration offset slightly with scroll velocity (near zero in light mode)
  const baseOffset = isDark ? 0.0007 : 0.00008;
  const vel = scrollStore.current.velocity;
  const velOffset = isDark
    ? Math.min(Math.abs(vel) * 0.00008, 0.0015)
    : Math.min(Math.abs(vel) * 0.00002, 0.0002);

  aberrationOffset.set(baseOffset + velOffset, baseOffset + velOffset);

  return (
    <EffectComposer multisampling={0}>
      {/* Selective Bloom: Tuned to eliminate white-blob overexposure and maintain 50+ FPS */}
      <Bloom
        luminanceThreshold={isDark ? 0.95 : 1.25}
        luminanceSmoothing={0.3}
        intensity={isDark ? 0.6 : 0.15}
        blendFunction={BlendFunction.SCREEN}
        mipmapBlur
      />

      {/* Screen-space Film Grain / Dither to prevent color banding */}
      <Noise
        premultiply
        blendFunction={BlendFunction.OVERLAY}
        opacity={isDark ? 0.028 : 0.006}
      />

      {/* Anamorphic Lens Chromatic Dispersion (Subtle on dark, near zero on light) */}
      <ChromaticAberration
        offset={aberrationOffset}
        radialModulation={true}
        modulationOffset={0.65}
      />

      {/* Gentle Edge Vignette (Non-pinching, avoids heavy dark borders) */}
      <Vignette
        eskil={false}
        offset={0.25}
        darkness={isDark ? 0.40 : 0.04}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
};
