// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCIB-LmuG1bPU2xTcZDh2k1qHbjOHO_wJ0",
    authDomain: "gptui-ad705.firebaseapp.com",
    projectId: "gptui-ad705",
    storageBucket: "gptui-ad705.appspot.com",
    messagingSenderId: "16173861718",
    appId: "1:16173861718:web:091a5b2af547d7797224f7",
    measurementId: "G-3HZZZMSDKW"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);