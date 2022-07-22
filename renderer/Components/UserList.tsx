import styles from '../style/userList.module.css'

function Home({userList}) {

    return (
        <div className={styles.userListCover} >
            <h2 className={styles.userListUserTitle}>로그인한 유저 목록</h2>
            <div className={styles.userListUser}>
                {userList.map((user) => {
                    return (
                        <>
                        {user.online ? 
                            <div className={styles.user} key={user.id}>
                                <div className={styles.userId}>
                                    {user?.displayName || user.userId}
                                </div>
                                <div className={styles.userOnline}>온라인</div>
                            </div>
                            : <></>}
                        </>
                    )

                    
                })}
            </div>
        </div>
    );
};

export default Home;
