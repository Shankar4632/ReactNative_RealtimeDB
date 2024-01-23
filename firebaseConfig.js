// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxQv6gndSrpOkB5qme4k9jX-xxIDLIPL8",
  authDomain: "reactnative-f71f9.firebaseapp.com",
  projectId: "reactnative-f71f9",
  storageBucket: "reactnative-f71f9.appspot.com",
  messagingSenderId: "516996298682",
  appId: "1:516996298682:web:515abfe79c06710fdd4f83",
  measurementId: "G-YJYP2CQ3CG",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const dataRef = firebase.database();
export const storage = firebase.storage();
export default firebase;
