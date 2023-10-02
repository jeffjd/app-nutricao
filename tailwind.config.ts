import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        azulclaro: '#06BEE159',
        azulescuro: '#2541B265',
        amarelo: '#E06B0770',
        cinza: '#D9D9D9',
      },
    },
  },
  plugins: [],
};
export default config;
