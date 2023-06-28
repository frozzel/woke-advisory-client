import React from 'react'
import Container from './Container'
import NotVerified from './user/NotVerified'
import AppSearchForm from './form/AppSearchForm'
import { useNavigate } from 'react-router-dom'

export default function SchoolHome() {
    const navigate = useNavigate();

    const handleSearchSubmit = (query) => {
        navigate("/school/search?SchoolName=" + query);
      };
    
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
    <Container className="px-2 xl:p-0">
        <NotVerified />
        <AppSearchForm placeholder='Search Schools' inputClassName="border-2 border-dark-subtle p-1 rounded bg-transparent text-sm outline-none focus:border-white transition text-white sm:w-auto w-40 sm:text-lg "
              onSubmit={handleSearchSubmit} />
        </Container>
    </div>
  )
}
