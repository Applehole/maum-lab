import React, { useState } from 'react';
import Head from 'next/head';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Router from 'next/router';

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
    <React.Fragment>
      <Head>
        <title>Login - Nextron (with-typescript)</title>
      </Head>
      <div>
        <div>
          <form onSubmit={(e) => onSubmit(e)}>
            <input name="email" type="text" placeholder="Email" required value={email} onChange={(e) => onChange(e)} ></input>
            <input name="password" type="password" placeholder="password" required value={password} onChange={(e) => onChange(e)} ></input>
            <input type="submit" value="로그인 하기"></input>
          </form>
          <span>{error}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
