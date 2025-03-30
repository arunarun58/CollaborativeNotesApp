import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDt3uvGXF-8sIqXSbrz549yxOqlmdc_9rQ",
  authDomain: "notion-clone-f6051.firebaseapp.com",
  projectId: "notion-clone-f6051",
  storageBucket: "notion-clone-f6051.firebasestorage.app",
  messagingSenderId: "1000770957980",
  appId: "1:1000770957980:web:fa4ec7c37a4b12b498b359",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
