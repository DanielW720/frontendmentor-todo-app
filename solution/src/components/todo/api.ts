import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { TodoList } from "./types";

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
    const querySnapshot = await getDocs(collection(db, "users/bob/items"));
    return querySnapshot;
  } catch (e) {
    console.error(e);
  }
};
