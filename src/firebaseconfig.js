// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  doc,
  getFirestore
} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4vzhobmx1E89jhNTtc-pbQiocR8SvpLY",
  authDomain: "todo-react-redux-4de3f.firebaseapp.com",
  projectId: "todo-react-redux-4de3f",
  storageBucket: "todo-react-redux-4de3f.firebasestorage.app",
  messagingSenderId: "24909021882",
  appId: "1:24909021882:web:34003571556e7fe8fb7883",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db, collection,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  doc };
