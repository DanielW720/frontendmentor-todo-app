import { Header } from "./components/header/Header";
import { useEffect, useState } from "react";
import List from "./components/todo/List";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { SignedOut } from "./components/signedOut/SignedOut";
import { UserDisplayNameProvider } from "./contexts/userDisplayName/userDisplayNameContext";
import { Drawer } from "./components/drawer/Drawer";

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
      <div className="min-h-screen min-w-[275px] bg-white text-lightGrayishBlue dark:bg-veryDarkBlue">
        {isSignedIn && <Drawer />}
        <UserDisplayNameProvider>
          <Header isDarkTheme={theme === "dark"} updateTheme={updateTheme} />
          <main className="flex justify-center">
            {isSignedIn ? (
              <List updateTheme={updateTheme} isDarkTheme={theme === "dark"} />
            ) : (
              <SignedOut />
            )}
          </main>
        </UserDisplayNameProvider>
      </div>
    </div>
  );
}

export default App;
