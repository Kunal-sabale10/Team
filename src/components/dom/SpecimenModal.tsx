import React, { useEffect } from 'react';
import { CaseStudy } from '../../types';
import { X, ExternalLink, Github, Zap, ShieldCheck, Activity, Terminal, Users, Cpu, Sparkles, Palette } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';
import { useScrollEngine } from '../../context/ScrollContext';

interface SpecimenModalProps {
  specimen: CaseStudy | null;
  onClose: () => void;
}

export const SpecimenModal: React.FC<SpecimenModalProps> = ({ specimen, onClose }) => {
  const { lenisInstance } = useScrollEngine();

  useEffect(() => {
    if (specimen) {
      lenisInstance?.stop();
    } else {
      lenisInstance?.start();
    }
    return () => {
      lenisInstance?.start();
    };
  }, [specimen, lenisInstance]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && specimen) {
        soundEngine.playClickBeep();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [specimen, onClose]);

  if (!specimen) return null;

  const handleClose = () => {
    soundEngine.playClickBeep();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-graphite-950/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-graphite-900 border border-cherenkov-blue/50 rounded-lg p-6 sm:p-10 shadow-2xl shadow-cherenkov-blue/20 font-mono text-offwhite space-y-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Telemetry */}
        <div className="flex items-center justify-between border-b border-graphite-800 pb-4">
          <div className="flex items-center space-x-3 text-xs">
            <span className="px-2 py-0.5 rounded bg-cherenkov-blue/25 text-cherenkov-glow font-bold">
              SPECIMEN #{specimen.index}
            </span>
            <span className="text-titanium uppercase text-[11px]">{specimen.category}</span>
          </div>

          <button
            onClick={handleClose}
            onMouseEnter={() => soundEngine.playHoverBlip(1800)}
            className="p-1.5 rounded bg-graphite-850 hover:bg-graphite-800 text-titanium hover:text-white transition-colors cursor-pointer border border-graphite-700/60"
            title="Press [Esc] to close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Collision Energy */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-offwhite tracking-tight">
              {specimen.title}
            </h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-graphite-850 rounded border border-graphite-700 text-xs">
              <Zap className="w-3.5 h-3.5 text-cherenkov-glow" />
              <span className="text-titanium">COLLISION ENERGY:</span>
              <span className="text-cherenkov-glow font-bold">{specimen.collisionEnergy}</span>
            </div>
          </div>
          <p className="text-sm font-mono text-cherenkov-glow/90 uppercase tracking-widest">
            {specimen.subtitle}
          </p>
        </div>

        {/* Description & Technical Summary */}
        <div className="bg-graphite-850/70 p-5 rounded border border-graphite-800 text-titanium text-sm leading-relaxed space-y-2">
          <div className="text-[10px] text-cherenkov-glow uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3 h-3" />
            SPECIMEN ANALYSIS
          </div>
          <div>{specimen.description}</div>
        </div>

        {/* Triad Team Contributions */}
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-wider text-titanium flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-cherenkov-glow" />
            TRIAD TEAM ATTRIBUTION
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded bg-graphite-950 border border-graphite-800 space-y-1">
              <div className="flex items-center space-x-1.5 text-cherenkov-glow text-[10px]">
                <Cpu className="w-3 h-3" />
                <span className="font-bold">KUNAL (BUILD)</span>
              </div>
              <div className="text-[11px] text-titanium leading-tight">{specimen.contributions.builder}</div>
            </div>

            <div className="p-3 rounded bg-graphite-950 border border-graphite-800 space-y-1">
              <div className="flex items-center space-x-1.5 text-isotope text-[10px]">
                <Sparkles className="w-3 h-3" />
                <span className="font-bold">ANIMESH (IDEA)</span>
              </div>
              <div className="text-[11px] text-titanium leading-tight">{specimen.contributions.ideator}</div>
            </div>

            <div className="p-3 rounded bg-graphite-950 border border-graphite-800 space-y-1">
              <div className="flex items-center space-x-1.5 text-cherenkov-glow text-[10px]">
                <Palette className="w-3 h-3" />
                <span className="font-bold">RAJANI (DEV)</span>
              </div>
              <div className="text-[11px] text-titanium leading-tight">{specimen.contributions.presenter}</div>
            </div>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-wider text-titanium flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-cherenkov-glow" />
            BENCHMARK TELEMETRY SPECS
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {specimen.metrics.map((m, idx) => (
              <div key={idx} className="bg-graphite-950 p-3 rounded border border-graphite-800 space-y-1">
                <div className="text-[9px] text-titanium uppercase tracking-wider">{m.label}</div>
                <div className="text-sm font-bold text-offwhite font-mono">{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Matrix */}
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-wider text-titanium">SYSTEM COMPILER MATRIX</div>
          <div className="flex flex-wrap gap-2">
            {specimen.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded bg-graphite-950 border border-graphite-800 text-xs text-titanium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Outgoing Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-graphite-800">
          <div className="flex items-center space-x-2 text-xs text-isotope">
            <ShieldCheck className="w-4 h-4" />
            <span>VERIFIED GITHUB REPOSITORY</span>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={specimen.repoUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundEngine.playHoverBlip(1600)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded bg-graphite-800 hover:bg-graphite-700 text-xs text-offwhite transition-colors border border-graphite-700"
            >
              <Github className="w-4 h-4 text-cherenkov-glow" />
              <span>VIEW REPO ON GITHUB</span>
            </a>
            {specimen.liveUrl && (
              <a
                href={specimen.liveUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundEngine.playHoverBlip(1600)}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded bg-cherenkov-blue hover:bg-cherenkov-glow hover:text-graphite-950 text-xs text-white font-bold transition-all shadow-md shadow-cherenkov-blue/30"
              >
                <span>OPEN PROJECT</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
