import { Header } from "./components/header/Header";
import { useEffect, useState } from "react";
import List from "./components/todo/List";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Register from "./components/register/Register";
import Login from "./components/login/Login";

function App() {
  const [theme, setTheme] = useState("dark");
  const [isSignedIn, setIsSignedIn] = useState(auth.currentUser != null);

  const updateTheme = () => {
    setTheme((prevState) => (prevState === "dark" ? "" : "dark"));
  };

  useEffect(() => {
    // Observer on the auth object
    onAuthStateChanged(auth, (user) => {
      setIsSignedIn(user != null);
    });
  }, []);

  return (
    <div className={`${theme} max-h-screen overflow-hidden`}>
      <div className="min-h-screen min-w-[275px] bg-white dark:bg-veryDarkBlue text-lightGrayishBlue">
        <Header isDarkTheme={theme === "dark"} isSignedIn={isSignedIn} />
        <main className="flex justify-center">
          {isSignedIn ? (
            <List updateTheme={updateTheme} isDarkTheme={theme === "dark"} />
          ) : (
            <div>
              <Login />
              <Register />
              {/* <SignedOut /> */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
