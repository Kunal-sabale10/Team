import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { RebelFighter } from './RebelFighter';
import { SparkBurst, ShockwaveRing } from './ClashFX';
import { RebelGenesisCore } from './RebelGenesisCore';
import { soundEngine } from '../../../audio/SoundEngine';

export type DuelPhase = 'IDLE' | 'CLASH_1' | 'CLASH_2' | 'FINAL_LOCK' | 'DETONATION' | 'GENESIS';

interface DuelSceneProps {
  isActive: boolean;
  onGenesisComplete?: () => void;
  onPhaseChange?: (phase: DuelPhase) => void;
}

export const DuelScene: React.FC<DuelSceneProps> = ({
  isActive,
  onGenesisComplete,
  onPhaseChange,
}) => {
  const { camera } = useThree();
  const [phase, setPhase] = useState<DuelPhase>('IDLE');
  const [shockwaveProgress, setShockwaveProgress] = useState(0);
  const [genesisScale, setGenesisScale] = useState(0);
  const [fighterOpacity, setFighterOpacity] = useState(1);
  const [clashPoint, setClashPoint] = useState<[number, number, number]>([0, 0.5, 0]);
  const [isSparkActive, setIsSparkActive] = useState(false);

  // Dynamic positions & rotations of the fighters
  const alphaPos = useRef<[number, number, number]>([-2.6, -1.0, 0]);
  const alphaRot = useRef<[number, number, number]>([0, 1.2, 0]);
  const alphaSwordRot = useRef<[number, number, number]>([0.2, 0.4, -0.6]);

  const betaPos = useRef<[number, number, number]>([2.6, -1.0, 0]);
  const betaRot = useRef<[number, number, number]>([0, -1.2, 0]);
  const betaSwordRot = useRef<[number, number, number]>([-0.2, -0.4, 0.6]);

  // Flash point light intensity
  const flashLightRef = useRef<THREE.PointLight>(null);

  // Execute Duel Choreography
  useEffect(() => {
    if (!isActive) {
      setPhase('IDLE');
      alphaPos.current = [-2.6, -1.0, 0];
      betaPos.current = [2.6, -1.0, 0];
      setGenesisScale(0);
      setFighterOpacity(1);
      return;
    }

    let timeoutIds: ReturnType<typeof setTimeout>[] = [];

    // T = 0ms: IDLE STANCE
    setPhase('IDLE');
    onPhaseChange?.('IDLE');

    // T = 800ms: DASH & CLASH 1 (High Strike vs Parry)
    timeoutIds.push(
      setTimeout(() => {
        setPhase('CLASH_1');
        onPhaseChange?.('CLASH_1');
        soundEngine.playSwordSwing(1);

        // Move fighters to first clash
        alphaPos.current = [-0.9, -1.0, 0.2];
        betaPos.current = [0.9, -1.0, -0.2];
        alphaSwordRot.current = [0.6, 0.8, -1.2]; // overhead slash
        betaSwordRot.current = [-0.4, -0.6, 1.4];  // high parry
        setClashPoint([0, 0.6, 0]);

        // Sound & Spark
        setTimeout(() => {
          soundEngine.playSwordClash(1.0);
          setIsSparkActive(true);
          if (flashLightRef.current) flashLightRef.current.intensity = 8.0;
          setTimeout(() => setIsSparkActive(false), 300);
        }, 350);
      }, 700)
    );

    // T = 2200ms: RECOIL & CLASH 2 (Spin Cut vs Leap Block)
    timeoutIds.push(
      setTimeout(() => {
        setPhase('CLASH_2');
        onPhaseChange?.('CLASH_2');
        soundEngine.playSwordSwing(2);

        // Reposition for second dynamic strike
        alphaPos.current = [-0.7, -0.8, -0.3];
        betaPos.current = [0.7, -1.0, 0.3];
        alphaSwordRot.current = [-0.5, 0.4, -0.8]; // horizontal sweep
        betaSwordRot.current = [0.8, -0.8, 1.1];  // leap block
        setClashPoint([0, 0.3, 0]);

        setTimeout(() => {
          soundEngine.playSwordClash(1.2);
          setIsSparkActive(true);
          if (flashLightRef.current) flashLightRef.current.intensity = 10.0;
          setTimeout(() => setIsSparkActive(false), 320);
        }, 350);
      }, 2100)
    );

    // T = 3600ms: JUMP & FINAL LOCK (Crossed Talwars at Center)
    timeoutIds.push(
      setTimeout(() => {
        setPhase('FINAL_LOCK');
        onPhaseChange?.('FINAL_LOCK');
        soundEngine.playSwordSwing(0);

        // Lock at center
        alphaPos.current = [-0.48, -0.9, 0];
        betaPos.current = [0.48, -0.9, 0];
        alphaSwordRot.current = [0.4, 0.5, -0.9];
        betaSwordRot.current = [-0.4, -0.5, 0.9];
        setClashPoint([0, 0.45, 0.1]);

        setTimeout(() => {
          soundEngine.playSwordClash(1.4);
          soundEngine.playEnergyCharge();
          setIsSparkActive(true);
        }, 300);
      }, 3500)
    );

    // T = 5200ms: CRITICAL OVERLOAD & SHOCKWAVE DETONATION
    timeoutIds.push(
      setTimeout(() => {
        setPhase('DETONATION');
        onPhaseChange?.('DETONATION');
        setIsSparkActive(false);
        soundEngine.playGenesisShockwave();

        if (flashLightRef.current) flashLightRef.current.intensity = 15.0;

        // Shockwave expansion animation
        let shockTime = 0;
        const shockInterval = setInterval(() => {
          shockTime += 0.05;
          setShockwaveProgress(shockTime);
          setFighterOpacity(Math.max(0, 1 - shockTime * 1.5));
          if (shockTime >= 1.0) {
            clearInterval(shockInterval);
          }
        }, 30);
      }, 5100)
    );

    // T = 6000ms: 404 REBELS MONOLITH GENESIS
    timeoutIds.push(
      setTimeout(() => {
        setPhase('GENESIS');
        onPhaseChange?.('GENESIS');

        // Scale up 404 REBELS core with spring ease
        let scaleTime = 0;
        const scaleInterval = setInterval(() => {
          scaleTime += 0.04;
          // Spring overshoot formula
          const s = Math.min(1.0, Math.sin(scaleTime * Math.PI * 0.5) * 1.05);
          setGenesisScale(s);
          if (scaleTime >= 1.0) {
            clearInterval(scaleInterval);
            setGenesisScale(1.0);
            onGenesisComplete?.();
          }
        }, 30);
      }, 5900)
    );

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [isActive, onGenesisComplete, onPhaseChange]);

  // Frame tick for lighting decay and camera tracking
  useFrame((_, delta) => {
    if (flashLightRef.current && flashLightRef.current.intensity > 0) {
      flashLightRef.current.intensity = THREE.MathUtils.lerp(
        flashLightRef.current.intensity,
        0,
        delta * 6.0
      );
    }

    // Dynamic Cinematic Camera Tracking during duel
    if (isActive) {
      if (phase === 'IDLE') {
        camera.position.lerp(new THREE.Vector3(0, 0.4, 5.8), delta * 2.5);
      } else if (phase === 'CLASH_1' || phase === 'CLASH_2') {
        camera.position.lerp(new THREE.Vector3(0.5, 0.2, 4.6), delta * 4.0);
      } else if (phase === 'FINAL_LOCK') {
        camera.position.lerp(new THREE.Vector3(0, 0.1, 3.8), delta * 3.5);
      } else if (phase === 'DETONATION' || phase === 'GENESIS') {
        camera.position.lerp(new THREE.Vector3(0, 0.8, 6.2), delta * 2.0);
      }
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Dynamic Combat Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <directionalLight position={[-5, 8, -5]} intensity={0.8} />

      {/* Clash Flash Point Light */}
      <pointLight
        ref={flashLightRef}
        position={clashPoint}
        color="#00F0FF"
        distance={12}
        decay={2}
        intensity={0}
      />

      {/* Cyber Arena Floor Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.95, 0]}>
        <ringGeometry args={[1.8, 4.5, 48]} />
        <meshStandardMaterial
          color="#0B0E17"
          roughness={0.2}
          metalness={0.9}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* REBEL ALPHA (Cyan / Cherenkov Plasma Talwar) */}
      {fighterOpacity > 0.01 && (
        <RebelFighter
          id="alpha"
          position={alphaPos.current}
          rotation={alphaRot.current}
          color="#00F0FF"
          glowColor="#00A2FF"
          swordRotation={alphaSwordRot.current}
          isClashing={phase === 'FINAL_LOCK' || phase === 'CLASH_1' || phase === 'CLASH_2'}
          opacity={fighterOpacity}
        />
      )}

      {/* REBEL BETA (Amber / Solar Plasma Talwar) */}
      {fighterOpacity > 0.01 && (
        <RebelFighter
          id="beta"
          position={betaPos.current}
          rotation={betaRot.current}
          color="#FF9900"
          glowColor="#FF6600"
          swordRotation={betaSwordRot.current}
          isClashing={phase === 'FINAL_LOCK' || phase === 'CLASH_1' || phase === 'CLASH_2'}
          opacity={fighterOpacity}
        />
      )}

      {/* Spark Burst on Contact */}
      <SparkBurst
        active={isSparkActive}
        position={clashPoint}
        color="#00F0FF"
      />

      {/* Expanding Shockwave Ring on Detonation */}
      {phase === 'DETONATION' && (
        <ShockwaveRing
          progress={shockwaveProgress}
          position={clashPoint}
        />
      )}

      {/* 3D 404 REBELS Holographic Genesis Core */}
      <RebelGenesisCore
        scale={genesisScale}
        opacity={Math.min(1.0, genesisScale * 1.2)}
      />
    </group>
  );
};
