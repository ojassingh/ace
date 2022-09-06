// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2ueU3Wl2rcG561HGD1fHdLPvYlSldTw0",
  authDomain: "deca-f0491.firebaseapp.com",
  projectId: "deca-f0491",
  storageBucket: "deca-f0491.appspot.com",
  messagingSenderId: "98333044785",
  appId: "1:98333044785:web:b0a0b8739326d1028d6510",
  measurementId: "G-N2SQJXXJGX"
};
// const analytics = getAnalytics(app);
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);




