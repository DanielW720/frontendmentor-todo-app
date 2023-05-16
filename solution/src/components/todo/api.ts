import {
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { TodoList } from "./types";

/**
 * Push a new item to the Firestore database.
 * @param title Title of the item
 */
export const putItem = async (
  title: string
): Promise<DocumentReference | undefined> => {
  try {
    const docRef = await addDoc(collection(db, "users/bob/items"), {
      title: title,
      isActive: true,
    });
    console.log("Added ", docRef.path, " to Firestore");
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

/**
 * Fetch all items for the active user from Firestore.
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
 * Delete an item in Firestore.
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

/**
 * Update the `isActive` field of the item in Firestore.
 * @param id Id of the item to update
 * @param newState The state that the item should have after updating it
 */
export const updateItemsActiveState = async (id: string, newState: boolean) => {
  const itemRef = doc(db, `users/${"bob"}/items/${id}`);
  try {
    await updateDoc(itemRef, {
      isActive: newState,
    });
  } catch (e) {
    console.error("Couldn't update document: ", itemRef);
  }
};
