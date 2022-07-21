import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from "../style/home.module.css"
import Router from 'next/router';

function Home() {
  function GoToLogin (){
    Router.push("LogIn")
  }
  function GoToSignUp (){
    Router.push("SignUp")
  }
  return (
    <div className={styles.HomeCover}>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <div className={styles.HomeFrameBox}>
        <div className={styles.HomeFrameIntroduce}>
          안녕하세요. 반갑습니다! <br></br> FireBase기반 채팅앱입니다.
        </div>
        <button onClick={GoToLogin} className={styles.HomeGoToLogin}>
            로그인
        </button>
        <button onClick={GoToSignUp} className={styles.HomeGoToSignUp}>
            회원가입
        </button>
      </div>
    </div>
  );
};

export default Home;
