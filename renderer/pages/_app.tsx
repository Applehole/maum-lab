import React from 'react';
import Link from 'next/link';
import { AppProps } from 'next/dist/shared/lib/router/router'
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
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
  const auth = getAuth();
  console.log(auth);
  return (
    <React.Fragment>
      <div>
        <nav>
          <Link href="/home">
            <a>홈</a>
          </Link>
          <Link href="/next">
            <a>채팅창</a>
          </Link>
        </nav>
        <Component {...pageProps} />
      </div>
      </React.Fragment>
  );
};

export default App;