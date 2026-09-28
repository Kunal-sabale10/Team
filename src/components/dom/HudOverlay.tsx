import React from 'react';
import { useScrollEngine } from '../../context/ScrollContext';
import { Volume2, VolumeX, Activity, Disc3, Users } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

export const HudOverlay: React.FC = () => {
  const {
    scrollProgress,
    currentBeat,
    scrollToBeat,
    lenisInstance,
    fps,
    drawCalls,
    isAudioMuted,
    toggleAudio,
    isUnlocked,
  } = useScrollEngine();

  if (!isUnlocked) return null;

  const waypoints = [
    { beat: 1, label: '01 IGNITION' },
    { beat: 2, label: '02 SPECIMENS' },
    { beat: 3, label: '03 TRIAD ARCH' },
    { beat: 4, label: '04 CONTACT' },
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
    <div className="fixed inset-0 z-40 pointer-events-none flex flex-col justify-between p-4 sm:p-8 font-mono text-xs select-none">
      {/* Top Telemetry Header Bar */}
      <div className="flex items-center justify-between w-full">
        {/* Brand / Role */}
        <div className="pointer-events-auto flex items-center space-x-3 bg-graphite-950/80 backdrop-blur-md px-3.5 py-2 rounded border border-graphite-800">
          <div className="w-2.5 h-2.5 rounded-full bg-cherenkov-glow animate-pulse" />
          <span className="text-offwhite font-bold tracking-widest text-[11px] sm:text-xs">
            HADRON // TRIAD
          </span>
          <span className="hidden lg:inline text-titanium text-[10px]">
            [KUNAL • ANIMESH • RAJANI]
          </span>
        </div>

        {/* Waypoints Navigation Dock */}
        <div className="hidden sm:flex pointer-events-auto items-center space-x-1 bg-graphite-950/80 backdrop-blur-md p-1 rounded border border-graphite-800">
          {waypoints.map((wp) => {
            const isActive = currentBeat === wp.beat;
            return (
              <button
                key={wp.beat}
                onClick={() => scrollToBeat(wp.beat)}
                onMouseEnter={() => soundEngine.playHoverBlip(1600)}
                className={`px-3 py-1.5 rounded text-[11px] tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cherenkov-blue text-white font-bold shadow-md shadow-cherenkov-blue/40'
                    : 'text-titanium hover:text-offwhite hover:bg-graphite-850'
                }`}
              >
                {wp.label}
              </button>
            );
          })}
        </div>

        {/* Right Tools: Audio Engine Toggle & FPS Telemetry */}
        <div className="pointer-events-auto flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-3 bg-graphite-950/80 backdrop-blur-md px-3 py-2 rounded border border-graphite-800 text-[11px] text-titanium">
            <span className="flex items-center gap-1.5 text-isotope">
              <Activity className="w-3.5 h-3.5" />
              {fps} FPS
            </span>
            <span className="text-graphite-700">|</span>
            <span className="text-cherenkov-glow">{drawCalls} DC</span>
          </div>

          <button
            onClick={toggleAudio}
            onMouseEnter={() => soundEngine.playHoverBlip(1800)}
            className="flex items-center space-x-2 bg-graphite-950/80 backdrop-blur-md px-3 py-2 rounded border border-graphite-800 hover:border-cherenkov-blue/60 text-offwhite transition-colors cursor-pointer"
            title={isAudioMuted ? 'Unmute Audio Engine' : 'Mute Audio Engine'}
          >
            {isAudioMuted ? (
              <VolumeX className="w-4 h-4 text-titanium" />
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-cherenkov-glow animate-pulse" />
                <span className="text-[10px] text-cherenkov-glow hidden sm:inline">DSP 48Hz</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Telemetry & Interactive Progress Gauge */}
      <div className="flex items-end justify-between w-full">
        {/* Telemetry Readout */}
        <div className="bg-graphite-950/80 backdrop-blur-md px-3.5 py-2 rounded border border-graphite-800 text-[10px] sm:text-[11px] text-titanium space-y-0.5">
          <div>PROGRESS: <span className="text-offwhite font-bold">{(scrollProgress * 100).toFixed(1)}%</span></div>
          <div className="hidden sm:block">COLLECTIVE: <span className="text-isotope font-semibold">3 SPECIALISTS</span></div>
        </div>

        {/* Interactive Scrubbable Progress Bar Line */}
        <div
          onClick={handleProgressTrackClick}
          onMouseEnter={() => soundEngine.playHoverBlip(1600)}
          className="pointer-events-auto flex-1 max-w-md mx-6 mb-2 hidden sm:block cursor-pointer group py-2"
          title="Click to scrub virtual scroll timeline"
        >
          <div className="w-full h-1 group-hover:h-2 bg-graphite-800 rounded-full overflow-hidden transition-all duration-200">
            <div
              className="h-full bg-gradient-to-r from-cherenkov-blue via-isotope to-cherenkov-glow transition-all duration-100"
              style={{ width: `${Math.max(2, scrollProgress * 100)}%` }}
            />
          </div>
        </div>

        {/* System Timecode & Status */}
        <div className="bg-graphite-950/80 backdrop-blur-md px-3.5 py-2 rounded border border-graphite-800 text-[10px] sm:text-[11px] text-titanium flex items-center space-x-2">
          <Disc3 className="w-3.5 h-3.5 text-cherenkov-glow animate-spin-slow" />
          <span>TRIAD ACCELERATOR</span>
        </div>
      </div>
    </div>
  );
};
