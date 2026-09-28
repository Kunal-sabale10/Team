import React, { useState, useEffect } from 'react';
import { useScrollEngine, useScrollTelemetry } from '../../context/ScrollContext';
import { useTheme } from '../../context/ThemeContext';
import { Volume2, VolumeX, Activity, Sun, Moon, Disc3, Menu, X, Swords } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

export const HudOverlay: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDebug, setIsDebug] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('debug') === '1';
    }
    return false;
  });

  const telemetry = useScrollTelemetry();
  const {
    currentSection,
    scrollToSection,
    lenisInstance,
    isAudioMuted,
    toggleAudio,
    isUnlocked,
    startDuel,
  } = useScrollEngine();

  const { theme, toggleTheme, isDark } = useTheme();

  // Keyboard shortcut listener: Press [D] to toggle debug telemetry HUD
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'd' || e.key === 'D') {
        if (
          document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'TEXTAREA'
        ) {
          return;
        }
        setIsDebug((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        <div className="pointer-events-auto flex items-center space-x-2.5 bg-theme-surface backdrop-blur-md px-3.5 py-2 rounded-lg border border-theme-border-subtle shadow-ambient">
          <div className="w-2.5 h-2.5 rounded-full bg-theme-accent dark:bg-cherenkov-glow animate-pulse" />
          <span className="text-[#0E1220] dark:text-[#F2F4F8] font-bold tracking-widest text-[11px] sm:text-xs">
            404 REBELS
          </span>
          <span className="hidden xl:inline text-theme-text-dim dark:text-[#8A91A6] text-[10px] font-medium">
            [KUNAL • ANIMESH • RAJANI]
          </span>
        </div>

        {/* 6 Waypoints Navigation Dock */}
        <nav aria-label="Section Navigation" className="hidden md:flex pointer-events-auto items-center space-x-1 bg-theme-surface backdrop-blur-md p-1 rounded-lg border border-theme-border-subtle shadow-ambient">
          {waypoints.map((wp) => {
            const isActive = currentSection === wp.index;
            return (
              <button
                key={wp.index}
                onClick={() => scrollToSection(wp.index)}
                onMouseEnter={() => soundEngine.playHoverBlip(1600)}
                className={`px-3 py-1.5 rounded-md text-[11px] tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0B4DFF] dark:bg-cherenkov-blue text-white font-bold shadow-md shadow-blue-500/25 dark:shadow-cherenkov-blue/40'
                    : 'text-[#0E1220] dark:text-[#B8BED0] hover:text-[#0B4DFF] dark:hover:text-[#F2F4F8] hover:bg-theme-surface-subtle font-medium'
                }`}
              >
                {wp.label}
              </button>
            );
          })}
        </nav>

        {/* Right Tools: Theme Toggle, Audio Toggle & Optional Debug Telemetry */}
        <div className="pointer-events-auto flex items-center space-x-2">
          {/* Debug FPS / Draw Calls (Visible only when ?debug=1 or pressed [D]) */}
          {isDebug && (
            <div className="hidden lg:flex items-center space-x-2.5 bg-theme-surface backdrop-blur-md px-3 py-2 rounded-lg border border-theme-border-subtle text-[11px] text-theme-text-muted shadow-ambient animate-fade-in">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-isotope font-semibold">
                <Activity className="w-3.5 h-3.5" />
                {telemetry.fps} FPS
              </span>
              <span className="text-theme-border-subtle">|</span>
              <span className="text-theme-accent dark:text-cherenkov-glow font-bold">{telemetry.drawCalls} DC</span>
            </div>
          )}

          {/* 3D Talwar Duel Replay Button */}
          <button
            onClick={() => {
              soundEngine.playClickBeep();
              startDuel();
            }}
            onMouseEnter={() => soundEngine.playHoverBlip(1800)}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-600/15 via-cyan-500/15 to-transparent hover:from-blue-600/25 hover:to-cyan-500/25 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/40 hover:border-cyan-400 text-cyan-600 dark:text-cyan-300 font-bold transition-all cursor-pointer shadow-ambient"
            title="Watch 3D Talwar Duel & 404 Rebels Genesis"
          >
            <Swords className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
            <span className="text-[11px] font-mono hidden md:inline">3D DUEL</span>
          </button>

          {/* Theme Toggle Button [T] */}
          <button
            onClick={() => {
              soundEngine.playClickBeep();
              toggleTheme();
            }}
            onMouseEnter={() => soundEngine.playHoverBlip(1800)}
            className="flex items-center space-x-2 bg-theme-surface-elevated backdrop-blur-md px-3 py-1.5 rounded-lg border border-theme-border-subtle hover:border-theme-accent text-[#0E1220] dark:text-[#F2F4F8] transition-all cursor-pointer shadow-ambient group"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode (Shortcut: T)`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-[#0B4DFF] group-hover:-rotate-12 transition-transform" />
            )}
            <span className="text-[11px] font-bold font-mono hidden sm:inline text-[#0E1220] dark:text-[#F2F4F8]">
              {isDark ? 'DARK MODE' : 'LIGHT MODE'}
            </span>
            <span className="text-[10px] text-theme-text-dim dark:text-[#8A91A6] font-semibold">[T]</span>
          </button>

          {/* Audio Toggle Button [M] */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => soundEngine.playHoverBlip(1800)}
            className="flex items-center space-x-1.5 bg-theme-surface backdrop-blur-md px-3 py-2 rounded-lg border border-theme-border-subtle hover:border-theme-accent text-[#0E1220] dark:text-[#F2F4F8] transition-colors cursor-pointer shadow-ambient"
            title={`Toggle Audio DSP (Shortcut: M) - ${isAudioMuted ? 'Muted' : 'Active'}`}
          >
            {isAudioMuted ? (
              <VolumeX className="w-4 h-4 text-[#5B6478] dark:text-[#8A91A6]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#0B4DFF] dark:text-cherenkov-glow animate-pulse" />
            )}
            <span className="text-[10px] text-[#5B6478] dark:text-[#8A91A6] font-semibold hidden sm:inline">[M]</span>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => {
              soundEngine.playClickBeep();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            onMouseEnter={() => soundEngine.playHoverBlip(1600)}
            className="md:hidden flex items-center justify-center min-w-[40px] min-h-[40px] rounded-lg bg-theme-surface backdrop-blur-md px-2.5 py-2 border border-theme-border-subtle text-theme-text-main dark:text-[#F2F4F8] cursor-pointer shadow-ambient"
            aria-label="Toggle Navigation Menu"
            title="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-theme-accent dark:text-cherenkov-glow" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop & Modal */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm pointer-events-auto md:hidden animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="pointer-events-auto md:hidden absolute top-16 left-3 right-3 z-50 bg-theme-surface-elevated backdrop-blur-xl border border-theme-border-subtle rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-theme-border-subtle text-[11px] text-theme-text-dim">
              <span className="font-bold text-theme-text-main">404 REBELS // WAYPOINTS</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded text-theme-text-dim hover:text-theme-text-main"
                title="Close Menu"
              >
                <X className="w-4 h-4" />
              </button>
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
                    className={`p-3.5 rounded-xl text-left text-xs tracking-wider transition-all cursor-pointer flex flex-col justify-between min-h-[54px] ${
                      isActive
                        ? 'bg-theme-accent dark:bg-cherenkov-blue text-white font-bold shadow-md shadow-blue-500/20'
                        : 'bg-theme-surface-subtle text-theme-text-muted hover:bg-theme-surface hover:text-theme-text-main'
                    }`}
                  >
                    <span className="text-[10px] opacity-75 font-mono">0{wp.index} //</span>
                    <span className="font-bold font-mono text-[12px]">{wp.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile 3D Duel Launcher */}
            <div className="pt-2">
              <button
                onClick={() => {
                  soundEngine.playClickBeep();
                  setIsMobileMenuOpen(false);
                  startDuel();
                }}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-transparent border border-cyan-500/40 text-cyan-600 dark:text-cyan-300 font-bold font-mono text-xs cursor-pointer min-h-[44px]"
              >
                <Swords className="w-4 h-4 animate-bounce text-cyan-500" />
                <span>WATCH 3D TALWAR DUEL</span>
              </button>
            </div>

            {/* Quick Mobile Controls */}
            <div className="pt-3 border-t border-theme-border-subtle flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  soundEngine.playClickBeep();
                  toggleTheme();
                }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-theme-surface-subtle text-theme-text-main cursor-pointer min-h-[44px]"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-theme-accent" />}
                <span className="text-[11px] font-mono">{isDark ? 'LIGHT MODE' : 'DARK MODE'}</span>
              </button>

              <button
                onClick={toggleAudio}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-theme-surface-subtle text-theme-text-main cursor-pointer min-h-[44px]"
              >
                {isAudioMuted ? <VolumeX className="w-4 h-4 text-theme-text-dim" /> : <Volume2 className="w-4 h-4 text-theme-accent dark:text-cherenkov-glow" />}
                <span className="text-[11px] font-mono">{isAudioMuted ? 'MUTED' : 'AUDIO ON'}</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Bottom Telemetry & Interactive Progress Gauge */}
      <div className="flex items-end justify-between w-full pointer-events-none">
        {/* Telemetry Readout (Only visible in debug mode) */}
        {isDebug ? (
          <div className="pointer-events-auto bg-theme-surface backdrop-blur-md px-3.5 py-2 rounded-lg border border-theme-border-subtle text-[10px] sm:text-[11px] text-theme-text-muted space-y-0.5 shadow-ambient">
            <div>PROGRESS: <span className="text-theme-text-main dark:text-[#F2F4F8] font-bold">{(telemetry.scrollProgress * 100).toFixed(1)}%</span></div>
            <div className="hidden sm:block">SHORTCUTS: <span className="text-theme-accent dark:text-cherenkov-glow font-semibold">[1-6] JUMP • [T] THEME • [M] AUDIO • [D] HUD</span></div>
          </div>
        ) : (
          <div className="w-12 hidden md:block" />
        )}

        {/* Interactive Scrubbable Progress Bar Line (Slim, non-intrusive) */}
        <div
          onClick={handleProgressTrackClick}
          onMouseEnter={() => soundEngine.playHoverBlip(1600)}
          className="pointer-events-auto flex-1 max-w-lg mx-auto mb-2 hidden md:block cursor-pointer group py-2"
          title="Click to scrub virtual scroll timeline"
        >
          <div className="w-full h-1 group-hover:h-2 bg-slate-300 dark:bg-white/10 rounded-full overflow-hidden transition-all duration-200 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#0B4DFF] via-indigo-600 to-blue-500 dark:from-cherenkov-blue dark:via-isotope dark:to-cherenkov-glow transition-all duration-100"
              style={{ width: `${Math.max(2, telemetry.scrollProgress * 100)}%` }}
            />
          </div>
        </div>

        {/* System Timecode & Status (Only visible in debug mode) */}
        {isDebug ? (
          <div className="pointer-events-auto bg-theme-surface backdrop-blur-md px-3.5 py-2 rounded-lg border border-theme-border-subtle text-[10px] sm:text-[11px] text-theme-text-muted flex items-center space-x-2 shadow-ambient">
            <Disc3 className="w-3.5 h-3.5 text-theme-accent dark:text-cherenkov-glow animate-spin-slow" />
            <span className="text-theme-text-main dark:text-[#F2F4F8]">404 REBELS COLLECTIVE</span>
          </div>
        ) : (
          <div className="w-12 hidden md:block" />
        )}
      </div>
    </header>
  );
};
