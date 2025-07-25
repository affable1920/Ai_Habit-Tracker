import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import http from "../../services/httpService";
import evEmitter from "../../services/eventEmiiter";

// Context
const initAuth = { token: null, user: null };

export const AuthContext = React.createContext(initAuth);
AuthContext.displayName = "AuthContext";

// Constants and Utility Fns
const endPoint = "/auth";
const tokenKey = "token";

const ev = import.meta.env.VITE_SESSION_EXPIRE;
const authSetter = (token) => ({ token, user: jwtDecode(token) });

// Actual Provider Component
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = React.useState(() => {
    const jwt = localStorage.getItem(tokenKey);
    return jwt ? { token: jwt, user: authSetter(jwt) } : initAuth;
  });

  useEffect(() => {
    if (auth.token) evEmitter.on(ev, logout, true);
  }, [auth.token]);

  const register = async (user) => {
    const response = await http.post(endPoint + "/register", user);
    const token = response.headers["x-auth-token"];

    setAuth(authSetter(token));
    localStorage.setItem(tokenKey, token);
  };

  const login = async (userCred) => {
    const { data: token } = await http.post(endPoint + "/login", userCred);

    setAuth(authSetter(token));
    localStorage.setItem(tokenKey, token);
  };

  function logout() {
    setAuth(initAuth);
    localStorage.removeItem(tokenKey);
  }

  const getProfile = async () => {
    try {
      const response = await http.get(endPoint + "/profile");
      return response.data;
    } catch (ex) {
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: auth.user,
        token: auth.token,
        login,
        logout,
        register,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
