import React, { useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { AcceleratorCore } from './AcceleratorCore';
import { ParticleStream } from './ParticleStream';
import { CameraRig } from './CameraRig';
import { PostProcessingPass } from './PostProcessingPass';
import { useScrollEngine } from '../../context/ScrollContext';

// Performance & Telemetry Tracker inside the WebGL loop
const WebGLTelemetryTracker: React.FC = () => {
  const { gl } = useThree();
  const { setFps, setDrawCalls } = useScrollEngine();
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useFrame(() => {
    frameCount.current++;
    const now = performance.now();
    // Update every 500ms
    if (now - lastTime.current >= 500) {
      const calculatedFps = Math.round((frameCount.current * 1000) / (now - lastTime.current));
      setFps(calculatedFps);
      setDrawCalls(gl.info.render.calls);
      frameCount.current = 0;
      lastTime.current = now;
    }
  });

  return null;
};

export const SceneGraph: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden bg-graphite-950">
      <Canvas
        camera={{ position: [0, 0, 16], fov: 48, near: 0.1, far: 150 }}
        // Phase 6: Clamped DPR for optimal GPU fill rate
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.75)]}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        {/* Obsidian Space Ambient Baseline */}
        <color attach="background" args={['#07080a']} />
        <fog attach="fog" args={['#07080a', 25, 75]} />

        <ambientLight intensity={0.35} />

        {/* High-contrast directional key light */}
        <directionalLight
          position={[10, 15, 8]}
          intensity={1.8}
          color="#e0e8ff"
        />

        {/* Cherenkov blue fill / rim light */}
        <directionalLight
          position={[-12, -8, -10]}
          intensity={2.4}
          color="#0055ff"
        />

        {/* High-energy isotope cyan point accent */}
        <pointLight
          position={[0, 3, -15]}
          intensity={4.5}
          color="#00f0ff"
          distance={35}
        />

        {/* 3D Scene Components */}
        <CameraRig />
        <AcceleratorCore />
        <ParticleStream particleCount={2200} />
        <PostProcessingPass />
        <WebGLTelemetryTracker />
      </Canvas>
    </div>
  );
};
