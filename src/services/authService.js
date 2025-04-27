import { jwtDecode } from "jwt-decode";
import http from "../services/httpService";

const URL = "http://localhost:8000/auth";
const tokenKey = "token";

const register = async (user) => {
  const response = await http.post(URL + "/register", user);
  localStorage.setItem(tokenKey, response.headers["x-auth-token"]);
};

const logInWithJwt = (jwt) => localStorage.setItem(tokenKey, jwt);

const login = async (userCred) => {
  const { data: jwt } = await http.post(URL + "/login", userCred);
  localStorage.setItem(tokenKey, jwt);
};

const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};

const logout = () => localStorage.removeItem(tokenKey);

export default {
  register,
  login,
  logout,
  getCurrentUser,
  logInWithJwt,
};
