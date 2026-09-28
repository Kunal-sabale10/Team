import React, { useState, useEffect } from 'react';
import { useScrollEngine } from '../../context/ScrollContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Swords,
  Radio,
  Volume2,
  ArrowRight,
  RotateCcw,
  Users,
  Cpu,
  Sparkles,
  Palette,
  Sun,
  Moon,
  Zap,
} from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

export const Beat0LockScreen: React.FC = () => {
  const {
    isUnlocked,
    unlockExperience,
    isDueling,
    duelPhase,
    isGenesisRevealed,
    setIsGenesisRevealed,
    closeDuel,
  } = useScrollEngine();

  const { isDark, toggleTheme } = useTheme();
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [hasStartedFight, setHasStartedFight] = useState(false);

  // If user triggers duel via replay
  useEffect(() => {
    if (isDueling) {
      setHasStartedFight(true);
      setIsFadingOut(false);
    }
  }, [isDueling]);

  const handleStartDuel = () => {
    soundEngine.init();
    soundEngine.playClickBeep();
    setHasStartedFight(true);
    setIsGenesisRevealed(false);
  };

  const handleEnterPortfolio = () => {
    if (isFadingOut) return;
    soundEngine.init();
    soundEngine.playSubImpact();
    setIsFadingOut(true);
    closeDuel();
    unlockExperience();
  };

  const handleReplayDuel = () => {
    soundEngine.init();
    soundEngine.playClickBeep();
    setIsGenesisRevealed(false);
    setHasStartedFight(false);
    setTimeout(() => {
      setHasStartedFight(true);
    }, 150);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isUnlocked && !isFadingOut) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          if (!hasStartedFight) {
            handleStartDuel();
          } else if (isGenesisRevealed) {
            handleEnterPortfolio();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isUnlocked, isFadingOut, hasStartedFight, isGenesisRevealed]);

  // If completely unlocked and not explicitly in replay duel mode, hide
  if (isUnlocked && !isDueling) {
    return null;
  }

  // Phase text descriptor
  const getPhaseTelemetry = () => {
    switch (duelPhase) {
      case 'CLASH_1':
        return 'PHASE 01 // OVERHEAD TALWAR STRIKE DEFLECTED';
      case 'CLASH_2':
        return 'PHASE 02 // SPIN COUNTER & DOWNWARD PARRY';
      case 'FINAL_LOCK':
        return 'PHASE 03 // CROSSED TALWARS // PLASMA OVERLOAD';
      case 'DETONATION':
        return 'PHASE 04 // CRITICAL MASS FUSION SHOCKWAVE';
      case 'GENESIS':
        return 'PHASE 05 // 404 REBELS MONOLITH FORGED';
      default:
        return 'COMBAT STANDBY // 2 REBELS ARMED WITH TALWARS';
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-10 overflow-y-auto transition-all duration-1000 ${
        hasStartedFight && !isGenesisRevealed
          ? 'bg-transparent pointer-events-none'
          : 'bg-gradient-to-b from-theme-base/85 via-theme-base/60 to-theme-base/95 backdrop-blur-md pointer-events-auto'
      } text-theme-text-main ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Top Header Telemetry */}
      <div className="flex items-center justify-between border-b border-theme-border-subtle dark:border-white/10 pb-3 sm:pb-4 font-mono text-xs text-theme-text-muted dark:text-[#B8BED0] pointer-events-auto">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-theme-accent dark:bg-cherenkov-glow animate-ping" />
          <span className="text-theme-text-main dark:text-[#F2F4F8] font-bold tracking-widest text-[11px] sm:text-xs">
            404 REBELS // TALWAR DUEL ARENA
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden sm:flex items-center space-x-4 text-[11px] tracking-wider">
            <span className="text-[#00F0FF] font-semibold flex items-center gap-1">
              <Zap className="w-3 h-3" /> REBEL ALPHA
            </span>
            <span className="text-[#5B6478]">VS</span>
            <span className="text-[#FF9900] font-semibold flex items-center gap-1">
              <Zap className="w-3 h-3" /> REBEL BETA
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
          </button>
        </div>
      </div>

      {/* Main Center Stage Interface */}
      {/* 1. Pre-Fight Standby Screen */}
      {!hasStartedFight && (
        <div className="max-w-2xl mx-auto my-auto w-full text-center space-y-5 sm:space-y-7 py-6 pointer-events-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-theme-accent/40 bg-theme-surface-subtle text-theme-accent dark:border-cherenkov-blue/40 dark:bg-cherenkov-blue/15 dark:text-cherenkov-glow text-[10px] sm:text-xs font-mono tracking-widest uppercase">
            <Swords className="w-3.5 h-3.5 animate-pulse" />
            <span>3D TALWAR COMBAT ENGINE ONLINE</span>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-4xl sm:text-7xl md:text-8xl font-display font-extrabold tracking-tight text-theme-text-main dark:text-[#F2F4F8] leading-none">
              404<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-sky-300 dark:via-white dark:to-blue-500">
                REBELS
              </span>
            </h1>
            <p className="text-theme-text-muted dark:text-[#B8BED0] text-xs sm:text-base max-w-lg mx-auto font-mono leading-relaxed px-2">
              Two cyber-warriors clash with curved plasma Talwars. Out of their collision, the 404 Rebels collective is born.
            </p>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleStartDuel}
              onMouseEnter={() => soundEngine.playHoverBlip(1600)}
              className="group relative inline-flex items-center justify-center space-x-3 w-full sm:w-auto px-8 py-4 bg-theme-accent hover:opacity-95 dark:bg-cherenkov-blue dark:hover:bg-cherenkov-glow text-white dark:hover:text-graphite-950 font-mono text-xs sm:text-sm tracking-widest uppercase font-bold transition-all duration-300 rounded-lg shadow-xl shadow-blue-500/30 dark:shadow-cherenkov-blue/40 cursor-pointer min-h-[48px]"
            >
              <Swords className="w-4 h-4 animate-bounce" />
              <span>INITIATE REBEL DUEL</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleEnterPortfolio}
              onMouseEnter={() => soundEngine.playHoverBlip(1400)}
              className="inline-flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-4 bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border-subtle dark:border-white/10 text-theme-text-main dark:text-[#F2F4F8] font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold transition-all duration-300 rounded-lg cursor-pointer min-h-[48px]"
            >
              <span>SKIP TO PORTFOLIO</span>
            </button>
          </div>

          <p className="text-[11px] font-mono text-theme-text-dim dark:text-[#8A91A6]">
            Press [ENTER] or [SPACE] to ignite combat sequence
          </p>
        </div>
      )}

      {/* 2. In-Combat Floating Telemetry HUD */}
      {hasStartedFight && !isGenesisRevealed && (
        <div className="max-w-md mx-auto mb-10 w-full text-center space-y-2 pointer-events-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-mono text-xs tracking-wider font-bold shadow-2xl">
            <Swords className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>{getPhaseTelemetry()}</span>
          </div>
          <div>
            <button
              onClick={handleEnterPortfolio}
              className="text-[11px] font-mono text-white/70 hover:text-white underline cursor-pointer"
            >
              Skip fight &rarr;
            </button>
          </div>
        </div>
      )}

      {/* 3. Post-Fight Genesis Reveal Screen */}
      {isGenesisRevealed && (
        <div className="max-w-2xl mx-auto my-auto w-full text-center space-y-5 sm:space-y-7 py-4 pointer-events-auto animate-in fade-in zoom-in-95 duration-500">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-isotope text-[10px] sm:text-xs font-mono tracking-widest uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>GENESIS COMPLETE // 404 REBELS FORGED</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-theme-text-main dark:text-[#F2F4F8] tracking-tight">
              COLLECTIVE ACTIVATED
            </h2>
            <p className="text-theme-text-muted dark:text-[#B8BED0] text-xs sm:text-sm font-mono max-w-md mx-auto">
              Three specialists united across full-stack engineering, product strategy, and modern interactive design.
            </p>
          </div>

          {/* 3 Specialists Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 max-w-lg mx-auto text-left font-mono">
            <div className="p-2 sm:p-2.5 rounded-lg bg-theme-surface border border-theme-border-subtle dark:border-white/10 flex items-center space-x-2.5 shadow-ambient">
              <img src="/images/team/kunal.jpg" alt="Kunal Sabale" className="w-8 h-8 rounded-md object-cover object-top border border-theme-border-subtle shrink-0" />
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center space-x-1 text-theme-accent dark:text-cherenkov-glow text-[10px] font-bold">
                  <Cpu className="w-3 h-3 shrink-0" />
                  <span className="truncate">KUNAL</span>
                </div>
                <div className="text-[9px] text-theme-text-dim dark:text-[#8A91A6] truncate">FULL-STACK LEAD</div>
              </div>
            </div>

            <div className="p-2 sm:p-2.5 rounded-lg bg-theme-surface border border-theme-border-subtle dark:border-white/10 flex items-center space-x-2.5 shadow-ambient">
              <img src="/images/team/animesh.jpg" alt="Animesh Dabhade" className="w-8 h-8 rounded-md object-cover object-top border border-theme-border-subtle shrink-0" />
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center space-x-1 text-emerald-600 dark:text-isotope text-[10px] font-bold">
                  <Sparkles className="w-3 h-3 shrink-0" />
                  <span className="truncate">ANIMESH</span>
                </div>
                <div className="text-[9px] text-theme-text-dim dark:text-[#8A91A6] truncate">PRODUCT LEAD</div>
              </div>
            </div>

            <div className="p-2 sm:p-2.5 rounded-lg bg-theme-surface border border-theme-border-subtle dark:border-white/10 flex items-center space-x-2.5 shadow-ambient">
              <img src="/images/team/rajani.jpg" alt="Rajani Mourya" className="w-8 h-8 rounded-md object-cover object-top border border-theme-border-subtle shrink-0" />
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center space-x-1 text-theme-accent dark:text-cherenkov-glow text-[10px] font-bold">
                  <Palette className="w-3 h-3 shrink-0" />
                  <span className="truncate">RAJANI</span>
                </div>
                <div className="text-[9px] text-theme-text-dim dark:text-[#8A91A6] truncate">FRONTEND &amp; UI</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleEnterPortfolio}
              onMouseEnter={() => soundEngine.playHoverBlip(1600)}
              className="group relative inline-flex items-center justify-center space-x-3 w-full sm:w-auto px-8 py-4 bg-theme-accent hover:opacity-95 dark:bg-cherenkov-blue dark:hover:bg-cherenkov-glow text-white dark:hover:text-graphite-950 font-mono text-xs sm:text-sm tracking-widest uppercase font-bold transition-all duration-300 rounded-lg shadow-xl shadow-blue-500/30 dark:shadow-cherenkov-blue/40 cursor-pointer min-h-[48px]"
            >
              <Volume2 className="w-4 h-4" />
              <span>EXPLORE PORTFOLIO</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleReplayDuel}
              onMouseEnter={() => soundEngine.playHoverBlip(1400)}
              className="inline-flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-4 bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border-subtle dark:border-white/10 text-theme-text-main dark:text-[#F2F4F8] font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold transition-all duration-300 rounded-lg cursor-pointer min-h-[48px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>REPLAY DUEL</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Telemetry Footer */}
      <div className="flex items-center justify-between border-t border-theme-border-subtle dark:border-white/10 pt-4 font-mono text-xs text-theme-text-dim dark:text-[#8A91A6] pointer-events-auto">
        <span>404 REBELS: KUNAL • ANIMESH • RAJANI</span>
        <span className="hidden sm:inline">3D TALWAR KINEMATICS // 60 FPS</span>
        <span>LATENCY: 0.12MS</span>
      </div>
    </div>
  );
};
