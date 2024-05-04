import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  theme:{
    screens:{
      'xxs': "240px",
      "xs": "400px",
      "sm": "600px",
      "md": "800px"
    }
  }
};
export default config;
