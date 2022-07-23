import React, { useState, useEffect } from 'react';
import styles from '../style/chatList.module.css'
import NaviBar from '../Components/NaviBar'
import UserList from '../Components/UserList'
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, getFirestore, doc, updateDoc, getDoc } from "firebase/firestore"
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
            //0 체크된 사람이 있는지 확인한다.
            //1 먼저 데이터베이스를 만든다.
            //2 데이터베이스의 이름을 각각의 사람의 채팅방 목록에 넣어준다.
            //3 데이터베이스가 들어있는 칸을 클릭하면 라우팅되면서 해당 채팅창으로 넘어가진다.
            let checkedPerson = [auth.currentUser?.uid]
            for (let i = 1; i < userSideList.length; i++) {
                if (e.target[i].checked) {
                    checkedPerson.push(userSideList[i - 1].userId)
                }
            }
            if (checkedPerson.length > 1) {
                await addDoc(collection(dbService, `${randomNumber}`), { // 데이터베이스에 넣기
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
            <NaviBar />
            <div>
                <div>채팅할 상대를 선택해주세요</div>
                <form onSubmit={(e) => onSubmit(e)}>
                    <input type="submit" value="확인"></input>
                    {userList.map((user) => {
                        return (
                            <div key={user.id}>
                                <input type="checkBox"></input>
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
