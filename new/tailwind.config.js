/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/style.css",
  ],
  safelist: [
    {
      pattern: /bg-(lime|cyan|emerald|rose|orange)-[50-950]/,
    },
    {
      pattern: /stroke-(lime|cyan|emerald|rose|orange)-[50-950]/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

