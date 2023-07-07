import React from 'react'
import { useAuth, useNotification } from "../../hooks";
import { getProfile } from '../../api/user';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../Container';
import UserUpload from '../models/UserUpload';
import ProfileReviewTabs from './ProfileReviewTabs';


const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};



export default function Profile() {
    const [user, setUser] = useState({});
    const { authInfo } = useAuth();
    const { isLoggedIn } = authInfo;
    const { userId } = useParams();
    const { updateNotification } = useNotification();
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

  

    const fetchProfile = async () => {
      const { error, user } = await getProfile(userId);
        if (error) return updateNotification("error", error);

        setUser(user);
      };
    
    const handleOnEditClick = () => {
      const { id, name, bio, avatar} = user;
      
      setSelectedUser({
        id,
        name,
        bio,
        avatar,
      });
      
      setShowEditModal(true);
    };
    const hideEditModal = () => {
      setShowEditModal(false);
      setSelectedUser(null);
    };

    const handleOnUserUpdate = (user) => {
      const updatedUser = {
        ...user,
        name: user.name,
        bio: user.bio,
        avatar: user.avatar,
        
      };
  
      setUser({ ...updatedUser });
  ;
    };
      
    useEffect(() => {
        if (userId)fetchProfile() && window.scrollTo(0, 0);
    }, [userId]);

    const { profile } = authInfo;

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
    const { name, avatar, bio } = user;

    if (userId === profile.id) {
    return (<>
    <div className="dark:bg-primary bg-white min-h-screen pb-10 pt-3">
      <Container className="px-2 xl:p-0">
      <div className=" pt-4 flex ">
        <div className="flex-row lg:flex  space-x-4">
          <div className='mb-4 flex justify-center '>
            {avatar ? (<img
                className=" w-24 h-24 md:min-w-[60px] md:min-h-[60px] md:max-w-[280px] aspect-square object-cover rounded-full "
                src={avatar}
                alt="{name}"
              />):( <div className="flex items-center justify-center w-16 h-16 md:min-w-[60px]  md:max-w-[280px] md:min-h-[60px]  md:max-h-[280px] rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl md:text-4xl select-none">
              {getNameInitial(name? name : profile.name)}
            </div>)
            }
          </div>
          <div className=''>
              <h1 className="text-dark dark:text-white font-semibold text-4xl mb-3 lg:mb-1 flex justify-center lg:justify-normal" >{name}</h1>
              <p className="text-light-subtle dark:text-dark-subtle flex  p-1 mb-3">{bio}</p>
              <button onClick={handleOnEditClick}
                className="h-6 w-24 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition rounded-full "
                type="button">Edit</button>
          </div>
          
        </div>
        
      </div>
      
      {/* <div className='flex-row items-right text-right mr-4 mt-5'>
              <button onClick={handleOnEditClick}
                className="h-6 w-24 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition rounded-full "
                type="button">Edit</button>
        </div> */}
      

      <UserUpload
        visible={showEditModal}
        initialState={selectedUser}
        onSuccess={handleOnUserUpdate}
        onClose={hideEditModal}
      />

        <div className="z-0"><ProfileReviewTabs /></div>
         
      </Container>
      
    </div>
    
    </>
  )
    } else {  
    return (<>
    <div className="dark:bg-primary bg-white min-h-screen pb-10 pt-3">
      <Container className="px-2 xl:p-0">
      <div className=" pt-4 flex ">
        <div className="flex-row lg:flex  space-x-4">
          <div className='mb-4 flex justify-center '>
            {avatar ? (<img
                className="w-24 h-24 md:min-w-[60px] md:min-h-[60px] md:max-w-[280px] aspect-square object-cover rounded-full"
                src={avatar}
                alt="{name}"
              />):( <div className="flex items-center justify-center w-16 h-16 md:min-w-[60px]  md:max-w-[280px] md:min-h-[60px]  md:max-h-[280px] rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl md:text-4xl select-none">
              {getNameInitial(name? name : profile.name)}
            </div>)
            }
          </div>
          <div className=''>
              <h1 className="text-dark dark:text-white font-semibold text-4xl mb-3 lg:mb-1 flex justify-center lg:justify-normal" >{name}</h1>
              <p className="text-light-subtle dark:text-dark-subtle flex  p-1 mb-3">{bio}</p>
          </div>
          
        </div>
        
      </div>
      
      {/* <div className='flex-row items-right text-right mr-4 mt-5'>
              <button onClick={handleOnEditClick}
                className="h-6 w-24 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition rounded-full "
                type="button">Edit</button>
        </div> */}
      

      <UserUpload
        visible={showEditModal}
        initialState={selectedUser}
        onSuccess={handleOnUserUpdate}
        onClose={hideEditModal}
      />

        <div className="z-0"><ProfileReviewTabs /></div>
         
      </Container>
      
    </div>
    
    </>
  )
    }

                
}
