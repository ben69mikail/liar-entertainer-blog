/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#d7393e',
        'primary-dark': '#b62e32',
        'primary-light': '#e04a4f',
        'accent-gold': '#ffb546',
        dark: '#14171c',
        'dark-2': '#1f2025',
        'gray-light': '#f4f4f4',
        'footer-top': '#c9d7f0',
      },
      fontFamily: {
        sans: ['Poppins', 'Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
