// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6BvFDxj1V_OFU3PiQzdkzW-SJAq2iAMM",
  authDomain: "twitter-clone-ee587.firebaseapp.com",
  projectId: "twitter-clone-ee587",
  storageBucket: "twitter-clone-ee587.appspot.com",
  messagingSenderId: "726614101546",
  appId: "1:726614101546:web:e0c1e2bb2265fe9fc1fd53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yetkilendirmenin referansını alma
export const auth = getAuth(app);

// google sağlayıcı kurulumu

export const provider = new GoogleAuthProvider();

// veri tabanının referansını alma
export const db = getFirestore(app);
// depolama alanının referansını alma

export const storage = getStorage(app);
