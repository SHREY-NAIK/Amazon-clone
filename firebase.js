import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

//import { initializeApp, getApps, firebase } from "firebase/app"
//import { getFirestore } from "firebase/firestore"
//import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCrp3Dj64tKs2y9guV3zeaPcsLwMCne7sc",
    authDomain: "amaxon-clone-98f21.firebaseapp.com",
    projectId: "amaxon-clone-98f21",
    storageBucket: "amaxon-clone-98f21.appspot.com",
    messagingSenderId: "639515141403",
    appId: "1:639515141403:web:d2e20644457565c6035fbe"
  };


//const app = 
  //initializeApp(firebaseConfig);

//const db = getFirestore();

//export default db;

   const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

   const db = app.firestore();
  
   export default db;