let db, auth;

function initFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyClj1-42yihdQms6hfwD2nwNIUuuAcbdaU",
    authDomain: "musicgram-5327e.firebaseapp.com",
    projectId: "musicgram-5327e",
    storageBucket: "musicgram-5327e.firebasestorage.app",
    messagingSenderId: "22308462270",
    appId: "1:22308462270:web:2e31dd119a9951eb0c88ef"
  };
  const app = firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  db = firebase.firestore();
}

// Přihlášení přes Google
function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    alert(`Přihlášen: ${result.user.displayName}`);
  }).catch(console.error);
}

// Přidání příspěvku
function addPost(album, rating, comment) {
  const user = auth.currentUser;
  if (!user) return alert("Přihlas se nejdřív");

  db.collection("posts").add({
    userName: user.displayName,
    album,
    rating,
    comment,
    createdAt: new Date()
  }).then(() => {
    alert("Příspěvek přidán!");
    window.location.href = "index.html";
  }).catch(console.error);
}

// Načtení feedu
function loadFeed() {
  const feedContainer = document.getElementById("feed");
  if (!feedContainer) return;

  db.collection("posts").orderBy("createdAt", "desc").get().then((querySnapshot) => {
    feedContainer.innerHTML = "";
    querySnapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `
        <h3>${data.album}</h3>
        <p>Hodnocení: ${data.rating} ⭐</p>
        <p>${data.comment}</p>
        <small>Autor: ${data.userName} | ${new Date(data.createdAt.seconds*1000).toLocaleString()}</small>
      `;
      feedContainer.appendChild(div);
    });
  });
}
