import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "hidden",
  authDomain: "chat-app-2-w-react-js-firebase.firebaseapp.com",
  projectId: "chat-app-2-w-react-js-firebase",
  storageBucket: "chat-app-2-w-react-js-firebase.appspot.com",
  messagingSenderId: "736239631067",
  appId: "1:736239631067:web:97d6b1652bae12c4e16afe",
  measurementId: "G-D4PJKG1RBQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();