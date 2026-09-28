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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 dark:bg-graphite-950/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-theme-surface-elevated border border-theme-border-subtle dark:border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl font-mono text-theme-text-main dark:text-[#F2F4F8] space-y-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Telemetry */}
        <div className="flex items-center justify-between border-b border-theme-border-subtle dark:border-white/10 pb-4">
          <div className="flex items-center space-x-3 text-xs">
            <span className="px-2 py-0.5 rounded bg-theme-surface-subtle text-[#007C8C] dark:text-cherenkov-glow font-bold border border-theme-border-subtle dark:border-white/10">
              SPECIMEN #{specimen.index}
            </span>
            <span className="text-[#5B6478] dark:text-[#8A91A6] uppercase text-[11px] font-semibold">{specimen.category}</span>
          </div>

          <button
            onClick={handleClose}
            onMouseEnter={() => soundEngine.playHoverBlip(1800)}
            className="p-1.5 rounded-lg bg-theme-surface-subtle hover:bg-theme-surface text-[#0E1220] dark:text-[#B8BED0] hover:text-[#0B4DFF] dark:hover:text-[#F2F4F8] transition-colors cursor-pointer border border-theme-border-subtle dark:border-white/10"
            title="Press [Esc] to close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Collision Energy */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0E1220] dark:text-[#F2F4F8] tracking-tight">
              {specimen.title}
            </h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-theme-surface-subtle rounded-lg border border-theme-border-subtle dark:border-white/10 text-xs">
              <span className="text-[#5B6478] dark:text-[#8A91A6]">LEAD:</span>
              <span className="text-[#0B4DFF] dark:text-cherenkov-glow font-bold">{specimen.creator.toUpperCase()}</span>
            </div>
          </div>
          <p className="text-xs font-mono text-[#007C8C] dark:text-cherenkov-glow font-bold uppercase tracking-widest">
            {specimen.subtitle}
          </p>
        </div>

        {/* Description & Technical Summary */}
        <div className="bg-theme-surface-subtle p-5 rounded-xl border border-theme-border-subtle dark:border-white/10 text-[#0E1220] dark:text-[#F2F4F8] text-sm leading-relaxed space-y-2">
          <div className="text-[10px] text-[#007C8C] dark:text-cherenkov-glow font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3 h-3" />
            PROJECT OVERVIEW
          </div>
          <div>{specimen.description}</div>
        </div>

        {/* 404 Rebels Team Contributions */}
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-wider text-[#5B6478] dark:text-[#8A91A6] font-bold flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-[#007C8C] dark:text-cherenkov-glow" />
            404 REBELS TEAM CONTRIBUTIONS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-theme-surface-subtle border border-theme-border-subtle dark:border-white/10 space-y-1.5">
              <div className="flex items-center space-x-2 text-[#007C8C] dark:text-cherenkov-glow text-[11px]">
                <img src="/images/team/kunal.jpg" alt="Kunal Sabale" className="w-5 h-5 rounded-full object-cover object-top border border-theme-border-subtle shrink-0" />
                <span className="font-bold">KUNAL SABALE</span>
              </div>
              <div className="text-[11px] text-[#3A4258] dark:text-[#B8BED0] leading-tight font-medium">{specimen.contributions.builder}</div>
            </div>

            <div className="p-3 rounded-lg bg-theme-surface-subtle border border-theme-border-subtle dark:border-white/10 space-y-1.5">
              <div className="flex items-center space-x-2 text-emerald-700 dark:text-isotope text-[11px]">
                <img src="/images/team/animesh.jpg" alt="Animesh Dabhade" className="w-5 h-5 rounded-full object-cover object-top border border-theme-border-subtle shrink-0" />
                <span className="font-bold">ANIMESH DABHADE</span>
              </div>
              <div className="text-[11px] text-[#3A4258] dark:text-[#B8BED0] leading-tight font-medium">{specimen.contributions.ideator}</div>
            </div>

            <div className="p-3 rounded-lg bg-theme-surface-subtle border border-theme-border-subtle dark:border-white/10 space-y-1.5">
              <div className="flex items-center space-x-2 text-[#007C8C] dark:text-cherenkov-glow text-[11px]">
                <img src="/images/team/rajani.jpg" alt="Rajani Mourya" className="w-5 h-5 rounded-full object-cover object-top border border-theme-border-subtle shrink-0" />
                <span className="font-bold">RAJANI MOURYA</span>
              </div>
              <div className="text-[11px] text-[#3A4258] dark:text-[#B8BED0] leading-tight font-medium">{specimen.contributions.presenter}</div>
            </div>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-wider text-theme-text-dim dark:text-[#8A91A6] font-bold flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-theme-accent dark:text-cherenkov-glow" />
            KEY HIGHLIGHTS &amp; METRICS
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {specimen.metrics.map((m, idx) => (
              <div key={idx} className="bg-theme-surface-subtle p-3 rounded-lg border border-theme-border-subtle dark:border-white/10 space-y-1">
                <div className="text-[9px] text-theme-text-dim dark:text-[#8A91A6] uppercase tracking-wider">{m.label}</div>
                <div className="text-sm font-bold text-theme-text-main dark:text-[#F2F4F8] font-mono">{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Matrix */}
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-wider text-theme-text-dim dark:text-[#8A91A6] font-bold">TECHNOLOGY STACK</div>
          <div className="flex flex-wrap gap-2">
            {specimen.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded bg-theme-surface-subtle border border-theme-border-subtle dark:border-white/10 text-xs text-theme-text-muted dark:text-[#B8BED0] font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Outgoing Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-theme-border-subtle dark:border-white/10">
          <div className="flex items-center space-x-2 text-xs text-emerald-600 dark:text-isotope font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>VERIFIED GITHUB REPOSITORY</span>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={specimen.repoUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundEngine.playHoverBlip(1600)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-theme-surface-subtle hover:bg-theme-surface text-xs text-theme-text-main dark:text-[#F2F4F8] transition-colors border border-theme-border-subtle dark:border-white/10 font-semibold"
            >
              <Github className="w-4 h-4 text-theme-accent dark:text-cherenkov-glow" />
              <span>VIEW REPO</span>
            </a>
            {specimen.liveUrl && (
              <a
                href={specimen.liveUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundEngine.playHoverBlip(1600)}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-theme-accent hover:opacity-95 dark:bg-cherenkov-blue dark:hover:bg-cherenkov-glow text-xs text-white dark:hover:text-graphite-950 font-bold transition-all shadow-md shadow-blue-500/20"
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
