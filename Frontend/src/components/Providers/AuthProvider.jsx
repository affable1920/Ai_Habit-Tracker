import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "../../context/AuthContext";
import http from "../../services/httpService";

const endPoint = "/auth";
const tokenKey = "token";

const getUser = (jwt) => jwtDecode(jwt);
const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem(tokenKey);

    if (jwt) {
      setToken(jwt)
      setUser(getUser(jwt))
    }

    else {
      setUser(null);
      setToken(null)
    };
  }, []);

  const register = async (user) => {
    const response = await http.post(endPoint + "/register", user);
    const jwt = response.headers["x-auth-token"];

    setToken(jwt)
    localStorage.setItem(tokenKey, jwt);

    setUser(getUser(jwt));
  };

  const login = async (userCred) => {
    const { data: jwt } = await http.post(endPoint + "/login", userCred);

    setToken(jwt)
    localStorage.setItem(tokenKey, jwt);

    setUser(getUser(jwt));

    console.log("all done")
  };

  function logout() {
    setUser(null);
    setToken(null)

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
    <AuthContext.Provider value={{ user, token, login, logout, register, getProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
