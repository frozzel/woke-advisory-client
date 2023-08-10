import React, {useEffect, useState} from 'react'
import Feed from './Feed'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks';
import FeedSearch from './FeedSearch';
import { getProfile } from '../../api/user';
import { useNotification } from "../../hooks";
import Container from '../Container';
import FeedTabs from './FeedTabs';

export default function LinkUp() {

    const { userId } = useParams();
    const { authInfo } = useAuth();
    const { isLoggedIn } = authInfo;
    const { profile } = authInfo;
    const [user, setUser] = useState({});
    const { updateNotification } = useNotification();

    const fetchProfile = async () => {
        const { error, user } = await getProfile(userId);
        
          if (error) return updateNotification("error", error);
        
          setUser(user);
        };

    useEffect(() => {
        if (userId)fetchProfile() && window.scrollTo(0, 0);
        }, [userId]);
    

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
      if (profile.id !== userId) {
        return (<>
          <div className="h-screen flex justify-center items-center dark:bg-primary bg-white ">
          <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          You are not authorized to view this page
          </p>
        </div>
        </>
        )
    }
      if (profile.id === userId) 
    return (
        <>
        <div className="dark:bg-primary bg-white  pb-10 ">
            <Container className="xl:px-0  py-1">
                <div className="lg:grid lg:grid-cols-2 hidden">
                <Feed/>
                <FeedSearch user={user}/>
                </div>
                <div className="lg:hidden">
                    <FeedTabs user={user}/>
                </div>
                
            </Container>
        </div>

        </>
    )
}
