/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Purple accent for the futuristic refresh
        brand: '#8b5cf6',
        'brand-dark': '#6d28d9',
        'brand-light': '#a78bfa',
        ink: '#1a1a2e',
        muted: '#8a8fa3',
        'gray-bg': '#f5f4fb',
      },
      boxShadow: {
        glow: '0 0 30px 0 rgba(139, 92, 246, 0.35)',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        marquee: 'marquee 30s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        float: 'float 6s ease-in-out infinite',
      },
      container: {
        center: true,
        padding: '1rem',
        // Cap the container slightly narrower than the default breakpoints so
        // the whole page reads a bit tighter.
        screens: {
          sm: '640px',
          md: '768px',
          lg: '960px',
          xl: '1080px',
          '2xl': '1140px',
        },
      },
    },
  },
  plugins: [],
}
