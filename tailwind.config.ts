import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#07070b',
          900: '#0b0b12',
          800: '#10101a',
          700: '#171724',
          600: '#1f1f2e',
        },
        bone: '#f2ede6',
        sand: '#d8cbb8',
        violet: {
          glow: '#7b5cff',
          deep: '#3a2ea8',
        },
        azure: '#2f6bff',
      },
      fontFamily: {
        sans: ['var(--font-inter-tight)', 'system-ui', 'sans-serif'],
        display: ['var(--font-instrument)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.055em',
        mega: '-0.045em',
        wide2: '0.22em',
        wide3: '0.38em',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.16, 1, 0.3, 1)',
        editorial: 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-18px,0)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.45' },
          '50%': { opacity: '0.85' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        drift: 'drift 9s ease-in-out infinite',
        pulseGlow: 'pulseGlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
