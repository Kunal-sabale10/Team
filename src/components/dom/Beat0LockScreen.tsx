import React, { useState, useEffect } from 'react';
import { useScrollEngine } from '../../context/ScrollContext';
import { useTheme } from '../../context/ThemeContext';
import { ShieldAlert, Radio, Volume2, ArrowRight, Users, Cpu, Sparkles, Palette, Sun, Moon } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

export const Beat0LockScreen: React.FC = () => {
  const { isUnlocked, unlockExperience } = useScrollEngine();
  const { isDark, toggleTheme } = useTheme();
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
      className={`fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-12 overflow-y-auto transition-all duration-1000 bg-theme-base/95 backdrop-blur-2xl text-theme-text-main ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Top Protocol Telemetry Header */}
      <div className="flex items-center justify-between border-b border-theme-border-subtle dark:border-white/10 pb-3 sm:pb-4 font-mono text-xs text-theme-text-muted dark:text-[#B8BED0]">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-theme-accent dark:bg-cherenkov-glow animate-ping" />
          <span className="text-theme-text-main dark:text-[#F2F4F8] font-bold tracking-widest text-[11px] sm:text-xs">404 REBELS // PROTOCOL</span>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden sm:flex items-center space-x-6 text-[11px] tracking-wider">
            <span>TEAM: 3 MEMBERS ACTIVE</span>
            <span className="text-emerald-600 dark:text-isotope flex items-center gap-1.5 font-semibold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              ONLINE
            </span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => {
              soundEngine.playClickBeep();
              toggleTheme();
            }}
            onMouseEnter={() => soundEngine.playHoverBlip(1800)}
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-theme-surface border border-theme-border-subtle dark:border-white/10 text-theme-text-main dark:text-[#F2F4F8] hover:border-theme-accent text-xs cursor-pointer shadow-ambient transition-all"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode (Shortcut: T)`}
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-theme-accent" />}
            <span className="font-bold text-[10px] sm:text-[11px]">{isDark ? 'LIGHT' : 'DARK'}</span>
            <span className="text-[10px] text-theme-text-dim dark:text-[#8A91A6] hidden sm:inline">[T]</span>
          </button>
        </div>
      </div>

      {/* Center Initialization Terminal */}
      <div className="max-w-2xl mx-auto my-auto w-full text-center space-y-5 sm:space-y-8 py-4 sm:py-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded border border-theme-accent/30 bg-theme-surface-subtle text-theme-accent dark:border-cherenkov-blue/40 dark:bg-cherenkov-blue/10 dark:text-cherenkov-glow text-[10px] sm:text-xs font-mono tracking-widest uppercase">
          <Users className="w-3.5 h-3.5" />
          <span>404 Rebels Standby Matrix</span>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-4xl sm:text-7xl md:text-8xl font-display font-extrabold tracking-tight text-theme-text-main dark:text-[#F2F4F8] leading-none">
            404<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-sky-300 dark:via-white dark:to-blue-500">
              REBELS
            </span>
          </h1>
          <p className="text-theme-text-muted dark:text-[#B8BED0] text-xs sm:text-base max-w-md mx-auto font-mono leading-relaxed px-2">
            The collaborative web engineering and UI/UX design collective of Kunal Sabale, Animesh Dabhade, and Rajani Mourya.
          </p>
        </div>

        {/* 3 Node Micro Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 max-w-lg mx-auto text-left font-mono">
          <div className="p-2 sm:p-2.5 rounded-lg bg-theme-surface border border-theme-border-subtle dark:border-white/10 flex items-center space-x-2.5 shadow-ambient">
            <img src="/images/team/kunal.jpg" alt="Kunal Sabale" className="w-8 h-8 sm:w-9 sm:h-9 rounded-md object-cover object-top border border-theme-border-subtle dark:border-white/10 shrink-0" />
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center space-x-1 text-theme-accent dark:text-cherenkov-glow text-[10px]">
                <Cpu className="w-3 h-3 shrink-0" />
                <span className="font-bold truncate">KUNAL</span>
              </div>
              <div className="text-[9px] text-theme-text-dim dark:text-[#8A91A6] truncate">FULL-STACK LEAD</div>
            </div>
          </div>

          <div className="p-2 sm:p-2.5 rounded-lg bg-theme-surface border border-theme-border-subtle dark:border-white/10 flex items-center space-x-2.5 shadow-ambient">
            <img src="/images/team/animesh.jpg" alt="Animesh Dabhade" className="w-8 h-8 sm:w-9 sm:h-9 rounded-md object-cover object-top border border-theme-border-subtle dark:border-white/10 shrink-0" />
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center space-x-1 text-emerald-600 dark:text-isotope text-[10px]">
                <Sparkles className="w-3 h-3 shrink-0" />
                <span className="font-bold truncate">ANIMESH</span>
              </div>
              <div className="text-[9px] text-theme-text-dim dark:text-[#8A91A6] truncate">PRODUCT LEAD</div>
            </div>
          </div>

          <div className="p-2 sm:p-2.5 rounded-lg bg-theme-surface border border-theme-border-subtle dark:border-white/10 flex items-center space-x-2.5 shadow-ambient">
            <img src="/images/team/rajani.jpg" alt="Rajani Mourya" className="w-8 h-8 sm:w-9 sm:h-9 rounded-md object-cover object-top border border-theme-border-subtle dark:border-white/10 shrink-0" />
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center space-x-1 text-theme-accent dark:text-cherenkov-glow text-[10px]">
                <Palette className="w-3 h-3 shrink-0" />
                <span className="font-bold truncate">RAJANI</span>
              </div>
              <div className="text-[9px] text-theme-text-dim dark:text-[#8A91A6] truncate">FRONTEND &amp; UI</div>
            </div>
          </div>
        </div>

        {/* Calibration Progress Bar */}
        <div className="w-full max-w-xs mx-auto space-y-1.5 sm:space-y-2 px-4 sm:px-0">
          <div className="flex justify-between text-[10px] sm:text-[11px] font-mono text-theme-text-dim dark:text-[#8A91A6]">
            <span>SYSTEM CALIBRATION</span>
            <span className="text-theme-accent dark:text-cherenkov-glow font-bold">{Math.min(100, calibrationProgress)}%</span>
          </div>
          <div className="w-full h-1 bg-theme-border-subtle dark:bg-white/10 rounded overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-theme-accent via-indigo-600 to-sky-500 dark:from-cherenkov-blue dark:via-isotope dark:to-cherenkov-glow transition-all duration-200"
              style={{ width: `${Math.min(100, calibrationProgress)}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="px-4 sm:px-0">
          <button
            onClick={handleEngage}
            onMouseEnter={() => soundEngine.playHoverBlip(1600)}
            className="group relative inline-flex items-center justify-center space-x-3 sm:space-x-4 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-theme-accent hover:opacity-95 dark:bg-cherenkov-blue dark:hover:bg-cherenkov-glow text-white dark:hover:text-graphite-950 font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold transition-all duration-300 rounded shadow-lg shadow-blue-500/25 dark:shadow-cherenkov-blue/30 cursor-pointer overflow-hidden min-h-[48px]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Volume2 className="w-4 h-4 shrink-0" />
            <span className="relative z-10 font-bold">ENTER EXPERIENCE</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        </div>

        <p className="text-[10px] sm:text-[11px] font-mono text-theme-text-dim dark:text-[#8A91A6] flex items-center justify-center gap-1.5 px-2">
          <ShieldAlert className="w-3.5 h-3.5 text-theme-accent dark:text-cherenkov-glow shrink-0" />
          Tap or press [ENTER] to explore the portfolio
        </p>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="flex items-center justify-between border-t border-theme-border-subtle dark:border-white/10 pt-4 font-mono text-xs text-theme-text-dim dark:text-[#8A91A6]">
        <span>404 REBELS: KUNAL • ANIMESH • RAJANI</span>
        <span className="hidden sm:inline">60 / 120 FPS LOCK</span>
        <span>LATENCY: 0.12MS</span>
      </div>
    </div>
  );
};
