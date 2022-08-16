import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-e867zKVObWp4xno5RIw4TNIk2qgGon4",
  authDomain: "dims-e0abc.firebaseapp.com",
  projectId: "dims-e0abc",
  storageBucket: "dims-e0abc.appspot.com",
  messagingSenderId: "1052199020912",
  appId: "1:1052199020912:web:73019d06d9e643654a07b5",
  measurementId: "G-GXY779PFRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
<BrowserRouter>
    <App />
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
