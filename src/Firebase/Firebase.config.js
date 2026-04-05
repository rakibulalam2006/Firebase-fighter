// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvAI4mz4W1DYfBhOxod2MLfjzDrdbDa2E",
  authDomain: "fir-fighter-2eb60.firebaseapp.com",
  projectId: "fir-fighter-2eb60",
  storageBucket: "fir-fighter-2eb60.firebasestorage.app",
  messagingSenderId: "101752945378",
  appId: "1:101752945378:web:d6f8ce45b5292764de7cbb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
