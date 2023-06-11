import { Header } from "./components/header/Header";
import { useEffect, useState } from "react";
import List from "./components/todo/List";
import { auth } from "./firebase";
import { SignedOut } from "./components/signedOut/SignedOut";
import { UserDisplayNameProvider } from "./contexts/userDisplayName/userDisplayNameContext";
import { Drawer } from "./components/drawer/Drawer";
import { useAuthState } from "react-firebase-hooks/auth";
import { LoadingScreen } from "./components/loadingScreen/LoadingScreen";
import { TodoList } from "./components/todo/types";
import { getItems, updateAllItemIndices } from "./components/todo/api";
import { usePrevious } from "./hooks/usePrevious";
import { orderIsEqual, sortItems } from "./lib/items";

function App() {
  const [theme, setTheme] = useState("dark");
  const [user, loadingAuth] = useAuthState(auth);
  const [items, setItems] = useState<TodoList>(null);
  const previousItems = usePrevious(items);

  // When items gets updated, write the new index values to Cloud Firestore
  useEffect(() => {
    let firestoreUpdate: NodeJS.Timeout;
    // Don't update Cloud Firestore documents on first render (when items is null)
    // Also don't render when items goes from null to non-null
    // I.e., only render when items changes and it's previous value was not null.
    if (previousItems && !orderIsEqual(previousItems, items!)) {
      firestoreUpdate = setTimeout(() => {
        console.log("Updating order in Firestore");
        updateAllItemIndices(items!);
      }, 10000);
    }
    // Clean up timer so no unnecessary writes are made to Firestore
    return () => clearTimeout(firestoreUpdate);
  }, [items]);

  // Fetch items when user has signed in and is loaded
  useEffect(() => {
    const fetchData = async () => {
      let items = await getItems();
      items = sortItems(items);
      setItems(items);
    };
    if (user) fetchData();
  }, [user]);

  // If loading, display a loading page
  if (loadingAuth) return <LoadingScreen />;

  const updateTheme = () => {
    setTheme((prevState) => (prevState === "dark" ? "" : "dark"));
  };

  return (
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
  );
}

export default App;
