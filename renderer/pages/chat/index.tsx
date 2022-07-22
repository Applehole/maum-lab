import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../style/chat.module.css'
import NaviBar from '../../Components/NaviBar'
import UserList from '../../Components/UserList'
import { collection, onSnapshot, query, orderBy, getFirestore, doc, updateDoc } from "firebase/firestore"

function chat() {
  const [userList, setUserList] = useState([])

  useEffect(()=>{

    const dbService = getFirestore();
    const q = query(
      collection(dbService, "userOnline"),
      orderBy("createdAt", "desc")
    );
    const snapAsync = async ()=>{
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
  },[])
  return (
    <div className={styles.ChatCover}>
      <NaviBar />
      채팅룸이야!
      <div className={styles.userListCover}>
      <UserList userList={userList} />
      </div>
    </div>
  );
};

export default chat;
