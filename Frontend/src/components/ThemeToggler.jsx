import React, { useContext, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { ThemeContext } from "./Providers/ThemeProvider";
import Icon from "./Icon";

const ThemeToggler = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <Icon
      Icon={isDark ? FaRegLightbulb : MdDarkMode}
      fn={() => setIsDark(!isDark)}
      bg={true}
    />
  );
};

export default ThemeToggler;
