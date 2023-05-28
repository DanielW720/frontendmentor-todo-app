import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
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

type Method = "google" | "emailpassword";

/**
 * Sign in user.
 * @param method Sign-in method (email/password or with Google provider)
 */
export async function signInUser(
  method: Method,
  email?: string,
  password?: string
) {
  switch (method) {
    case "google":
      const googleProvider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (e) {
        console.error("Could not sign in Google user: ", e);
        throw "SignInGoogleUserError";
      }
      break;
    case "emailpassword":
      if (email != undefined && password != undefined) {
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
          console.error("Could not sign in email user: ", e);
          throw "SignInEmailPasswordUserError";
        }
      }
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

/**
 * Create a new user with email and password, and sets their display name.
 * Also signs in if new user was successfully created.
 * @param email Email for the new user
 * @param password Password for the new user
 */
export async function createEmailPasswordUser(
  email: string,
  password: string,
  displayName: string
) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, {
      displayName: displayName,
    });
    console.log("Created a new user and set the users display name");
  } catch (e) {
    console.error("Could not create email-password user: ", e);
    throw "CreateEmailPasswordUserError";
  }
}
