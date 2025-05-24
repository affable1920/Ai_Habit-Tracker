import React, { useContext, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { ThemeContext } from "./Providers/ThemeProvider";

const ThemeToggler = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  return (
    <button
      className="icon__with__bg__large"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? (
        <FaRegLightbulb className="icon active:hover:text-orange-500" />
      ) : (
        <MdDarkMode className="icon" />
      )}
    </button>
  );
};

export default ThemeToggler;
