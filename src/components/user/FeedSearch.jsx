import React from 'react'
import AppSearchForm from "../form/AppSearchForm";
import { searchUser } from '../../api/post';
import {  useNotification } from "../../hooks";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../Container';
import NotFoundText from '../NotFoundText';
import UserList from "./UserList";
import UserFollowSchool from './UserFollowSchool';
import UserFollowTeacher from './UserFollowTeacher';
import UserFollowers from './UserFollowers';
import UserFollowing from "./UserFollowing";

export default function FeedSearch({user}) {
    const [query, setQuery] = React.useState("Creator");
    const [teachers, setTeachers] = React.useState([]);
    const [resultNotFound, setResultNotFound] = React.useState(false);

    const { userId } = useParams();
    
    
    const { updateNotification } = useNotification();
    const handleSearchSubmit = (query) => {
        setQuery(query);
    };
  
    const searchUsers = async (query, userId) => {
        const { error, results } = await searchUser(query, userId);
        if (error) return updateNotification("error", error);
        if (!results.length) {
            setResultNotFound(true);

            return setTeachers([]);
        }
        
        setResultNotFound(false);
        setTeachers([...results]);
    };

    useEffect(() => {
        if (query.trim()) searchUsers(query, userId);

    }, [query, userId]);



  return (
    <>
    <div className="dark:bg-primary bg-white  pb-10">
      <Container className="xl:px-0 px-2 ">
        <div className='pt-2'>
        <AppSearchForm
            onSubmit={handleSearchSubmit}
            placeholder="Search Username..."
            inputClassName="border-2 border-light-subtle dark:border-dark-subtle  p-1 rounded bg-transparent text-sm outline-none focus:border-secondary focus:dark:border-white transition text-light-subtle dark:text-white w-30 md:w-30 sm:w-auto  sm:text-sm"
          />
        </div>
      
          <SearchTeachers 
            query={query}
            resultNotFound={resultNotFound}
            schools={teachers}/>
            <UserFollowing user={user.following}/>
            <UserFollowers user={user.followers} />
            <UserFollowSchool user={user.schoolsFollowing}/>
            <UserFollowTeacher user={user.teachersFollowing}/>
            </Container>
            </div>
    </>
  )
}
const SearchTeachers= ({query, schools, resultNotFound}) =>{
    return (<>
      <div className="dark:bg-primary bg-white  py-8">
      <Container className="px-2 xl:p-0">
      {query ? (<>
         <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-4">
         Search Results:  <span className="text-light-subtle dark:text-dark-subtle"> <span></span> "{query}<span>"</span></span></h1>
        <NotFoundText text="Record not found!" visible={resultNotFound} />
        <UserList schools={schools}  />
        </>):(null)}
        
      </Container>
      </div>
    
    
    </>
    )
    }