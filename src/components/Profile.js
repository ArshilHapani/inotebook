import React, { useEffect, useState } from 'react';

export default  function Profile() {
    const [user, setUser] = useState({});
        useEffect(() => {
                                  
        const getUser = async () => {
            let response = await fetch("http://localhost:3500/api/auth/getuser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("authtoken"),
                },
            })
            let json = await response.json();
            let userData = JSON.parse(JSON.stringify(json));
            for (let index = 0; index < userData.length; index++) {
                const element = userData[index];
                userData.name = element.name;
                userData.email = element.email;
            }
            setUser({
                name: userData.user.name,
                email: userData.user.email,
            });            
            }
            getUser();
        }, [])
        

    return (
        <>
            <div className='profile-wrapper'>
                <div className="profile-container">
                    <div className="userdata">
                        <h2>Name</h2><hr />
                        <h4>{user.name}</h4><br />
                        <h2>Email</h2><hr />
                        <h4>{user.email}</h4>
                    </div>
                </div>
            </div>
        </>
    )
}
