import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export interface TalwarBladeProps {
  color: string;
  glowColor: string;
  isClashing?: boolean;
  bladeScale?: number;
}

export const TalwarBlade: React.FC<TalwarBladeProps> = ({
  color,
  glowColor,
  isClashing = false,
  bladeScale = 1.0,
}) => {
  const bladeGlowRef = useRef<THREE.MeshStandardMaterial>(null);
  const coreRef = useRef<THREE.MeshBasicMaterial>(null);

  // Procedural Extruded Geometry for the Signature Curved Talwar Blade
  const bladeGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Start at hilt ricasso
    shape.moveTo(-0.06, 0);
    shape.lineTo(0.07, 0);

    // Right side: sweeping belly curve of the talwar
    shape.quadraticCurveTo(0.12, 0.7, 0.14, 1.2);
    shape.quadraticCurveTo(0.15, 1.5, 0.04, 1.85); // sharp tip

    // Left side: curved spine of the talwar
    shape.quadraticCurveTo(0.01, 1.45, -0.01, 1.1);
    shape.quadraticCurveTo(-0.03, 0.6, -0.06, 0);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      steps: 2,
      depth: 0.025,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 3,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    // Offset so hilt sits precisely at origin (0, 0, 0)
    geom.translate(0.04, 0.9, 0);
    return geom;
  }, []);

  // Plasma Energy Spine Canal (inner glowing beam)
  const spineGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.1, 0),
      new THREE.Vector3(0.02, 0.6, 0),
      new THREE.Vector3(0.06, 1.2, 0),
      new THREE.Vector3(0.04, 1.7, 0),
    ]);
    return new THREE.TubeGeometry(curve, 24, 0.012, 8, false);
  }, []);

  useFrame((state) => {
    if (bladeGlowRef.current) {
      const pulse = isClashing
        ? 3.5 + Math.sin(state.clock.elapsedTime * 25) * 1.5
        : 1.8 + Math.sin(state.clock.elapsedTime * 4) * 0.4;
      bladeGlowRef.current.emissiveIntensity = pulse;
    }
  });

  return (
    <group scale={bladeScale}>
      {/* 1. Main Curved Steel Blade with Emissive Razor Edge */}
      <mesh geometry={bladeGeometry} castShadow>
        <meshStandardMaterial
          ref={bladeGlowRef}
          color="#0F131D"
          roughness={0.15}
          metalness={0.92}
          emissive={glowColor}
          emissiveIntensity={isClashing ? 3.0 : 1.8}
        />
      </mesh>

      {/* 2. Supercharged Plasma Spine (Core Filament) */}
      <mesh geometry={spineGeometry}>
        <meshBasicMaterial ref={coreRef} color="#FFFFFF" />
      </mesh>

      {/* 3. Outer Energy Sheath Glow */}
      <mesh geometry={spineGeometry} scale={[2.2, 1.0, 2.2]}>
        <meshBasicMaterial color={color} transparent opacity={0.45} />
      </mesh>

      {/* 4. Traditional Indian Talwar Hilt Assembly */}
      <group position={[0, 0, 0]}>
        {/* Curved Crossguard Quillons with Ball Finials */}
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[0.34, 0.05, 0.08]} />
          <meshStandardMaterial color="#1E2433" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[-0.17, -0.02, 0]}>
          <sphereGeometry args={[0.038, 12, 12]} />
          <meshStandardMaterial color={color} emissive={glowColor} emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.17, -0.02, 0]}>
          <sphereGeometry args={[0.038, 12, 12]} />
          <meshStandardMaterial color={color} emissive={glowColor} emissiveIntensity={0.8} />
        </mesh>

        {/* Ergonomic Barrel Grip */}
        <mesh position={[0, -0.16, 0]}>
          <cylinderGeometry args={[0.04, 0.045, 0.22, 16]} />
          <meshStandardMaterial color="#121622" roughness={0.6} metalness={0.7} />
        </mesh>

        {/* Grip Accent Rings */}
        {[-0.10, -0.16, -0.22].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <torusGeometry args={[0.046, 0.007, 8, 20]} />
            <meshStandardMaterial color={color} emissive={glowColor} emissiveIntensity={1.0} />
          </mesh>
        ))}

        {/* Distinctive Indian Talwar Disc Pommel */}
        <group position={[0, -0.29, 0]}>
          {/* Main Disc */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.035, 24]} />
            <meshStandardMaterial color="#1E2433" metalness={0.9} roughness={0.25} />
          </mesh>
          {/* Disc Rim Energy Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.132, 0.01, 8, 24]} />
            <meshStandardMaterial color={color} emissive={glowColor} emissiveIntensity={1.2} />
          </mesh>
          {/* Center Spike Finial */}
          <mesh position={[0, -0.04, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.035, 0.1, 16]} />
            <meshStandardMaterial color="#1E2433" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
