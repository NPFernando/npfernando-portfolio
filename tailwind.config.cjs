/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        primary: {
          50: '#eef6ff',
          100: '#d9e9ff',
          200: '#b6d4ff',
          300: '#86b5ff',
          400: '#5287ff',
          500: '#2f5bff',
          600: '#1e3ff2',
          700: '#1933c6',
          800: '#182e9c',
          900: '#1a2b7c',
          950: '#101946',
        },
        accent: {
          100: '#c7f9cc',
          200: '#80ed99',
          300: '#57cc99',
          400: '#38a3a5',
          500: '#22577a',
        },
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
        hero: "url('/img/cover.png')",
      },
      boxShadow: {
        card: '0 20px 80px rgba(10, 14, 60, 0.15)',
        border: '0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
