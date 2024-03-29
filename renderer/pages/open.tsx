import React, { useState, useEffect } from 'react';
import styles from '../style/detail.module.css'
import { useRouter } from 'next/router';
import NaviBar from '../Components/NaviBar'
import UserList from '../Components/UserList'
import Message from '../Components/Message'
import { collection, onSnapshot, query, orderBy, getFirestore, addDoc, serverTimestamp } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import Head from 'next/head';

function open() {
  const router = useRouter();
  const [msg, setMsg] = useState("")
  const [userList, setUserList] = useState([])
  const [idMessage, setIdMessage] = useState([])

  const onChange = (e) => {
    setMsg(e.target.value)
  }

  const auth = getAuth();
  const dbService = getFirestore();
  const q = query(
    collection(dbService, "userOnline"),
    orderBy("createdAt", "desc")
  );
  const getTweetData = query(
    collection(dbService, "openChat"),
    orderBy("createdAt", "asc")
  );

  useEffect(() => {
    const snapAsync = async () => {
      onSnapshot(q, async (snapshot) => {
        const userArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          userId: doc.id,
          online: doc.id,
          displayName: doc.id,
          ...doc.data(),
        }));
        setUserList(userArray)
      })
    }
    snapAsync()

    const snap = async () => {
      onSnapshot(getTweetData, async (snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.id,
          creatorId: doc.id,
          ...doc.data(),
        }));
        setIdMessage(tweetArray)
      })
    }
    snap();
  }, [])

  const checkOnClick = async (e) => {
    e.preventDefault();
    await addDoc(collection(dbService, "openChat"), { // 데이터베이스에 넣기
      text: msg,
      createdAt: serverTimestamp(),
      creatorId: auth.currentUser?.uid,
      displayName: auth.currentUser?.displayName,
    })
    setMsg("")
  }

  return (
    <div className={styles.detailCover}>
      <Head>
        <title>Open Chatting Room</title>
      </Head>
      <NaviBar />
      <div className={styles.messageCover}>
        <h3 className={styles.messageTitleCover} >Open Chatting Room</h3>
        <Message data={idMessage} />
        <form className={styles.messageFormCover} onSubmit={(e) => checkOnClick(e)}>
          <div className={styles.messageFormDivCover}>
            <input className={styles.messageInput} onChange={(e) => onChange(e)} type="text" value={msg} placeholder="여기에 작성하세요"></input>
            <input className={styles.messageButton} type="submit" value="메세지보내기"></input>
          </div>
        </form>
      </div>
      <div className={styles.userListCover}>
        <UserList userList={userList} />
      </div>
    </div>
  );
};

export default open;
