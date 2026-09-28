import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../../data/team';
import { Cpu, Sparkles, Palette, Github, Linkedin, ExternalLink, Layers, ShieldCheck, Users } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

export const SectionTeam: React.FC = () => {
  const [activeMemberId, setActiveMemberId] = useState<string>('kunal-sabale');

  const getMemberIcon = (avatarIcon: string) => {
    if (avatarIcon === 'Cpu') return <Cpu className="w-5 h-5 text-theme-accent dark:text-cherenkov-glow" />;
    if (avatarIcon === 'Sparkles') return <Sparkles className="w-5 h-5 text-emerald-600 dark:text-isotope" />;
    return <Palette className="w-5 h-5 text-theme-accent dark:text-cherenkov-glow" />;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <section id="section-team" className="relative min-h-screen w-full px-6 sm:px-12 md:px-20 py-20 sm:py-28 flex flex-col justify-center">
      {/* Header */}
      <div className="max-w-4xl space-y-4 mb-14">
        <div className="flex items-center space-x-3 text-xs font-mono text-theme-text-dim dark:text-[#8A91A6]">
          <span className="w-2.5 h-2.5 rounded-full bg-theme-accent dark:bg-cherenkov-glow animate-ping" />
          <span className="text-theme-text-main dark:text-[#F2F4F8] font-bold tracking-widest">03 // THE TRIAD ROSTER</span>
          <span className="text-theme-accent dark:text-cherenkov-glow">| 3 MEMBERS</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-theme-text-main dark:text-[#F2F4F8] tracking-tight">
          CORE TEAM &amp;<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-sky-300 dark:via-white dark:to-blue-500">
            SPECIALISTS.
          </span>
        </h2>
        <p className="text-base sm:text-lg font-mono text-theme-text-muted dark:text-[#B8BED0] max-w-2xl leading-relaxed">
          Three dedicated specialists driving every dimension of the product lifecycle: visionary ideation, rock-solid engineering build, and flawless presentation.
        </p>
      </div>

      {/* 3 Members Full Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl font-mono">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.id}
            onMouseEnter={() => soundEngine.playHoverBlip(1400)}
            className="group rounded-xl bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border-subtle dark:border-white/10 hover:border-theme-accent dark:hover:border-cherenkov-glow/50 p-6 sm:p-7 transition-all duration-300 shadow-ambient backdrop-blur-[14px] flex flex-col justify-between"
          >
            <div className="space-y-5">
              {/* Member Avatar & Role Badge */}
              <div className="flex items-center justify-between">
                {/* Stylized Avatar Frame */}
                <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-cyan-500/15 dark:from-cherenkov-blue/30 dark:to-graphite-950 border border-theme-accent/30 dark:border-cherenkov-glow/40 shadow-inner">
                  <span className="text-lg font-display font-extrabold text-theme-text-main dark:text-[#F2F4F8]">
                    {getInitials(member.name)}
                  </span>
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-theme-surface border border-theme-border-subtle dark:border-white/10">
                    {getMemberIcon(member.avatarIcon)}
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded bg-theme-surface-subtle border border-theme-border-subtle dark:border-white/10 text-theme-accent dark:text-cherenkov-glow font-bold text-xs uppercase tracking-wider">
                  {member.coreFunction}
                </span>
              </div>

              {/* Name & Role */}
              <div className="space-y-1">
                <h3 className="text-2xl font-display font-extrabold text-theme-text-main dark:text-[#F2F4F8] group-hover:text-theme-accent dark:group-hover:text-cherenkov-glow transition-colors">
                  {member.name}
                </h3>
                <div className="text-xs text-theme-accent dark:text-cherenkov-glow font-bold tracking-wider uppercase">
                  {member.role}
                </div>
              </div>

              {/* Short Bio */}
              <p className="text-xs sm:text-sm text-theme-text-muted dark:text-[#B8BED0] leading-relaxed bg-theme-surface-subtle p-4 rounded-lg border border-theme-border-subtle dark:border-white/10">
                {member.bio}
              </p>

              {/* Disciplines Visual Tags */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase text-theme-text-dim dark:text-[#8A91A6] flex items-center gap-1.5 font-bold">
                  <Layers className="w-3 h-3 text-theme-accent dark:text-cherenkov-glow" />
                  CORE DISCIPLINES
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.disciplines.slice(0, 4).map((d, dIdx) => (
                    <span
                      key={dIdx}
                      className="px-2.5 py-1 rounded text-[10px] bg-theme-surface-subtle border border-theme-border-subtle dark:border-white/10 text-theme-text-muted dark:text-[#B8BED0]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Metrics & Links */}
            <div className="pt-5 mt-5 border-t border-theme-border-subtle dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {member.githubUrl && (
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundEngine.playHoverBlip(1600)}
                    className="p-2 rounded bg-theme-surface-subtle hover:bg-theme-surface text-theme-text-muted dark:text-[#B8BED0] hover:text-theme-text-main dark:hover:text-[#F2F4F8] transition-colors border border-theme-border-subtle dark:border-white/10 hover:border-theme-accent"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4 text-theme-accent dark:text-cherenkov-glow" />
                  </a>
                )}
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundEngine.playHoverBlip(1600)}
                    className="p-2 rounded bg-theme-surface-subtle hover:bg-theme-surface text-theme-text-muted dark:text-[#B8BED0] hover:text-theme-text-main dark:hover:text-[#F2F4F8] transition-colors border border-theme-border-subtle dark:border-white/10 hover:border-theme-accent"
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
