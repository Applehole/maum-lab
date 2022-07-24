import styles from '../style/messageRoom.module.css'
import Router from 'next/router';

function MessageRoom({ user }) {
    return (
        <div >{
            user.chat.map((el) => {
                const directToChat = () => {
                    Router.push(`${el}`)
                }
                return (
                    <div key={el.id} onClick={directToChat} className={styles.messageCover} >
                        <div>채팅방이름 : {String(el).slice(2)}</div>
                        <div>참여자 이름 : {user.userId}</div>
                        <button>삭제버튼</button>
                    </div>
                )
            })
        }
        </div>
    );
};

export default MessageRoom;
