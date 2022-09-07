import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: 'AIzaSyB-e867zKVObWp4xno5RIw4TNIk2qgGon4',

    authDomain: 'dims-e0abc.firebaseapp.com',

    databaseURL: 'https://dims-e0abc-default-rtdb.europe-west1.firebasedatabase.app',

    projectId: 'dims-e0abc',

    storageBucket: 'dims-e0abc.appspot.com',

    messagingSenderId: '1052199020912',

    appId: '1:1052199020912:web:73019d06d9e643654a07b5',

    measurementId: 'G-GXY779PFRW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
export default app;
