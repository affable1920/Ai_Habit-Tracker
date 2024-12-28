import React, { useEffect, useState } from "react";

const ThemeToggler = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return <button onClick={() => setIsDark(!isDark)}>Toggle</button>;
};

export default ThemeToggler;
