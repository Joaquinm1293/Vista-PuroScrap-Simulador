export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#16a34a',
          dark: '#15803d',
          light: '#22c55e',
          xlight: '#dcfce7',
          muted: '#bbf7d0',
        },
        accent: '#052e16',
        surface: {
          DEFAULT: '#ffffff',
          2: '#f7fef9',
        },
        danger: '#dc2626',
        success: '#16a34a',
      }
    },
  },
  plugins: [],
}