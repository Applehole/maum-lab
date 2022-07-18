import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getAuth } from "firebase/auth";


function Home() {
  const auth = getAuth();
  console.log("!@#",auth);
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <img src="/images/logo.png" />
      </div>
    </React.Fragment>
  );
};

export default Home;
