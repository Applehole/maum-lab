import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../style/user.module.css'
import NaviBar from '../Components/NaviBar'
import { getAuth, updateProfile } from "firebase/auth";


function user() {
    const auth = getAuth()
    // const [userName, setUserName] = useState(auth.currentUser.displayName)
    console.log(auth.currentUser)
    // console.log(userName)
  return (
    <div className={styles.userCover}>
      <NaviBar />
      <div>
        <div>유저 공간이야!</div>
        <div>유저이름 </div>
      </div>
      <div className={styles.userListCover}>여긴 유저 목록이 보이는 곳이야</div>
    </div>
  );
};

export default user;
