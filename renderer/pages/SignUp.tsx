import React, { useState } from 'react';
import Head from 'next/head';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Router from 'next/router';
import styles from '../style/SignUp.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
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

    const backButton = () =>{
        Router.back()
    }

    return (
        <div className={styles.SignUpCover}>
      <Head>
        <title>SignUp Page</title>
      </Head>
      <div className={styles.SignUpFrameBox}>
        <div className={styles.SignUpTitle}>SignUp</div>
        <button onClick={backButton} className={styles.SignUpBack}>
        <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
        </button>
        <div className={styles.SignUpDiv}>
          <form className={styles.SignUpForm} onSubmit={(e) => onSubmit(e)}>
            <div className={styles.SignUpFormIdDiv}>
              <FontAwesomeIcon className={styles.SignUpFormIdIcon} icon={faUser} size="2x" />
              <input className={styles.SignUpFormIdInput} name="email" type="text" placeholder="Email" required value={email} onChange={(e) => onChange(e)} ></input>
            </div>
            <div className={styles.SignUpFormPWDiv}>
              <FontAwesomeIcon className={styles.SignUpFormPWIcon} icon={faLock} size="2x" />
              <input className={styles.SignUpFormPWInput} name="password" type="password" placeholder="password" required value={password} onChange={(e) => onChange(e)} ></input>
            </div>
            <input className={styles.SignUpFormButton} type="submit" value="회원가입"></input>
          </form>
          <span className={styles.SignUpError}>{error}</span>
        </div>
      </div>
    </div>
    );
};

export default SignUp;
