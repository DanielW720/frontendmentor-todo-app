import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { TodoList } from "./types";

/**
 * Push a new item to the Firestore database.
 * @param title Title of the item
 */
export const putItem = async (title: string) => {
  try {
    const docRef = await addDoc(
      collection(db, `users/${auth.currentUser?.uid}/items`),
      {
        title: title,
        isActive: true,
        index: 0,
      }
    );
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
    const collectionRef = collection(
      db,
      `users/${auth.currentUser?.uid}/items`
    );
    const snapshot = await getDocs(collectionRef);
    const items: TodoList = [];
    snapshot.docs.forEach((doc) =>
      items.push({
        id: doc.id,
        title: doc.data().title,
        isActive: doc.data().isActive,
        index: doc.data().index,
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
    const docRef = doc(db, `users/${auth.currentUser?.uid}/items/${id}`);
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
  const itemRef = doc(db, `users/${auth.currentUser?.uid}/items/${id}`);
  try {
    await updateDoc(itemRef, {
      isActive: newState,
    });
  } catch (e) {
    console.error("Couldn't update document: ", itemRef);
  }
};

/**
 * Update the `title` field of the item in Firestore.
 * @param id Id of the item to update
 * @param title The state that the item should have after updating it
 */
export const updateItemsTitle = async (id: string, title: string) => {
  const itemRef = doc(db, `users/${auth.currentUser?.uid}/items/${id}`);
  try {
    await updateDoc(itemRef, {
      title: title,
    });
  } catch (e) {
    console.error("Couldn't update document: ", itemRef);
  }
};

/**
 * Update the indices for each item in Cloud Firestore, according to the order of
 * the input items list.
 * @param items The list of items
 */
export const updateAllItemIndices = async (items: NonNullable<TodoList>) => {
  items.forEach(async (item, index) => await updateItemsIndex(item.id, index));
};

/**
 * Update the index of an item.
 * @param id Items ID
 * @param index Items new index
 */
const updateItemsIndex = async (id: string, index: number) => {
  const itemRef = doc(db, `users/${auth.currentUser?.uid}/items/${id}`);
  try {
    await updateDoc(itemRef, {
      index: index,
    });
  } catch (e) {
    console.error("Couldn't update documents index: ", e);
    throw "UpdateDocumentsIndexError";
  }
};
