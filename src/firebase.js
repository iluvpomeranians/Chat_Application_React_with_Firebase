import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "hidden",
  authDomain: "chat-app-2-w-react-js-firebase.firebaseapp.com",
  projectId: "chat-app-2-w-react-js-firebase",
  storageBucket: "chat-app-2-w-react-js-firebase.appspot.com",
  messagingSenderId: "hidden",
  appId: "hidden",
  measurementId: "hidden"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();