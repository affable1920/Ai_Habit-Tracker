import React, { useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import http, { setJwt } from "../../services/httpService";

const endPoint = "/auth";
const tokenKey = "token";

const getUser = (jwt) => jwtDecode(jwt);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem(tokenKey);

    if (jwt) setUser(getUser(jwt));
    else setUser(null);
  }, []);

  const register = async (user) => {
    const response = await http.post(endPoint + "/register", user);
    const jwt = response.headers["x-auth-token"];

    setJwt(jwt);
    setUser(getUser(jwt));

    localStorage.setItem(tokenKey, jwt);
  };

  const login = async (userCred) => {
    const { data: jwt } = await http.post(endPoint + "/login", userCred);
    localStorage.setItem(tokenKey, jwt);

    setJwt(jwt);
    setUser(getUser(jwt));
  };

  const logout = () => {
    setJwt(null);

    setUser(null);
    localStorage.removeItem(tokenKey);
  };

  const getProfile = async () => {
    try {
      const response = await http.get(endPoint + "/profile");
      return response.data;
    } catch (ex) {
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, getProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
