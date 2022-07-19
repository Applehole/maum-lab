import React, { useState } from 'react';
import Head from 'next/head';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Router from 'next/router';
import styles from '../style/Login.module.css'

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmail(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password)
      Router.push("next")
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className={styles.LoginCover}>
      <Head>
        <title>Login - Nextron (with-typescript)</title>
      </Head>
      <div className={styles.LoginFrameBox}>
        <div className={styles.LoginTitle}>Login</div>
        <div className={styles.LoginDiv}>
          <form className={styles.LoginForm} onSubmit={(e) => onSubmit(e)}>
            <div className={styles.LoginFormIdDiv}>
            <input name="email" type="text" placeholder="Email" required value={email} onChange={(e) => onChange(e)} ></input>
            </div>
            <div className={styles.LoginFormPWDiv}>
            <input name="password" type="password" placeholder="password" required value={password} onChange={(e) => onChange(e)} ></input>
            </div>
            <input className={styles.LoginFormButton} type="submit" value="로그인 하기"></input>
          </form>
          <span className={styles.LoginError}>{error}</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
