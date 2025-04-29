import { jwtDecode } from "jwt-decode";
import http, { setJwt } from "../services/httpService";

const endPoint = "/auth";
const tokenKey = "token";

setJwt(localStorage.getItem(tokenKey));

const register = async (user) => {
  const response = await http.post(endPoint + "/register", user);
  localStorage.setItem(tokenKey, response.headers["x-auth-token"]);
};

const login = async (userCred) => {
  const { data: jwt } = await http.post(endPoint + "/login", userCred);
  localStorage.setItem(tokenKey, jwt);
};

const logout = () => localStorage.removeItem(tokenKey);

const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
