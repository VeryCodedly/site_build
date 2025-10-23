import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "media"], // 👈 allows both
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      rale: ['Raleway', 'sans-serif'],
      noto: ['Noto Sans Mono', 'monospace'],
      pops: ['Poppins', 'sans-serif'],
      prime: ['Courier Prime', 'monospace'],
      csn: ['Cousine', 'monospace'],
    },
    },
  },
  plugins: [],
};

export default config;
