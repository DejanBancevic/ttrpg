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
        primary: '#111414',  // black
        'sec': '#67bdad',   // cyan
        'title': '#3FB39A',  
        'back': '#E6BAA3',  
        'back2': '#F3D6C9',
        'back3': '#f5c6ae',
      },
    },
  },
  plugins: [],
} satisfies Config;
