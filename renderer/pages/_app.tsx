import React from 'react';
import { AppProps } from 'next/dist/shared/lib/router/router'
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/auth';
import 'firebase/firestore'
import "../style/global.css";
import dotenv from "dotenv";
dotenv.config();

function App({Component, pageProps}: AppProps) {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID
  };
  
  // Initialize Firebase
  
  const fbase = initializeApp(firebaseConfig);
  return (
      <div>
        <Component {...pageProps} />
      </div>
  );
};

export default App;