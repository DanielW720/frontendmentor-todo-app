import { Header } from "./components/header/Header";
import { useState } from "react";
import List from "./components/todo/List";
import { auth } from "./firebase";
import { SignedOut } from "./components/signedOut/SignedOut";
import { UserDisplayNameProvider } from "./contexts/userDisplayName/userDisplayNameContext";
import { Drawer } from "./components/drawer/Drawer";
import { useAuthState } from "react-firebase-hooks/auth";
import { LoadingScreen } from "./components/loadingScreen/LoadingScreen";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

function App() {
  const [theme, setTheme] = useState("dark");
  const [user, loading, _] = useAuthState(auth);

  const updateTheme = () => {
    setTheme((prevState) => (prevState === "dark" ? "" : "dark"));
  };

  // const onDragEnd = useCallback(() => {}, []);
  const onDragEnd = (result: DropResult) => {
    console.log(result);
  };

  // If loading, display a loading page
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={`${theme} max-h-screen overflow-hidden`}>
        <div className="min-h-screen min-w-[275px] bg-white text-lightGrayishBlue dark:bg-veryDarkBlue">
          {loading && <div>Loading...</div>}
          {user && <Drawer />}
          <UserDisplayNameProvider>
            <Header isDarkTheme={theme === "dark"} updateTheme={updateTheme} />
            <main className="flex justify-center">
              {user ? (
                <List
                  updateTheme={updateTheme}
                  isDarkTheme={theme === "dark"}
                />
              ) : (
                <SignedOut />
              )}
            </main>
          </UserDisplayNameProvider>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
