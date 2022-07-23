import React, { useEffect, useState } from 'react';
import styles from '../style/user.module.css'
import NaviBar from '../Components/NaviBar'
import UserList from '../Components/UserList'
import Head from 'next/head';
import { getAuth, updateProfile } from "firebase/auth";
import { collection, onSnapshot, query, orderBy, getFirestore } from "firebase/firestore"


function user() {
  const auth = getAuth()
  const [userName, setUserName] = useState(auth.currentUser)
  const [input, setInput] = useState("")
  const [userList, setUserList] = useState([])

  useEffect(() => {

    const dbService = getFirestore();
    const q = query(
      collection(dbService, "userOnline"),
      orderBy("createdAt", "desc")
    );
    const snapAsync = async () => {
      onSnapshot(q, async (snapshot) => {
        const userArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          userId: doc.id,
          online: doc.id,
          ...doc.data(),
        }));
        setUserList(userArray)
      })
    }
    snapAsync()
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input !== auth.currentUser?.displayName && input !== auth.currentUser?.uid) {
      await updateProfile(auth.currentUser, {
        displayName: input
      })
      setInput("")
    }
  }

  return (
    <div className={styles.userCover}>
      <Head>
        <title>User Page</title>
      </Head>
      {userName ?
        <>
          <NaviBar />
          <div className={styles.userProfileCover}>
            <h2 className={styles.userProfileTitle}>프로필</h2>
            <form className={styles.userProfileForm} onSubmit={(e) => onSubmit(e)}>
              <div className={styles.userProfileFormName}>유저이름 : {auth.currentUser?.displayName || auth.currentUser?.uid}</div>
              <div className={styles.userProfileFormDiv}>
              <input className={styles.userProfileFormInput} type="text" onChange={(e) => onChange(e)} value={input} placeholder={auth.currentUser?.displayName || auth.currentUser?.uid}></input>
              <input className={styles.userProfileFormButton} type="submit" value="유저 아이디 변경하기" ></input>
              </div>
            </form>
          </div>
          <div className={styles.userListCover}>
            <UserList userList={userList} />
          </div>
        </>
        : <div>다시 로그인 해야합니다.</div>
      }
    </div>
  );
};

export default user;
