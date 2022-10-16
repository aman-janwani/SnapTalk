// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPExXiKfFRdFCnFgALoDWJcC92Hjj07fI",
  authDomain: "snaptalk-814a6.firebaseapp.com",
  projectId: "snaptalk-814a6",
  storageBucket: "snaptalk-814a6.appspot.com",
  messagingSenderId: "550601726938",
  appId: "1:550601726938:web:ae4a028528730c7dfffee3",
  measurementId: "G-650M7TVK46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)   
const auth = getAuth(app);

export {db, auth};