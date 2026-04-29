import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        iron: {
          950: '#05070d',
          900: '#0b1020',
          800: '#101827',
          700: '#1d293d',
          blue: '#1d8cff',
        },
      },
    },
  },
  plugins: [],
};

export default config;
