import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // or 'media' or 'class'
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      screens: {
        'xxs': '320px',   // custom extra tiny breakpoint
        'xs': '480px',     // custom tiny breakpoint
        'lger': '1120px',
        '3xl': '1920px',   // custom huge breakpoint
      },
    },
  },
  plugins: [],
};
export default config;
