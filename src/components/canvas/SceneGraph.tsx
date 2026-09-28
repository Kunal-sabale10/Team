import React, { useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { AcceleratorCore } from './AcceleratorCore';
import { ParticleStream } from './ParticleStream';
import { CameraRig } from './CameraRig';
import { PostProcessingPass } from './PostProcessingPass';
import { useScrollEngine } from '../../context/ScrollContext';
import { useTheme } from '../../context/ThemeContext';
import { AlertCircle } from 'lucide-react';

const WebGLTelemetryTracker: React.FC = () => {
  const { gl } = useThree();
  const { setFps, setDrawCalls } = useScrollEngine();
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useFrame(() => {
    frameCount.current++;
    const now = performance.now();
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
  const { isMobile, isWebGLAvailable, isReducedMotion } = useScrollEngine();
  const { isDark } = useTheme();

  // Graceful Fallback if WebGL is unsupported or disabled
  if (!isWebGLAvailable) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden bg-slate-100 dark:bg-graphite-950 flex items-center justify-center">
        <div className="absolute inset-0 tech-grid opacity-20" />
        <div className="relative text-center p-6 max-w-md font-mono text-xs text-slate-600 dark:text-titanium space-y-2">
          <AlertCircle className="w-8 h-8 text-blue-600 dark:text-cherenkov-glow mx-auto animate-pulse" />
          <div className="font-bold text-slate-900 dark:text-offwhite">2D COMPATIBILITY FALLBACK ACTIVE</div>
          <p>WebGL hardware acceleration is unavailable. Displaying optimized editorial interface.</p>
        </div>
      </div>
    );
  }

  // Theme-specific 3D scene parameters
  const bgColor = isDark ? '#07080a' : '#eef2f8';
  const ambientIntensity = isDark ? 0.35 : 0.85;
  const keyLightIntensity = isDark ? 1.8 : 2.2;
  const rimLightColor = isDark ? '#0055ff' : '#0044dd';
  const pointLightColor = isDark ? '#00f0ff' : '#0066ff';

  // Cap DPR: max 1.5, or 1.0 on mobile devices
  const clampedDpr: [number, number] = [
    1,
    Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, isMobile ? 1.0 : 1.5),
  ];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden bg-slate-100 dark:bg-graphite-950 transition-colors duration-700">
      <Canvas
        camera={{ position: [0, 0, 16], fov: 48, near: 0.1, far: 150 }}
        dpr={clampedDpr}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[bgColor, 25, 75]} />

        <ambientLight intensity={ambientIntensity} />

        <directionalLight
          position={[10, 15, 8]}
          intensity={keyLightIntensity}
          color="#ffffff"
        />

        <directionalLight
          position={[-12, -8, -10]}
          intensity={isDark ? 2.4 : 1.8}
          color={rimLightColor}
        />

        <pointLight
          position={[0, 3, -15]}
          intensity={isDark ? 4.5 : 2.8}
          color={pointLightColor}
          distance={35}
        />

        <CameraRig />
        <AcceleratorCore />
        <ParticleStream particleCount={isMobile ? 600 : 2000} />
        {!isReducedMotion && !isMobile && <PostProcessingPass />}
        <WebGLTelemetryTracker />
      </Canvas>
    </div>
  );
};
