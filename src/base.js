import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

export const app = firebase.initializeApp({
  apiKey: "AIzaSyAs9mpoGobehahcG3n1jfzD9xdfeMCWTpI",
  authDomain: "class-studies.firebaseapp.com",
  projectId: "class-studies",
  storageBucket: "class-studies.appspot.com",
  messagingSenderId: "555587832554",
  appId: "1:555587832554:web:3420d9d00267ff5277a593",
});
