// /lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRMVdnzDl6UrsTFZ8lmx0BCwQ7lj8naOc",
  authDomain: "focus-feed-132f8.firebaseapp.com",
  projectId: "focus-feed-132f8",
  storageBucket: "focus-feed-132f8.firebasestorage.app",
  messagingSenderId: "1027651751495",
  appId: "1:1027651751495:web:0232aae2971deed8caeb62",
  measurementId: "G-DCXB98HGWX",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore();

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });