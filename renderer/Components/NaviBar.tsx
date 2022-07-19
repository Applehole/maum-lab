import React from 'react';
import Link from 'next/link';


function Home() {

  return (
    <nav>
          <Link href="/home">
            <a>홈</a>
          </Link>
          <Link href="/next">
            <a>채팅창</a>
          </Link>
        </nav>
  );
};

export default Home;
