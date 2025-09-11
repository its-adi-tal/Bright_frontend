// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCk9egcOmAbA4PWSMG599FVxImjc8hDF9c",
  authDomain: "bright-backend.firebaseapp.com",
  projectId: "bright-backend",
  storageBucket: "bright-backend.firebasestorage.app",
  messagingSenderId: "858632234276",
  appId: "1:858632234276:web:6190498a31a4fece79bfb1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); //firebase object for login, signup, checking if a user connected ect
const provider = new GoogleAuthProvider();

export { auth, provider };
