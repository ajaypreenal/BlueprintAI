import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#06B6D4',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        ink: '#FFFFFF', // primary text
        paper: '#0F172A', // page background
        muted: '#94A3B8', // secondary text
        'border-soft': '#334155', // card/section borders
        'bg-dark': '#0F172A',
        'card-dark': '#1E293B',
      },
      backgroundColor: {
        dark: '#0F172A',
        'card': '#1E293B',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        serif: ['var(--font-source-serif)', 'Lora', 'Georgia', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
