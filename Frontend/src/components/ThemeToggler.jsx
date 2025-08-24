import React from "react";
import Button from "./Button";
import { MdDarkMode } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import useThemeStore from "../stores/themeStore";

const ThemeToggler = () => {
  const dark = useThemeStore((s) => s.dark);
  const toggle = useThemeStore((s) => s.toggle);

  React.useEffect(() => {
    const rootHtml = document.documentElement;
    rootHtml.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <Button onClick={toggle}>
      {dark ? <FaRegLightbulb /> : <MdDarkMode />}
    </Button>
  );
};

export default ThemeToggler;
