/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
      boxShadow: {
        "3lg-dark": "0 50px 70px 10px #101018",
        "3lg-light": "0 50px 70px 10px #e6e7ec",
      },
      colors: {
        // Primary
        brightBlue: "hsl(220, 98%, 61%)",
        headerLeft: "hsl(192, 100%, 67%)",
        headerRight: "hsl(280, 87%, 65%)",
        // Neutral, light theme
        veryLightGray: "hsl(0, 0%, 98%)",
        veryLightGrayishBlue: "hsl(236, 33%, 92%)",
        lightGrayishBlue: "hsl(233, 11%, 84%)",
        darkGrayishBlue: "hsl(236, 9%, 61%)",
        veryDarkGrayishBlueLightTheme: "hsl(235, 19%, 35%)",
        // Neutral, dark theme
        veryDarkBlue: "hsl(235, 21%, 11%)",
        veryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
        lightGrayishBlue: "hsl(234, 39%, 85%)",
        lightGrayishBlueHover: "hsl(236, 33%, 92%)",
        darkGrayishBlue: "hsl(234, 11%, 52%)",
        veryDarkGrayishBlueDarkTheme: "hsl(237, 14%, 26%)",
        veryDarkGrayishBlue: "hsl(233, 14%, 35%)",
      },
    },
    fontFamily: {
      sans: ["Josefin Sans", "sans-serif"],
    },
  },
  plugins: [],
};
