// ============================================================
// tailwind.config.ts
// ============================================================

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan:   '#00f5ff',
          pink:   '#ff006e',
          yellow: '#ffbe00',
          green:  '#39ff14',
        },
        game: {
          void:  '#020408',
          dark:  '#050c14',
          card:  '#0a1628',
          card2: '#0d1f35',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        mono:     ['Share Tech Mono', 'monospace'],
      },
      animation: {
        glitch:      'glitch 5s infinite',
        heroZoom:    'heroZoom 20s ease-in-out infinite alternate',
        loadingBar:  'loadingBar 1.2s linear infinite',
        fadeInUp:    'fadeInUp 0.5s ease both',
      },
      keyframes: {
        glitch: {
          '0%, 90%, 100%': { textShadow: '0 0 30px rgba(0,245,255,0.5)', clipPath: 'none', transform: 'none' },
          '91%': { textShadow: '2px 0 #ff006e, -2px 0 #00f5ff', clipPath: 'polygon(0 20%, 100% 20%, 100% 40%, 0 40%)', transform: 'translateX(-2px)' },
          '93%': { textShadow: '-2px 0 #ffbe00', clipPath: 'polygon(0 60%, 100% 60%, 100% 80%, 0 80%)', transform: 'translateX(2px)' },
          '95%': { clipPath: 'none', transform: 'none' },
        },
        heroZoom: {
          from: { transform: 'scale(1.05)' },
          to:   { transform: 'scale(1.12)' },
        },
        loadingBar: {
          from: { left: '-100%' },
          to:   { left: '100%' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'cyber-grid': `
          linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid-40': '40px 40px',
      },
    },
  },
  plugins: [],
}

export default config
