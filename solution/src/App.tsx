import { Header } from "./components/Header";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("dark");

  const updateTheme = () => {
    setTheme((prevState) => (prevState === "dark" ? "" : "dark"));
  };

  return (
    <div className={theme}>
      <div className="min-h-screen bg-veryLightGrayishBlue dark:bg-veryDarkBlue text-red-300">
        <Header updateTheme={updateTheme} isDarkTheme={theme} />
        Hello World
      </div>
    </div>
  );
}

export default App;
