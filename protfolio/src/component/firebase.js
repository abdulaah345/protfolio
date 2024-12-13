import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUN7wC3IvQq-BwjH69i5vutwL8lyWuCyw",
  authDomain: "portfolio-1a3a7.firebaseapp.com",
  projectId: "portfolio-1a3a7",
  storageBucket: "portfolio-1a3a7.appspot.com",
  messagingSenderId: "717923271018",
  appId: "1:717923271018:web:892d21540352d4b490e513",
  measurementId: "G-7GSR1R8NRT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export
export const db = getFirestore(app);
