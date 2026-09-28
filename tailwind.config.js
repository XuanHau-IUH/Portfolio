/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#faf7ff',
          100: '#f3ecfe',
          200: '#e7d9fd',
          300: '#d1b8fa',
          400: '#b18cf6',
          500: '#905bf0',
          600: '#7c3aed',
          700: '#6927d8',
          800: '#561fb5',
          900: '#471a93',
          dark: '#0f172a',
          navy: '#111827',
          deep: '#0b0f19',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft-purple': '0 10px 40px -10px rgba(124, 58, 237, 0.12)',
        'soft-lg': '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 25px 50px -12px rgba(124, 58, 237, 0.18)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
