import React, { useContext, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { ThemeContext } from "./Providers/ThemeProvider";

const ThemeToggler = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <button
      className="icon__with__bg__large"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? (
        <FaRegLightbulb className="icon active:hover:text-orange-500" />
      ) : (
        <MdDarkMode className="" />
      )}
    </button>
  );
};

export default ThemeToggler;
