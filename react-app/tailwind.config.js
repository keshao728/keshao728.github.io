/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Pulled from the original site's palette
        brand: '#ff7abd',
        'brand-dark': '#8122c9',
        ink: '#32333c',
        muted: '#8a8fa3',
        'gray-bg': '#f1f1f1',
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
