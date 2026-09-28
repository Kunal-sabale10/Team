import React from 'react';
import { Layers, Code2, Users, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

export const SectionAbout: React.FC = () => {
  const pillars = [
    {
      title: 'FULL-STACK ARCHITECTURE',
      icon: <Layers className="w-5 h-5 text-[#007C8C] dark:text-cherenkov-glow" />,
      tag: 'SCALABLE & ROBUST',
      desc: 'We build dependable web applications with React, TypeScript, Node.js, and modern databases. Clean code, type safety, modular structures, and fast load times are prioritized on every project.',
    },
    {
      title: 'RESPONSIVE UI/UX DESIGN',
      icon: <Code2 className="w-5 h-5 text-[#0B4DFF] dark:text-isotope" />,
      tag: 'CLEAN & ACCESSIBLE',
      desc: 'We craft clean, intuitive user interfaces with precise typography, responsive layouts, and accessible design principles that work flawlessly across mobile, tablet, and desktop screens.',
    },
    {
      title: 'CROSS-DISCIPLINARY SYNERGY',
      icon: <Users className="w-5 h-5 text-[#007C8C] dark:text-cherenkov-glow" />,
      tag: 'TEAM COLLABORATION',
      desc: 'A seamless collaboration between engineering, product strategy, and visual design: Kunal leads full-stack engineering, Animesh directs product strategy, and Rajani refines the user experience.',
    },
  ];

  return (
    <section id="section-about" className="relative min-h-screen w-full px-6 sm:px-12 md:px-20 py-20 sm:py-28 flex flex-col justify-center">
      {/* Header */}
      <div className="max-w-4xl space-y-4 mb-16 relative p-4 sm:p-6 -m-4 sm:-m-6 rounded-3xl bg-gradient-to-r from-[#F4F1EA]/92 via-[#F4F1EA]/65 to-transparent dark:from-theme-base/80 dark:via-theme-base/40 dark:to-transparent">
        <div className="flex items-center space-x-3 text-xs font-mono text-[#3A4258] dark:text-[#8A91A6]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0B4DFF] dark:bg-cherenkov-glow animate-ping" />
          <span className="text-[#0E1220] dark:text-[#F2F4F8] font-bold tracking-widest">02 // ABOUT 404 REBELS</span>
          <span className="text-[#007C8C] dark:text-cherenkov-glow font-bold">| OUR FOCUS &amp; APPROACH</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-[#0E1220] dark:text-[#F2F4F8] tracking-tight">
          WHAT WE DO &amp;<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0E1220] via-[#003299] to-[#0B4DFF] dark:from-sky-300 dark:via-white dark:to-blue-500">
            HOW WE WORK.
          </span>
        </h2>
        <p className="text-base sm:text-lg font-sans text-[#3A4258] dark:text-[#B8BED0] max-w-2xl leading-relaxed">
          A dedicated three-member web development and design team. We create modern, fast, and scalable web applications, combining robust full-stack engineering with clean, accessible design.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mb-12">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            onMouseEnter={() => soundEngine.playHoverBlip(1300 + idx * 150)}
            className="group p-6 sm:p-8 rounded-xl bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border-subtle dark:border-white/10 hover:border-[#0B4DFF] dark:hover:border-cherenkov-glow/50 transition-all duration-300 shadow-ambient space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-lg bg-theme-surface-subtle border border-theme-border-subtle dark:border-white/10">
                {pillar.icon}
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-theme-surface-subtle border border-theme-border-subtle dark:border-white/10 text-[#007C8C] dark:text-cherenkov-glow">
                {pillar.tag}
              </span>
            </div>

            <h3 className="text-xl font-display font-extrabold text-[#0E1220] dark:text-[#F2F4F8] group-hover:text-[#0B4DFF] dark:group-hover:text-cherenkov-glow transition-colors">
              {pillar.title}
            </h3>

            <p className="text-xs sm:text-sm font-sans text-[#3A4258] dark:text-[#B8BED0] leading-relaxed">
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Core Principles Banner */}
      <div className="max-w-6xl p-6 sm:p-8 rounded-xl bg-theme-surface border border-theme-border-subtle dark:border-white/10 shadow-ambient space-y-3 font-mono">
        <div className="flex items-center space-x-2 text-xs text-[#007C8C] dark:text-cherenkov-glow font-bold uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-isotope" />
          <span>OUR WORKING PRINCIPLES</span>
        </div>
        <p className="text-xs sm:text-sm text-[#0E1220] dark:text-[#F2F4F8] leading-relaxed font-medium">
          "We believe in building software that is practical, clean, and reliable. No unnecessary fluff or bloated templates — just well-structured code, thoughtful design, and dependable results."
        </p>
      </div>
    </section>
  );
};
