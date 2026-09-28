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

export const PostProcessingPass: React.FC = () => {
  const { fps, velocity } = useScrollEngine();

  // Phase 6: Adaptive Performance Degradation
  // If framerate drops below 40 FPS, disable heavy passes
  const isPerformanceDegraded = fps < 40;

  if (isPerformanceDegraded) {
    return (
      <EffectComposer multisampling={0}>
        <Vignette eskil={false} offset={0.15} darkness={0.8} />
      </EffectComposer>
    );
  }

  // Modulate chromatic aberration offset slightly with scroll velocity
  const aberrationOffset = new THREE.Vector2(
    0.0015 + Math.min(Math.abs(velocity) * 0.0001, 0.004),
    0.0015 + Math.min(Math.abs(velocity) * 0.0001, 0.004)
  );

  return (
    <EffectComposer multisampling={2}>
      {/* Selective Bloom: Only un-tonemapped high-luminance elements emit radiant light */}
      <Bloom
        luminanceThreshold={0.82}
        luminanceSmoothing={0.3}
        intensity={1.25}
        blendFunction={BlendFunction.SCREEN}
        mipmapBlur
      />

      {/* Screen-space Film Grain / Dither to prevent 8-bit color banding */}
      <Noise
        premultiply
        blendFunction={BlendFunction.OVERLAY}
        opacity={0.055}
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
        darkness={0.92}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
};
