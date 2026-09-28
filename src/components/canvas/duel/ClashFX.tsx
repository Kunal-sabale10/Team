import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface SparkBurstProps {
  active: boolean;
  position: [number, number, number];
  color: string;
}

export const SparkBurst: React.FC<SparkBurstProps> = ({ active, position, color }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 70;

  const [positions, velocities, lifetimes] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const life = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = position[0];
      pos[i * 3 + 1] = position[1];
      pos[i * 3 + 2] = position[2];

      // Spray outward in sphere hemisphere
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      const speed = 4.0 + Math.random() * 7.0;

      vel[i * 3] = Math.cos(phi) * Math.cos(theta) * speed;
      vel[i * 3 + 1] = Math.sin(phi) * speed + 2.0;
      vel[i * 3 + 2] = Math.cos(phi) * Math.sin(theta) * speed;

      life[i] = Math.random();
    }
    return [pos, vel, life];
  }, [position]);

  useFrame((_, delta) => {
    if (!pointsRef.current || !active) return;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.getAttribute('position') as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      lifetimes[i] += delta * 2.5;
      if (lifetimes[i] > 1.0) {
        // Reset to contact point
        posArray[i * 3] = position[0] + (Math.random() - 0.5) * 0.1;
        posArray[i * 3 + 1] = position[1] + (Math.random() - 0.5) * 0.1;
        posArray[i * 3 + 2] = position[2] + (Math.random() - 0.5) * 0.1;
        lifetimes[i] = 0;
      } else {
        posArray[i * 3] += velocities[i * 3] * delta;
        posArray[i * 3 + 1] += velocities[i * 3 + 1] * delta;
        posArray[i * 3 + 2] += velocities[i * 3 + 2] * delta;
        // Gravity pull
        velocities[i * 3 + 1] -= delta * 12.0;
      }
    }
    posAttr.needsUpdate = true;
  });

  if (!active) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.12}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

interface ShockwaveRingProps {
  progress: number; // 0 to 1
  position: [number, number, number];
}

export const ShockwaveRing: React.FC<ShockwaveRingProps> = ({ progress, position }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const radius = 0.5 + progress * 14.0;
  const opacity = Math.max(0, (1 - progress) * 0.85);

  return (
    <group position={position}>
      {/* Primary Expanding Energy Disc */}
      <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[Math.max(0.1, radius - 0.4), radius, 48]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Secondary Inner Core Flash */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[Math.max(0.05, radius * 0.7 - 0.2), radius * 0.7, 48]} />
        <meshBasicMaterial
          color="#FF9900"
          transparent
          opacity={opacity * 0.75}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
