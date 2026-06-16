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
