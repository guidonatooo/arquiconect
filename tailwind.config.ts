import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        'pink-baby': '#F4A7B9',
        'pink-dark': '#E8819A',
        'pink-light': '#FCD5DF',
        'blue-baby': '#A7C4F4',
        'blue-dark': '#7AAAE8',
        'blue-light': '#D4E6FB',
        cream: '#FDF6EC',
        'cream-dark': '#F5EDD8',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        nunito: ['Nunito', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'float-balloon': {
          '0%': { transform: 'translateY(110vh) rotate(-5deg)', opacity: '0' },
          '8%': { opacity: '1' },
          '92%': { opacity: '0.85' },
          '100%': { transform: 'translateY(-20vh) rotate(5deg)', opacity: '0' },
        },
        sway: {
          '0%, 100%': { marginLeft: '0px' },
          '25%': { marginLeft: '-18px' },
          '75%': { marginLeft: '18px' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-40px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(105vh) rotate(720deg)', opacity: '0' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.08)' },
          '70%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'score-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'float-balloon':
          'float-balloon var(--duration, 10s) ease-in-out var(--delay, 0s) infinite',
        sway: 'sway var(--sway-dur, 4s) ease-in-out infinite',
        'confetti-fall':
          'confetti-fall var(--duration, 4s) ease-in var(--delay, 0s) forwards',
        'bounce-in': 'bounce-in 0.65s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
        'fade-up': 'fade-up 0.5s ease-out both',
        'score-pulse': 'score-pulse 2s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
