import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyANeF5fFDcHq-iI0ENLU2u9HB5nn2FJriw",
  authDomain: "expense-tracker-73710.firebaseapp.com",
  projectId: "expense-tracker-73710",
  storageBucket: "expense-tracker-73710.appspot.com",
  messagingSenderId: "1096654796979",
  appId: "1:1096654796979:web:b2c5034e2476c9b7e218c6"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);