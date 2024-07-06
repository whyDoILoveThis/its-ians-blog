// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX3RL8BysOy-Kw_JXj0p2Z5ZVvs-THQSA",
  authDomain: "its-ians-blog.firebaseapp.com",
  projectId: "its-ians-blog",
  storageBucket: "its-ians-blog.appspot.com",
  messagingSenderId: "44923660317",
  appId: "1:44923660317:web:da4d1caa4edfadd703fef4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

