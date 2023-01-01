import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAJHBJcTByjfaNd0CiZYdBV_pqmoNKasnI",
  authDomain: "weather-d88c9.firebaseapp.com",
  projectId: "weather-d88c9",
  storageBucket: "weather-d88c9.appspot.com",
  messagingSenderId: "264283628562",
  appId: "1:264283628562:web:4b1576678214c0427ee4cb"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();