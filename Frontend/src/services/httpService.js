import axios from "axios";
import evEmitter from "./eventEmiiter";

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
      const { state: authState } = JSON.parse(localStorage.getItem("token"));

      if (!authState || !authState.token)
        delete config.headers["Authorization"];
      //
      else config.headers["Authorization"] = `Bearer ${authState.token}`;
    } catch (ex) {
      delete config.headers["Authorization"];
    }
    return config;
  },
  (ex) => Promise.reject(ex)
);

api.interceptors.response.use(null, (ex) => {
  // No response: Network Error
  if (!ex?.response)
    return Promise.reject({
      type: "NETWORK_ERROR",
      msg: "Check your internet connection !",
    });

  const { response } = ex;

  if (response.status >= 500)
    return Promise.reject({
      type: "SERVER_ERROR",
      msg: "Server down. Please check back later !",
    });

  if (sessionExpiry in response.headers) {
    evEmitter.emit(sessionExpiry);
    return Promise.reject(() => {});
  }

  console.log(ex);
  return Promise.reject(() => {});
});

export default api;
