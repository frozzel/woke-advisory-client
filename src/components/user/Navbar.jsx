import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import Container from "../Container";
import {Link} from "react-router-dom"
import { useTheme } from "../../hooks";
import { useAuth } from "../../hooks";
import { FiLogOut } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AppSearchForm from "../form/AppSearchForm";


export default function Navbar() {
  const {toggleTheme} = useTheme();
  const {authInfo, handleLogout} = useAuth()
  const {isLoggedIn} = authInfo;
  const navigate = useNavigate();

  const handleSearchSubmit = (query) => {
    navigate("/movie/search?title=" + query);
  };
  
  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <Container className="p-1">
        <div className="flex justify-between items-center">
          <Link to="/">
          <h1> <span className="lg:text-2xl md:text-xl sm:text-xs font-semibold dark:text-white text-dark  dark:bg-transparent bg-white font-Anton "> WOKE </span><span className="lg:text-2xl md:text-xl sm:text-xs font-semibold dark:bg-white bg-secondary dark:text-secondary text-white"> ADVISORY </span></h1>
          {/* <img src="./logo.png" alt="" className="h-12" /> */}
          </Link>
          <ul className="flex items-center sm:space-x-4 space-x-2 lg:text-xl md:text-lg sm:text-xs">
            <li >
              <button onClick={toggleTheme} className="dark:bg-white bg-dark-subtle p-1 rounded sm:text-2xl text-lg">
                <BsFillSunFill className="text-secondary "   />
              </button>
            </li>
            <li>
              <AppSearchForm placeholder='Search' inputClassName="border-2 border-dark-subtle p-1 rounded bg-transparent text-sm outline-none focus:border-white transition text-white sm:w-auto w-40 sm:text-lg "
              onSubmit={handleSearchSubmit} />
              {/* <input
                type="text"
                className="border-2 border-dark-subtle p-1 rounded bg-transparent text-sm outline-none focus:border-white transition text-white"
                placeholder="search..."
              /> */}
            </li>
            <li className="pr-1">
            {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  // className="text-white font-semibold text-lg pt-1"
                  className="flex items-center text-dark-subtle text-lg hover:text-white transition space-x-1"
                ><FiLogOut />
                  <span>
                    Logout
                  </span>
                </button>
              ) : (
                <Link
                  // className="text-white font-semibold text-lg pt-1"
                  className="flex items-center text-dark-subtle text-lg hover:text-white transition space-x-1"
                  to="/auth/signIn"
                ><FiLogIn />
                <span>
                  Login     
                </span>
                  
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
