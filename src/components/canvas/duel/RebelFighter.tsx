import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { TalwarBlade } from './TalwarBlade';

export interface RebelFighterProps {
  id: 'alpha' | 'beta';
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  glowColor: string;
  swordRotation?: [number, number, number];
  swordPosition?: [number, number, number];
  isClashing?: boolean;
  opacity?: number;
}

export const RebelFighter: React.FC<RebelFighterProps> = ({
  id,
  position,
  rotation,
  color,
  glowColor,
  swordRotation = [0, 0, 0],
  swordPosition = [0.45, 0.25, 0.45],
  isClashing = false,
  opacity = 1.0,
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const chestCoreRef = useRef<THREE.MeshStandardMaterial>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Breathing idle bobbing
    if (rootRef.current) {
      const breath = Math.sin(t * 3 + (id === 'alpha' ? 0 : Math.PI)) * 0.025;
      rootRef.current.position.y = position[1] + breath;
    }

    if (chestCoreRef.current) {
      chestCoreRef.current.emissiveIntensity = isClashing
        ? 3.2 + Math.sin(t * 20) * 1.5
        : 1.4 + Math.sin(t * 3.5) * 0.5;
    }
  });

  return (
    <group ref={rootRef} position={position} rotation={rotation}>
      {/* --- REBEL WARRIOR CHASSIS --- */}

      {/* 1. Cyber Helmet / Visor */}
      <group position={[0, 1.48, 0]}>
        {/* Angular Cyber Helmet */}
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.36, 0.36]} />
          <meshStandardMaterial
            color="#0D111A"
            metalness={0.9}
            roughness={0.2}
            transparent={opacity < 1}
            opacity={opacity}
          />
        </mesh>
        {/* Slanted Cheek Plates */}
        <mesh position={[0.15, -0.06, 0.04]} rotation={[0, -0.3, 0.2]}>
          <boxGeometry args={[0.06, 0.22, 0.28]} />
          <meshStandardMaterial color="#161B26" metalness={0.85} roughness={0.3} transparent={opacity < 1} opacity={opacity} />
        </mesh>
        <mesh position={[-0.15, -0.06, 0.04]} rotation={[0, 0.3, -0.2]}>
          <boxGeometry args={[0.06, 0.22, 0.28]} />
          <meshStandardMaterial color="#161B26" metalness={0.85} roughness={0.3} transparent={opacity < 1} opacity={opacity} />
        </mesh>
        {/* Glowing Combat Visor */}
        <mesh position={[0, 0.02, 0.19]}>
          <boxGeometry args={[0.26, 0.07, 0.04]} />
          <meshStandardMaterial
            color={color}
            emissive={glowColor}
            emissiveIntensity={isClashing ? 3.5 : 2.2}
            roughness={0.1}
          />
        </mesh>
        {/* Crest Antennas */}
        <mesh position={[0, 0.22, -0.04]} rotation={[-0.4, 0, 0]}>
          <boxGeometry args={[0.04, 0.16, 0.2]} />
          <meshStandardMaterial color="#1C2333" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* 2. Torso / Armored Breastplate */}
      <group position={[0, 0.95, 0]}>
        {/* Main Chest Plate */}
        <mesh castShadow>
          <boxGeometry args={[0.54, 0.62, 0.38]} />
          <meshStandardMaterial
            color="#111622"
            metalness={0.85}
            roughness={0.25}
            transparent={opacity < 1}
            opacity={opacity}
          />
        </mesh>

        {/* Glowing Reactor Core */}
        <mesh position={[0, 0.08, 0.20]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 16]} />
          <meshStandardMaterial
            ref={chestCoreRef}
            color={color}
            emissive={glowColor}
            emissiveIntensity={2.0}
            roughness={0.1}
          />
        </mesh>

        {/* Back Thruster Exhausts */}
        <mesh position={[-0.12, 0.1, -0.21]}>
          <cylinderGeometry args={[0.04, 0.05, 0.15, 12]} />
          <meshStandardMaterial color="#1E2536" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0.12, 0.1, -0.21]}>
          <cylinderGeometry args={[0.04, 0.05, 0.15, 12]} />
          <meshStandardMaterial color="#1E2536" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>

      {/* 3. Shoulders / Pauldrons */}
      <group position={[0, 1.22, 0]}>
        {/* Right Shoulder (Sword Arm) */}
        <mesh position={[0.38, 0, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.24, 0.2, 0.32]} />
          <meshStandardMaterial color="#1A202E" metalness={0.85} roughness={0.3} transparent={opacity < 1} opacity={opacity} />
        </mesh>
        {/* Right Pauldron Accent Light */}
        <mesh position={[0.48, 0.08, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.04, 0.06, 0.26]} />
          <meshStandardMaterial color={color} emissive={glowColor} emissiveIntensity={1.5} />
        </mesh>

        {/* Left Shoulder */}
        <mesh position={[-0.38, 0, 0]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.24, 0.2, 0.32]} />
          <meshStandardMaterial color="#1A202E" metalness={0.85} roughness={0.3} transparent={opacity < 1} opacity={opacity} />
        </mesh>
        {/* Left Pauldron Accent Light */}
        <mesh position={[-0.48, 0.08, 0]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.04, 0.06, 0.26]} />
          <meshStandardMaterial color={color} emissive={glowColor} emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* 4. Left Arm (Guard / Balance Stance) */}
      <group position={[-0.38, 1.05, 0.05]} rotation={[0.4, 0.2, -0.3]}>
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.12, 0.34, 0.14]} />
          <meshStandardMaterial color="#111622" metalness={0.8} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.44, 0.1]} rotation={[0.6, 0, 0]}>
          <boxGeometry args={[0.11, 0.32, 0.12]} />
          <meshStandardMaterial color="#1A202E" metalness={0.85} roughness={0.3} />
        </mesh>
      </group>

      {/* 5. Right Arm (Wielding the TALWAR) */}
      <group ref={rightArmRef} position={[0.38, 1.05, 0]}>
        {/* Upper Arm */}
        <mesh position={[0, -0.18, 0]}>
          <boxGeometry args={[0.14, 0.34, 0.14]} />
          <meshStandardMaterial color="#111622" metalness={0.8} roughness={0.4} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0.02, -0.42, 0.12]} rotation={[0.5, 0, 0]}>
          <boxGeometry args={[0.13, 0.32, 0.13]} />
          <meshStandardMaterial color="#1A202E" metalness={0.85} roughness={0.3} />
        </mesh>

        {/* Hand Socket with THE TALWAR */}
        <group position={swordPosition} rotation={swordRotation}>
          <TalwarBlade
            color={color}
            glowColor={glowColor}
            isClashing={isClashing}
            bladeScale={1.1}
          />
        </group>
      </group>

      {/* 6. Hips & Pelvis */}
      <mesh position={[0, 0.58, 0]}>
        <boxGeometry args={[0.44, 0.2, 0.32]} />
        <meshStandardMaterial color="#161B26" metalness={0.85} roughness={0.35} transparent={opacity < 1} opacity={opacity} />
      </mesh>

      {/* 7. Combat Legs */}
      {/* Right Leg */}
      <group position={[0.18, 0.48, 0]}>
        <mesh position={[0, -0.22, 0]}>
          <boxGeometry args={[0.16, 0.44, 0.18]} />
          <meshStandardMaterial color="#0F131D" metalness={0.8} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.56, -0.04]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.14, 0.42, 0.16]} />
          <meshStandardMaterial color="#1A202E" metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.78, 0.08]}>
          <boxGeometry args={[0.16, 0.1, 0.28]} />
          <meshStandardMaterial color="#0B0E17" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>

      {/* Left Leg */}
      <group position={[-0.18, 0.48, 0]}>
        <mesh position={[0, -0.22, 0]}>
          <boxGeometry args={[0.16, 0.44, 0.18]} />
          <meshStandardMaterial color="#0F131D" metalness={0.8} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.56, -0.04]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.14, 0.42, 0.16]} />
          <meshStandardMaterial color="#1A202E" metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.78, 0.08]}>
          <boxGeometry args={[0.16, 0.1, 0.28]} />
          <meshStandardMaterial color="#0B0E17" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
};
