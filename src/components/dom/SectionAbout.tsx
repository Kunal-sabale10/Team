import React from 'react';
import { Target, Compass, Zap, Flame, Shield, Layers, Code2, Users } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

export const SectionAbout: React.FC = () => {
  const pillars = [
    {
      title: 'THE ENGINE-FIRST METHOD',
      icon: <Layers className="w-5 h-5 text-blue-600 dark:text-cherenkov-glow" />,
      tag: 'ARCHITECTURE FIRST',
      desc: 'We never jump straight into decorative 3D. Every project starts with locked spatial scripts, CatmullRom spline camera choreography, normalized inertial physics, and strict draw-call budgeting.',
    },
    {
      title: 'ZERO-TEMPLATE PURITY',
      icon: <Code2 className="w-5 h-5 text-indigo-600 dark:text-isotope" />,
      tag: 'RAW CODE CRAFT',
      desc: 'No generic downloaded templates or bloated UI libraries. Hand-crafted WebGL shaders, procedural math geometries, native Web Audio API oscillators, and bespoke responsive layouts.',
    },
    {
      title: 'THE TRIAD SYNERGY',
      icon: <Users className="w-5 h-5 text-cyan-600 dark:text-cherenkov-glow" />,
      tag: 'CROSS-DISCIPLINARY',
      desc: 'An airtight three-part feedback loop: Animesh provides the visionary concept, Kunal constructs the deterministic engine code, and Rajani elevates the presentation to award-tier polish.',
    },
  ];

  return (
    <section id="section-about" className="relative min-h-screen w-full px-6 sm:px-12 md:px-20 py-20 sm:py-28 flex flex-col justify-center">
      {/* Header */}
      <div className="max-w-4xl space-y-4 mb-16">
        <div className="flex items-center space-x-3 text-xs font-mono text-slate-500 dark:text-titanium">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cherenkov-glow animate-ping" />
          <span className="text-slate-900 dark:text-offwhite font-bold tracking-widest">02 // ABOUT THE TRIAD</span>
          <span className="text-blue-600 dark:text-cherenkov-glow">| MISSION &amp; VIBE</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-slate-900 dark:text-offwhite tracking-tight">
          WHAT WE DO &amp;<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-cherenkov-glow dark:to-cherenkov-blue">
            OUR COLLECTIVE VIBE.
          </span>
        </h2>
        <p className="text-base sm:text-lg font-mono text-slate-600 dark:text-titanium max-w-2xl leading-relaxed">
          We operate at the convergence of software engineering, real-time spatial computing, and digital product design. We don't build flat websites; we engineer living web artifacts.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mb-12">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            onMouseEnter={() => soundEngine.playHoverBlip(1300 + idx * 150)}
            className="group p-6 sm:p-8 rounded-xl bg-white/80 dark:bg-graphite-900/80 hover:bg-slate-50 dark:hover:bg-graphite-850/90 border border-slate-200 dark:border-graphite-800 hover:border-blue-500/70 dark:hover:border-cherenkov-blue/70 transition-all duration-300 shadow-lg backdrop-blur-md space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-graphite-950 border border-blue-100 dark:border-graphite-800">
                {pillar.icon}
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-graphite-950 border border-slate-200 dark:border-graphite-800 text-blue-600 dark:text-cherenkov-glow">
                {pillar.tag}
              </span>
            </div>

            <h3 className="text-xl font-display font-extrabold text-slate-900 dark:text-offwhite group-hover:text-blue-600 dark:group-hover:text-cherenkov-glow transition-colors">
              {pillar.title}
            </h3>

            <p className="text-xs sm:text-sm font-mono text-slate-600 dark:text-titanium leading-relaxed">
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Mission & Vibe Banner */}
      <div className="max-w-6xl p-6 sm:p-8 rounded-xl bg-gradient-to-r from-blue-900/10 via-indigo-900/5 to-cyan-900/10 dark:from-cherenkov-blue/10 dark:via-graphite-900/80 dark:to-cherenkov-glow/10 border border-blue-200 dark:border-graphite-800 backdrop-blur-md space-y-3 font-mono">
        <div className="flex items-center space-x-2 text-xs text-blue-600 dark:text-cherenkov-glow font-bold uppercase tracking-wider">
          <Flame className="w-4 h-4" />
          <span>OUR OPERATIONAL VIBE</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-offwhite leading-relaxed">
          "Deep darkroom obsidian aesthetic, high-contrast typography, mathematical CatmullRom camera paths, and tactile acoustic responsiveness. We believe an award-winning site feels physically heavy, deterministic, and alive under your fingertips."
        </p>
      </div>
    </section>
  );
};
