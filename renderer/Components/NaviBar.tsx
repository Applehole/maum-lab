import React from 'react';
import Router from 'next/router';
import styles from '../style/Navi.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faComment , faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";

function Home() {
  const GoToUser = () =>{
    Router.push("user")
  }
  const GoToChat = () =>{
    Router.push("chat")
  }
  const LogOut = () =>{
    const auth = getAuth()
    signOut(auth)
    Router.push("home")
  }
  return (
    <nav className={styles.naviCover}>
      <button onClick={GoToUser} className={styles.naviHomeButton} title="홈">
        <FontAwesomeIcon icon={faHouse} size="3x" />
      </button>
      <button onClick={GoToChat} className={styles.naviChatButton} title="채팅룸">
        <FontAwesomeIcon icon={faComment} size="3x" />
      </button>
      <button onClick={LogOut} className={styles.naviLogOutButton} title="로그아웃">
        <FontAwesomeIcon icon={faRightFromBracket} size="3x" />
      </button>
    </nav>
  );
};

export default Home;
