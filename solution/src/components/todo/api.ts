import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
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

/**
 * Get items for the active user.
 * @returns The items for the active user
 */
export const getItems = async () => {
  try {
    // Todo: Get user from auth
    const collectionRef = collection(db, `users/${"bob"}/items`);
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

/**
 * Delete an item.
 * @param id Id of the item to delete
 */
export const deleteItem = async (id: string) => {
  try {
    const docRef = doc(db, `users/${"bob"}/items/${id}`);
    await deleteDoc(docRef);
  } catch (e) {
    console.log("Error deleting document: ", e);
  }
};
