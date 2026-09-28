import React from 'react';
import { TEAM_MEMBERS } from '../../data/team';
import { Cpu, Sparkles, Palette, Github, Linkedin, Layers, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

export const SectionTeam: React.FC = () => {
  const getMemberIcon = (avatarIcon: string) => {
    if (avatarIcon === 'Cpu') return <Cpu className="w-5 h-5 text-[#007C8C] dark:text-cherenkov-glow" />;
    if (avatarIcon === 'Sparkles') return <Sparkles className="w-5 h-5 text-emerald-600 dark:text-isotope" />;
    return <Palette className="w-5 h-5 text-[#007C8C] dark:text-cherenkov-glow" />;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <section id="section-team" className="relative min-h-screen w-full px-6 sm:px-12 md:px-20 py-20 sm:py-28 flex flex-col justify-center">
      {/* Header */}
      <div className="max-w-4xl space-y-4 mb-14 relative p-4 sm:p-6 -m-4 sm:-m-6 rounded-3xl bg-gradient-to-r from-[#F4F1EA]/92 via-[#F4F1EA]/65 to-transparent dark:from-theme-base/80 dark:via-theme-base/40 dark:to-transparent">
        <div className="flex items-center space-x-3 text-xs font-mono text-[#3A4258] dark:text-[#8A91A6]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0B4DFF] dark:bg-cherenkov-glow animate-ping" />
          <span className="text-[#0E1220] dark:text-[#F2F4F8] font-bold tracking-widest">03 // 404 REBELS ROSTER</span>
          <span className="text-[#007C8C] dark:text-cherenkov-glow font-bold">| 3 MEMBERS</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-[#0E1220] dark:text-[#F2F4F8] tracking-tight">
          CORE TEAM &amp;<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0E1220] via-[#003299] to-[#0B4DFF] dark:from-sky-300 dark:via-white dark:to-blue-500">
            SPECIALISTS.
          </span>
        </h2>
        <p className="text-base sm:text-lg font-sans text-[#3A4258] dark:text-[#B8BED0] max-w-2xl leading-relaxed">
          Three dedicated developers and designers collaborating across full-stack engineering, product strategy, and modern frontend user experiences.
        </p>
      </div>

      {/* 3 Members Full Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl font-mono">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.id}
            onMouseEnter={() => soundEngine.playHoverBlip(1400)}
            className="group rounded-xl bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border-subtle dark:border-white/10 hover:border-[#0B4DFF] dark:hover:border-cherenkov-glow/50 p-6 sm:p-7 transition-all duration-300 shadow-ambient flex flex-col justify-between"
          >
            <div className="space-y-5">
              {/* Member Avatar & Role Badge */}
              <div className="flex items-center justify-between">
                {/* Stylized Avatar Frame with Photo */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-theme-border-subtle dark:border-white/15 group-hover:border-[#0B4DFF] dark:group-hover:border-cherenkov-glow/60 transition-all duration-300 shadow-md bg-slate-200 dark:bg-graphite-900 shrink-0">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display font-extrabold text-xl text-[#0E1220] dark:text-[#F2F4F8]">
                      {getInitials(member.name)}
                    </div>
                  )}
                  <div className="absolute -bottom-0.5 -right-0.5 p-1 rounded-full bg-theme-surface border border-theme-border-subtle dark:border-white/10 shadow-sm">
                    {getMemberIcon(member.avatarIcon)}
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded bg-theme-surface-subtle border border-theme-border-subtle dark:border-white/10 text-[#007C8C] dark:text-cherenkov-glow font-bold text-xs uppercase tracking-wider">
                  {member.coreFunction}
                </span>
              </div>

              {/* Name & Role */}
              <div className="space-y-1">
                <h3 className="text-2xl font-display font-extrabold text-[#0E1220] dark:text-[#F2F4F8] group-hover:text-[#0B4DFF] dark:group-hover:text-cherenkov-glow transition-colors">
                  {member.name}
                </h3>
                <div className="text-xs text-[#007C8C] dark:text-cherenkov-glow font-bold tracking-wider uppercase">
                  {member.role}
                </div>
              </div>

              {/* Short Bio */}
              <p className="text-xs sm:text-sm font-sans text-[#3A4258] dark:text-[#B8BED0] leading-relaxed bg-theme-surface-subtle p-4 rounded-lg border border-theme-border-subtle dark:border-white/10">
                {member.bio}
              </p>

              {/* Disciplines Visual Tags */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase text-[#5B6478] dark:text-[#8A91A6] flex items-center gap-1.5 font-bold">
                  <Layers className="w-3 h-3 text-[#007C8C] dark:text-cherenkov-glow" />
                  CORE DISCIPLINES
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.disciplines.slice(0, 4).map((d, dIdx) => (
                    <span
                      key={dIdx}
                      className="px-2.5 py-1 rounded text-[10px] bg-theme-surface-subtle border border-theme-border-subtle dark:border-white/10 text-[#3A4258] dark:text-[#B8BED0] font-medium"
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
                    className="p-2 rounded bg-theme-surface-subtle hover:bg-theme-surface text-[#0E1220] dark:text-[#B8BED0] hover:text-[#0B4DFF] dark:hover:text-[#F2F4F8] transition-colors border border-theme-border-subtle dark:border-white/10 hover:border-[#0B4DFF]"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4 text-[#007C8C] dark:text-cherenkov-glow" />
                  </a>
                )}
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundEngine.playHoverBlip(1600)}
                    className="p-2 rounded bg-theme-surface-subtle hover:bg-theme-surface text-[#0E1220] dark:text-[#B8BED0] hover:text-[#0B4DFF] dark:hover:text-[#F2F4F8] transition-colors border border-theme-border-subtle dark:border-white/10 hover:border-[#0B4DFF]"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 text-[#007C8C] dark:text-cherenkov-glow" />
                  </a>
                )}
              </div>

              <div className="text-[10px] text-emerald-700 dark:text-isotope flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>AVAILABLE FOR WORK</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
