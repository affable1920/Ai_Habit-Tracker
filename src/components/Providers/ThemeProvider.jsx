import React, { useState } from "react";

const ThemeProvider = () => {
  const ThemeContext = React.createContext();
  ThemeContext.displayName = "ThemeContext";

  const [isDark, setIsDark] = useState(true);

  return <div>ThemeProvider</div>;
};

export default ThemeProvider;
