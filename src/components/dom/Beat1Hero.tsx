import React from 'react';
import { useScrollEngine } from '../../context/ScrollContext';
import { Activity, Cpu, Terminal, ArrowDown, Users, Sparkles, Palette, Github } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';
import { TEAM_MEMBERS } from '../../data/team';

export const Beat1Hero: React.FC = () => {
  const { scrollToBeat } = useScrollEngine();

  return (
    <div className="relative min-h-[90vh] w-full flex flex-col justify-between px-6 sm:px-12 md:px-20 py-16 sm:py-24">
      {/* Top Telemetry Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-titanium">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-cherenkov-glow animate-pulse" />
          <span className="text-offwhite font-bold tracking-widest">BEAT 01 // TRIAD IGNITION</span>
        </div>
        <div className="flex items-center space-x-6 text-[11px] uppercase tracking-wider">
          <span className="flex items-center gap-1.5 text-offwhite">
            <Users className="w-3.5 h-3.5 text-cherenkov-glow" />
            TRIAD COLLECTIVE: 3 SPECIALISTS
          </span>
          <span className="hidden md:inline">GITHUB REPOS: 9 VERIFIED</span>
          <span className="hidden sm:inline text-isotope">SYSTEM: ALL NODES SYNCHRONIZED</span>
        </div>
      </div>

      {/* Main Kinetic Headline */}
      <div className="max-w-5xl my-auto space-y-8 py-10">
        <div className="inline-flex items-center space-x-3 px-3 py-1.5 rounded-sm bg-graphite-850/90 border border-graphite-700/60 font-mono text-xs text-cherenkov-glow tracking-widest uppercase backdrop-blur-sm">
          <Users className="w-3.5 h-3.5 text-cherenkov-glow" />
          <span>TRIAD COLLECTIVE // KUNAL • ANIMESH • RAJANI</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tighter text-offwhite leading-[0.9]">
            IDEA. BUILD.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherenkov-glow via-white to-cherenkov-blue">
              PRESENT.
            </span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl font-mono text-titanium max-w-3xl pt-2 leading-relaxed">
            A three-person powerhouse uniting visionary ideation, engine-first systems construction, and award-grade presentation engineering.
          </p>
        </div>

        {/* 3-Member Triad Roster Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 font-mono">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              onClick={() => scrollToBeat(3)}
              onMouseEnter={() => soundEngine.playHoverBlip(1500)}
              className="group p-3.5 rounded bg-graphite-900/80 hover:bg-graphite-850 border border-graphite-800 hover:border-cherenkov-blue/60 transition-all duration-300 cursor-pointer backdrop-blur-sm shadow-md"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-offwhite group-hover:text-cherenkov-glow transition-colors">
                  {member.name}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-graphite-950 border border-graphite-800 text-cherenkov-glow">
                  {member.coreFunction}
                </span>
              </div>
              <div className="text-[11px] text-titanium leading-tight">
                {member.role}
              </div>
            </div>
          ))}
        </div>

        {/* Action Conduit Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollToBeat(2)}
            onMouseEnter={() => soundEngine.playHoverBlip(1400)}
            className="inline-flex items-center space-x-3 px-6 py-3.5 bg-cherenkov-blue hover:bg-cherenkov-glow hover:text-graphite-950 text-white font-mono text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded shadow-lg shadow-cherenkov-blue/30 cursor-pointer"
          >
            <span>INSPECT GITHUB SPECIMENS</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={() => scrollToBeat(3)}
            onMouseEnter={() => soundEngine.playHoverBlip(1400)}
            className="inline-flex items-center space-x-3 px-6 py-3.5 bg-graphite-900/90 hover:bg-graphite-800 border border-graphite-700 text-titanium hover:text-offwhite font-mono text-xs tracking-widest uppercase font-medium transition-all duration-300 rounded cursor-pointer backdrop-blur-sm"
          >
            <Users className="w-4 h-4 text-isotope" />
            <span>TRIAD DYNAMICS</span>
          </button>

          <a
            href="https://github.com/Kunal-sabale10?tab=repositories"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => soundEngine.playHoverBlip(1600)}
            className="inline-flex items-center space-x-2 px-5 py-3.5 bg-graphite-900/90 hover:bg-graphite-800 border border-graphite-700 text-titanium hover:text-offwhite font-mono text-xs tracking-widest uppercase font-medium transition-all duration-300 rounded cursor-pointer backdrop-blur-sm"
          >
            <Github className="w-4 h-4 text-cherenkov-glow" />
            <span>GITHUB REPOS</span>
          </a>
        </div>
      </div>

      {/* Bottom Coordinates & Scroll Indication */}
      <div className="flex flex-wrap items-end justify-between gap-4 font-mono text-xs text-titanium pt-8 border-t border-graphite-800/60">
        <div className="space-y-1">
          <div className="text-[10px] uppercase text-titanium/70">COLLECTIVE COORDINATES</div>
          <div className="text-offwhite font-bold">KUNAL [BUILD] // ANIMESH [IDEA] // RAJANI [DEV]</div>
        </div>

        <div className="flex items-center space-x-3 text-titanium">
          <span className="text-[11px] tracking-widest uppercase">Scroll to traverse collision chamber</span>
          <div className="w-5 h-8 rounded-full border border-graphite-700 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-cherenkov-glow animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
