// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2KoVwbohrxt54BmeJo9nhpDz1f5q-3h8",
  authDomain: "todo-app-7dcfe.firebaseapp.com",
  projectId: "todo-app-7dcfe",
  storageBucket: "todo-app-7dcfe.appspot.com",
  messagingSenderId: "592517211905",
  appId: "1:592517211905:web:f54fbf6894ef2ff6f21d00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);