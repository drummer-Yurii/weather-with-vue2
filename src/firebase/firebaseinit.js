import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB9wGPL5Rk8vx1Tp36QRLApPGhLH32gz6A",
  authDomain: "weatherapp-3cf31.firebaseapp.com",
  projectId: "weatherapp-3cf31",
  storageBucket: "weatherapp-3cf31.appspot.com",
  messagingSenderId: "214098704294",
  appId: "1:214098704294:web:91bb33810e656fd854c167"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();