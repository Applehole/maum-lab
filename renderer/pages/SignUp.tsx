import React, { useState } from 'react';
import Head from 'next/head';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
            await createUserWithEmailAndPassword(auth, email, password)
            Router.push("LogIn")
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <React.Fragment>
            <Head>
                <title>New Account - Nextron (with-typescript)</title>
            </Head>
            <div>
                <form onSubmit={(e) => onSubmit(e)}>
                    <input name="email" type="text" placeholder="Email" required value={email} onChange={(e) => onChange(e)} ></input>
                    <input name="password" type="password" placeholder="password" required value={password} onChange={(e) => onChange(e)} ></input>
                    <input type="submit" value="새로운 계정 만들기"></input>
                </form>
                <span>{error}</span>
            </div>
        </React.Fragment>
    );
};

export default Home;
