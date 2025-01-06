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
    <button className="nav__btn__icon" onClick={() => setIsDark(!isDark)}>
      {isDark ? (
        <FaRegLightbulb className="text-lg " color="orange" />
      ) : (
        <MdDarkMode className="text-lg" />
      )}
    </button>
  );
};

export default ThemeToggler;
