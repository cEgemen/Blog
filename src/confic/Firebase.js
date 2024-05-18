import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBQS8piEHvbVmOboXgTZlhcggfLZ0z6GYU",
    authDomain: "blog-a8c57.firebaseapp.com",
    projectId: "blog-a8c57",
    storageBucket: "blog-a8c57.appspot.com",
    messagingSenderId: "764301399841",
    appId: "1:764301399841:web:de8b74dcf0ace445ff9060"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)
  const auth = getAuth(app)


  export {db,auth}