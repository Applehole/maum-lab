import React, { useEffect, useState } from 'react';


function Home({userList}) {

    return (
        <div>
            <div>로그인한 유저 목록</div>
            <div>
                {userList.map((user) => {
                    return (
                        <div key={user.id}>
                            {user.online ?
                                <div>
                                    {user?.displayName || user.userId}
                                </div> : <></>}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Home;
