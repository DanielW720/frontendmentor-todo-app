import { initializeApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
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

export async function reauthenticateUser(
  method: string,
  email?: string,
  password?: string
) {
  switch (method) {
    case "google":
      break;
    case "password":
      try {
        await reauthenticateWithCredential(
          auth.currentUser!,
          EmailAuthProvider.credential(email!, password!)
        );
      } catch (e) {
        console.error("Could not reauthenticate user with password: ", e);
        throw "ReauthenticateWithPasswordError";
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

/**
 * Delete a user from Firebase Authentication and their data in Firestore.
 */
export async function deleteUserFromAuthAndFirestore() {
  if (!auth.currentUser) {
    console.error("No user is signed in, cannot delete user account");
    throw "DeleteUserFromAuthAndFirestoreError: User not signed in";
  }
  try {
    await deleteUserFirestoreData();
    await deleteUser(auth.currentUser!);
  } catch (e) {
    console.error("Could not delete user and/or user data: ", e);
    throw "DeleteUserFromAuthAndFirestoreError: other";
  }
}

/**
 * Delete the users' Cloud Firestore data.
 */
async function deleteUserFirestoreData() {
  try {
    const userCollectionRef = collection(
      db,
      `users/${auth.currentUser!.uid}/items`
    );
    const userCollectionSnap = await getDocs(userCollectionRef);
    userCollectionSnap.forEach(async (doc) => await deleteDoc(doc.ref));
  } catch (e) {
    console.error("Could not delete users Firestore data: ", e);
    throw "DeleteUserFirestoreData";
  }
}
