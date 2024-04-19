import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCA7_JC76W-3aA9Y0sSYe-El3XxxyAh--M",
  authDomain: "clone-e25bf.firebaseapp.com",
  projectId: "clone-e25bf",
  storageBucket: "clone-e25bf.appspot.com",
  messagingSenderId: "803739847906",
  appId: "1:803739847906:web:5ed0603721720955f862bb",
  measurementId: "G-ZC7ZWQDP0Q",
};

const firebaseApp = !firebase.apps.lenth? firebase.initializeApp(firebaseConfig):firebase.app();
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
