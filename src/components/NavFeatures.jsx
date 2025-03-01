import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ThemeToggler from "./ThemeToggler";
import { FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { GiSolarSystem } from "react-icons/gi";

const NavFeatures = ({ onModalClick }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="fixed bottom-12 md:bottom-3 right-3">
      <div
        className="flex rounded-md shadow-md justify-end p-2 gap-4 items-center 
      place-self-end dark:shadow-slate-950"
      >
        <GiSolarSystem className="cp icon__with__bg" onClick={onModalClick} />
        {user && (
          <Link to="/">
            <FaUser className="icon__with__bg" />
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
    </div>
  );
};

export default NavFeatures;
