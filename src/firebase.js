
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpQHozj0zRJ1rMP4-lo2oKhEic8L439Tw",
  authDomain: "finalprojectfe-e3806.firebaseapp.com",
  projectId: "finalprojectfe-e3806",
  storageBucket: "finalprojectfe-e3806.firebasestorage.app",
  messagingSenderId: "397384979250",
  appId: "1:397384979250:web:2ff7eb8dfddfd992df7d2b",
  measurementId: "G-X5FP7LMEY7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);