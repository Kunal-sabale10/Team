import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollEngine } from '../../context/ScrollContext';

export const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const { scrollProgress, mousePos, isUnlocked } = useScrollEngine();

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

  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // If not unlocked yet (Beat 0), idle hover
    const t = isUnlocked ? Math.min(0.999, Math.max(0, scrollProgress)) : 0;

    // Get interpolated target position on the 3D spline
    const splinePos = curve.getPoint(t);
    const splineLookAt = lookAtCurve.getPoint(t);

    // Apply subtle mouse parallax to camera position
    const mouseInfluenceX = mousePos.normX * 0.75;
    const mouseInfluenceY = mousePos.normY * 0.55;

    const targetPos = new THREE.Vector3(
      splinePos.x + mouseInfluenceX,
      splinePos.y + mouseInfluenceY,
      splinePos.z
    );

    // Framerate-independent damping (smooth on 60Hz, 120Hz, 144Hz displays)
    const damping = 1 - Math.exp(-4.2 * Math.min(delta, 0.1));

    camera.position.lerp(targetPos, damping);
    currentLookAt.current.lerp(splineLookAt, damping);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
