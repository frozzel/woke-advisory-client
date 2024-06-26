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
import { useState } from "react";
import {CgProfile} from "react-icons/cg";
import {TbMessageHeart} from "react-icons/tb";
import { Tooltip } from "@material-tailwind/react";
import { AiFillHome } from "react-icons/ai";
import { FaSchool } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";


export default function Navbar() {
  const {toggleTheme} = useTheme();
  const {authInfo, handleLogout} = useAuth()
  const {isLoggedIn} = authInfo;
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { profile } = authInfo;

  const handleSearchSubmit = (query) => {
    navigate("/movie/search?title=" + query);
  };
  
  return (
    <div className="bg-secondary shadow-sm shadow-gray-500 sticky top-0 z-30">
      <Container className="p-1 ">
        <div className="flex justify-between items-center ">
          <Link to="/">
          <h1> <span className="lg:text-2xl md:text-xl sm:text-xs font-semibold dark:text-white text-dark  dark:bg-transparent bg-white font-Anton "> WOKE </span><span className="lg:text-2xl md:text-xl sm:text-xs font-semibold dark:bg-white bg-secondary dark:text-secondary text-white"> ADVISORY </span></h1>
          {/* <img src="./logo.png" alt="" className="h-12" /> */}
          </Link>
          <ul className="flex items-center sm:space-x-2 space-x-1 lg:text-xl md:text-lg sm:text-xs">
            <li >
              <button onClick={toggleTheme} className=" p-1 rounded text-sm lg:text-lg">
                <BsFillSunFill className="text-white dark:text-dark-subtle"   />
              </button>
            </li>
            <li>
              <AppSearchForm placeholder='Search' inputClassName="border-2 border-dark-subtle pr-1 rounded bg-transparent text-sm outline-none focus:border-white transition text-white sm:w-auto w-40 text-sm lg:text-md  "
              onSubmit={handleSearchSubmit} />
              {/* <input
                type="text"
                className="border-2 border-dark-subtle p-1 rounded bg-transparent text-sm outline-none focus:border-white transition text-white"
                placeholder="search..."
              /> */}
            </li>

            </ul>

            <nav>
              <section className="MOBILE-MENU flex lg:hidden">
                <div
                  className="HAMBURGER-ICON space-y-2"
                  onClick={() => setIsNavOpen((prev) => !prev)}
                >
                  <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                  <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                  <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                </div>

                <div className={isNavOpen ? "showMenuNav bg-white dark:bg-secondary ": "hideMenuNav"}>
                  <div
                    className="absolute top-0 right-0 px-8 py-8 "
                    onClick={() => setIsNavOpen(false)}
                  >
                    <svg
                      className="h-8 w-8 text-gray-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                  <ul className="flex flex-col  min-h-[250px]">
                  <li>
                    <Link
                        className="flex items-center text-light-subtle dark:text-dark-subtle text-6xl transition space-x-1 mb-4"
                        onClick={() => setIsNavOpen(false)}
                        to={"/"}><AiFillHome /><span>Home</span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                        className="flex items-center text-light-subtle dark:text-dark-subtle text-6xl transition space-x-1 mb-4"
                        onClick={() => setIsNavOpen(false)}
                        to={"/school/home"}><FaSchool /><span>Schools</span>
                    </Link>
                  </li> */}
                  <li>
                    <Link
                        className="flex items-center text-light-subtle dark:text-dark-subtle text-6xl transition space-x-1 mb-4"
                        onClick={() => setIsNavOpen(false)}
                        to={"/movie/home"}><BiSolidCameraMovie /><span>Movies</span>
                    </Link>
                  </li>
                    <li >
                  {isLoggedIn ? (<>
                    <Link
                className="flex items-center text-light-subtle dark:text-dark-subtle text-6xl transition space-x-1 mb-4"
                onClick={() => setIsNavOpen(false)}
                to={"/profile/" + profile?.id}><CgProfile /><span>Profile</span></Link>
                <Link
                className="flex items-center text-light-subtle dark:text-dark-subtle text-6xl transition space-x-1 mb-4"
                onClick={() => setIsNavOpen(false)}
                to={"/linkup/" + profile?.id}><TbMessageHeart /><span>Linkup</span></Link>
                </>
                  ) : ( null
                  )}

                </li>
                <li className="pr-1">
                {isLoggedIn ? (<>
                <button
                  onClick={handleLogout}
                  // className="text-white font-semibold text-lg pt-1"
                  className="flex items-center text-light-subtle dark:text-dark-subtle text-6xl transition space-x-1 mb-4"
                ><FiLogOut />
                  <span>
                    Logout
                  </span>
                </button></>
                ) : (
                <Link
                  // className="text-white font-semibold text-lg pt-1"
                  className="flex items-center text-light-subtle dark:text-dark-subtle text-6xl transition space-x-1 mb-4"
                  to="/auth/signIn"
                  onClick={() => setIsNavOpen(false)}
                ><FiLogIn />
                <span>
                  Login     
                </span>
                  
                </Link>
              )}
                </li>
                  </ul>
                </div>
              </section>

              <ul className="DESKTOP-MENU hidden space-x-8 lg:flex ">
                <li className="place-self-center "> 
                <Tooltip content="Home" className="z-40 bg-secondary rounded-full" placement="bottom">
                    <Link
                    className="flex  place-self-center text-dark-subtle text-lg hover:text-white transition space-x-1"
                    to={"/"}><AiFillHome />
                    </Link>
                </Tooltip>
                </li>
                {/* <li className="place-self-center "> 
                <Tooltip content="Schools" className="z-40 bg-secondary rounded-full" placement="bottom">
                    <Link
                    className="flex  place-self-center text-dark-subtle text-lg hover:text-white transition space-x-1"
                    to={"/school/home"}><FaSchool />
                    </Link>
                </Tooltip>
                </li> */}
                <li className="place-self-center "> 
                <Tooltip content="Movies" className="z-40 bg-secondary rounded-full" placement="bottom">
                    <Link
                    className="flex  place-self-center text-dark-subtle text-lg hover:text-white transition space-x-1"
                    to={"/movie/home"}><BiSolidCameraMovie />
                    </Link>
                </Tooltip>
                </li>
                
                  {isLoggedIn ? (<>
                    <li className="place-self-center "> 
                        <Tooltip content="Profile" className="z-40 bg-secondary rounded-full" placement="bottom">
                            <Link
                            className="flex  place-self-center text-dark-subtle text-lg hover:text-white transition space-x-1"
                            to={"/profile/" + profile?.id}><CgProfile />
                            </Link>
                        </Tooltip>
                    </li>
                    <li className="place-self-center ">
                        <Tooltip content="Linkup" className="z-40 bg-secondary rounded-full" placement="bottom">
                            <Link
                            className="flex  place-self-center text-dark-subtle text-lg hover:text-white transition space-x-1"
                            to={"/linkup/" + profile?.id}><TbMessageHeart />
                            </Link>
                        </Tooltip>
                    </li>
                
                </>
                  ) : ( null
                  )}

                
                <li className="pr-1 place-self-center">
                {isLoggedIn ? (<>
                  <Tooltip content="Logout" className="z-40 bg-secondary rounded-full" placement="bottom">
  
                        
                <button
                  onClick={handleLogout}
                  // className="text-white font-semibold text-lg pt-1"
                  className="flex items-center text-dark-subtle text-lg hover:text-white transition space-x-1"
                ><FiLogOut />
              
                </button>
                </Tooltip>
                </>
                ) : (
                  <Tooltip content="Login" className="z-40 bg-secondary rounded-full" placement="bottom">
                <Link
                  // className="text-white font-semibold text-lg pt-1"
                  className="flex items-center text-dark-subtle text-lg hover:text-white transition space-x-1"
                  to="/auth/signIn"
                ><FiLogIn />
                </Link>
                </Tooltip>
              )}
                </li>
 
                {/* <li>
                  <a href="/contact">Contact</a>
                </li> */}
              </ul>
            </nav>


        
        </div>
      </Container>
    </div>
  );
}
