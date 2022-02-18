// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD75rUMhSU347uFCkMSditPdITZNh30CI4",
  authDomain: "rnt-computer-app.firebaseapp.com",
  projectId: "rnt-computer-app",
  storageBucket: "rnt-computer-app.appspot.com",
  messagingSenderId: "656084539502",
  appId: "1:656084539502:web:036fcdf215560329a02e7f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
