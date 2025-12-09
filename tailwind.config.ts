import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          900: '#064e3b',
          950: '#022c22',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        stone: {
          50: '#fafaf9',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'], 
        sans: ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;