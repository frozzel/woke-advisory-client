import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import {BiCameraMovie} from "react-icons/bi";
import { FaUserNinja } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../hooks";


export default function Navbar() {
  const {handleLogout} = useAuth()
  return (
    <nav className="w-48 min-h-screen bg-secondary border-r border-gray-300 ">
        <div className="flex flex-col justify-between pl-5 h-screen pr-5 sticky top-0">
      <ul className="">
        <li className="mb-5 mt-5">
          <Link to="/">
            <img src="./logo.png" alt="logo" className="w-100 pt-2" />
            {/* <h1 className="p-2  text-center text-2xl font-semibold dark:text-white text-white font-Anton"> WOKE <span className="dark:bg-white bg-white dark:text-secondary text-primary"> ADVISORY </span></h1> */}
          </Link>
        </li>
        <li>
          <NavItem to="/">
            <AiOutlineHome />
            <span>Home</span>
          </NavItem>
        </li>
        <li>
          <NavItem to="/movies">
            <BiMoviePlay />
            <span>Movies</span>
          </NavItem>
        </li>
        <li>
          <NavItem to="/tv">
            <BiCameraMovie />
            <span>Tv Series</span>
          </NavItem>
        </li>
        <li>
          <NavItem to="/actors">
            <FaUserNinja />
            <span>Actors</span>
          </NavItem>
        </li>
      </ul>
      <div className="flex flex-col items-start pb-5">
        <span className="font-semibold text-white text-xl">Admin</span>
        <button onClick={handleLogout} className="flex items-center text-dark-subtle text-sm hover:text-white transition space-x-1">
          <FiLogOut />
          <span>Log out</span>
        </button>
        </div>
      </div>
    </nav>
  );
}

const NavItem = ({ children, to }) => {
  const commonClasses =
    " flex items-center text-lg space-x-2 p-2 hover:opacity-80";
  return (
    <NavLink
      className={({ isActive }) =>
        (isActive ? "text-white" : "text-gray-400") + commonClasses
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};
