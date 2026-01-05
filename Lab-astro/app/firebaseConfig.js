import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBAk9_9BqiKePpFwiojZC0lY7DUR3JsS4g",
  authDomain: "lms-astronomy.firebaseapp.com",
  projectId: "lms-astronomy",
  storageBucket: "lms-astronomy.firebasestorage.app",
  messagingSenderId: "6957444215",
  appId: "1:6957444215:web:07ed146a0bfc235cb3aa72",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);