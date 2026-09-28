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
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-theme-text-dim dark:text-[#8A91A6]">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-theme-accent dark:bg-cherenkov-glow animate-pulse" />
          <span className="text-theme-text-main dark:text-[#F2F4F8] font-bold tracking-widest">
            01 // HERO STAGE
          </span>
        </div>
        <div className="flex items-center space-x-6 text-[11px] uppercase tracking-wider">
          <span className="flex items-center gap-1.5 text-theme-text-main dark:text-[#F2F4F8] font-medium">
            <Users className="w-3.5 h-3.5 text-theme-accent dark:text-cherenkov-glow" />
            HADRON TRIAD COLLECTIVE
          </span>
          <span className="hidden md:inline text-theme-text-dim dark:text-[#8A91A6]">SYSTEM: 3 NODES ACTIVE</span>
          <span className="hidden sm:inline text-emerald-600 dark:text-isotope font-semibold">STATUS: 120 FPS CALIBRATED</span>
        </div>
      </div>

      {/* Main Kinetic Headline */}
      <div className="max-w-5xl my-auto space-y-6 py-8">
        <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-md bg-theme-surface border border-theme-border-subtle font-mono text-xs text-theme-accent dark:text-cherenkov-glow tracking-widest uppercase shadow-ambient backdrop-blur-md">
          <Users className="w-3.5 h-3.5" />
          <span>TRIAD COLLECTIVE // KUNAL • ANIMESH • RAJANI</span>
        </div>

        <div className="space-y-3 relative p-4 sm:p-6 -m-4 sm:-m-6 rounded-3xl dark:bg-gradient-to-r dark:from-theme-base/80 dark:via-theme-base/40 dark:to-transparent dark:backdrop-blur-[2px]">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tighter text-theme-text-main dark:text-[#F2F4F8] leading-[0.9]">
            IDEA. BUILD.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 dark:from-sky-300 dark:via-white dark:to-blue-500">
              PRESENT.
            </span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl font-mono text-theme-text-muted dark:text-[#B8BED0] max-w-3xl pt-2 leading-relaxed">
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
              className="group p-3.5 rounded-lg bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border-subtle hover:border-theme-accent transition-all duration-300 cursor-pointer backdrop-blur-md shadow-ambient"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-theme-text-main dark:text-[#F2F4F8] group-hover:text-theme-accent dark:group-hover:text-cherenkov-glow transition-colors">
                  {member.name}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-theme-surface-subtle border border-theme-border-subtle text-theme-accent dark:text-cherenkov-glow">
                  {member.coreFunction}
                </span>
              </div>
              <div className="text-[11px] text-theme-text-dim dark:text-[#8A91A6] leading-tight">
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
            className="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-theme-accent hover:opacity-95 dark:bg-cherenkov-blue dark:hover:bg-cherenkov-glow text-white dark:hover:text-graphite-950 font-mono text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded shadow-lg shadow-blue-500/25 dark:shadow-cherenkov-blue/30 cursor-pointer"
          >
            <span>VIEW WORK SPECIMENS</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={() => scrollToSection(2)}
            onMouseEnter={() => soundEngine.playHoverBlip(1400)}
            className="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border-subtle text-theme-text-muted dark:text-[#B8BED0] hover:text-theme-text-main dark:hover:text-[#F2F4F8] font-mono text-xs tracking-widest uppercase font-medium transition-all duration-300 rounded cursor-pointer backdrop-blur-md shadow-ambient"
          >
            <span>ABOUT OUR MISSION</span>
          </button>

          <a
            href="https://github.com/Kunal-sabale10?tab=repositories"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => soundEngine.playHoverBlip(1600)}
            className="inline-flex items-center space-x-2 px-5 py-3.5 bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border-subtle text-theme-text-muted dark:text-[#B8BED0] hover:text-theme-text-main dark:hover:text-[#F2F4F8] font-mono text-xs tracking-widest uppercase font-medium transition-all duration-300 rounded cursor-pointer backdrop-blur-md shadow-ambient"
          >
            <Github className="w-4 h-4 text-theme-accent dark:text-cherenkov-glow" />
            <span>GITHUB REPOSITORIES</span>
          </a>
        </div>
      </div>

      {/* Bottom Coordinates & Keyboard Hint */}
      <div className="flex flex-wrap items-end justify-between gap-4 font-mono text-xs text-theme-text-dim dark:text-[#8A91A6] pt-8 border-t border-theme-border-subtle">
        <div className="space-y-1">
          <div className="text-[10px] uppercase text-theme-text-dim dark:text-[#8A91A6]">COLLECTIVE TRIAD DISPATCH</div>
          <div className="text-theme-text-main dark:text-[#F2F4F8] font-bold">KUNAL [BUILD] • ANIMESH [IDEA] • RAJANI [PRESENT]</div>
        </div>

        <div className="flex items-center space-x-3 text-theme-text-dim dark:text-[#8A91A6]">
          <span className="text-[11px] tracking-widest uppercase">Scroll or press [1-6] to navigate</span>
          <div className="w-5 h-8 rounded-full border border-theme-border-subtle flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-theme-accent dark:bg-cherenkov-glow animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
