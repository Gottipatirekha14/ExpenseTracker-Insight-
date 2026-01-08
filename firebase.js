// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBk_6na8LJc-iHLT-V-rKGP36gry-ba-ec",
    authDomain: "expense-tracker-6ec56.firebaseapp.com",
    projectId: "expense-tracker-6ec56",
    storageBucket: "expense-tracker-6ec56.appspot.com",
    messagingSenderId: "243528703788",
    appId: "1:243528703788:web:af90edcdd9cc6806b75689"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
