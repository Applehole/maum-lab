import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../style/chat.module.css'
import NaviBar from '../../Components/NaviBar'


function chat() {
  return (
    <div className={styles.ChatCover}>
      <NaviBar />
      채팅룸이야!
    </div>
  );
};

export default chat;
