import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Sparkles } from '@react-three/drei';

interface RebelGenesisCoreProps {
  scale: number;
  opacity: number;
}

export const RebelGenesisCore: React.FC<RebelGenesisCoreProps> = ({ scale, opacity }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreIcosaRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.8;
      ring1Ref.current.rotation.y = t * 1.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.9;
      ring2Ref.current.rotation.z = t * 0.7;
    }
    if (coreIcosaRef.current) {
      coreIcosaRef.current.rotation.x = t * 0.5;
      coreIcosaRef.current.rotation.y = t * 0.5;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.25;
    }
  });

  if (scale <= 0.01) return null;

  return (
    <group ref={groupRef} position={[0, 1.8, 0]} scale={scale}>
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Central Pulsing Plasma Icosahedron */}
        <mesh ref={coreIcosaRef}>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00A2FF"
            emissiveIntensity={2.5}
            roughness={0.1}
            metalness={0.9}
            wireframe
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Outer Orbital Tech Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.5, 0.02, 16, 64]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={2.0}
            transparent
            opacity={opacity * 0.8}
          />
        </mesh>
        <mesh ref={ring2Ref}>
          <torusGeometry args={[1.7, 0.02, 16, 64]} />
          <meshStandardMaterial
            color="#FF9900"
            emissive="#FF7700"
            emissiveIntensity={2.0}
            transparent
            opacity={opacity * 0.8}
          />
        </mesh>

        {/* 3D Typographic Hologram: "404" */}
        <Text
          position={[0, 0.55, 0.3]}
          fontSize={1.2}
          font="https://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVysDAxFsEnb5IN7W56.woff"
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          characters="0123456789"
          letterSpacing={0.05}
        >
          404
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#00F0FF"
            emissiveIntensity={1.8}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={opacity}
          />
        </Text>

        {/* 3D Typographic Hologram: "REBELS" */}
        <Text
          position={[0, -0.45, 0.3]}
          fontSize={0.55}
          font="https://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVysDAxFsEnb5IN7W56.woff"
          color="#00F0FF"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.25}
        >
          REBELS
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={2.4}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={opacity}
          />
        </Text>

        {/* Team Subtitle: "KUNAL • ANIMESH • RAJANI" */}
        <Text
          position={[0, -0.95, 0.3]}
          fontSize={0.18}
          color="#B8BED0"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.2}
        >
          KUNAL • ANIMESH • RAJANI
          <meshStandardMaterial
            color="#E0E6F0"
            emissive="#00A2FF"
            emissiveIntensity={0.6}
            transparent
            opacity={opacity * 0.9}
          />
        </Text>

        {/* Swirling Sparkles */}
        <Sparkles
          count={50}
          scale={3.5}
          size={3.0}
          speed={0.8}
          color="#00F0FF"
          opacity={opacity}
        />
      </Float>
    </group>
  );
};
