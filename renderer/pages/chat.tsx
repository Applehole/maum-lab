import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../style/chat.module.css'
import NaviBar from '../Components/NaviBar'
import UserList from '../Components/UserList'
import { collection, onSnapshot, query, orderBy, getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import Router from 'next/router';
import Message from '../Components/Message';

function chat() {
  const [userList, setUserList] = useState([])
  const [userData, setUserData] = useState([])
  const auth = getAuth();
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
          displayName: doc.id,
          ...doc.data(),
        }));
        setUserList(userArray)
        const currentUserArray = userArray.filter((user)=>{
          return user.userId === auth.currentUser?.uid
        })
        setUserData(currentUserArray)
      })
    }
    snapAsync()
  }, [])

  const createChat = () => {
    Router.push("chatList")
  }

  console.log("userData",userData)
  return (
    <div className={styles.ChatCover}>
      <NaviBar />
      <div className={styles.ChatMainCover}>
        <div className={styles.ChatMain}>
          <h2>Chatting Room</h2>
          <button className={styles.ChatCreateButton} onClick={createChat}> 새로운 채팅 만들기 </button>
          {userData.map((user, idx)=>{
            return(
              <div key={idx}>
                <Message user={user} />
              </div>
            )
          })}
          {/* <Message userData={userData} />
          {userData.length ? <Message userData={userData} /> :<div className={styles.ChatNoon}>새로운 채팅을 만들어주세요!</div>} */}
        </div>
      </div>
      <div className={styles.userListCover}>
        <UserList userList={userList} />
      </div>
    </div>
  );
};

export default chat;
