import styles from '../style/messageRoom.module.css'
import Router from 'next/router';
import { doc, updateDoc, getFirestore } from "firebase/firestore";

function MessageRoom({ user }) {
    const dbService = getFirestore();
    const ChatRef = doc(dbService, "userOnline", `${user.id}`);

    return (
        <div >{
            user.chat.map((el) => {
                const directToChat = () => {
                    Router.push(`${el}`)
                }
                const onClick = async (e) =>{
                    e.stopPropagation()
                    let filteredChattingRoom = user.chat.filter((each)=>{
                        return each !== el
                    })
                    await updateDoc(ChatRef,{
                        chat: filteredChattingRoom
                      });
                }
                return (
                    <div key={el.id} onClick={directToChat} className={styles.messageCover} >
                        <div>채팅방이름 : {String(el).slice(2)}</div>
                        <div>참여자 이름 : {user.userId}</div>
                        <button onClick={(e)=>onClick(e)} className={styles.messageDelete}>삭제</button>
                    </div>
                )
            })
        }
        </div>
    );
};

export default MessageRoom;
