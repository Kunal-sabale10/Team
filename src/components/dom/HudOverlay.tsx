import React, { useState } from 'react';
import { useScrollEngine } from '../../context/ScrollContext';
import { useTheme } from '../../context/ThemeContext';
import { Volume2, VolumeX, Activity, Sun, Moon, Disc3, Menu, X } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

export const HudOverlay: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    scrollProgress,
    currentSection,
    scrollToSection,
    lenisInstance,
    fps,
    drawCalls,
    isAudioMuted,
    toggleAudio,
    isUnlocked,
  } = useScrollEngine();

  const { theme, toggleTheme, isDark } = useTheme();

  if (!isUnlocked) return null;

  const waypoints = [
    { index: 1, label: 'HERO' },
    { index: 2, label: 'ABOUT' },
    { index: 3, label: 'TEAM' },
    { index: 4, label: 'PROJECTS' },
    { index: 5, label: 'SKILLS' },
    { index: 6, label: 'CONTACT' },
  ];

  const handleProgressTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!lenisInstance) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickFraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const maxScroll = lenisInstance.limit || (document.documentElement.scrollHeight - window.innerHeight);
    soundEngine.playClickBeep();
    lenisInstance.scrollTo(clickFraction * maxScroll, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <header className="fixed inset-0 z-40 pointer-events-none flex flex-col justify-between p-3 sm:p-6 font-mono text-xs select-none">
      {/* Top Telemetry Header Bar */}
      <div className="flex items-center justify-between w-full gap-2">
        {/* Brand / Role */}
        <div className="pointer-events-auto flex items-center space-x-2.5 bg-white/85 dark:bg-graphite-950/85 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-200 dark:border-graphite-800 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cherenkov-glow animate-pulse" />
          <span className="text-slate-900 dark:text-offwhite font-bold tracking-widest text-[11px] sm:text-xs">
            HADRON TRIAD
          </span>
          <span className="hidden xl:inline text-slate-400 dark:text-titanium text-[10px]">
            [KUNAL • ANIMESH • RAJANI]
          </span>
        </div>

        {/* 6 Waypoints Navigation Dock */}
        <nav aria-label="Section Navigation" className="hidden md:flex pointer-events-auto items-center space-x-1 bg-white/85 dark:bg-graphite-950/85 backdrop-blur-md p-1 rounded-lg border border-slate-200 dark:border-graphite-800 shadow-sm">
          {waypoints.map((wp) => {
            const isActive = currentSection === wp.index;
            return (
              <button
                key={wp.index}
                onClick={() => scrollToSection(wp.index)}
                onMouseEnter={() => soundEngine.playHoverBlip(1600)}
                className={`px-3 py-1.5 rounded-md text-[11px] tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 dark:bg-cherenkov-blue text-white font-bold shadow-md shadow-blue-500/30 dark:shadow-cherenkov-blue/40'
                    : 'text-slate-600 dark:text-titanium hover:text-slate-900 dark:hover:text-offwhite hover:bg-slate-100 dark:hover:bg-graphite-850'
                }`}
              >
                {wp.label}
              </button>
            );
          })}
        </nav>

        {/* Right Tools: Theme Toggle, Audio Toggle & FPS Telemetry */}
        <div className="pointer-events-auto flex items-center space-x-2">
          {/* Real-time FPS / Draw Calls */}
          <div className="hidden lg:flex items-center space-x-2.5 bg-white/85 dark:bg-graphite-950/85 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-200 dark:border-graphite-800 text-[11px] text-slate-600 dark:text-titanium shadow-sm">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-isotope font-semibold">
              <Activity className="w-3.5 h-3.5" />
              {fps} FPS
            </span>
            <span className="text-slate-300 dark:text-graphite-700">|</span>
            <span className="text-blue-600 dark:text-cherenkov-glow font-bold">{drawCalls} DC</span>
          </div>

          {/* Theme Toggle Button [T] */}
          <button
            onClick={() => {
              soundEngine.playClickBeep();
              toggleTheme();
            }}
            onMouseEnter={() => soundEngine.playHoverBlip(1800)}
            className="flex items-center space-x-2 bg-white/90 dark:bg-graphite-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-300 dark:border-graphite-800 hover:border-blue-500 dark:hover:border-cherenkov-blue text-slate-800 dark:text-offwhite transition-all cursor-pointer shadow-sm group"
            title={`Click or press [T] to switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 group-hover:-rotate-12 transition-transform" />
            )}
            <span className="text-[11px] font-bold font-mono hidden sm:inline">
              {isDark ? 'DARK MODE' : 'LIGHT MODE'}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-titanium">[T]</span>
          </button>

          {/* Audio Toggle Button [M] */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => soundEngine.playHoverBlip(1800)}
            className="flex items-center space-x-1.5 bg-white/85 dark:bg-graphite-950/85 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-200 dark:border-graphite-800 hover:border-blue-500 dark:hover:border-cherenkov-blue/60 text-slate-800 dark:text-offwhite transition-colors cursor-pointer shadow-sm"
            title={`Toggle Audio DSP (Shortcut: M) - ${isAudioMuted ? 'Muted' : 'Active'}`}
          >
            {isAudioMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400 dark:text-titanium" />
            ) : (
              <Volume2 className="w-4 h-4 text-blue-600 dark:text-cherenkov-glow animate-pulse" />
            )}
            <span className="text-[10px] text-slate-500 dark:text-titanium hidden sm:inline">[M]</span>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => {
              soundEngine.playClickBeep();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            onMouseEnter={() => soundEngine.playHoverBlip(1600)}
            className="md:hidden flex items-center justify-center p-2 rounded-lg bg-white/85 dark:bg-graphite-950/85 backdrop-blur-md px-2.5 py-2 border border-slate-200 dark:border-graphite-800 text-slate-800 dark:text-offwhite cursor-pointer shadow-sm"
            aria-label="Toggle Navigation Menu"
            title="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-blue-600 dark:text-cherenkov-glow" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Modal */}
      {isMobileMenuOpen && (
        <div className="pointer-events-auto md:hidden absolute top-16 left-3 right-3 z-50 bg-white/95 dark:bg-graphite-950/95 backdrop-blur-xl border border-slate-200 dark:border-graphite-800 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-graphite-800 text-[11px] text-slate-500 dark:text-titanium">
            <span className="font-bold text-slate-900 dark:text-offwhite">HADRON TRIAD // WAYPOINTS</span>
            <span className="text-[10px] bg-blue-50 dark:bg-graphite-900 px-2 py-0.5 rounded text-blue-600 dark:text-cherenkov-glow font-bold">6 SECTIONS</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {waypoints.map((wp) => {
              const isActive = currentSection === wp.index;
              return (
                <button
                  key={wp.index}
                  onClick={() => {
                    soundEngine.playClickBeep();
                    scrollToSection(wp.index);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-xl text-left text-xs tracking-wider transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-blue-600 dark:bg-cherenkov-blue text-white font-bold shadow-md shadow-blue-500/30'
                      : 'bg-slate-100/90 dark:bg-graphite-900/90 text-slate-700 dark:text-titanium hover:bg-slate-200 dark:hover:bg-graphite-850'
                  }`}
                >
                  <span className="text-[10px] opacity-75 font-mono">0{wp.index} //</span>
                  <span className="font-bold font-mono text-[12px]">{wp.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Mobile Controls */}
          <div className="pt-3 border-t border-slate-200 dark:border-graphite-800 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                soundEngine.playClickBeep();
                toggleTheme();
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-graphite-900 text-slate-800 dark:text-offwhite cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              <span className="text-[11px] font-mono">{isDark ? 'LIGHT MODE' : 'DARK MODE'}</span>
            </button>

            <button
              onClick={toggleAudio}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-graphite-900 text-slate-800 dark:text-offwhite cursor-pointer"
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-blue-600 dark:text-cherenkov-glow" />}
              <span className="text-[11px] font-mono">{isAudioMuted ? 'MUTED' : 'AUDIO ON'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Telemetry & Interactive Progress Gauge */}
      <div className="flex items-end justify-between w-full">
        {/* Telemetry Readout */}
        <div className="bg-white/85 dark:bg-graphite-950/85 backdrop-blur-md px-3.5 py-2 rounded-lg border border-slate-200 dark:border-graphite-800 text-[10px] sm:text-[11px] text-slate-600 dark:text-titanium space-y-0.5 shadow-sm">
          <div>PROGRESS: <span className="text-slate-900 dark:text-offwhite font-bold">{(scrollProgress * 100).toFixed(1)}%</span></div>
          <div className="hidden sm:block">DEMO SHORTCUTS: <span className="text-blue-600 dark:text-cherenkov-glow font-semibold">[1-6] JUMP • [T] THEME • [M] AUDIO</span></div>
        </div>

        {/* Interactive Scrubbable Progress Bar Line */}
        <div
          onClick={handleProgressTrackClick}
          onMouseEnter={() => soundEngine.playHoverBlip(1600)}
          className="pointer-events-auto flex-1 max-w-md mx-6 mb-2 hidden md:block cursor-pointer group py-2"
          title="Click to scrub virtual scroll timeline"
        >
          <div className="w-full h-1 group-hover:h-2 bg-slate-200 dark:bg-graphite-800 rounded-full overflow-hidden transition-all duration-200 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 dark:from-cherenkov-blue dark:via-isotope dark:to-cherenkov-glow transition-all duration-100"
              style={{ width: `${Math.max(2, scrollProgress * 100)}%` }}
            />
          </div>
        </div>

        {/* System Timecode & Status */}
        <div className="bg-white/85 dark:bg-graphite-950/85 backdrop-blur-md px-3.5 py-2 rounded-lg border border-slate-200 dark:border-graphite-800 text-[10px] sm:text-[11px] text-slate-600 dark:text-titanium flex items-center space-x-2 shadow-sm">
          <Disc3 className="w-3.5 h-3.5 text-blue-600 dark:text-cherenkov-glow animate-spin-slow" />
          <span>TRIAD COLLECTIVE</span>
        </div>
      </div>
    </header>
  );
};
