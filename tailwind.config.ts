import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('daisyui')],
  theme: {
    extend: {
      backgroundImage: {
        'blue-bg': "url('/images/blue_bg_picture.svg')", // Name your image here
      },
    },
    screens: {
      xxs: '240px',
      xs: '400px',
      sm: '600px',
      md: '800px',
      xl: '1000px',
      xxl: '1200px',
    },
  },
}
export default config
