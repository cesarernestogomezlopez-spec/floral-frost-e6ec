import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKZm8xtOjpN0r3ylvxvOlBvh1ma6Tn4Xc",
  authDomain: "portal-202-8392e.firebaseapp.com",
  projectId: "portal-202-8392e",
  storageBucket: "portal-202-8392e.firebasestorage.app",
  messagingSenderId: "403664646098",
  appId: "1:403664646098:web:d6e43080cf53ad3d92e20b",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
