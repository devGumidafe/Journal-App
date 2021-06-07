import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDYQ2ZgeW6Y8n9dRo_4f3xKrPceVo6wzIs",
    authDomain: "react-app-cursos-13c85.firebaseapp.com",
    projectId: "react-app-cursos-13c85",
    storageBucket: "react-app-cursos-13c85.appspot.com",
    messagingSenderId: "516871489581",
    appId: "1:516871489581:web:594a52641c5aabd91090a4"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase 
}

