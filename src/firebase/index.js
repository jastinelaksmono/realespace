// import functions from SDK
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase, ref, child, set, update, onValue, get } from "firebase/database"

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCjt1lew7cyNiWVTPb2GKopr8w9Y6-ZWE",
    authDomain: "realestate-5394e.firebaseapp.com",
    databaseURL: "https://realestate-5394e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "realestate-5394e",
    storageBucket: "realestate-5394e.appspot.com",
    messagingSenderId: "224541162458",
    appId: "1:224541162458:web:ecdf5954a66f34b352dee3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;