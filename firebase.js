// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.6.1/firebase-firestore.js";

// Tvůj Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyClj1-42yihdQms6hfwD2nwNIUuuAcbdaU",
  authDomain: "musicgram-5327e.firebaseapp.com",
  projectId: "musicgram-5327e",
  storageBucket: "musicgram-5327e.firebasestorage.app",
  messagingSenderId: "22308462270",
  appId: "1:22308462270:web:2e31dd119a9951eb0c88ef"
};

// Inicializace Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
