import React from "react";
import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import ModalProvider from "./ModalProvider";

const AppProviders = ({ children }) => (
  <ThemeProvider>
    <AuthProvider>
      <ModalProvider>{children}</ModalProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default AppProviders;
