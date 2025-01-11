import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggler from "./ThemeToggler";
import NavSearch from "./NavSearch";
import AuthContext from "../context/AuthContext";
import { FaUser } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";

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
      <nav className="flex flex-wrap justify-between p-2 items-center dark:bg-[#000] border-b-[1px] border-slate-300 dark:border-slate-700">
        <div>
          <Link to="/">
            <FaGithubSquare className="cp" />
          </Link>
        </div>
        <div className="flex justify-center">
          <NavSearch />
          <span className="icon__container">
            <HiMenuAlt3
              className="cp icon md:hidden"
              onClick={() => setShowLinks(!showLinks)}
            />
          </span>
        </div>
        <ul
          className={`nav__list ${showLinks ? " flex flex-col" : "hidden"} 
        `}
        >
          {navLinks.map((link) => (
            <li className="nav__link" key={link}>
              <Link
                to={link.path}
                className="hover:text-black dark:hover:text-white"
              >
                {link.page}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div
        className="flex rounded-md shadow-md justify-end p-2 gap-4 items-center 
      place-self-end dark:shadow-slate-950"
      >
        <ThemeToggler />
        {user && (
          <Link to="/">
            <FaUser className="icon__with__bg" />
          </Link>
        )}
        {user && (
          <Link to="/logout">
            <LuLogOut className="icon__with__bg" />
          </Link>
        )}
        {!user && (
          <Link to="/register" className="grid">
            <button
              className="tracking-wider shadow-md bg-gradient-to-r from-color__accent__primary to-color__accent__dark 
              text-slate-200 rounded-md px-4 py-1 text-xs font-semibold text-center justify-self-end 
              active:from-color__accent__dark active:to-color__accent__primary"
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
