import React, { useReducer } from "react";
import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import ModalProvider from "./ModalProvider";
import QueryProvider from "./QueryProvider";
import Spinner from "./../Spinner";

export const LoadinStateContext = React.createContext(false);
LoadinStateContext.displayName = LoadinStateContext;

const loadingReducer = (state, action) => {
  switch (action.type) {
    case "START":
      return true;

    case "STOP":
      return false;

    default:
      return state;
  }
};

const AppProviders = ({ children }) => {
  const [loading, dispatch] = useReducer(loadingReducer, false);

  return (
    <LoadinStateContext.Provider value={{ loading, dispatch }}>
      {loading && <Spinner />}
      <ThemeProvider>
        <AuthProvider>
          <ModalProvider>
            <QueryProvider>{children}</QueryProvider>
          </ModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </LoadinStateContext.Provider>
  );
};

export default AppProviders;
