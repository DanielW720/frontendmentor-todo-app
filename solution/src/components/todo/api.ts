import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { TodoList } from "./types";

/**
 * Push a new item to the Firestore database.
 * @param title Title of the item
 */
export const putItem = async (title: string) => {
  try {
    const docRef = await addDoc(collection(db, "users/bob/items"), {
      title: title,
      isActive: true,
    });
    console.log("Added ", docRef.path, " to Firestore");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getItems = async (user: string) => {
  try {
    const collectionRef = collection(db, `users/${user}/items`);
    const snapshot = await getDocs(collectionRef);
    const items: TodoList = [];
    snapshot.docs.forEach((doc) =>
      items.push({
        id: doc.id,
        title: doc.data().title,
        isActive: doc.data().isActive,
      })
    );
    return items;
  } catch (e) {
    console.log("Error fetching items: ", e);
    return [];
  }
};
