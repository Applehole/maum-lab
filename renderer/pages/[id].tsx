import React, { useState } from 'react';
import styles from '../style/detail.module.css'
import Router from 'next/router';

function detail() {
  const [msg, setMsg] = useState("")

  const onChange =(e) =>{
    setMsg(e.target.value)
  }

  const checkOnClick = () =>{
    
  }
  console.log(Router)

  return (
    <div className={styles.detailCover}>
      채팅하는곳이야!
      <div>채팅</div>
      <input onChange={(e)=>onChange(e)} type="text" value={msg}></input>
      <button onClick={checkOnClick}></button>
    </div>
  );
};

export default detail;