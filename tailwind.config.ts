import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      dropShadow: {
        xl: '0 22px 17px rgb(0 41 106)',
        sm: '#0d0e10 0 0 115px -23px',
      },
    },
    container: {
      padding: '2rem',
    },
  },
  plugins: [],
};
export default config;
