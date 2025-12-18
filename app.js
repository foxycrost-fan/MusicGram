// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyClj1-42yihdQms6hfwD2nwNIUuuAcbdaU",
  authDomain: "musicgram-5327e.firebaseapp.com",
  projectId: "musicgram-5327e",
  storageBucket: "musicgram-5327e.firebasestorage.app",
  messagingSenderId: "22308462270",
  appId: "1:22308462270:web:2e31dd119a9951eb0c88ef"
};

// Inicializace Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Přihlášení přes Google
function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
      .then(result => alert("Přihlášen: " + result.user.displayName))
      .catch(console.error);
}

// Přidání příspěvku
function addPost(album, rating, comment) {
  const user = auth.currentUser;
  if (!user) return alert("Nejprve se přihlas.");

  db.collection("posts").add({
    userName: user.displayName,
    album,
    rating,
    comment,
    createdAt: new Date()
  })
  .then(() => {
    alert("Příspěvek přidán!");
    window.location.href = "index.html";
  })
  .catch(console.error);
}

// Načtení feedu
function loadFeed() {
  const feed = document.querySelector("#feed");
  if (!feed) return;

  db.collection("posts").orderBy("createdAt", "desc").get()
    .then(snapshot => {
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
    });
}

// Eventy pro tlačítka
document.querySelectorAll("#loginBtn").forEach(btn => {
  btn.onclick = login;
});

// Přidání příspěvku z formuláře (add.html)
const postForm = document.querySelector("#postForm");
if (postForm) {
  postForm.addEventListener("submit", e => {
    e.preventDefault();
    addPost(
      document.querySelector("#album").value,
      document.querySelector("#rating").value,
      document.querySelector("#comment").value
    );
  });
}

// Načtení feedu (index.html)
loadFeed();
