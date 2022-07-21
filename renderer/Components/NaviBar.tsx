import React from 'react';
import Router from 'next/router';
import styles from '../style/Navi.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faComment, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";
import { collection, onSnapshot, query, orderBy, getFirestore, doc, updateDoc } from "firebase/firestore"

function Home() {
  const GoToUser = () => {
    Router.push("user")
  }
  const GoToChat = () => {
    Router.push("chat")
  }
  const LogOut = () => {
    const auth = getAuth()
    const dbService = getFirestore();

    const q = query(
      collection(dbService, "userOnline"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, async (snapshot) => {
      const userArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        userId: doc.id,
        online: doc.id,
        ...doc.data(),
      }));
      console.log("userArray",userArray)

      let filterUserArray = userArray.filter((el) => {
        console.log("el.userId",el.userId)
        console.log("auth.currentUser?.uid", auth.currentUser?.uid)
        console.log("el.userId === auth.currentUser?.uid",el.userId === auth.currentUser?.uid)
        return el.userId === auth.currentUser?.uid
      })
      console.log("filterUserArray",filterUserArray)
      if(filterUserArray){
        const userStatusChange = doc(dbService, "userOnline", `${filterUserArray[0].id}`);
        await updateDoc(userStatusChange, {
          online: false
        });
      }
    });
    console.log("3",auth)
    console.log("4",auth)
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
