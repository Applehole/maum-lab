import React, { useState, useEffect } from 'react';
import styles from '../style/detail.module.css'
import { useRouter } from 'next/router';
import NaviBar from '../Components/NaviBar'
import UserList from '../Components/UserList'
import Message from '../Components/Message'
import { collection, onSnapshot, query, orderBy, getFirestore, addDoc, serverTimestamp } from "firebase/firestore"
import { getAuth } from "firebase/auth";

function detail() {
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
    collection(dbService, `${String(router.query.id)}`),
    orderBy("createdAt","asc")
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
    await addDoc(collection(dbService,`${String(router.query.id)}`),{ // 데이터베이스에 넣기
      text: msg,
      createdAt: serverTimestamp(),
      creatorId : auth.currentUser?.uid
    })
  }

  return (
    <div className={styles.detailCover}>
      <NaviBar />
      <div className={styles.messageCover}>
        <h3 className={styles.messageTitleCover} >{`${String(router.query.id).slice(2)}번 채팅방`}</h3>
        <Message data={idMessage} />
        <form className={styles.messageFormCover} onSubmit={(e) => checkOnClick(e)}>
          <input onChange={(e) => onChange(e)} type="text" value={msg} placeholder="여기에 작성하세요"></input>
          <input type="submit" value="메세지보내기"></input>
        </form>
      </div>
      <div className={styles.userListCover}>
        <UserList userList={userList} />
      </div>
    </div>
  );
};

export default detail;
