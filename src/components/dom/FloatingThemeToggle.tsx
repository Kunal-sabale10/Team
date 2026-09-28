import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

export const FloatingThemeToggle: React.FC = () => {
  const { isDark, toggleTheme, setTheme } = useTheme();

  return (
    <aside
      aria-label="Theme Switcher"
      className="fixed bottom-5 right-5 z-50 pointer-events-auto flex items-center font-mono select-none"
    >
      <div className="flex items-center p-1 rounded-full bg-theme-surface-elevated border border-theme-border-subtle shadow-2xl backdrop-blur-xl">
        {/* Light Option Button */}
        <button
          onClick={() => {
            soundEngine.playClickBeep();
            setTheme('light');
          }}
          onMouseEnter={() => soundEngine.playHoverBlip(1800)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
            !isDark
              ? 'bg-theme-accent text-white shadow-md shadow-blue-500/25'
              : 'text-theme-text-muted hover:text-theme-text-main'
          }`}
          title="Activate Light Mode"
        >
          <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-300 animate-spin-slow' : 'text-amber-500'}`} />
          <span>LIGHT</span>
        </button>

        {/* Dark Option Button */}
        <button
          onClick={() => {
            soundEngine.playClickBeep();
            setTheme('dark');
          }}
          onMouseEnter={() => soundEngine.playHoverBlip(1800)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
            isDark
              ? 'bg-cherenkov-blue text-white shadow-md shadow-cherenkov-blue/40'
              : 'text-theme-text-muted hover:text-theme-text-main'
          }`}
          title="Activate Dark Mode"
        >
          <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-200' : 'text-theme-accent'}`} />
          <span>DARK</span>
        </button>

        {/* Shortcut Badge */}
        <button
          onClick={() => {
            soundEngine.playClickBeep();
            toggleTheme();
          }}
          onMouseEnter={() => soundEngine.playHoverBlip(1600)}
          className="ml-1 mr-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-theme-surface-subtle border border-theme-border-subtle text-theme-text-dim hover:border-theme-accent cursor-pointer transition-colors"
          title="Press [T] on keyboard to toggle"
        >
          [T]
        </button>
      </div>
    </aside>
  );
};
