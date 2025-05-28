import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111414',  // black container background
        'sec': '#67bdad',   // cyan borders
        'ctext': '#3FB39A',  // cyan text
        'back': '#E6BAA3',  
        'back2': '#F3D6C9',
        'back3': '#f5c6ae',
      },
    },
  },
  plugins: [],
} satisfies Config;
