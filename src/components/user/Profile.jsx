import React from 'react'
import { useAuth, useNotification } from "../../hooks";
import { getProfile } from '../../api/user';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';


export default function Profile() {
    const [user, setUser] = useState({});

    const { authInfo } = useAuth();
    const { isLoggedIn } = authInfo;
    const { userId } = useParams();
    const { updateNotification } = useNotification();

    const fetchProfile = async () => {
        const { error, user } = await getProfile(userId);
        if (error) return updateNotification("error", error);

        setUser(user);

    
      };
    
    useEffect(() => {
        if (userId)fetchProfile() && window.scrollTo(0, 0);
    }, []);

    if (!isLoggedIn) {
        return (<>
          <div className="h-screen flex justify-center items-center dark:bg-primary bg-white ">
          <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          Please Login
          </p>
        </div>
        </>
        )
    }
    


    return (<>
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white ">
      <p className="text-light-subtle dark:text-dark-subtle">
        Profile {user.name}, {user.email}
      </p>
    </div>
  
    </>
  )
}
