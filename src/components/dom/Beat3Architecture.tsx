import React, { useState } from 'react';
import { useScrollEngine } from '../../context/ScrollContext';
import { Cpu, Sparkles, Palette, Activity, Users, ArrowRight, Github, Linkedin, ShieldCheck, Layers } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';
import { TEAM_MEMBERS } from '../../data/team';

export const Beat3Architecture: React.FC = () => {
  const { fps, drawCalls, scrollProgress } = useScrollEngine();
  const [selectedMemberId, setSelectedMemberId] = useState<string>('kunal-sabale');

  const selectedMember = TEAM_MEMBERS.find((m) => m.id === selectedMemberId) || TEAM_MEMBERS[0];

  const handleSelectMember = (id: string) => {
    soundEngine.playClickBeep();
    setSelectedMemberId(id);
  };

  const getIcon = (avatarIcon: string) => {
    if (avatarIcon === 'Cpu') return <Cpu className="w-4 h-4 text-cherenkov-glow" />;
    if (avatarIcon === 'Sparkles') return <Sparkles className="w-4 h-4 text-isotope" />;
    return <Palette className="w-4 h-4 text-cherenkov-glow" />;
  };

  return (
    <div className="relative min-h-[90vh] w-full px-6 sm:px-12 md:px-20 py-16 sm:py-24">
      {/* Header */}
      <div className="max-w-4xl space-y-4 mb-14">
        <div className="flex items-center space-x-3 text-xs font-mono text-titanium">
          <span className="w-2 h-2 rounded-full bg-isotope animate-pulse" />
          <span className="text-offwhite font-bold tracking-widest">BEAT 03 // TRIAD ARCHITECTURE</span>
          <span className="text-isotope">| COLLECTIVE MATRIX</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-offwhite tracking-tight">
          THE TRIAD<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherenkov-glow via-white to-cherenkov-blue">
            DISCIPLINES.
          </span>
        </h2>
        <p className="text-sm sm:text-base font-mono text-titanium max-w-xl">
          Three complementary minds operating as a single unit. From initial spark to deterministic engine code and high-craft digital presentation.
        </p>
      </div>

      {/* Triad Workflow Flow Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-5xl mb-12 font-mono">
        <div className="p-4 rounded bg-graphite-900/80 border border-graphite-800 space-y-2 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs">
            <span className="text-isotope font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              STAGE 01: THE IDEA
            </span>
            <span className="text-[10px] text-titanium">ANIMESH DABHADE</span>
          </div>
          <p className="text-[11px] text-titanium leading-relaxed">
            Worldbuilding, metaphor creation, disruptive feature discovery, and UX journey scripting.
          </p>
        </div>

        <div className="p-4 rounded bg-graphite-900/80 border border-graphite-800 space-y-2 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs">
            <span className="text-cherenkov-glow font-bold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              STAGE 02: THE BUILD
            </span>
            <span className="text-[10px] text-titanium">KUNAL SABALE</span>
          </div>
          <p className="text-[11px] text-titanium leading-relaxed">
            Systems architecture, WebGL shader execution, state synchronization, and low-latency runtime engineering.
          </p>
        </div>

        <div className="p-4 rounded bg-graphite-900/80 border border-graphite-800 space-y-2 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs">
            <span className="text-cherenkov-glow font-bold flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" />
              STAGE 03: PRESENTATION &amp; DEV
            </span>
            <span className="text-[10px] text-titanium">RAJANI MOURYA</span>
          </div>
          <p className="text-[11px] text-titanium leading-relaxed">
            High-craft visual design systems, kinetic motion typography, responsive touch ergonomics, and presentation polish.
          </p>
        </div>
      </div>

      {/* Member Selection Tabs & Deep Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl">
        {/* Left Column: Member Selectors */}
        <div className="lg:col-span-4 space-y-3 font-mono">
          <div className="text-xs uppercase tracking-wider text-titanium mb-2 flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-cherenkov-glow" />
            SELECT OPERATIONAL NODE
          </div>

          {TEAM_MEMBERS.map((member) => {
            const isSelected = selectedMember.id === member.id;
            return (
              <div
                key={member.id}
                onClick={() => handleSelectMember(member.id)}
                onMouseEnter={() => soundEngine.playHoverBlip(1400)}
                className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-graphite-850 border-cherenkov-blue shadow-lg shadow-cherenkov-blue/20'
                    : 'bg-graphite-900/80 border-graphite-800 hover:border-graphite-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center space-x-2">
                    {getIcon(member.avatarIcon)}
                    <span className="font-bold text-offwhite">{member.name}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-cherenkov-blue text-white' : 'bg-graphite-950 text-titanium'
                  }`}>
                    {member.coreFunction}
                  </span>
                </div>
                <div className="text-[11px] text-titanium pl-6">{member.role}</div>
              </div>
            );
          })}

          {/* Quick System Telemetry */}
          <div className="p-4 rounded-lg bg-graphite-900/60 border border-graphite-800/80 space-y-2 pt-4">
            <div className="flex items-center justify-between text-[11px] text-titanium">
              <span>REAL-TIME FRAMERATE</span>
              <span className="text-isotope font-bold">{fps} FPS</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-titanium">
              <span>GPU DRAW CALLS</span>
              <span className="text-cherenkov-glow font-bold">{drawCalls} / 40</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-titanium">
              <span>ACTIVE GITHUB REPOS</span>
              <span className="text-offwhite font-bold">9 REPOSITORIES</span>
            </div>
          </div>
        </div>

        {/* Right Column: Deep Member Dossier */}
        <div className="lg:col-span-8 bg-graphite-900/90 border border-graphite-800 rounded-lg p-6 sm:p-8 backdrop-blur-md space-y-6 font-mono">
          {/* Dossier Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-graphite-800 pb-4">
            <div>
              <div className="text-[11px] text-cherenkov-glow uppercase tracking-wider mb-1">
                {selectedMember.coreFunction}
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-offwhite">
                {selectedMember.name}
              </h3>
              <p className="text-xs text-titanium">{selectedMember.role}</p>
            </div>

            <div className="flex items-center space-x-3">
              {selectedMember.githubUrl && (
                <a
                  href={selectedMember.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => soundEngine.playHoverBlip(1600)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-graphite-800 hover:bg-graphite-700 text-xs text-offwhite transition-colors border border-graphite-700"
                >
                  <Github className="w-3.5 h-3.5 text-cherenkov-glow" />
                  <span>GITHUB</span>
                </a>
              )}
            </div>
          </div>

          {/* Tagline & Bio */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-offwhite italic">
              "{selectedMember.tagline}"
            </div>
            <p className="text-xs sm:text-sm text-titanium leading-relaxed bg-graphite-950/60 p-4 rounded border border-graphite-800/80">
              {selectedMember.bio}
            </p>
          </div>

          {/* Disciplines & Core Competencies */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wider text-titanium flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-cherenkov-glow" />
              SPECIALIZED DISCIPLINES
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedMember.disciplines.map((d, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded bg-graphite-950 border border-graphite-800/80 text-xs text-titanium flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cherenkov-glow" />
                  <span className="text-offwhite">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {selectedMember.metrics.map((m, idx) => (
              <div key={idx} className="bg-graphite-950 p-3 rounded border border-graphite-800 space-y-1">
                <div className="text-[9px] text-titanium uppercase">{m.label}</div>
                <div className="text-sm font-bold text-cherenkov-glow">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
