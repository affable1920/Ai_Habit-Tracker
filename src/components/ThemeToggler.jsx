import React, { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";

const ThemeToggler = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <button className="icon__with__bg" onClick={() => setIsDark(!isDark)}>
      {isDark ? (
        <FaRegLightbulb className="icon active:hover:text-orange-500" />
      ) : (
        <MdDarkMode className="icon" />
      )}
    </button>
  );
};

export default ThemeToggler;
