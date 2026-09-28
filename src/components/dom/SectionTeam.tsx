import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../../data/team';
import { Cpu, Sparkles, Palette, Github, Linkedin, ExternalLink, Layers, ShieldCheck, Users } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

export const SectionTeam: React.FC = () => {
  const [activeMemberId, setActiveMemberId] = useState<string>('kunal-sabale');

  const getMemberIcon = (avatarIcon: string) => {
    if (avatarIcon === 'Cpu') return <Cpu className="w-5 h-5 text-blue-600 dark:text-cherenkov-glow" />;
    if (avatarIcon === 'Sparkles') return <Sparkles className="w-5 h-5 text-emerald-600 dark:text-isotope" />;
    return <Palette className="w-5 h-5 text-blue-600 dark:text-cherenkov-glow" />;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <section id="section-team" className="relative min-h-screen w-full px-6 sm:px-12 md:px-20 py-20 sm:py-28 flex flex-col justify-center">
      {/* Header */}
      <div className="max-w-4xl space-y-4 mb-14">
        <div className="flex items-center space-x-3 text-xs font-mono text-slate-500 dark:text-titanium">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cherenkov-glow animate-ping" />
          <span className="text-slate-900 dark:text-offwhite font-bold tracking-widest">03 // THE TRIAD ROSTER</span>
          <span className="text-blue-600 dark:text-cherenkov-glow">| 3 MEMBERS</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-slate-900 dark:text-offwhite tracking-tight">
          CORE TEAM &amp;<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-cherenkov-glow dark:to-cherenkov-blue">
            SPECIALISTS.
          </span>
        </h2>
        <p className="text-base sm:text-lg font-mono text-slate-600 dark:text-titanium max-w-2xl leading-relaxed">
          Three dedicated specialists driving every dimension of the product lifecycle: visionary ideation, rock-solid engineering build, and flawless presentation.
        </p>
      </div>

      {/* 3 Members Full Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl font-mono">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.id}
            onMouseEnter={() => soundEngine.playHoverBlip(1400)}
            className="group rounded-xl bg-white/85 dark:bg-graphite-900/85 hover:bg-slate-50 dark:hover:bg-graphite-850/90 border border-slate-200 dark:border-graphite-800 hover:border-blue-500/70 dark:hover:border-cherenkov-blue/70 p-6 sm:p-7 transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col justify-between"
          >
            <div className="space-y-5">
              {/* Member Avatar & Role Badge */}
              <div className="flex items-center justify-between">
                {/* Stylized Avatar Frame */}
                <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-cyan-500/20 dark:from-cherenkov-blue/30 dark:to-graphite-950 border border-blue-500/30 dark:border-cherenkov-glow/40 shadow-inner">
                  <span className="text-lg font-display font-extrabold text-slate-900 dark:text-offwhite">
                    {getInitials(member.name)}
                  </span>
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white dark:bg-graphite-950 border border-slate-200 dark:border-graphite-800">
                    {getMemberIcon(member.avatarIcon)}
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded bg-blue-50 dark:bg-graphite-950 border border-blue-200 dark:border-graphite-800 text-blue-600 dark:text-cherenkov-glow font-bold text-xs uppercase tracking-wider">
                  {member.coreFunction}
                </span>
              </div>

              {/* Name & Role */}
              <div className="space-y-1">
                <h3 className="text-2xl font-display font-extrabold text-slate-900 dark:text-offwhite group-hover:text-blue-600 dark:group-hover:text-cherenkov-glow transition-colors">
                  {member.name}
                </h3>
                <div className="text-xs text-blue-600 dark:text-cherenkov-glow font-semibold tracking-wider uppercase">
                  {member.role}
                </div>
              </div>

              {/* Short Bio */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-titanium leading-relaxed bg-slate-50/70 dark:bg-graphite-950/60 p-4 rounded-lg border border-slate-200/80 dark:border-graphite-800/80">
                {member.bio}
              </p>

              {/* Disciplines Visual Tags */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase text-slate-400 dark:text-titanium flex items-center gap-1.5 font-bold">
                  <Layers className="w-3 h-3 text-blue-600 dark:text-cherenkov-glow" />
                  CORE DISCIPLINES
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.disciplines.slice(0, 4).map((d, dIdx) => (
                    <span
                      key={dIdx}
                      className="px-2.5 py-1 rounded text-[10px] bg-slate-100 dark:bg-graphite-950 border border-slate-200 dark:border-graphite-800 text-slate-700 dark:text-titanium"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Metrics & Links */}
            <div className="pt-5 mt-5 border-t border-slate-200 dark:border-graphite-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {member.githubUrl && (
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundEngine.playHoverBlip(1600)}
                    className="p-2 rounded bg-slate-100 dark:bg-graphite-950 hover:bg-slate-200 dark:hover:bg-graphite-800 text-slate-700 dark:text-titanium hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-graphite-800"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4 text-blue-600 dark:text-cherenkov-glow" />
                  </a>
                )}
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundEngine.playHoverBlip(1600)}
                    className="p-2 rounded bg-slate-100 dark:bg-graphite-950 hover:bg-slate-200 dark:hover:bg-graphite-800 text-slate-700 dark:text-titanium hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-graphite-800"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>

              <div className="text-[10px] text-emerald-600 dark:text-isotope flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SYNCHRONIZED</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
