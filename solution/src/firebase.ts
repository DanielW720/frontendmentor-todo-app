import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

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

// Initialize Cloud Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

/**
 * Sign in user.
 * @param method Sign-in method (email/password or with Google provider)
 * @returns true if successful login, else false
 */
export async function signInUser(method: string) {
  switch (method) {
    case "google":
      const googleProvider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (e) {}
      break;
    case "email-password":
      // todo
      break;
    default:
      break;
  }
}

/**
 * Sign out user.
 * @returns True if successful sign out, else false
 */
export async function signOutUser() {
  await signOut(auth);
}
