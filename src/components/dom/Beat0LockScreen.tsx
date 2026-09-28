import React, { useState, useEffect } from 'react';
import { useScrollEngine } from '../../context/ScrollContext';
import { ShieldAlert, Zap, Radio, Volume2, ArrowRight, Users, Cpu, Sparkles, Palette } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

export const Beat0LockScreen: React.FC = () => {
  const { isUnlocked, unlockExperience } = useScrollEngine();
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [calibrationProgress, setCalibrationProgress] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCalibrationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 140);
    return () => clearInterval(timer);
  }, []);

  const handleEngage = () => {
    if (isFadingOut || isUnlocked) return;
    setIsFadingOut(true);
    unlockExperience();
    setTimeout(() => {
      setIsMounted(false);
    }, 1100);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !isUnlocked && !isFadingOut) {
        e.preventDefault();
        handleEngage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isUnlocked, isFadingOut]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 transition-all duration-1000 bg-graphite-950/95 backdrop-blur-2xl ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Top Protocol Telemetry Header */}
      <div className="flex items-center justify-between border-b border-graphite-800/80 pb-4 font-mono text-xs text-titanium">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cherenkov-glow animate-ping" />
          <span className="text-offwhite font-bold tracking-widest">HADRON TRIAD // COLLECTIVE PROTOCOL</span>
        </div>
        <div className="hidden sm:flex items-center space-x-6 text-[11px] tracking-wider">
          <span>TRIAD NODES: 3 SYNCHRONIZED</span>
          <span>CHAMBER: 10⁻¹⁰ TORR</span>
          <span className="text-isotope flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            COLLECTIVE READY
          </span>
        </div>
      </div>

      {/* Center Initialization Terminal */}
      <div className="max-w-2xl mx-auto my-auto w-full text-center space-y-8 py-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded border border-cherenkov-blue/40 bg-cherenkov-blue/10 text-cherenkov-glow text-xs font-mono tracking-widest uppercase">
          <Users className="w-3.5 h-3.5" />
          <span>Triad Collective Engineering Standby</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-offwhite leading-none">
            HADRON<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherenkov-glow via-white to-cherenkov-blue">
              COLLECTIVE
            </span>
          </h1>
          <p className="text-titanium text-sm sm:text-base max-w-md mx-auto font-mono leading-relaxed">
            The collaborative creative engineering matrix of Kunal Sabale, Animesh Dabhade &amp; Rajani Mourya.
          </p>
        </div>

        {/* 3 Node Micro Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left font-mono">
          <div className="p-2.5 rounded bg-graphite-900/80 border border-graphite-800 space-y-1">
            <div className="flex items-center space-x-1.5 text-cherenkov-glow text-[10px]">
              <Cpu className="w-3 h-3" />
              <span className="font-bold">KUNAL SABALE</span>
            </div>
            <div className="text-[10px] text-titanium">THE BUILD // ARCHITECT</div>
          </div>

          <div className="p-2.5 rounded bg-graphite-900/80 border border-graphite-800 space-y-1">
            <div className="flex items-center space-x-1.5 text-isotope text-[10px]">
              <Sparkles className="w-3 h-3" />
              <span className="font-bold">ANIMESH DABHADE</span>
            </div>
            <div className="text-[10px] text-titanium">THE IDEA // STRATEGY</div>
          </div>

          <div className="p-2.5 rounded bg-graphite-900/80 border border-graphite-800 space-y-1">
            <div className="flex items-center space-x-1.5 text-cherenkov-glow text-[10px]">
              <Palette className="w-3 h-3" />
              <span className="font-bold">RAJANI MOURYA</span>
            </div>
            <div className="text-[10px] text-titanium">PRESENTATION &amp; DEV</div>
          </div>
        </div>

        {/* Calibration Progress Bar */}
        <div className="w-full max-w-xs mx-auto space-y-2">
          <div className="flex justify-between text-[11px] font-mono text-titanium">
            <span>TRIAD SYNCHRONIZATION</span>
            <span className="text-cherenkov-glow font-bold">{Math.min(100, calibrationProgress)}%</span>
          </div>
          <div className="w-full h-1 bg-graphite-800 rounded overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cherenkov-blue via-isotope to-cherenkov-glow transition-all duration-200"
              style={{ width: `${Math.min(100, calibrationProgress)}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={handleEngage}
            onMouseEnter={() => soundEngine.playHoverBlip(1600)}
            className="group relative inline-flex items-center space-x-4 px-8 py-4 bg-cherenkov-blue hover:bg-cherenkov-glow text-white hover:text-graphite-950 font-mono text-sm tracking-widest uppercase font-semibold transition-all duration-300 rounded shadow-lg shadow-cherenkov-blue/30 hover:shadow-cherenkov-glow/50 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Volume2 className="w-4 h-4" />
            <span className="relative z-10">INITIALIZE TRIAD &amp; AUDIO</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="text-[11px] font-mono text-titanium/80 flex items-center justify-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-cherenkov-glow" />
          Press [ENTER] or click to unlock collective 3D shader engine &amp; audio
        </p>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="flex items-center justify-between border-t border-graphite-800/80 pt-4 font-mono text-xs text-titanium">
        <span>COLLECTIVE: KUNAL • ANIMESH • RAJANI</span>
        <span className="hidden sm:inline">60 / 120 FPS SYNCHRONIZED TIER</span>
        <span>LATENCY: 0.12MS</span>
      </div>
    </div>
  );
};
