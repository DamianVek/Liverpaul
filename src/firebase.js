
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBwUjhxhxDTDWja8uCWDdMjIarVa5VW-IE",
  authDomain: "reparaciones-f6c5c.firebaseapp.com",
  projectId: "reparaciones-f6c5c",
  storageBucket: "reparaciones-f6c5c.firebasestorage.app",
  messagingSenderId: "1049015186341",
  appId: "1:1049015186341:web:a1567d1019b650ba2b2e4c",
  measurementId: "G-BPJSFMRRMR"
}


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
