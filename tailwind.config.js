/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aroham: {
          dark: '#0B3B2C',
          darker: '#07281E',
          forest: '#134E3A',
          pine: '#1A5D47',
          mint: '#EBF4F0',
          sage: '#F0F6F2',
          cream: '#F4F8F5',
          terracotta: '#94301B',
          'terracotta-dark': '#7C2614',
          'terracotta-light': '#FCEEEB',
          amber: '#F5A623',
          gold: '#E09419',
          'amber-light': '#FEF3DC',
          'gold-gradient-start': '#FDE8C4',
          'gold-gradient-end': '#F9CD7E',
          heading: '#0D2B22',
          body: '#4A6056',
          muted: '#768E83',
          border: '#E1ECE6',
          'border-dark': '#C6D9CE'
        }
      },
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'],
        serif: ['"Montserrat"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(11, 59, 44, 0.05), 0 2px 6px -1px rgba(11, 59, 44, 0.03)',
        'elevated': '0 12px 32px -4px rgba(11, 59, 44, 0.08), 0 4px 12px -2px rgba(11, 59, 44, 0.04)',
        'glow': '0 0 25px rgba(245, 166, 35, 0.25)',
        'popup': '0 20px 40px -8px rgba(11, 59, 44, 0.12), 0 8px 16px -4px rgba(11, 59, 44, 0.06)',
      },
      animation: {
        'popup': 'popupIn 0.24s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        popupIn: {
          '0%': { opacity: '0', transform: 'translateY(8px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

