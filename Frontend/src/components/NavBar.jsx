import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NavSearch from "./NavSearch";
import authService from "../services/authService";
import AuthContext from "../context/AuthContext";
import ThemeToggler from "./ThemeToggler";
import { FaGithub, FaGithubSquare } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaChevronDown } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { TbUserDown } from "react-icons/tb";
import { MdSettings } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { motion, useAnimation } from "framer-motion";
import Icon from "./Icon";

const NavBar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const { user } = useContext(AuthContext);
  const common = "cp icon__with__bg";

  const { pathname: route } = useLocation();

  const navLinks = [
    { page: "Home", path: "/" },
    { page: "Track", path: "/" },
    { page: "Progress", path: "/" },
    { page: "Stats", path: "/" },
    { page: "More", path: "/" },
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

  const Logo = () => {
    return (
      <Link to="/" className="dark:text-black text-light">
        <Icon Icon={FaGithub} />;
      </Link>
    );
  };

  const NavLinks = () => {
    return (
      <ul
        className={`nav__links ${
          showLinks && "opacity-100 pointer-events-auto"
        }`}
      >
        {navLinks.map((link, index) => (
          <motion.li className="rounded-sm" key={link.page}>
            <Link to={link.path} className="nav__link">
              {link.page}
              {index != 0 && index != 1 && (
                <FaChevronDown className="icon__accent" size={10} />
              )}
            </Link>
          </motion.li>
        ))}
      </ul>
    );
  };

  const NavActions = () => {
    return (
      <div className="flex items-center gap-8 md:gap-12">
        <div className="flex items-center gap-2">
          <NavSearch />
          <ThemeToggler />
        </div>

        {route != "/login" && !user && (
          <Link to="/login" className="lg:order-10">
            <button className="btn btn__accent">Log in</button>
          </Link>
        )}

        <div className=" flex items-center gap-3 flex-wrap">
          <Icon
            classes="lg:hidden"
            Icon={HiMenuAlt3}
            bg={true}
            fn={() => setShowLinks(!showLinks)}
          />

          {user && (
            <>
              <Icon
                Icon={TbUserDown}
                fn={() => setShowFeatures(!showFeatures)}
                bg={true}
              />
              <div
                className={`profile__features ${
                  showFeatures
                    ? "opacity-100 pointer-events-auto translate-y-0"
                    : "-translate-y-20 pointer-events-none opacity-0 fixed"
                }`}
              >
                {profileFeatures.map((feature) => (
                  <Link
                    onClick={() => showFeatures && setShowFeatures(false)}
                    to={`/${feature.label}`}
                    className={`profile__feature`}
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
    );
  };

  return (
    <>
      <motion.nav className="navbar">
        {[Logo, NavLinks, NavActions].map((Component, i) => (
          <motion.div>
            <Component />
          </motion.div>
        ))}
      </motion.nav>
    </>
  );
};

export default NavBar;
