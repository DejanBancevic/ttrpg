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
        'gray': '#353940',  // gray lowkey  (53, 57, 64)
        'grayActive': '#6B7280', // gray bold (107,114,128)
        'grayBackground': '#292D32',  // gray background (41,45,50) 
        'blackButtonBackground': '#1e2024',  // (30, 32, 36)
        'back3': '#f5c6ae',
      },
    },
  },
  plugins: [],
} satisfies Config;
