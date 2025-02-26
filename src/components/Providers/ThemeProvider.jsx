import React, { useState } from "react";

export const ThemeContext = React.createContext();
ThemeContext.displayName = "ThemeContext";

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
