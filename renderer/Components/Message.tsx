import styles from '../style/message.module.css'
import Router from 'next/router';

function Message({ data }) {
    return (
        <div className={styles.messageCover} >
            {data.map((data)=>{
                return (
                    <div>{data.text}</div>
                )
            })}
        </div>
    );
};

export default Message;
