/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "gradient-slow": "gradient 12s ease infinite",
      },
      colors: {
        // foco em tons de verde para sustentabilidade e melhoria de processos
        primary: {
          500: '#22c55e', // verde vibrante (legível em fundos claros)
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // variação complementar (emerald/teal) para contrastes e elementos secundários
        secondary: {
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // cor de destaque (accent) usada para chamadas de atenção
        accent: {
          500: '#f59e0b',
          600: '#d97706',
        },
        // tons neutros para superfícies, textos e contraste
        neutral: {
          50: '#f9faf9',
          100: '#f3f7f2',
          200: '#e6efe4',
          300: '#cfe0c9',
          400: '#9fc091',
          500: '#68a162',
          600: '#4e7a46',
          700: '#34532f',
          800: '#243d23',
          900: '#0f1f12',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        neumorphic: '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
    },
  },
  plugins: [],
}
