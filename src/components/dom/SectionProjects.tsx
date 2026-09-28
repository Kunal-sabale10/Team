import React, { useState, useMemo } from 'react';
import { CASE_STUDIES } from '../../data/caseStudies';
import { CaseStudy } from '../../types';
import { SpecimenModal } from './SpecimenModal';
import { soundEngine } from '../../audio/SoundEngine';
import { ArrowUpRight, CheckCircle2, Github, ExternalLink, UserCheck, Layers } from 'lucide-react';

type FilterType = 'all' | 'kunal-sabale' | 'animesh-dabhade' | 'rajani-mourya';

export const SectionProjects: React.FC = () => {
  const [selectedSpecimen, setSelectedSpecimen] = useState<CaseStudy | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return CASE_STUDIES;
    return CASE_STUDIES.filter((p) => p.creatorId === activeFilter);
  }, [activeFilter]);

  const handleOpenSpecimen = (specimen: CaseStudy) => {
    soundEngine.playSubImpact();
    setSelectedSpecimen(specimen);
  };

  const filterTabs: { id: FilterType; label: string; count: number }[] = [
    { id: 'all', label: 'ALL PROJECTS', count: CASE_STUDIES.length },
    { id: 'kunal-sabale', label: 'KUNAL SABALE', count: CASE_STUDIES.filter(p => p.creatorId === 'kunal-sabale').length },
    { id: 'animesh-dabhade', label: 'ANIMESH DABHADE', count: CASE_STUDIES.filter(p => p.creatorId === 'animesh-dabhade').length },
    { id: 'rajani-mourya', label: 'RAJANI MOURYA', count: CASE_STUDIES.filter(p => p.creatorId === 'rajani-mourya').length },
  ];

  return (
    <section id="section-projects" className="relative min-h-screen w-full px-6 sm:px-12 md:px-20 py-20 sm:py-28 flex flex-col justify-center">
      {/* Section Header */}
      <div className="max-w-4xl space-y-4 mb-10 relative p-4 sm:p-6 -m-4 sm:-m-6 rounded-3xl bg-gradient-to-r from-[#F4F1EA]/92 via-[#F4F1EA]/65 to-transparent dark:from-theme-base/80 dark:via-theme-base/40 dark:to-transparent">
        <div className="flex items-center space-x-3 text-xs font-mono text-[#3A4258] dark:text-[#8A91A6]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0B4DFF] dark:bg-cherenkov-glow animate-ping" />
          <span className="text-[#0E1220] dark:text-[#F2F4F8] font-bold tracking-widest">04 // PRODUCTION PORTFOLIO</span>
          <span className="text-[#007C8C] dark:text-cherenkov-glow font-bold">| PROJECT-WISE BREAKDOWN</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-[#0E1220] dark:text-[#F2F4F8] tracking-tight">
          CURATED<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0E1220] via-[#003299] to-[#0B4DFF] dark:from-sky-300 dark:via-white dark:to-blue-500">
            PROJECTS.
          </span>
        </h2>
        <p className="text-base sm:text-lg font-mono text-[#3A4258] dark:text-[#B8BED0] max-w-2xl leading-relaxed">
          Production web applications engineered and delivered by the 404 Rebels team — organized project-wise by lead developer and designer.
        </p>

        {/* Member-Wise Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-4 font-mono text-xs">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundEngine.playClickBeep();
                  setActiveFilter(tab.id);
                }}
                className={`px-3.5 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer flex items-center space-x-2 ${
                  isActive
                    ? 'bg-[#0B4DFF] dark:bg-cherenkov-blue text-white font-bold border-[#0B4DFF] dark:border-cherenkov-blue shadow-md'
                    : 'bg-theme-surface text-[#3A4258] dark:text-[#B8BED0] border-theme-border-subtle dark:border-white/10 hover:border-[#0B4DFF] dark:hover:border-cherenkov-glow hover:text-[#0E1220] dark:hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-theme-surface-subtle text-[#5B6478] dark:text-[#8A91A6]'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of 4 Projects (2x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl font-mono">
        {filteredProjects.map((specimen) => (
          <div
            key={specimen.id}
            onClick={() => handleOpenSpecimen(specimen)}
            onMouseEnter={() => soundEngine.playHoverBlip(1200)}
            className="group relative rounded-2xl bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border-subtle dark:border-white/10 hover:border-[#0B4DFF] dark:hover:border-cherenkov-glow/50 p-6 sm:p-8 transition-all duration-300 shadow-ambient hover:shadow-xl cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/5 dark:bg-cherenkov-blue/10 rounded-full blur-2xl group-hover:bg-blue-500/10 dark:group-hover:bg-cherenkov-blue/20 transition-all duration-500" />

            <div className="relative z-10 space-y-4">
              {/* Top Card Telemetry & Creator Badge */}
              <div className="flex items-center justify-between text-xs text-[#5B6478] dark:text-[#8A91A6]">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded bg-[#0B4DFF]/10 text-[#0B4DFF] dark:bg-cherenkov-blue/20 dark:text-cherenkov-glow border border-[#0B4DFF]/20 dark:border-cherenkov-blue/40 font-bold text-[11px] flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{specimen.creator.toUpperCase()}</span>
                  </span>
                  <span className="text-[11px] text-[#5B6478] dark:text-[#8A91A6] font-medium">{specimen.year}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[#007C8C] dark:text-cherenkov-glow text-[11px] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-isotope" />
                  <span>{specimen.collisionEnergy}</span>
                </div>
              </div>

              {/* Title & Category */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-mono text-[#007C8C] dark:text-cherenkov-glow uppercase tracking-wider font-bold">
                  {specimen.category}
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#0E1220] dark:text-[#F2F4F8] group-hover:text-[#0B4DFF] dark:group-hover:text-cherenkov-glow transition-colors">
                  {specimen.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#3A4258] dark:text-[#B8BED0] line-clamp-3 leading-relaxed pt-1">
                  {specimen.description}
                </p>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {specimen.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx} className="bg-theme-surface-subtle p-2.5 rounded-lg border border-theme-border-subtle dark:border-white/10">
                    <div className="text-[9px] text-[#5B6478] dark:text-[#8A91A6] uppercase font-bold tracking-wide">{m.label}</div>
                    <div className="text-xs sm:text-sm font-bold text-[#0E1220] dark:text-[#F2F4F8] mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {specimen.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] px-2.5 py-0.5 rounded bg-theme-surface-subtle border border-theme-border-subtle dark:border-white/10 text-[#007C8C] dark:text-cherenkov-glow font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Direct GitHub Link */}
            <div className="relative z-10 pt-4 mt-5 border-t border-theme-border-subtle dark:border-white/10 text-xs flex items-center justify-between">
              <a
                href={specimen.repoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => soundEngine.playHoverBlip(1600)}
                className="flex items-center space-x-1.5 overflow-hidden text-[#0E1220] dark:text-[#B8BED0] hover:text-[#0B4DFF] dark:hover:text-cherenkov-glow text-xs transition-colors p-1 -m-1 rounded hover:bg-theme-surface-subtle font-semibold"
                title={`Open ${specimen.repoName} on GitHub`}
              >
                <Github className="w-4 h-4 text-[#007C8C] dark:text-cherenkov-glow shrink-0" />
                <span className="truncate underline font-bold">{specimen.repoName}</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <div className="flex items-center space-x-1 text-[#0B4DFF] dark:text-cherenkov-glow font-bold group-hover:translate-x-1 transition-transform text-xs">
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
