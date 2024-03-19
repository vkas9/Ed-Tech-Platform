/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    etheme: {
      extend: {
        animation: {
          'gradient': 'gradient 8s linear infinite',
        },
        keyframes: {
          'gradient': {
            to: { 'background-position': '200% center' },
          }
        }                    
      },
    },},
}


