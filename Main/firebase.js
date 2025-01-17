// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFYtDAP81LljrBHDwwm_Ntpu5CQd8tpnM",
    authDomain: "expense-tracker-project-936f3.firebaseapp.com",
    projectId: "expense-tracker-project-936f3",
    storageBucket: "expense-tracker-project-936f3.firebasestorage.app",
    messagingSenderId: "759867990488",
    appId: "1:759867990488:web:bd6315db64fd248b7492ad",
    measurementId: "G-HXBP5LFH5C"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
