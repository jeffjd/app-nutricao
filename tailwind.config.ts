import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        azulclaro: '#06BEE159',
        azulescuro: '#2541B265',
        azulclarobotao: '#06BEE1',
        azulescurobotao: '#2541B2',
        verdeazulado: '#05F7DE',
        amarelo: '#E06B0770',
        cinza: '#D9D9D9',
        //
        green: 'rgb(var(--green) / <alpha-value>)',
        orange: 'rgb(var(--orange) / <alpha-value>)',
        yellow: 'rgb(var(--yellow) / <alpha-value>)',
        blue: {
          500: 'rgb(var(--blue-500) / <alpha-value>)',
          700: 'rgb(var(--blue-700) / <alpha-value>)',
        },
      },
    },
  },
  extend: {
    whiteSpace: ['responsive', 'hover', 'focus'],
  },
  plugins: [],
};
export default config;
