import React from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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
const fire = initializeApp(firebaseConfig);
const analytics = getAnalytics(fire);
// Initialize Firebase Authentication and get a reference to the service
export const db = getFirestore(fire);
const auth = getAuth(fire);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(fire);
export default fire;
