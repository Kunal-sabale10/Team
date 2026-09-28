/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          base: 'var(--bg-base)',
          canvas: 'var(--bg-canvas)',
          surface: 'var(--bg-surface)',
          'surface-elevated': 'var(--bg-surface-elevated)',
          'surface-subtle': 'var(--bg-surface-subtle)',
          'text-main': 'var(--text-main)',
          'text-muted': 'var(--text-muted)',
          'text-dim': 'var(--text-dim)',
          accent: 'var(--accent-primary)',
          'accent-hover': 'var(--accent-hover)',
          'accent-secondary': 'var(--accent-secondary)',
          'accent-glow': 'var(--accent-glow)',
          'accent-success': 'var(--accent-success)',
          'border-subtle': 'var(--border-subtle)',
          'border-medium': 'var(--border-medium)',
          'border-accent': 'var(--border-accent)',
        },
        graphite: {
          950: '#060608',
          900: '#0a0a0c',
          850: '#111216',
          800: '#181a20',
          700: '#232630',
        },
        cherenkov: {
          glow: '#00f0ff',
          blue: '#0055ff',
          deep: '#002699',
          faint: 'rgba(0, 85, 255, 0.15)',
        },
        isotope: '#00ff88',
        titanium: '#8e94a0',
        offwhite: '#ededf0',
      },
      boxShadow: {
        'ambient': 'var(--shadow-ambient)',
        'elevated': 'var(--shadow-elevated)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        display: ['"Space Grotesk"', '"Syne"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
      }
    },
  },
  plugins: [],
}
