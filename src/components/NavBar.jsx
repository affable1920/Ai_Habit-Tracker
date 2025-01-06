import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggler from "./ThemeToggler";
import NavSearch from "./NavSearch";
import AuthContext from "../context/AuthContext";
import { FaUser } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const [showLinks, setShowLinks] = useState(false);

  const navLinks = [
    { page: "Home", path: "/" },
    { page: "Dashboard", path: "/" },
    { page: "Analytics", path: "/" },
    { page: "Pricing", path: "/" },
  ];

  return (
    <header>
      <nav className="flex flex-wrap justify-between border-[2px] p-2">
        <div>
          <FaGithubSquare />
        </div>
        <div className="flex justify-center">
          <NavSearch />
          <HiMenuAlt3
            className="cp nav__btn__icon text-lg md:hidden"
            onClick={() => setShowLinks(!showLinks)}
          />
        </div>
        <ul
          className={`text-xs font-semibold tracking-wide
        lists gap-8 py-4 w-full text-center transition-all 
        duration-300 opacity-80 ${
          showLinks ? " flex flex-col" : "hidden"
        } md:flex md:w-auto md:p-0 md:justify-self-end`}
        >
          {navLinks.map((link) => (
            <li
              className="hover:bg-slate-200 self-center 
              rounded-md transition-colors duration-200 cursor-pointer p-2"
              key={link}
            >
              <Link to={link.path}>{link.page}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="bg-slate-100 md:flex items-center justify-end p-2 hidden gap-4">
        <ThemeToggler />
        {user && (
          <Link to="/">
            <FaUser className="nav__btn__icon text-lg cp" />
          </Link>
        )}
        {user && (
          <Link to="/logout">
            <MdOutlineLogout className="nav__btn__icon text-xl cp" />
          </Link>
        )}
        {!user && (
          <Link to="/register" className="grid">
            <button
              className="bg-slate-600 active:bg-slate-700 text-slate-50 rounded-md px-4 py-1 text-xs tracking-wide
            font-semibold text-center justify-self-end"
            >
              Register
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default NavBar;
