import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../style/user.module.css'
import NaviBar from '../Components/NaviBar'
import { getAuth, updateProfile } from "firebase/auth";


function user() {
    const auth = getAuth()
    const [userName, setUserName] = useState(auth.currentUser)
    const [input, setInput] = useState("")
    console.log(auth.currentUser)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setInput(e.target.value)
    }

    const onSubmit = async (e: React.FormEvent) =>{
      e.preventDefault();
      if(input !== auth.currentUser?.displayName && input !== auth.currentUser?.uid){
        await updateProfile(auth.currentUser,{
          displayName : input
        })
        setInput("")
      }
    }

  return (
    <div className={styles.userCover}>
    { userName ?
    <>
      <NaviBar />
      <div>
        <div>유저 공간이야!</div>
        <form onSubmit={(e)=>onSubmit(e)}>
        <input type="text" onChange={(e)=>onChange(e)} value={input} placeholder={auth.currentUser?.displayName|| auth.currentUser?.uid}></input>
        <input type="submit" value="유저 아이디 변경하기" ></input>
        </form>
        <div>유저이름 </div>
      </div>
      <div className={styles.userListCover}>여긴 유저 목록이 보이는 곳이야</div>
    </>
    :<div>다시 로그인 하셔야 할듯한데요?</div>
    }
    </div>
  );
};

export default user;
