import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
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
    {
      icon: <CgProfile className={common} />,
      label: "profile",
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
          flex-wrap text-xs relative dark:shadow-black"
        >
          <div className="md:-order-2">
            <Link to="/">
              <FaGithubSquare className="cp" />
            </Link>
          </div>

          <ul
            className={`nav__links ${
              showLinks && "opacity-100 translate-y-0 pointer-events-auto z-10"
            }`}
          >
            {navLinks.map((link, index) => (
              <li className="rounded-sm" key={link.page}>
                <Link
                  to={link.path}
                  className="flex items-center justify-between md:gap-3 p-2 rounded-sm lg:rounded-md dark:text-zinc-300 
                hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 transition-colors duration-200"
                >
                  {link.page}
                  {(index === 2 || index === 3) && (
                    <FaChevronDown className="text-accent__darker" size={10} />
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

            <div className=" flex items-center gap-3 flex-wrap z-[10000]">
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
                        ? "opacity-100 pointer-events-auto translate-y-0"
                        : "-translate-y-20 pointer-events-none opacity-0 fixed"
                    }`}
                  >
                    {profileFeatures.map((feature) => (
                      <Link
                        onClick={() => showFeatures && setShowFeatures(false)}
                        to={`/${feature.label}`}
                        className={`nav__feature`}
                      >
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
    </>
  );
};

export default NavBar;
