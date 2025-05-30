import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import ModalProvider from "./ModalProvider";

const AppProviders = ({ children }) => (
  <AuthProvider>
    <ThemeProvider>
      <ModalProvider>{children}</ModalProvider>
    </ThemeProvider>
  </AuthProvider>
);

export default AppProviders;
