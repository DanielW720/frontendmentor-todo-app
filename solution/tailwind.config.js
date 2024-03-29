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
      gridTemplateRows: {
        emptyTodo: "40% 60%",
      },
      boxShadow: {
        "3xl-dark": "0 20px 50px 5px rgb(16, 16, 24)",
        "3xl-light": "0 20px 50px 5px rgb(230, 231, 237)",
        "sm-symmetric": "0 0 4px  white",
        "md-symmetric": "0 0 8px  white",
        blur: "0 0 20px 5px #561d8e",
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
        // Form colors
        formLeft: "rgb(87, 220, 255, 0.6)",
        formRight: "rgb(191, 90, 244, 0.6)",
      },
    },
    fontFamily: {
      sans: ["Josefin Sans", "sans-serif"],
    },
  },
  plugins: [],
};
