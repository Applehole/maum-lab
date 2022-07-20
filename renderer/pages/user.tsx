import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../style/user.module.css'
import NaviBar from '../Components/NaviBar'


function user() {
  return (
    <div className={styles.userCover}>
      <NaviBar />
      <div>여기가 유저 공간이야!</div>
      <div>여긴 유저 목록이 보이는 곳이야</div>
    </div>
  );
};

export default user;
