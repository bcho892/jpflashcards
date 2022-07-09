// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg2CbRigaHMStqAw9RRWBKs56vBU5nYD0",
  authDomain: "jpflashcards-daeb9.firebaseapp.com",
  projectId: "jpflashcards-daeb9",
  storageBucket: "jpflashcards-daeb9.appspot.com",
  messagingSenderId: "471117823471",
  appId: "1:471117823471:web:3e50628e117c661b108a1a",
  measurementId: "G-6NJR33PX2R"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);

