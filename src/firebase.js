import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmSxHeV2h7Y-2b0wdamym8P6N2fkLXWhc",
  authDomain: "association-6c2d6.firebaseapp.com",
  projectId: "association-6c2d6",
  storageBucket: "association-6c2d6.firebasestorage.app",
  messagingSenderId: "823745917048",
  appId: "1:823745917048:web:bebc94fc48e4f1009dbd8d",
  measurementId: "G-W3Z5JHLQQ9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
