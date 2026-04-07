/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          primary: 'var(--ink-primary)',
          secondary: 'var(--ink-secondary)',
          light: 'var(--ink-light)',
        },
        cinnabar: {
          DEFAULT: 'var(--cinnabar)',
          light: 'var(--cinnabar-light)',
          dark: 'var(--cinnabar-dark)',
          bg: 'var(--cinnabar-bg)',
        },
        gold: {
          DEFAULT: 'var(--gold)',
          light: 'var(--gold-light)',
          dark: 'var(--gold-dark)',
        },
        jade: {
          DEFAULT: 'var(--jade)',
          light: 'var(--jade-light)',
          bg: 'var(--jade-bg)',
        },
        paper: {
          DEFAULT: 'var(--bg-paper)',
          cream: 'var(--bg-cream)',
          warm: 'var(--bg-warm)',
        },
      },
      fontFamily: {
        title: ['var(--font-title)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        poetry: ['var(--font-poetry)', 'cursive'],
        classic: ['var(--font-classic)', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-in': 'bounceIn 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
