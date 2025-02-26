import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavSearch from "./NavSearch";
import { FaGithubSquare } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import NavFeatures from "./NavFeatures";
import ThemeToggler from "./ThemeToggler";
import { FaChevronDown } from "react-icons/fa";

const NavBar = ({ onModalClick }) => {
  const [showLinks, setShowLinks] = useState(false);

  const navLinks = [
    { page: "Home", path: "/" },
    { page: "Dashboard", path: "/" },
    { page: "Products", path: "/" },
    { page: "Docs", path: "/" },
    { page: "About us", path: "/" },
  ];

  return (
    <>
      <header className="relative w-full z-10">
        <nav
          className="shadow-md fixed w-full flex justify-between items-center px-12 py-4 flex-wrap bg-white
        dark:shadow-black border-b-[1px] border-slate-100 dark:border-slate-800 dark:bg-color__primary"
        >
          <div className="">
            <Link to="/">
              <FaGithubSquare className="cp" />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <NavSearch />
            <ThemeToggler />
            <HiMenuAlt3
              className="cp icon__with__bg__large lg:hidden"
              onClick={() => setShowLinks(!showLinks)}
            />
          </div>
          <ul
            className={`w-full text-xs tracking-widest border-l-[1px] 
              border-slate-200 dark:border-slate-800 mt-2 lg:mt-0 lg:flex gap-12 lg:border-0 lg:w-auto
              opacity-0 absolute pointer-events-none transition-opacity duration-300 ease-out
               ${
                 showLinks && "opacity-100 relative pointer-events-auto"
               } lg:opacity-100 lg:relative lg:pointer-events-auto
        `}
          >
            {navLinks.map((link, index) => (
              <li
                className={`hover:bg-slate-200 hover:shadow-sm rounded-lg cp p-2 
              dark:hover:bg-slate-800 mt-4 lg:mt-0 transition-colors duration-200 ease-out ${
                showLinks && "rounded-none"
              }`}
                key={link}
              >
                <Link
                  to={link.path}
                  className="hover:text-black dark:hover:text-white flex justify-between items-center lg:gap-3"
                >
                  {link.page}
                  {(index === 2 || index === 3) && (
                    <FaChevronDown className="text-color__accent" size={10} />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
