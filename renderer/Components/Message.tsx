import styles from '../style/message.module.css'
import React, { useRef, useEffect } from 'react';
import { getAuth } from "firebase/auth";

function Message({ data }) {
    const auth = getAuth()
    const scrollRef = useRef(null)
    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [data])
    return (
        <div className={styles.messageCover} >
            {data.map((data) => {
                return (
                    data.creatorId === auth.currentUser?.uid ?
                        <div ref={scrollRef} className={styles.messageMine} key={data.id}>
                            <div className={styles.messageMyName} >{`${data.displayName || data.creatorId}님`}</div>
                            <div className={styles.messageMineMessage}>{data.text}</div>
                        </div>
                        :
                        <div ref={scrollRef} className={styles.messageOther} key={data.id}>
                            <div className={styles.messageOtherName} >{`${data.displayName || data.creatorId}님`}</div>
                            <div className={styles.messageOtherMessage}>{data.text}</div>
                        </div>
                )
            })}
        </div>
    );
};

export default Message;
