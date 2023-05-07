import { Header } from "./components/header/Header";
import { useState } from "react";
import List from "./components/todo/List";

function App() {
  const [theme, setTheme] = useState("dark");

  const updateTheme = () => {
    setTheme((prevState) => (prevState === "dark" ? "" : "dark"));
  };

  return (
    <div className={`${theme} max-h-screen overflow-hidden`}>
      <div className="min-h-screen min-w-[275px] bg-veryLightGrayishBlue dark:bg-veryDarkBlue text-lightGrayishBlue">
        <Header updateTheme={updateTheme} isDarkTheme={theme} />
        <List />
      </div>
    </div>
  );
}

export default App;
