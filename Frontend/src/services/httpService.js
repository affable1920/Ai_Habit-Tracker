import axios from "axios";
import evEmitter from "./eventEmiiter";

const url = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: url,
});

console.log("API_URL in use ", url);

let errObject = {
  name: "Unexpected Error",
  msg: "An unexpected error occurred!, Please try after sometime.",
  status: 500,
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!token) delete config.headers["Authorization"];
    else config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(null, (err) => {
  const { response } = err;

  if (err.request && !response) {
    errObject = {
      name: "Network Error",
      msg: "You don't seem to be connected to the internet.",
      status: 0,
    };
    return Promise.reject(errObject);
  }

  const ev = "x-session-exp";

  const expired = response.headers[ev] === "true";
  if (expired) {
    evEmitter.emit(ev);
    errObject = {
      name: "Session Expired",
      msg: "Session expired, Logging out...",
      status: response.status || 403,
    };

    return Promise.reject(errObject);
  }

  const expErr = response && response.status < 500 && response.status >= 400;
  if (expErr) {
    const { statusText: errName } = response;
    const errMsg = response.data.detail || "A client side error occurred!";

    errObject = { name: errName, msg: errMsg, status: response.status };
    return Promise.reject(errObject);
  }

  return Promise.reject(errObject);
});

export default api;
