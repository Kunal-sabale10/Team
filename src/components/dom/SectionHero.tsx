import React from 'react';
import { useScrollEngine as useScroll } from '../../context/ScrollContext';
import { Users, ArrowDown, Github, Terminal, Sparkles, Cpu, Palette } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';
import { TEAM_MEMBERS } from '../../data/team';

export const SectionHero: React.FC = () => {
  const { scrollToSection } = useScroll();

  return (
    <section id="section-hero" className="relative min-h-screen w-full flex flex-col justify-between px-6 sm:px-12 md:px-20 py-20 sm:py-24">
      {/* Top Telemetry Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-500 dark:text-titanium">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cherenkov-glow animate-pulse" />
          <span className="text-slate-900 dark:text-offwhite font-bold tracking-widest">
            01 // HERO STAGE
          </span>
        </div>
        <div className="flex items-center space-x-6 text-[11px] uppercase tracking-wider">
          <span className="flex items-center gap-1.5 text-slate-800 dark:text-offwhite font-medium">
            <Users className="w-3.5 h-3.5 text-blue-600 dark:text-cherenkov-glow" />
            HADRON TRIAD COLLECTIVE
          </span>
          <span className="hidden md:inline">SYSTEM: 3 NODES ACTIVE</span>
          <span className="hidden sm:inline text-emerald-600 dark:text-isotope font-semibold">STATUS: 120 FPS CALIBRATED</span>
        </div>
      </div>

      {/* Main Kinetic Headline */}
      <div className="max-w-5xl my-auto space-y-6 py-8">
        <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-md bg-white/80 dark:bg-graphite-850/90 border border-slate-300 dark:border-graphite-700/60 font-mono text-xs text-blue-600 dark:text-cherenkov-glow tracking-widest uppercase shadow-sm backdrop-blur-md">
          <Users className="w-3.5 h-3.5" />
          <span>TRIAD COLLECTIVE // KUNAL • ANIMESH • RAJANI</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tighter text-slate-900 dark:text-offwhite leading-[0.9]">
            IDEA. BUILD.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 dark:from-cherenkov-glow dark:via-white dark:to-cherenkov-blue">
              PRESENT.
            </span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl font-mono text-slate-600 dark:text-titanium max-w-3xl pt-2 leading-relaxed">
            An engine-first creative technology collective uniting visionary product ideation, deterministic WebGL systems engineering, and award-grade presentation craft.
          </p>
        </div>

        {/* 3-Member Quick Roster Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 font-mono">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={member.id}
              onClick={() => scrollToSection(3)}
              onMouseEnter={() => soundEngine.playHoverBlip(1500)}
              className="group p-3.5 rounded-lg bg-white/80 dark:bg-graphite-900/80 hover:bg-slate-50 dark:hover:bg-graphite-850 border border-slate-200 dark:border-graphite-800 hover:border-blue-500 dark:hover:border-cherenkov-blue/60 transition-all duration-300 cursor-pointer backdrop-blur-md shadow-md"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-900 dark:text-offwhite group-hover:text-blue-600 dark:group-hover:text-cherenkov-glow transition-colors">
                  {member.name}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-graphite-950 border border-slate-200 dark:border-graphite-800 text-blue-600 dark:text-cherenkov-glow">
                  {member.coreFunction}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-titanium leading-tight">
                {member.role}
              </div>
            </div>
          ))}
        </div>

        {/* Action Conduit Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => scrollToSection(4)}
            onMouseEnter={() => soundEngine.playHoverBlip(1400)}
            className="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 dark:bg-cherenkov-blue dark:hover:bg-cherenkov-glow text-white dark:hover:text-graphite-950 font-mono text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded shadow-lg shadow-blue-500/25 dark:shadow-cherenkov-blue/30 cursor-pointer"
          >
            <span>VIEW WORK SPECIMENS</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={() => scrollToSection(2)}
            onMouseEnter={() => soundEngine.playHoverBlip(1400)}
            className="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-white/90 dark:bg-graphite-900/90 hover:bg-slate-100 dark:hover:bg-graphite-800 border border-slate-300 dark:border-graphite-700 text-slate-700 dark:text-titanium hover:text-slate-900 dark:hover:text-offwhite font-mono text-xs tracking-widest uppercase font-medium transition-all duration-300 rounded cursor-pointer backdrop-blur-md"
          >
            <span>ABOUT OUR MISSION</span>
          </button>

          <a
            href="https://github.com/Kunal-sabale10?tab=repositories"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => soundEngine.playHoverBlip(1600)}
            className="inline-flex items-center space-x-2 px-5 py-3.5 bg-white/90 dark:bg-graphite-900/90 hover:bg-slate-100 dark:hover:bg-graphite-800 border border-slate-300 dark:border-graphite-700 text-slate-700 dark:text-titanium hover:text-slate-900 dark:hover:text-offwhite font-mono text-xs tracking-widest uppercase font-medium transition-all duration-300 rounded cursor-pointer backdrop-blur-md"
          >
            <Github className="w-4 h-4 text-blue-600 dark:text-cherenkov-glow" />
            <span>GITHUB REPOSITORIES</span>
          </a>
        </div>
      </div>

      {/* Bottom Coordinates & Keyboard Hint */}
      <div className="flex flex-wrap items-end justify-between gap-4 font-mono text-xs text-slate-500 dark:text-titanium pt-8 border-t border-slate-200 dark:border-graphite-800/60">
        <div className="space-y-1">
          <div className="text-[10px] uppercase text-slate-400 dark:text-titanium/70">COLLECTIVE TRIAD DISPATCH</div>
          <div className="text-slate-900 dark:text-offwhite font-bold">KUNAL [BUILD] • ANIMESH [IDEA] • RAJANI [PRESENT]</div>
        </div>

        <div className="flex items-center space-x-3 text-slate-500 dark:text-titanium">
          <span className="text-[11px] tracking-widest uppercase">Scroll or press [1-6] to navigate</span>
          <div className="w-5 h-8 rounded-full border border-slate-400 dark:border-graphite-700 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-blue-600 dark:bg-cherenkov-glow animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
