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
  const [showFeatures, setShowFeatures] = useState(false);

  const { user } = useContext(AuthContext);
  const common = "cp icon__with__bg";

  const navLinks = [
    { page: "Home", path: "/" },
    { page: "Dashboard", path: "/" },
    { page: "Products", path: "/" },
    { page: "Docs", path: "/" },
    { page: "About Us", path: "/" },
  ];

  const profileFeatures = [
    { icon: <CgProfile className={common} />, label: "profile" },
    { icon: <MdSettings className={common} />, label: "settings" },
    {
      icon: <LuLogOut className={common} />,
      label: "logout",
    },
  ];

  return (
    <>
      <header className="text-xs tracking-widest">
        <nav
          className="flex justify-between items-center px-8 py-4 dark:bg-primary bg-white shadow-md 
          flex-wrap relative dark:shadow-black"
        >
          <div className="md:-order-2">
            <Link to="/">
              <FaGithubSquare className="cp" />
            </Link>
          </div>

          <ul
            className={`order-4 w-full absolute top-full bg-white left-0 shadow-md z-10 px-5 lg:p-0 flex
           flex-col py-4 transition-all duration-300 font-medium lg:translate-y-0 lg:opacity-100 lg:relative lg:-order-1 lg:flex-row lg:shadow-none lg:w-auto 
         dark:bg-inherit lg:pointer-events-auto lg:text-[10px] gap-4 lg:gap-8 lg:mr-4
            ${
              showLinks
                ? "opacity-100 pointer-events-auto translate-x-0"
                : "opacity-0 pointer-events-none -translate-y-full"
            } `}
          >
            {navLinks.map((link, index) => (
              <li className="rounded-sm" key={link.page}>
                <Link
                  to={link.path}
                  className="flex items-center justify-between md:gap-3 p-2 rounded-sm lg:rounded-md dark:text-zinc-300 
                hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 transition-colors duration-200"
                >
                  {link.page}
                  {(index === 2 || index === 3) && (
                    <FaChevronDown className="text-accent" size={10} />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 md:gap-2">
            <NavSearch />
            <ThemeToggler />
          </div>

          <div className=" flex items-center gap-3">
            <HiMenuAlt3
              className="cp icon__with__bg__large lg:hidden"
              onClick={() => setShowLinks(!showLinks)}
            />

            <TbUserDown
              className="cp icon__with__bg"
              onClick={() => setShowFeatures(!showFeatures)}
            />
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
