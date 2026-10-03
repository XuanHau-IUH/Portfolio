/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: ['0.875rem', '1.375rem'],
        sm: ['1rem', '1.625rem'],
        base: ['1.0625rem', '1.75rem'],
      },
      colors: {
        ink: { DEFAULT: '#061826', 2: '#0B2235', 3: '#12304A' },
        paper: { DEFAULT: '#F6F1E8', 2: '#EFE9DB' },
        accent: { DEFAULT: '#FF7A1A', hover: '#E8680A' },
        navy: {
          DEFAULT: '#0B2235',
          primary: '#0B2235',
          hover: '#12304A',
          light: '#1B4772',
          dark: '#061826',
          surface: '#102A43',
        },
        accentOrange: {
          DEFAULT: '#FF7A1A',
          hover: '#E8680A',
          light: '#FFF2E6',
          border: '#FFD4B2',
        },
        neutralText: {
          primary: '#102A43',
          secondary: '#627D98',
          border: '#D9E2EC',
          bg: '#F6F1E8',
          card: '#FFFFFF',
        },
        blueAccent: {
          DEFAULT: '#3B82C4',
          light: '#EBF4FC',
          hover: '#2A6FA8',
        },
        brand: {
          navy: '#0B2235',
          orange: '#FF7A1A',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'Arial', 'sans-serif'],
        display: ['"Sora"', '"Inter"', 'Arial', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'soft-orange': '0 10px 30px -5px rgba(255, 122, 0, 0.22)',
        'soft-navy': '0 12px 35px -8px rgba(14, 42, 71, 0.12)',
        'soft-lg': '0 20px 40px -15px rgba(16, 42, 67, 0.06)',
        'card-hover': '0 20px 35px -10px rgba(14, 42, 71, 0.08), 0 10px 15px -5px rgba(14, 42, 71, 0.04)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
