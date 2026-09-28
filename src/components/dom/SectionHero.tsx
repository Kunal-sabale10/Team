import React from 'react';
import { useScrollEngine as useScroll } from '../../context/ScrollContext';
import { Users, ArrowDown, Github } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';
import { TEAM_MEMBERS } from '../../data/team';

export const SectionHero: React.FC = () => {
  const { scrollToSection } = useScroll();

  return (
    <section id="section-hero" className="relative min-h-screen w-full flex flex-col justify-between px-4 sm:px-12 md:px-20 py-16 sm:py-24">
      {/* Top Telemetry Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#3A4258] dark:text-[#8A91A6]">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0B4DFF] dark:bg-cherenkov-glow animate-pulse" />
          <span className="text-[#0E1220] dark:text-[#F2F4F8] font-bold tracking-widest">
            01 // HERO STAGE
          </span>
        </div>
        <div className="flex items-center space-x-6 text-[11px] uppercase tracking-wider">
          <span className="flex items-center gap-1.5 text-[#0E1220] dark:text-[#F2F4F8] font-medium">
            <Users className="w-3.5 h-3.5 text-[#007C8C] dark:text-cherenkov-glow" />
            404 REBELS COLLECTIVE
          </span>
          <span className="hidden md:inline text-[#5B6478] dark:text-[#8A91A6]">3 ACTIVE DEVELOPERS &amp; DESIGNERS</span>
          <span className="hidden sm:inline text-emerald-600 dark:text-isotope font-semibold">STATUS: READY</span>
        </div>
      </div>

      {/* Main Kinetic Headline */}
      <div className="max-w-5xl my-auto space-y-6 py-8">
        <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-md bg-theme-surface border border-theme-border-subtle font-mono text-xs text-[#007C8C] dark:text-cherenkov-glow tracking-widest uppercase shadow-ambient backdrop-blur-md font-semibold">
          <Users className="w-3.5 h-3.5" />
          <span>404 REBELS // KUNAL • ANIMESH • RAJANI</span>
        </div>

        <div className="space-y-3 relative p-4 sm:p-6 -m-4 sm:-m-6 rounded-3xl bg-gradient-to-r from-[#F4F1EA]/92 via-[#F4F1EA]/65 to-transparent dark:from-theme-base/80 dark:via-theme-base/40 dark:to-transparent">
          <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tighter text-[#0E1220] dark:text-[#F2F4F8] leading-[0.9]">
            IDEA. BUILD.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0E1220] via-[#003299] to-[#0B4DFF] dark:from-sky-300 dark:via-white dark:to-blue-500">
              DELIVER.
            </span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl font-sans text-[#3A4258] dark:text-[#B8BED0] max-w-3xl pt-2 leading-relaxed">
            We are 404 Rebels — a focused web development and design team. We combine full-stack engineering, clean UI/UX design, and modern interactive technologies to build fast, reliable, and user-centric web applications.
          </p>
        </div>

        {/* 3-Member Quick Roster Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 font-mono">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              onClick={() => scrollToSection(3)}
              onMouseEnter={() => soundEngine.playHoverBlip(1500)}
              className="group p-3.5 rounded-lg bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border-subtle hover:border-[#0B4DFF] dark:hover:border-theme-accent transition-all duration-300 cursor-pointer backdrop-blur-md shadow-ambient flex items-center space-x-3"
            >
              {member.imageUrl && (
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-10 h-10 rounded-lg object-cover object-top border border-theme-border-subtle dark:border-white/10 shrink-0 group-hover:border-[#0B4DFF] transition-colors"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs mb-0.5">
                  <span className="font-bold text-[#0E1220] dark:text-[#F2F4F8] group-hover:text-[#0B4DFF] dark:group-hover:text-cherenkov-glow transition-colors truncate">
                    {member.name}
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-theme-surface-subtle border border-theme-border-subtle text-[#007C8C] dark:text-cherenkov-glow shrink-0 ml-1">
                    {member.coreFunction}
                  </span>
                </div>
                <div className="text-[11px] text-[#5B6478] dark:text-[#8A91A6] leading-tight font-medium truncate">
                  {member.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Conduit Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => scrollToSection(4)}
            onMouseEnter={() => soundEngine.playHoverBlip(1400)}
            className="inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 bg-theme-accent hover:opacity-95 dark:bg-cherenkov-blue dark:hover:bg-cherenkov-glow text-white dark:hover:text-graphite-950 font-mono text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded shadow-lg shadow-blue-500/25 dark:shadow-cherenkov-blue/30 cursor-pointer w-full sm:w-auto min-h-[44px]"
          >
            <span>VIEW OUR PROJECTS</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={() => scrollToSection(2)}
            onMouseEnter={() => soundEngine.playHoverBlip(1400)}
            className="inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border-subtle text-[#0E1220] dark:text-[#B8BED0] hover:text-[#0B4DFF] dark:hover:text-[#F2F4F8] font-mono text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded cursor-pointer backdrop-blur-md shadow-ambient w-full sm:w-auto min-h-[44px]"
          >
            <span>ABOUT OUR TEAM</span>
          </button>

          <a
            href="https://github.com/Kunal-sabale10?tab=repositories"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => soundEngine.playHoverBlip(1600)}
            className="inline-flex items-center justify-center space-x-2 px-5 py-3.5 bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border-subtle text-[#0E1220] dark:text-[#B8BED0] hover:text-[#0B4DFF] dark:hover:text-[#F2F4F8] font-mono text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded cursor-pointer backdrop-blur-md shadow-ambient w-full sm:w-auto min-h-[44px]"
          >
            <Github className="w-4 h-4 text-[#007C8C] dark:text-cherenkov-glow" />
            <span>GITHUB REPOSITORIES</span>
          </a>
        </div>
      </div>

      {/* Bottom Coordinates & Keyboard Hint */}
      <div className="flex flex-wrap items-end justify-between gap-4 font-mono text-xs text-[#5B6478] dark:text-[#8A91A6] pt-8 border-t border-theme-border-subtle">
        <div className="space-y-1">
          <div className="text-[10px] uppercase font-bold text-[#007C8C] dark:text-[#8A91A6]">404 REBELS TEAM DISPATCH</div>
          <div className="text-[#0E1220] dark:text-[#F2F4F8] font-bold">KUNAL [FULL-STACK] • ANIMESH [PRODUCT] • RAJANI [FRONTEND]</div>
        </div>

        <div className="flex items-center space-x-3 text-[#5B6478] dark:text-[#8A91A6]">
          <span className="hidden sm:inline text-[11px] tracking-widest uppercase font-medium">Scroll or press [1-6] to navigate</span>
          <span className="sm:hidden text-[11px] tracking-widest uppercase font-medium">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-theme-border-subtle flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[#0B4DFF] dark:bg-cherenkov-glow animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
