import { MdDarkMode } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import useThemeStore from "../stores/themeStore";
import IconComponent from "./IconComponent";
import React from "react";

const ThemeToggler = () => {
  const dark = useThemeStore((s) => s.dark);
  const toggle = useThemeStore((s) => s.toggle);

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark");
  }, [dark]);

  return (
    <IconComponent Icon={dark ? FaRegLightbulb : MdDarkMode} fn={toggle} bg />
  );
};

export default ThemeToggler;
