import React, { useEffect, useState } from 'react';
import styles from '../style/user.module.css'
import NaviBar from '../Components/NaviBar'
import UserList from '../Components/UserList'
import { getAuth, updateProfile } from "firebase/auth";
import { collection, onSnapshot, query, orderBy, getFirestore, doc, updateDoc } from "firebase/firestore"


function user() {
    const auth = getAuth()
    const [userName, setUserName] = useState(auth.currentUser)
    const [input, setInput] = useState("")
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

    console.log("userList",userList)

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
      <div className={styles.userListCover}>
       <UserList userList={userList} />
      </div>
    </>
    :<div>다시 로그인 하셔야 할듯한데요?</div>
    }
    </div>
  );
};

export default user;
