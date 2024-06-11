import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    backgroundImage:{
'img_bg_hero': "url('/images/header.png')",
'img_bg_card': "url('/images/logo.jpg')"
    },
    extend: {
    },
  },
  plugins: [],
};
export default config;
