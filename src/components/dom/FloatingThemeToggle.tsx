import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

export const FloatingThemeToggle: React.FC = () => {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <aside
      aria-label="Theme Switcher"
      className="fixed bottom-5 right-5 z-50 pointer-events-auto flex items-center font-mono select-none"
    >
      <button
        onClick={() => {
          soundEngine.playClickBeep();
          toggleTheme();
        }}
        onMouseEnter={() => soundEngine.playHoverBlip(1800)}
        className="group relative flex items-center space-x-2.5 px-3.5 py-2.5 rounded-full bg-white/95 dark:bg-graphite-900/95 text-slate-800 dark:text-offwhite border border-slate-300 dark:border-graphite-700 hover:border-blue-500 dark:hover:border-cherenkov-glow shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-cherenkov-glow/20 backdrop-blur-xl transition-all duration-300 cursor-pointer active:scale-95"
        title={`Toggle Light/Dark Theme (Shortcut: T) - Currently ${theme.toUpperCase()}`}
      >
        {/* Animated Icon */}
        <div className="p-1 rounded-full bg-slate-100 dark:bg-graphite-950 border border-slate-200 dark:border-graphite-800 flex items-center justify-center">
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-500 group-hover:rotate-90 transition-transform duration-300" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600 group-hover:-rotate-45 transition-transform duration-300" />
          )}
        </div>

        {/* Text Mode Label */}
        <span className="text-xs font-bold tracking-wider">
          {isDark ? 'LIGHT MODE' : 'DARK MODE'}
        </span>

        {/* Keyboard Shortcut Pill */}
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-graphite-950 border border-slate-200 dark:border-graphite-800 text-slate-400 dark:text-titanium">
          T
        </span>
      </button>
    </aside>
  );
};
