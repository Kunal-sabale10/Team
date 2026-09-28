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
        <Vignette eskil={false} offset={0.15} darkness={isDark ? 0.75 : 0.4} />
      </EffectComposer>
    );
  }

  // Modulate chromatic aberration offset slightly with scroll velocity
  const aberrationOffset = new THREE.Vector2(
    0.0015 + Math.min(Math.abs(velocity) * 0.0001, 0.003),
    0.0015 + Math.min(Math.abs(velocity) * 0.0001, 0.003)
  );

  return (
    <EffectComposer multisampling={2}>
      {/* Selective Bloom: Tuned for Dark/Light contrast */}
      <Bloom
        luminanceThreshold={isDark ? 0.82 : 0.88}
        luminanceSmoothing={0.3}
        intensity={isDark ? 1.25 : 0.7}
        blendFunction={BlendFunction.SCREEN}
        mipmapBlur
      />

      {/* Screen-space Film Grain / Dither to prevent color banding */}
      <Noise
        premultiply
        blendFunction={BlendFunction.OVERLAY}
        opacity={isDark ? 0.055 : 0.03}
      />

      {/* Anamorphic Lens Chromatic Dispersion */}
      <ChromaticAberration
        offset={aberrationOffset}
        radialModulation={true}
        modulationOffset={0.5}
      />

      {/* Edge Vignette */}
      <Vignette
        eskil={false}
        offset={0.2}
        darkness={isDark ? 0.92 : 0.55}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
};
