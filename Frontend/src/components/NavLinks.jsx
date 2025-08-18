import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", route: "/" },
  { label: "Dashboard", route: "/dashboard" },
  { label: "Track", route: "/tracker" },
  { label: "Stats", route: "/stats" },
];

const NavLinks = ({ showLinks, onRouteChange }) => {
  const { pathname } = useLocation();
  React.useEffect(() => onRouteChange(), [pathname]);

  return (
    <ul className={`navlinks ${showLinks ? "show" : ""}`}>
      {navLinks.map(({ label, route }) => (
        <NavLink
          to={route}
          key={label}
          className={`navlink ${(route === pathname && "active") ?? ""}`}
        >
          <li>{label}</li>
        </NavLink>
      ))}
    </ul>
  );
};

export default NavLinks;
