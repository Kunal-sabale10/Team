import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollEngine } from '../../context/ScrollContext';
import { useTheme } from '../../context/ThemeContext';

// Custom Shader for the Accelerator Beam / Vacuum Chamber Tube
const AcceleratorBeamShader = {
  uniforms: {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uVelocity: { value: 0 },
    uColorCore: { value: new THREE.Color('#0055ff') },
    uColorGlow: { value: new THREE.Color('#00f0ff') },
  },
  vertexShader: `
    uniform float uTime;
    uniform float uProgress;
    uniform float uVelocity;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);

      vec3 pos = position;
      // Scroll-dependent longitudinal pulse & wave deformation
      float wave = sin(pos.z * 0.25 + uProgress * 12.0 + uTime * 2.0);
      float warp = cos(pos.x * 0.5 + uTime * 1.5) * sin(pos.y * 0.5 + uTime * 1.5);
      
      // Accelerate twist and expansion during fast scrolling
      pos.x += wave * (0.15 + abs(uVelocity) * 0.008);
      pos.y += warp * (0.15 + abs(uVelocity) * 0.008);

      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uProgress;
    uniform vec3 uColorCore;
    uniform vec3 uColorGlow;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      // Wireframe / longitudinal grid rings
      float gridY = step(0.92, fract(vUv.y * 40.0 - uTime * 1.2 - uProgress * 8.0));
      float gridX = step(0.94, fract(vUv.x * 12.0));
      float grid = max(gridX, gridY);

      // Fresnel rim glow
      vec3 viewDir = normalize(-vPosition);
      float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 3.0);

      // Cherenkov radiation energy pulse
      float energyPulse = sin(vPosition.z * 0.4 - uTime * 4.0 - uProgress * 20.0) * 0.5 + 0.5;
      
      vec3 finalColor = mix(uColorCore, uColorGlow, fresnel + energyPulse * 0.6);
      
      // Intense emission for postprocessing bloom threshold (> 1.2)
      float alpha = clamp(fresnel * 1.8 + grid * 1.2 + energyPulse * 0.4, 0.05, 0.95);

      gl_FragColor = vec4(finalColor * (1.6 + fresnel * 2.0), alpha);
    }
  `,
};

export const AcceleratorCore: React.FC = () => {
  const { scrollProgress, velocity, currentBeat, mousePos } = useScrollEngine();
  const { isDark } = useTheme();
  const beamMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const coreGroupRef = useRef<THREE.Group>(null);
  const instancedRingsRef = useRef<THREE.InstancedMesh>(null);
  const focalSingularityRef = useRef<THREE.Mesh>(null);

  // Instanced containment rings count
  const ringCount = 28;
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempPosition = useMemo(() => new THREE.Vector3(), []);
  const tempRotation = useMemo(() => new THREE.Euler(), []);
  const tempScale = useMemo(() => new THREE.Vector3(), []);

  // Initialize ring matrices
  useMemo(() => {
    // Rings will be positioned along Z from +20 to -60
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Update custom shader uniforms
    if (beamMaterialRef.current) {
      beamMaterialRef.current.uniforms.uTime.value = time;
      beamMaterialRef.current.uniforms.uProgress.value = scrollProgress;
      beamMaterialRef.current.uniforms.uVelocity.value = velocity;
    }

    // Subtle parallax tilt of core with mouse coordinates
    if (coreGroupRef.current) {
      coreGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        coreGroupRef.current.rotation.y,
        mousePos.normX * 0.15,
        0.05
      );
      coreGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        coreGroupRef.current.rotation.x,
        -mousePos.normY * 0.12,
        0.05
      );
    }

    // Update instanced containment rings
    if (instancedRingsRef.current) {
      for (let i = 0; i < ringCount; i++) {
        const zOffset = 18 - i * 3.2;
        // Counter-rotating rings with velocity spin boost
        const rotationDirection = i % 2 === 0 ? 1 : -1;
        const spinSpeed = (0.3 + (i % 3) * 0.15 + Math.abs(velocity) * 0.005) * rotationDirection;
        const currentRotZ = time * spinSpeed + (i * Math.PI) / 8;

        // Slight breathing scale
        const scaleMod = 1 + Math.sin(time * 2 + i * 0.5) * 0.04;

        tempPosition.set(
          Math.sin(zOffset * 0.1 + time * 0.5) * 0.3,
          Math.cos(zOffset * 0.1 + time * 0.5) * 0.3,
          zOffset
        );
        tempRotation.set(0, 0, currentRotZ);
        tempScale.set(scaleMod, scaleMod, 1);

        tempMatrix.compose(tempPosition, new THREE.Quaternion().setFromEuler(tempRotation), tempScale);
        instancedRingsRef.current.setMatrixAt(i, tempMatrix);
      }
      instancedRingsRef.current.instanceMatrix.needsUpdate = true;
    }

    // Focal singularity reactions
    if (focalSingularityRef.current) {
      focalSingularityRef.current.rotation.x = time * 0.8;
      focalSingularityRef.current.rotation.y = time * 1.4;

      // Pulse larger during Beat 2 (Collision events)
      const targetScale = currentBeat === 2 ? 1.4 : 1.0;
      focalSingularityRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.08
      );
    }
  });

  return (
    <group ref={coreGroupRef}>
      {/* Central Vacuum Chamber Tube with Custom GLSL Shader */}
      <mesh position={[0, 0, -20]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[2.4, 2.4, 90, 32, 64, true]} />
        <primitive object={new THREE.ShaderMaterial({
          ...AcceleratorBeamShader,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })} ref={beamMaterialRef} attach="material" />
      </mesh>

      {/* Instanced Containment Octagonal Rings (Low draw-call budget: 1 draw call!) */}
      <instancedMesh
        ref={instancedRingsRef}
        args={[undefined, undefined, ringCount]}
      >
        <torusGeometry args={[3.2, 0.08, 12, 8]} />
        <meshStandardMaterial
          color={isDark ? '#181a20' : '#cdd3df'}
          emissive={isDark ? '#0055ff' : '#0044dd'}
          emissiveIntensity={isDark ? 1.8 : 1.2}
          roughness={0.25}
          metalness={0.85}
          toneMapped={false}
        />
      </instancedMesh>

      {/* Singularity / Collision focal point */}
      <group position={[0, 0, -6]}>
        <mesh ref={focalSingularityRef}>
          <octahedronGeometry args={[1.2, 2]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00f0ff"
            emissiveIntensity={3.2}
            roughness={0.1}
            metalness={0.95}
            wireframe
            toneMapped={false}
          />
        </mesh>
        
        {/* Core glow sphere */}
        <mesh>
          <sphereGeometry args={[0.7, 24, 24]} />
          <meshBasicMaterial
            color="#0055ff"
            wireframe={false}
            toneMapped={false}
          />
        </mesh>

        <pointLight
          color="#00f0ff"
          intensity={8.0}
          distance={15}
          decay={2}
        />
      </group>

      {/* Auxiliary Structural Trusses (Left & Right Rails) */}
      <mesh position={[-4.5, 0, -20]}>
        <boxGeometry args={[0.15, 0.4, 85]} />
        <meshStandardMaterial color="#232630" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[4.5, 0, -20]}>
        <boxGeometry args={[0.15, 0.4, 85]} />
        <meshStandardMaterial color="#232630" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
};
