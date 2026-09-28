import React from 'react';
import { SceneGraph } from '../canvas/SceneGraph';
import { HudOverlay } from '../dom/HudOverlay';
import { MagneticCursor } from '../dom/MagneticCursor';
import { FloatingThemeToggle } from '../dom/FloatingThemeToggle';
import { Beat0LockScreen } from '../dom/Beat0LockScreen';
import { SectionHero } from '../dom/SectionHero';
import { SectionAbout } from '../dom/SectionAbout';
import { SectionTeam } from '../dom/SectionTeam';
import { SectionProjects } from '../dom/SectionProjects';
import { SectionSkills } from '../dom/SectionSkills';
import { SectionContact } from '../dom/SectionContact';

export const DualLayerScaffold: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-theme-base text-theme-text-main transition-colors duration-500 overflow-x-hidden selection:bg-theme-accent selection:text-white">
      {/* Visual Enhancers: Subtle Scanlines (dark only) and Tech Grid */}
      <div className="fixed inset-0 z-30 scanlines opacity-0 dark:opacity-50 pointer-events-none" />
      <div className="fixed inset-0 z-20 tech-grid opacity-15 dark:opacity-25 pointer-events-none" />

      {/* Layer 1: Fixed WebGL 3D Canvas (z-index: 0) */}
      <SceneGraph />

      {/* Layer 2: Fixed HUD Telemetry, Navigation & Top Bar (z-index: 40) */}
      <HudOverlay />

      {/* Layer 2.5: Always Visible Floating Theme Toggle (z-index: 50) */}
      <FloatingThemeToggle />

      {/* Layer 3: Magnetic Cursor (z-index: 50) */}
      <MagneticCursor />

      {/* Layer 4: Lock Screen & Audio Consent Curtain (z-index: 50) */}
      <Beat0LockScreen />

      {/* Layer 5: Accessible DOM Scroll Timeline (z-index: 10) */}
      <main className="relative z-10 w-full">
        {/* 1. Hero */}
        <SectionHero />

        {/* 2. About */}
        <SectionAbout />

        {/* 3. Team */}
        <SectionTeam />

        {/* 4. Projects */}
        <SectionProjects />

        {/* 5. Skills */}
        <SectionSkills />

        {/* 6. Contact */}
        <SectionContact />

        {/* Trailing Virtual Buffer */}
        <div className="h-[20vh] w-full" />
      </main>
    </div>
  );
};
