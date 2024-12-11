import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {  getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCu8Mq8eV1QYfqhKH5YpJA6cYA_g9U4Euo",
  authDomain: "demovideo-b6220.firebaseapp.com",
  projectId: "demovideo-b6220",
  storageBucket: "demovideo-b6220.firebasestorage.app",
  messagingSenderId: "630978052756",
  appId: "1:630978052756:web:4837507a131964fe852a81"
};

const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const provider= new GoogleAuthProvider()
const db= getFirestore(app)
export {auth, provider, signInWithPopup, db}