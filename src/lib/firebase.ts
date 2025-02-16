import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRMVdnzDl6UrsTFZ8lmx0BCwQ7lj8naOc",
  authDomain: "focus-feed-132f8.firebaseapp.com",
  projectId: "focus-feed-132f8",
  storageBucket: "focus-feed-132f8.firebasestorage.app",
  messagingSenderId: "1027651751495",
  appId: "1:1027651751495:web:0232aae2971deed8caeb62",
  measurementId: "G-DCXB98HGWX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-Out Error:", error);
  }
};
