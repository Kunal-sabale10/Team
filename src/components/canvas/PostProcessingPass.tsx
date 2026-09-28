import React from 'react';
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
  const { fps, velocity, isMobile, isReducedMotion } = useScrollEngine();
  const { isDark } = useTheme();

  // Phase 6 & Hackathon Rule: Adaptive Performance Degradation
  // Disable heavy passes on mobile, reduced motion, or if framerate drops below 40 FPS
  const isPerformanceDegraded = fps < 40 || isMobile || isReducedMotion;

  if (isPerformanceDegraded) {
    return (
      <EffectComposer multisampling={0}>
        <Vignette eskil={false} offset={0.15} darkness={isDark ? 0.35 : 0.06} />
      </EffectComposer>
    );
  }

  // Modulate chromatic aberration offset slightly with scroll velocity (subtle edge-only on dark)
  const aberrationOffset = new THREE.Vector2(
    (isDark ? 0.0007 : 0.0015) + Math.min(Math.abs(velocity) * 0.00008, 0.0015),
    (isDark ? 0.0007 : 0.0015) + Math.min(Math.abs(velocity) * 0.00008, 0.0015)
  );

  return (
    <EffectComposer multisampling={2}>
      {/* Selective Bloom: Tuned to eliminate white-blob overexposure */}
      <Bloom
        luminanceThreshold={isDark ? 0.92 : 1.15}
        luminanceSmoothing={0.3}
        intensity={isDark ? 0.75 : 0.35}
        blendFunction={BlendFunction.SCREEN}
        mipmapBlur
      />

      {/* Screen-space Film Grain / Dither to prevent color banding */}
      <Noise
        premultiply
        blendFunction={BlendFunction.OVERLAY}
        opacity={isDark ? 0.028 : 0.02}
      />

      {/* Anamorphic Lens Chromatic Dispersion (Subtle on dark) */}
      <ChromaticAberration
        offset={aberrationOffset}
        radialModulation={true}
        modulationOffset={0.65}
      />

      {/* Gentle Edge Vignette (Non-pinching, avoids heavy dark borders) */}
      <Vignette
        eskil={false}
        offset={0.25}
        darkness={isDark ? 0.40 : 0.06}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
};
