import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import styles from '../style/Navi.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faComment, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, orderBy, getFirestore, doc, updateDoc } from "firebase/firestore"

function NaviBar() {
  const GoToUser = () => {
    Router.push("user")
  }
  const GoToChat = () => {
    Router.push("chat")
  }
  const auth = getAuth()
  const dbService = getFirestore();
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user)
      }
    })
  }, [])


  const LogOut = () => {
    try {
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

        let filterUserArray = userArray.filter((el) => {
          return el.userId === userInfo.uid
        })
        const userChange = doc(dbService, "userOnline", `${filterUserArray[0]?.id}`);
        await updateDoc(userChange, {
          online: false
        });
      });
      signOut(auth)
      Router.push("home")
    } catch (err) {
      console.log(err)
    }
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

export default NaviBar;
