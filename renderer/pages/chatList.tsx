import React, { useState, useEffect } from 'react';
import styles from '../style/chatList.module.css'
import NaviBar from '../Components/NaviBar'
import UserList from '../Components/UserList'
import { getAuth } from "firebase/auth";
import { collection, onSnapshot, query, orderBy, getFirestore } from "firebase/firestore"

function chatList() {
    const [userList, setUserList] = useState([])
    const [userSideList, setUserSideList] = useState([])

    useEffect(() => {
        const auth = getAuth();
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
                setUserSideList(userArray)
                const filteredUserArray = userArray.filter((user)=>{
                    return user.userId !==auth.currentUser?.uid
                })
                setUserList(filteredUserArray)
            })
        }
        snapAsync()
    }, [])
    return (
        <div className={styles.ChatListCover}>
            <NaviBar />
            <div>
                <div>채팅할 상대를 선택해주세요</div>
                <button>확인</button>
                {userList.map((user) => {
                    return (
                        <div key={user.userId}>
                            <input type="checkBox"></input>
                            <div>{user?.displayName || user?.userId}</div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.chatListSideCover}>
            <UserList userList={userSideList} />
            </div>
        </div>
    );
};

export default chatList;
