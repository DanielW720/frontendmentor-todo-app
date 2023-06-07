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
import { TodoList } from "./components/todo/types";

function App() {
  const [theme, setTheme] = useState("dark");
  const [user, loadingAuth] = useAuthState(auth);
  const [items, setItems] = useState<TodoList>(null);

  // If loading, display a loading page
  if (loadingAuth) return <LoadingScreen />;

  const updateTheme = () => {
    setTheme((prevState) => (prevState === "dark" ? "" : "dark"));
  };

  const reorderItems = (startIndex: number, endIndex: number) => {
    const result = Array.from(items!);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setItems(result);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderItems(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={`${theme} max-h-screen overflow-hidden`}>
        <div className="min-h-screen min-w-[275px] bg-white text-lightGrayishBlue dark:bg-veryDarkBlue">
          {user && <Drawer />}
          <UserDisplayNameProvider>
            <Header isDarkTheme={theme === "dark"} updateTheme={updateTheme} />
            <main className="flex justify-center">
              {user ? (
                <List
                  items={items}
                  setItems={setItems}
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
