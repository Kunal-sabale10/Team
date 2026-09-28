import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollEngine } from '../../context/ScrollContext';
import { useTheme } from '../../context/ThemeContext';

interface ParticleStreamProps {
  particleCount?: number;
}

export const ParticleStream: React.FC<ParticleStreamProps> = ({ particleCount = 2400 }) => {
  const { scrollStore, currentSection } = useScrollEngine();
  const { isDark } = useTheme();
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle coordinate buffers once per theme/count without thrashing WebGL VBOs
  const [positions, colors, scales] = useMemo(() => {
    const count = particleCount;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sc = new Float32Array(count);

    const color1 = isDark ? new THREE.Color('#1E40AF') : new THREE.Color('#1E3A8A');
    const color2 = isDark ? new THREE.Color('#38BDF8') : new THREE.Color('#1D4ED8');
    const color3 = isDark ? new THREE.Color('#BAE6FD') : new THREE.Color('#2563EB');

    for (let i = 0; i < count; i++) {
      // Cylinder distribution along beam axis
      const radius = 0.5 + Math.random() * 4.2;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 80;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = z;

      // Color selection
      const rand = Math.random();
      const chosenColor = rand > 0.85 ? color3 : rand > 0.4 ? color2 : color1;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;

      sc[i] = isDark ? (0.8 + Math.random() * 1.2) : (0.7 + Math.random() * 0.8);
    }

    return [pos, col, sc];
  }, [particleCount, isDark]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const { velocity, mousePos } = scrollStore.current;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position;
    const posArray = posAttr.array as Float32Array;

    // Stream speed boosted by scroll velocity
    const speed = 0.12 + Math.abs(velocity) * 0.006;
    const count = posArray.length / 3;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Stream towards camera along Z
      posArray[idx + 2] += speed;

      // Wrap around back into the accelerator distance
      if (posArray[idx + 2] > 25) {
        posArray[idx + 2] = -55;
      }

      // Gentle orbital vortex rotation around center
      const currentX = posArray[idx];
      const currentY = posArray[idx + 1];
      const angleDelta = 0.003 * (i % 2 === 0 ? 1 : -1);
      posArray[idx] = currentX * Math.cos(angleDelta) - currentY * Math.sin(angleDelta);
      posArray[idx + 1] = currentX * Math.sin(angleDelta) + currentY * Math.cos(angleDelta);
    }

    posAttr.needsUpdate = true;

    // Apply smooth bounded mouse deflection to the mesh position itself rather than mutating 2400 vertex coordinates
    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      mousePos.normX * 0.35,
      0.05
    );
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      mousePos.normY * 0.25,
      0.05
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.046 : 0.036}
        vertexColors
        transparent
        opacity={isDark ? (currentSection <= 1 ? 0.45 : 0.22) : (currentSection <= 1 ? 0.32 : 0.16)}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
};
