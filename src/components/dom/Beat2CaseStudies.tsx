import React, { useState } from 'react';
import { CASE_STUDIES } from '../../data/caseStudies';
import { CaseStudy } from '../../types';
import { SpecimenModal } from './SpecimenModal';
import { soundEngine } from '../../audio/SoundEngine';
import { Zap, ArrowUpRight, Flame, Layers, Github, ExternalLink } from 'lucide-react';

export const Beat2CaseStudies: React.FC = () => {
  const [selectedSpecimen, setSelectedSpecimen] = useState<CaseStudy | null>(null);

  const handleOpenSpecimen = (specimen: CaseStudy) => {
    soundEngine.playSubImpact();
    setSelectedSpecimen(specimen);
  };

  return (
    <div className="relative min-h-[90vh] w-full px-6 sm:px-12 md:px-20 py-16 sm:py-24">
      {/* Section Header */}
      <div className="max-w-4xl space-y-4 mb-16">
        <div className="flex items-center space-x-3 text-xs font-mono text-titanium">
          <span className="w-2 h-2 rounded-full bg-cherenkov-glow animate-ping" />
          <span className="text-offwhite font-bold tracking-widest">BEAT 02 // GITHUB COLLISION CHAMBER</span>
          <span className="text-cherenkov-glow">| LIVE PRODUCTION SPECIMENS</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-offwhite tracking-tight">
          PRODUCED<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherenkov-glow to-cherenkov-blue">
            SPECIMENS.
          </span>
        </h2>
        <p className="text-sm sm:text-base font-mono text-titanium max-w-2xl leading-relaxed">
          Sourced directly from <a href="https://github.com/Kunal-sabale10?tab=repositories" target="_blank" rel="noreferrer" className="text-cherenkov-glow hover:underline">github.com/Kunal-sabale10</a>. Tested, architected, and designed collaboratively across the triad pipeline.
        </p>
      </div>

      {/* Grid of Case Studies / Specimens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
        {CASE_STUDIES.map((specimen) => (
          <div
            key={specimen.id}
            onClick={() => handleOpenSpecimen(specimen)}
            onMouseEnter={() => soundEngine.playHoverBlip(1200)}
            className="group relative rounded-lg bg-graphite-900/80 hover:bg-graphite-850/90 border border-graphite-800 hover:border-cherenkov-blue/70 p-6 sm:p-7 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cherenkov-blue/15 cursor-pointer backdrop-blur-sm overflow-hidden flex flex-col justify-between"
          >
            {/* Ambient Background Energy Sheen */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-cherenkov-blue/5 rounded-full blur-3xl group-hover:bg-cherenkov-blue/15 transition-all duration-500" />

            <div className="relative z-10 space-y-5">
              {/* Top Card Telemetry */}
              <div className="flex items-center justify-between font-mono text-xs text-titanium">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-graphite-800 text-offwhite font-bold text-[10px]">
                    SPECIMEN {specimen.index}
                  </span>
                  <span className="text-[10px] text-titanium font-mono">{specimen.year}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-cherenkov-glow text-[11px]">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{specimen.collisionEnergy}</span>
                </div>
              </div>

              {/* Title & Category */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono text-cherenkov-glow/80 uppercase tracking-wider">
                  {specimen.category}
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-offwhite group-hover:text-cherenkov-glow transition-colors">
                  {specimen.title}
                </h3>
                <p className="text-xs font-mono text-titanium line-clamp-2 leading-relaxed pt-1">
                  {specimen.description}
                </p>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                {specimen.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx} className="bg-graphite-950/70 p-2 rounded border border-graphite-800/80">
                    <div className="text-[8px] text-titanium uppercase">{m.label}</div>
                    <div className="text-[11px] font-bold text-offwhite">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Tech Stack & Action Trigger */}
            <div className="relative z-10 pt-4 mt-4 border-t border-graphite-800/80 font-mono text-xs flex items-center justify-between">
              <div className="flex items-center space-x-1.5 overflow-hidden text-titanium text-[10px]">
                <Github className="w-3.5 h-3.5 text-cherenkov-glow shrink-0" />
                <span className="truncate">{specimen.repoName}</span>
              </div>

              <div className="flex items-center space-x-1.5 text-cherenkov-glow font-bold group-hover:translate-x-1 transition-transform text-[11px]">
                <span>INSPECT</span>
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
    </div>
  );
};
