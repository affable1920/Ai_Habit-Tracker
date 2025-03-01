import React from "react";
import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import ModalProvider from "./ModalProvider";
import TooltipProvider from "./TooltipProvider";
import QueryProvider from "./QueryProvider";

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <ModalProvider>
        <AuthProvider>
          <TooltipProvider>
            <QueryProvider>{children}</QueryProvider>
          </TooltipProvider>
        </AuthProvider>
      </ModalProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
