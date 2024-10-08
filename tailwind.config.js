/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '300px',
        "vm":'400px',
        "xd":"850px",
        "bs":"570px",
        "gf":"520px",
        "gw":"320px",
        "tr":"350px",
        "hg":"910px",
        "oi":"470px",
        "tsr":"370px",
        "cn":"580px",
        "ge":"245px",
        "ow":"500px",
        "bn":"320px",
        "qi":"623px"
        
      },
      colors: {
        'scrollbar-bg':"transparent", 
        'scrollbar-thumb': '#4f4f4f',
      },
    },
  },
  variants: {
    scrollbar: ['rounded'],
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}


