import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollEngine } from '../../context/ScrollContext';

export const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const { scrollStore, isUnlocked, isDueling } = useScrollEngine();

  // Create a CatmullRom spline curve for camera path across the 5 beats
  const curve = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0, 16),      // Beat 0: Lock screen standby
      new THREE.Vector3(0, 0.2, 13),    // Beat 1: Ignition Hero mouth
      new THREE.Vector3(1.6, -0.8, -4), // Beat 2: Collision Chamber entry
      new THREE.Vector3(-1.8, 0.6, -20),// Beat 2: Mid-specimen flight
      new THREE.Vector3(-2.8, 1.8, -36),// Beat 3: Telemetry & Architecture breakdown
      new THREE.Vector3(0, -0.5, -48),  // Beat 4: Terminal Cooldown chamber
    ];
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
  }, []);

  // Look-at targets spline
  const lookAtCurve = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -8),
      new THREE.Vector3(0.5, -0.2, -18),
      new THREE.Vector3(-0.4, 0.1, -30),
      new THREE.Vector3(0, 0, -42),
      new THREE.Vector3(0, 0, -58),
    ];
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
  }, []);

  // Pre-allocated reusable Vector3 instances to completely eliminate per-frame GC allocations
  const splinePosRef = useRef(new THREE.Vector3());
  const splineLookAtRef = useRef(new THREE.Vector3());
  const targetPosRef = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // If in 3D Duel mode or initial landing lockscreen, let DuelScene manage the cinematic combat camera
    if (!isUnlocked || isDueling) {
      return;
    }

    const { scrollProgress, mousePos } = scrollStore.current;

    // If not unlocked yet (Beat 0), idle hover
    const t = isUnlocked ? Math.min(0.999, Math.max(0, scrollProgress)) : 0;

    // Zero-allocation curve point sampling into pre-allocated refs
    curve.getPoint(t, splinePosRef.current);
    lookAtCurve.getPoint(t, splineLookAtRef.current);

    // Apply subtle mouse parallax to camera position
    const mouseInfluenceX = mousePos.normX * 0.75;
    const mouseInfluenceY = mousePos.normY * 0.55;

    targetPosRef.current.set(
      splinePosRef.current.x + mouseInfluenceX,
      splinePosRef.current.y + mouseInfluenceY,
      splinePosRef.current.z
    );

    // Framerate-independent damping (smooth on 60Hz, 120Hz, 144Hz displays)
    const damping = 1 - Math.exp(-4.2 * Math.min(delta, 0.1));

    camera.position.lerp(targetPosRef.current, damping);
    currentLookAt.current.lerp(splineLookAtRef.current, damping);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
