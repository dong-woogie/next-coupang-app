// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBolfv9d9aEhBzVlNM9rskhOXYPntBx-pI",
  authDomain: "react-next-shop-app-8e82b.firebaseapp.com",
  projectId: "react-next-shop-app-8e82b",
  storageBucket: "react-next-shop-app-8e82b.appspot.com",
  messagingSenderId: "477295479276",
  appId: "1:477295479276:web:e389b5407658bd45aa58c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
