import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import NavSearch from "./NavSearch";
import { FaGithubSquare } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import AuthContext from "../context/AuthContext";
import ThemeToggler from "./ThemeToggler";
import { FaChevronDown } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { TbUserDown } from "react-icons/tb";
import { MdSettings } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const NavBar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const { user } = useContext(AuthContext);
  console.log(user);

  const navLinks = [
    { page: "Home", path: "/" },
    { page: "Dashboard", path: "/" },
    { page: "Products", path: "/" },
    { page: "Docs", path: "/" },
    { page: "About us", path: "/" },
  ];

  const profileFeatures = [
    { icon: <CgProfile />, label: "profile" },
    { icon: <MdSettings />, label: "settings" },
    { icon: <LuLogOut />, label: "logout" },
  ];

  const [showFeatures, setShowFeatures] = useState(false);
  return (
    <>
      <header className="relative w-full z-10">
        <nav
          className="shadow-md fixed w-full flex justify-between items-center px-12 py-4 flex-wrap bg-white
        dark:shadow-black border-b-[1px] border-slate-100 dark:border-slate-800 dark:bg-color__primary z-20"
        >
          <div>
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
            <LuLogOut className="icon__with__bg__large cp lg:hidden" />
          </div>
          <ul
            className={`w-full text-xs tracking-widest border-l-[1px] 
              border-slate-200 dark:border-slate-800 mt-2 lg:mt-0 lg:flex gap-12 lg:border-0 lg:w-auto
              opacity-0 absolute pointer-events-none transition-opacity duration-300 ease-out items-center
              ${
                showLinks && "opacity-100 relative pointer-events-auto"
              } lg:opacity-100 lg:relative lg:pointer-events-auto
              `}
          >
            {navLinks.map((link, index) => (
              <li
                className={`hover:bg-slate-200 hover:shadow-sm rounded-lg cp p-2 
                dark:hover:bg-gray-800 mt-4 lg:mt-0 transition-colors duration-200 ease-out ${
                  showLinks && "rounded-none"
                }`}
                key={link.page}
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
            {user && (
              <TbUserDown
                className="icon__with__bg__large cp hidden lg:block"
                onClick={() => setShowFeatures(!showFeatures)}
              />
            )}
            <ul
              className={`absolute top-14 -right-8 bg-white shadow-lg flex flex-col gap-4 p-4 rounded-sm
            dark:shadow-black dark:bg-color__secondary__lighter opacity-0 pointer-events-none transition-opacity duration-200 ${
              showFeatures && "opacity-100 pointer-events-auto"
            }`}
            >
              {profileFeatures.map((feature) => (
                <li
                  key={feature.label}
                  className="p-2 pr-8 pl-2 relative hover:bg-slate-100 rounded-md transition-colors duration-300
                  dark:hover:bg-zinc-700"
                >
                  <Link
                    className="flex items-center gap-3"
                    to={`/${feature.label}`}
                    onClick={() => setShowFeatures(false)}
                  >
                    {feature.label[0].toUpperCase() + feature.label.slice(1)}
                    <span className="absolute right-1 dark:bg-zinc-700 shadow-md p-1 rounded-md">
                      {feature.icon}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
