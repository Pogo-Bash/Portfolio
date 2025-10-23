/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base
        void: '#0a0a0f',
        slate: {
          850: '#1a1a2e',
          950: '#0f0f1e',
        },

        // Accents
        neon: {
          blue: '#00d4ff',
          purple: '#a855f7',
          indigo: '#6366f1',
        },

        // Bengali cultural gold
        gold: {
          DEFAULT: '#d4af37',
          light: '#f2e4c8',
          dark: '#5c3317',
        },

        // Genomics green
        gene: '#00ff9f',
      },

      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scatter': 'scatter 0.5s ease-out',
        'shake': 'shake 0.1s infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 212, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 1)' },
        },
        scatter: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: 0 },
          '100%': { transform: 'translate(var(--x), var(--y)) rotate(var(--r))', opacity: 1 },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
    },
  },
  plugins: [],
}
