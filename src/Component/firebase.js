import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCnjM-79uYuX43qqOegICCpLTk0MyJv-40",
  authDomain: "startegytool.firebaseapp.com",
  projectId: "startegytool",
  storageBucket: "startegytool.appspot.com",
  messagingSenderId: "703090929905",
  appId: "1:703090929905:web:da1fff5a612676a045b950"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);