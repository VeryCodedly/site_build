import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   noto: ["var(--font-noto)"],
      //   rale: ["var(--font-rale)"],
      //   pops: ["var(--font-pops)"],
      // },
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
