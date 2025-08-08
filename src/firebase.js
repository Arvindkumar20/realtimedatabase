// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGUz0ua218tkjmlEz40A7zKYrUeL6sbvU",
  authDomain: "react-app-5f3f0.firebaseapp.com",
  databaseURL: "https://react-app-5f3f0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-app-5f3f0",
  storageBucket: "react-app-5f3f0.firebasestorage.app",
  messagingSenderId: "399921292956",
  appId: "1:399921292956:web:7922a09c7d9f7dbee2af59",
  measurementId: "G-V76LZ05N00"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);