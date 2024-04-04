/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    colors: {
      royalblue: "#4169E1",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
