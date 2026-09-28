import React, { useRef, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
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

// Smooth 3D Scene Theme Synchronizer (Lerps background, fog, and exposure)
const SceneThemeSynchronizer: React.FC = () => {
  const { scene, gl } = useThree();
  const { isDark } = useTheme();
  const { currentSection } = useScrollEngine();

  const targetBg = useMemo(
    () => new THREE.Color(isDark ? '#0C0D14' : '#F4F1EA'),
    [isDark]
  );

  useFrame((_, delta) => {
    // 0.5 - 0.8s smooth interpolation
    const damping = 1 - Math.exp(-5.5 * Math.min(delta, 0.1));

    // 1. Lerp scene.background to eliminate any box or seam
    if (scene.background && scene.background instanceof THREE.Color) {
      scene.background.lerp(targetBg, damping);
    } else {
      scene.background = targetBg.clone();
    }

    // 2. Lerp scene.fog color to match exactly
    if (scene.fog && 'color' in scene.fog && (scene.fog as THREE.Fog).color) {
      (scene.fog as THREE.Fog).color.lerp(targetBg, damping);
    }

    // 3. Dynamic Section-based 3D Dimming:
    // Sections 2-6: dim to 50-55% (0.52) in light mode, return to full in Hero
    const isHero = currentSection <= 1;
    const targetExposure = isDark ? (isHero ? 0.92 : 0.58) : (isHero ? 0.85 : 0.52);
    gl.toneMappingExposure = THREE.MathUtils.lerp(gl.toneMappingExposure, targetExposure, damping);
  });

  return null;
};

// Theme-Aware Daylight & Cyber Lights with smooth frame-by-frame interpolation
const SceneLights: React.FC = () => {
  const { isDark } = useTheme();
  const { currentSection } = useScrollEngine();
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  const targetColors = useMemo(() => ({
    ambient: new THREE.Color(isDark ? '#FAF9F6' : '#FAF7F2'),
    key: new THREE.Color(isDark ? '#ffffff' : '#FFFDF9'),
    rim: new THREE.Color(isDark ? '#2563EB' : '#003eb8'),
    point: new THREE.Color(isDark ? '#38BDF8' : '#0047D4'),
  }), [isDark]);

  useFrame((_, delta) => {
    const damping = 1 - Math.exp(-5.5 * Math.min(delta, 0.1));
    const isHero = currentSection <= 1;

    if (ambientRef.current) {
      const targetIntensity = isDark ? (isHero ? 0.28 : 0.18) : 0.95;
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, targetIntensity, damping);
      ambientRef.current.color.lerp(targetColors.ambient, damping);
    }

    if (keyLightRef.current) {
      const targetIntensity = isDark ? (isHero ? 1.3 : 0.8) : 2.4;
      keyLightRef.current.intensity = THREE.MathUtils.lerp(keyLightRef.current.intensity, targetIntensity, damping);
      keyLightRef.current.color.lerp(targetColors.key, damping);
    }

    if (rimLightRef.current) {
      // Lowered rim light intensity to avoid washing out content cards
      const targetIntensity = isDark ? (isHero ? 1.1 : 0.65) : 1.3;
      rimLightRef.current.intensity = THREE.MathUtils.lerp(rimLightRef.current.intensity, targetIntensity, damping);
      rimLightRef.current.color.lerp(targetColors.rim, damping);
    }

    if (pointLightRef.current) {
      // Lowered blue/cyan point light intensity in 3D scene
      const targetIntensity = isDark ? (isHero ? 1.5 : 0.85) : 2.2;
      pointLightRef.current.intensity = THREE.MathUtils.lerp(pointLightRef.current.intensity, targetIntensity, damping);
      pointLightRef.current.color.lerp(targetColors.point, damping);
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={isDark ? 0.28 : 0.95} />
      <directionalLight
        ref={keyLightRef}
        position={[10, 15, 8]}
        intensity={isDark ? 1.3 : 2.4}
        color="#ffffff"
      />
      <directionalLight
        ref={rimLightRef}
        position={[-12, -8, -10]}
        intensity={isDark ? 1.1 : 1.3}
        color={isDark ? '#2563EB' : '#003eb8'}
      />
      <pointLight
        ref={pointLightRef}
        position={[0, 3, -15]}
        intensity={isDark ? 1.5 : 2.2}
        color={isDark ? '#38BDF8' : '#0047D4'}
        distance={40}
      />
    </>
  );
};

export const SceneGraph: React.FC = () => {
  const { isMobile, isWebGLAvailable, isReducedMotion } = useScrollEngine();
  const { isDark } = useTheme();

  // Graceful Fallback if WebGL is unsupported or disabled
  if (!isWebGLAvailable) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden bg-theme-canvas flex items-center justify-center">
        <div className="absolute inset-0 tech-grid opacity-20" />
        <div className="relative text-center p-6 max-w-md font-mono text-xs text-theme-text-muted space-y-2">
          <AlertCircle className="w-8 h-8 text-theme-accent mx-auto animate-pulse" />
          <div className="font-bold text-theme-text-main">2D COMPATIBILITY FALLBACK ACTIVE</div>
          <p>WebGL hardware acceleration is unavailable. Displaying optimized editorial interface.</p>
        </div>
      </div>
    );
  }

  // Cap DPR: max 1.5, or 1.0 on mobile devices
  const clampedDpr: [number, number] = [
    1,
    Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, isMobile ? 1.0 : 1.5),
  ];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden bg-theme-canvas transition-colors duration-500">
      <Canvas
        camera={{ position: [0, 0, 16], fov: isMobile ? 56 : 48, near: 0.1, far: 150 }}
        dpr={clampedDpr}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <color attach="background" args={[isDark ? '#0C0D14' : '#F4F1EA']} />
        <fog attach="fog" args={[isDark ? '#0C0D14' : '#F4F1EA', 25, 75]} />

        {/* Dynamic Frame-by-Frame Theme Synchronizers */}
        <SceneThemeSynchronizer />
        <SceneLights />

        <CameraRig />
        <AcceleratorCore />
        <ParticleStream particleCount={isMobile ? 400 : 1200} />
        {!isReducedMotion && !isMobile && <PostProcessingPass />}
        <WebGLTelemetryTracker />
      </Canvas>
    </div>
  );
};
