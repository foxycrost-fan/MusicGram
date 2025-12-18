// firebase.js – ČISTÁ FUNKČNÍ VERZE
import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/10.6.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.6.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.6.1/firebase-firestore.js";

// Tvůj config
const firebaseConfig = {
  apiKey: "AIzaSyClj1-42yihdQms6hfwD2nwNIUuuAcbdaU",
  authDomain: "musicgram-5327e.firebaseapp.com",
  projectId: "musicgram-5327e",
  storageBucket: "musicgram-5327e.firebasestorage.app",
  messagingSenderId: "22308462270",
  appId: "1:22308462270:web:2e31dd119a9951eb0c88ef"
};

// Inicializace
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Funkce pro přihlášení
export async function login() {
  try {
    const result = await signInWithPopup(auth, provider);
    alert("Přihlášen: " + result.user.displayName);
  } catch (e) {
    console.error(e);
    alert("Chyba při přihlášení");
  }
}

// Přidání příspěvku
export async function addPost(album, rating, comment) {
  const user = auth.currentUser;
  if (!user) return alert("Nejprve se přihlas.");

  await addDoc(collection(db, "posts"), {
    userName: user.displayName,
    album,
    rating,
    comment,
    createdAt: serverTimestamp()
  });

  alert("Příspěvek přidán!");
  window.location.href = "index.html";
}

// Načtení feedu
export async function loadFeed() {
  const feed = document.querySelector("#feed");
  if (!feed) return;

  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  feed.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <h3>${data.album}</h3>
      <p>⭐ ${data.rating}</p>
      <p>${data.comment}</p>
      <small>${data.userName}</small>
    `;

    feed.appendChild(div);
  });
}
