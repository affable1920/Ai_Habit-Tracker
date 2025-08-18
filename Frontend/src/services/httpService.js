import axios from "axios";
import evEmitter from "./eventEmiiter";
import useAuthStore from "../stores/authStore";

const url = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: url,
});

console.log("API_URL in use ", url);
console.log("ENV_MODE in use ", import.meta.env.MODE);

// Header event.
const sessionExpiry = "x-session-expire";

api.interceptors.request.use(
  (config) => {
    try {
      const token = useAuthStore.getState()?.token;

      const isAuthenticated = !!token;
      if (!isAuthenticated) delete config.headers["Authorization"];
      //
      else config.headers["Authorization"] = `Bearer ${token}`;
    } catch (ex) {
      delete config.headers["Authorization"];
    }
    return config;
  },
  (ex) => Promise.reject(ex)
);

api.interceptors.response.use(null, (ex) => {
  // No response: Network Error
  if (!ex?.response) {
    if (ex.request.status == 0)
      return Promise.reject({
        type: "SERVER_ERROR",
        msg: "Server down. Please check back later !",
      });
    //
    else
      return Promise.reject({
        type: "NETWORK_ERROR",
        msg: "Check your internet connection !",
      });
  }

  const { response } = ex;

  if (sessionExpiry in response.headers) {
    evEmitter.emit(sessionExpiry);
    return Promise.reject(() => {});
  }

  console.log(ex);
  return Promise.reject(() => {});
});

export default api;
