import React from 'react';
import { SceneGraph } from '../canvas/SceneGraph';
import { HudOverlay } from '../dom/HudOverlay';
import { MagneticCursor } from '../dom/MagneticCursor';
import { Beat0LockScreen } from '../dom/Beat0LockScreen';
import { Beat1Hero } from '../dom/Beat1Hero';
import { Beat2CaseStudies } from '../dom/Beat2CaseStudies';
import { Beat3Architecture } from '../dom/Beat3Architecture';
import { Beat4Terminal } from '../dom/Beat4Terminal';
import { useScrollEngine } from '../../context/ScrollContext';

export const DualLayerScaffold: React.FC = () => {
  const { isUnlocked } = useScrollEngine();

  return (
    <div className="relative w-full min-h-screen bg-graphite-950 text-offwhite overflow-x-hidden">
      {/* Visual Enhancers: Subtle Scanlines and Tech Grid */}
      <div className="fixed inset-0 z-30 scanlines opacity-50 pointer-events-none" />
      <div className="fixed inset-0 z-20 tech-grid opacity-25 pointer-events-none" />

      {/* Layer 1: Fixed WebGL 3D Canvas (z-index: 0) */}
      <SceneGraph />

      {/* Layer 2: Fixed HUD Telemetry & Navigation (z-index: 40) */}
      <HudOverlay />

      {/* Layer 3: Magnetic Cursor (z-index: 50) */}
      <MagneticCursor />

      {/* Layer 4: Lock Screen & Audio Consent Curtain (z-index: 50) */}
      <Beat0LockScreen />

      {/* Layer 5: Accessible DOM Scroll Timeline (z-index: 10) */}
      <main className="relative z-10 w-full">
        {/* Beat 1: Entry & Accelerator Ignition */}
        <section id="beat-1" className="min-h-screen w-full flex items-center">
          <Beat1Hero />
        </section>

        {/* Beat 2: Case Studies / Collision Events */}
        <section id="beat-2" className="min-h-screen w-full flex items-center py-24 sm:py-32">
          <Beat2CaseStudies />
        </section>

        {/* Beat 3: System Architecture & Telemetry Specs */}
        <section id="beat-3" className="min-h-screen w-full flex items-center py-24 sm:py-32">
          <Beat3Architecture />
        </section>

        {/* Beat 4: Terminal Contact & System Cooldown */}
        <section id="beat-4" className="min-h-screen w-full flex items-center py-24 sm:py-32">
          <Beat4Terminal />
        </section>

        {/* Trailing Virtual Buffer for Cooldown */}
        <div className="h-[25vh] w-full" />
      </main>
    </div>
  );
};
