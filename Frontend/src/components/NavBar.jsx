import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import NavSearch from "./NavSearch";
import authService from "../services/authService";
import AuthContext from "../context/AuthContext";
import ThemeToggler from "./ThemeToggler";
import { FaGithubSquare } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaChevronDown } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { TbUserDown } from "react-icons/tb";
import { MdSettings } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiSolidLogInCircle } from "react-icons/bi";

const NavBar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);

  const showLogin = pathname != "/login" && pathname != "/register" && !user;

  const name = user?.username;
  const common = "cp icon__with__bg";

  const navLinks = [
    { page: "Home", path: "/" },
    { page: "Dashboard", path: "/" },
    { page: "Products", path: "/" },
    { page: "Docs", path: "/" },
    { page: "About Us", path: "/" },
  ];

  const profileFeatures = [
    {
      icon: <CgProfile className={common} />,
      label: name || "profile",
    },
    { icon: <MdSettings className={common} />, label: "settings" },
    {
      icon: <LuLogOut onClick={authService.logout} className={common} />,
      label: "logout",
    },
  ];

  return (
    <>
      <header>
        <nav
          className="flex justify-between items-center px-8 py-4 dark:bg-primary bg-white shadow-md 
          flex-wrap relative dark:shadow-black text-xs"
        >
          <div className="md:-order-2">
            <Link to="/">
              <FaGithubSquare className="cp" />
            </Link>
          </div>

          <ul
            className={`nav__links ${
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

          <div className="flex items-center gap-8 md:gap-12">
            <div className="flex items-center gap-1 md:gap-2">
              <NavSearch />
              <ThemeToggler />
            </div>

            <div className=" flex items-center gap-3 flex-wrap">
              <HiMenuAlt3
                className="cp icon__with__bg lg:hidden"
                onClick={() => setShowLinks(!showLinks)}
              />

              {user && (
                <>
                  <TbUserDown
                    className="cp icon__with__bg"
                    onClick={() => setShowFeatures(!showFeatures)}
                  />
                  <div
                    className={`nav__features ${
                      showFeatures
                        ? "opacity-100 pointer-events-auto translate-x-0"
                        : "translate-x-20 pointer-events-none opacity-0 fixed"
                    }`}
                  >
                    {profileFeatures.map((feature) => (
                      <Link to={`/${feature.label}`} className={`nav__feature`}>
                        <span>
                          {feature?.label[0].toUpperCase() +
                            feature?.label.slice(1)}
                        </span>
                        <span>{feature?.icon}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
      {showLogin && (
        <div className="w-full bg-bright flex items-center justify-center ">
          <Link
            to="/login"
            className="italic p-2 w-fit text-white text-xs tracking-wide gap-2 font-bold flex items-center"
          >
            <p className="text__scale">Login to access all new features</p>
            <BiSolidLogInCircle />
          </Link>
        </div>
      )}
    </>
  );
};

export default NavBar;
