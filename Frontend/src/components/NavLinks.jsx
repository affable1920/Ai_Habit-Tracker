import { Link, useLocation } from "react-router-dom";

const NavLinks = ({ showLinks }) => {
  const { pathname: route } = useLocation();

  const navLinks = [
    { page: "Home", path: "/" },
    { page: "Dashboard", path: "/dashboard" },
    { page: "Track", path: "/tracker" },
    { page: "Stats", path: "/stats" },
  ];

  return (
    <ul
      className={`nav__links ${showLinks && "opacity-100 pointer-events-auto"}`}
    >
      {navLinks.map((link) => (
        <Link
          onClick={(e) => console.log(e)}
          to={link.path}
          className={`nav__link ${
            route === link.path &&
            `w-fit bg-light-darker shadow-inner shadow-black/10 dark:shadow-black md:active__link 
            dark:bg-secondary-lighter/50 ring-1 ring-light-darkest dark:bg-secondary dark:ring-secondary-lighter 
            pointer-events-none opacity-75`
          }`}
          key={link.path}
        >
          <li>{link.page}</li>
        </Link>
      ))}
    </ul>
  );
};

export default NavLinks;
