import React, { useState, useEffect } from 'react';
import styles from '../style/chatList.module.css'
import NaviBar from '../Components/NaviBar'
import UserList from '../Components/UserList'
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, getFirestore, doc, updateDoc } from "firebase/firestore"
import Router from 'next/router';


function chatList() {
    const [userList, setUserList] = useState([])
    const [userSideList, setUserSideList] = useState([])

    const auth = getAuth();
    const dbService = getFirestore();
    useEffect(() => {
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
                const filteredUserArray = userArray.filter((user) => {
                    return user.userId !== auth.currentUser?.uid
                })
                setUserList(filteredUserArray)
            })
        }
        snapAsync()
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const randomNumber = Math.random()
            let checkedPerson = [auth.currentUser?.uid]
            for (let i = 1; i < userSideList.length; i++) {
                if (e.target[i].checked) {
                    checkedPerson.push(userSideList[i - 1].userId)
                }
            }
            if (checkedPerson.length > 1) {
                await addDoc(collection(dbService, `${randomNumber}`), {
                    userId: auth.currentUser?.uid,
                    text: `${auth.currentUser?.uid}님이 ${checkedPerson.slice(1).join(" ")}님을 초대했습니다.`,
                    createdAt: serverTimestamp(),
                })
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
                            chat: doc.id,
                            ...doc.data(),
                        }));

                        for (let i = 0; i < userArray.length; i++) {
                            if (checkedPerson.includes(userArray[i].userId)) {
                                const userStatusChange = doc(dbService, "userOnline", `${userArray[i].id}`);
                                if (userArray[i].chat.includes(randomNumber)) {
                                    continue;
                                }
                                await updateDoc(userStatusChange, {
                                    chat: [...userArray[i].chat, randomNumber]
                                });
                            }
                        }
                    })
                }
                snapAsync();
                Router.push(`${randomNumber}`)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.ChatListCover}>
            <Head>
                <title>ChatList</title>
            </Head>
            <NaviBar />
            <div className={styles.chatListPickCover}>
                <h3>채팅할 상대를 선택해주세요</h3>
                <form onSubmit={(e) => onSubmit(e)}>
                    <input className={styles.chatListPickFormButton} type="submit" value="최종확인"></input>
                    {userList.map((user) => {
                        return (
                            <div className={styles.chatListPickFormDiv} key={user.id}>
                                <input className={styles.chatListPickFormCheckBox} type="checkBox"></input>
                                <div>{user?.displayName || user?.userId}</div>
                            </div>
                        )
                    })}
                </form>
            </div>
            <div className={styles.chatListSideCover}>
                <UserList userList={userSideList} />
            </div>
        </div>
    );
};

export default chatList;
