import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdSettings } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";

const NavLinks = () => {
  const navLinks = [
    { page: "Home", path: "/" },
    { page: "Dashboard", path: "/" },
    { page: "Products", path: "/" },
    { page: "Docs", path: "/" },
    { page: "About us", path: "/" },
  ];

  return (
    <div className="flex justify-end p-2 ">
      <HiMenuAlt3 />
      <ul className="text-xs flex flex-col justify-between">
        {navLinks.map((link, index) => (
          <li className={``} key={link.page}>
            <Link to={link.path} className="">
              {link.page}
              {(index === 2 || index === 3) && (
                <FaChevronDown className="text-color__accent" size={10} />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;
