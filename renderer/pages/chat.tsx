import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../style/chat.module.css'
import NaviBar from '../Components/NaviBar'
import UserList from '../Components/UserList'
import { collection, onSnapshot, query, orderBy, getFirestore, doc, updateDoc } from "firebase/firestore"
import Router from 'next/router';

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
          displayName : doc.id,
          ...doc.data(),
        }));
        setUserList(userArray)
      })
    }
    snapAsync()
  },[])

  const createChat = () =>{
    Router.push("chatList")
  }

  return (
    <div className={styles.ChatCover}>
      <NaviBar />
      <div>
        <div>여기는 채팅룸입니다</div>
        <button onClick={createChat}> 새로운 채팅 만들기 </button>
      </div>
      <div className={styles.userListCover}>
      <UserList userList={userList} />
      </div>
    </div>
  );
};

export default chat;
