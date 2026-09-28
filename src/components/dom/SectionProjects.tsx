import React, { useState } from 'react';
import { CASE_STUDIES } from '../../data/caseStudies';
import { CaseStudy } from '../../types';
import { SpecimenModal } from './SpecimenModal';
import { soundEngine } from '../../audio/SoundEngine';
import { ArrowUpRight, Flame, Github, ExternalLink, Sparkles } from 'lucide-react';

export const SectionProjects: React.FC = () => {
  const [selectedSpecimen, setSelectedSpecimen] = useState<CaseStudy | null>(null);

  const handleOpenSpecimen = (specimen: CaseStudy) => {
    soundEngine.playSubImpact();
    setSelectedSpecimen(specimen);
  };

  return (
    <section id="section-projects" className="relative min-h-screen w-full px-6 sm:px-12 md:px-20 py-20 sm:py-28 flex flex-col justify-center">
      {/* Section Header */}
      <div className="max-w-4xl space-y-4 mb-14">
        <div className="flex items-center space-x-3 text-xs font-mono text-slate-500 dark:text-titanium">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cherenkov-glow animate-ping" />
          <span className="text-slate-900 dark:text-offwhite font-bold tracking-widest">04 // PRODUCTION PROJECTS</span>
          <span className="text-blue-600 dark:text-cherenkov-glow">| LIVE WORK SPECIMENS</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-slate-900 dark:text-offwhite tracking-tight">
          CURATED<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-cherenkov-glow dark:to-cherenkov-blue">
            PROJECTS.
          </span>
        </h2>
        <p className="text-base sm:text-lg font-mono text-slate-600 dark:text-titanium max-w-2xl leading-relaxed">
          Six real production projects engineered by the team and sourced from <a href="https://github.com/Kunal-sabale10?tab=repositories" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-cherenkov-glow font-bold hover:underline">github.com/Kunal-sabale10</a>.
        </p>
      </div>

      {/* Grid of 6 Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl font-mono">
        {CASE_STUDIES.map((specimen) => (
          <div
            key={specimen.id}
            onClick={() => handleOpenSpecimen(specimen)}
            onMouseEnter={() => soundEngine.playHoverBlip(1200)}
            className="group relative rounded-xl bg-white/85 dark:bg-graphite-900/85 hover:bg-slate-50 dark:hover:bg-graphite-850/90 border border-slate-200 dark:border-graphite-800 hover:border-blue-500/70 dark:hover:border-cherenkov-blue/70 p-6 sm:p-7 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-cherenkov-blue/15 cursor-pointer backdrop-blur-md overflow-hidden flex flex-col justify-between"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/5 dark:bg-cherenkov-blue/10 rounded-full blur-2xl group-hover:bg-blue-500/10 dark:group-hover:bg-cherenkov-blue/20 transition-all duration-500" />

            <div className="relative z-10 space-y-4">
              {/* Top Card Telemetry */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-titanium">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-graphite-800 text-slate-800 dark:text-offwhite font-bold text-[10px]">
                    SPECIMEN {specimen.index}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-titanium">{specimen.year}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-blue-600 dark:text-cherenkov-glow text-[11px] font-semibold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{specimen.collisionEnergy}</span>
                </div>
              </div>

              {/* Title & Category */}
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-blue-600 dark:text-cherenkov-glow uppercase tracking-wider font-semibold">
                  {specimen.category}
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-offwhite group-hover:text-blue-600 dark:group-hover:text-cherenkov-glow transition-colors">
                  {specimen.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-titanium line-clamp-3 leading-relaxed pt-1">
                  {specimen.description}
                </p>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {specimen.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-graphite-950/70 p-2 rounded border border-slate-200/80 dark:border-graphite-800/80">
                    <div className="text-[8px] text-slate-400 dark:text-titanium uppercase">{m.label}</div>
                    <div className="text-[11px] font-bold text-slate-900 dark:text-offwhite">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {specimen.techStack.slice(0, 4).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[9px] px-2 py-0.5 rounded bg-blue-50/80 dark:bg-graphite-950/80 border border-blue-200/60 dark:border-graphite-800 text-blue-700 dark:text-cherenkov-glow font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Direct GitHub Link */}
            <div className="relative z-10 pt-4 mt-4 border-t border-slate-200 dark:border-graphite-800/80 text-xs flex items-center justify-between">
              <a
                href={specimen.repoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => soundEngine.playHoverBlip(1600)}
                className="flex items-center space-x-1.5 overflow-hidden text-slate-600 dark:text-titanium hover:text-blue-600 dark:hover:text-cherenkov-glow text-[10px] transition-colors p-1 -m-1 rounded hover:bg-slate-100 dark:hover:bg-graphite-800"
                title={`Open ${specimen.repoName} on GitHub`}
              >
                <Github className="w-3.5 h-3.5 text-blue-600 dark:text-cherenkov-glow shrink-0" />
                <span className="truncate underline font-bold">{specimen.repoName}</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <div className="flex items-center space-x-1 text-blue-600 dark:text-cherenkov-glow font-bold group-hover:translate-x-1 transition-transform text-[11px]">
                <span>VIEW SPECS</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Drawer */}
      <SpecimenModal
        specimen={selectedSpecimen}
        onClose={() => setSelectedSpecimen(null)}
      />
    </section>
  );
};
