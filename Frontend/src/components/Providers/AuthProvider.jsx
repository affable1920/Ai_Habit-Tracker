import React, { useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import http, { setJwt } from "../../services/httpService";
import eventEmitter from "../../Utils/utils";
import useHabitStore from "../../stores/habitStore";

const endPoint = "/auth";
const tokenKey = "token";

const getUser = (jwt) => jwtDecode(jwt);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const fetchHabits = useHabitStore((s) => s.fetchHabits);

  useEffect(() => {
    const jwt = localStorage.getItem(tokenKey);

    if (jwt) setUser(getUser(jwt));
    else setUser(null);
  }, []);

  useEffect(() => {
    const session_exp = "session_exp";
    eventEmitter.on(session_exp, () => {
      console.log("Session expired, logging out...");
      logout();
    });

    return () =>
      eventEmitter.events[session_exp].filter((ev) => ev != session_exp);
  }, [eventEmitter.events]);

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

  function logout() {
    setJwt(null);

    setUser(null);
    localStorage.removeItem(tokenKey);

    fetchHabits();
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
    <AuthContext.Provider value={{ user, login, logout, register, getProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
