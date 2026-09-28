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

  // Modulate chromatic aberration offset slightly with scroll velocity (near zero in light mode)
  const baseOffset = isDark ? 0.0007 : 0.00008;
  const velOffset = isDark
    ? Math.min(Math.abs(velocity) * 0.00008, 0.0015)
    : Math.min(Math.abs(velocity) * 0.00002, 0.0002);

  const aberrationOffset = new THREE.Vector2(
    baseOffset + velOffset,
    baseOffset + velOffset
  );

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
