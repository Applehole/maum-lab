import React, { useState } from 'react';
import Head from 'next/head';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Router from 'next/router';
import styles from '../style/Login.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, getFirestore, doc, updateDoc } from "firebase/firestore"

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
    const dbService = getFirestore();
    try {
      await signInWithEmailAndPassword(auth, email, password)

      const loginQ = query(
        collection(dbService, "userOnline"),
        orderBy("createdAt", "desc")
        );
      onSnapshot(loginQ, async (snapshot) =>  {
          const userArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          userId : doc.id,
          online : doc.id,
          displayName : doc.id,
          ...doc.data(),
          }));
          console.log("userArray",userArray)
          let filterUserArray = userArray.filter((el) => {
            return el.userId === auth.currentUser?.uid
          })
          console.log("filterUserArray",filterUserArray.length)
          if(filterUserArray.length){
            const userStatusChange = doc(dbService, "userOnline", `${filterUserArray[0].id}`);
            await updateDoc(userStatusChange,{
              online: true,
              displayName: auth.currentUser?.displayName,
            });
          }else{
            await addDoc(collection(dbService,"userOnline"),{ // 데이터베이스에 넣기
              userId : auth.currentUser?.uid,
              displayName: auth.currentUser?.displayName,
              online : true ,
              chat : [],
              createdAt: serverTimestamp(),
            })
          }
        });

      Router.push("user")
    } catch (err) {
      setError(err.message);
    }
  }
  const backButton = () =>{
    Router.back()
}


  return (
    <div className={styles.LoginCover}>
      <Head>
        <title>Login - Nextron (with-typescript)</title>
      </Head>
      <div className={styles.LoginFrameBox}>
        <div className={styles.LoginTitle}>Login</div>
        <button onClick={backButton} className={styles.LoginBack}>
        <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
        </button>
        <div className={styles.LoginDiv}>
          <form className={styles.LoginForm} onSubmit={(e) => onSubmit(e)}>
            <div className={styles.LoginFormIdDiv}>
              <FontAwesomeIcon className={styles.LoginFormIdIcon} icon={faUser} size="2x" />
              <input className={styles.LoginFormIdInput} name="email" type="text" placeholder="Email" required value={email} onChange={(e) => onChange(e)} ></input>
            </div>
            <div className={styles.LoginFormPWDiv}>
              <FontAwesomeIcon className={styles.LoginFormPWIcon} icon={faLock} size="2x" />
              <input className={styles.LoginFormPWInput} name="password" type="password" placeholder="password" required value={password} onChange={(e) => onChange(e)} ></input>
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
