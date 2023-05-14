import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-Vgk3Imbnf9GSOiE2G3-doo0zoZJJoTw",
  authDomain: "frontendmentor-todo-5b99b.firebaseapp.com",
  projectId: "frontendmentor-todo-5b99b",
  storageBucket: "frontendmentor-todo-5b99b.appspot.com",
  messagingSenderId: "572024372701",
  appId: "1:572024372701:web:fe0d8bda01f3d00ac60a34",
  measurementId: "G-KXSWB2MGS0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
