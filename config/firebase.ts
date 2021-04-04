import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCIdWQYNXfh2yxeeKGWvsASGMKMWaDg3Fc",
    authDomain: "splitwise-a5623.firebaseapp.com",
    projectId: "splitwise-a5623",
    storageBucket: "splitwise-a5623.appspot.com",
    messagingSenderId: "492904303923",
    appId: "1:492904303923:web:90a2e9f845409a8e3f4246"
};
// Initialize Firebase

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebaseApp.firestore();

const auth = firebaseApp.auth();

export { auth };

export default db;