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
      <div className="min-h-screen min-w-[275px] bg-white dark:bg-veryDarkBlue text-lightGrayishBlue">
        <Header isDarkTheme={theme === "dark"} />
        <main className="flex justify-center">
          <List updateTheme={updateTheme} isDarkTheme={theme === "dark"} />
        </main>
      </div>
    </div>
  );
}

export default App;
