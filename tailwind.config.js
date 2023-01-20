/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: "#C4F4D4",
        links: "#4C79EC",
        border: "#EBEBEB",
        muted: "#B0B0B0",
        success: "#35A361",
        danger: "#D63535",
        skyblue: "#C5E1F2",
        yellow: "#FCF7B9",
        purple: "#E8C3F3",
        cyan: "#C4F3E5",
        salmon: "#FCB9B9",
        orange: "#FCD9B9",
        deeppurple: "#BEB9FC",
      },
    },
  },
  plugins: [],
};
