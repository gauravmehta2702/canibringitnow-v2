import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: { brand: { 50: '#eef6ff', 100:'#d9ecff', 500:'#1677ff', 600:'#0b5ed7', 900:'#062141' } },
      boxShadow: { soft: '0 24px 70px rgba(8, 31, 63, 0.12)' }
    }
  },
  plugins: []
};
export default config;
