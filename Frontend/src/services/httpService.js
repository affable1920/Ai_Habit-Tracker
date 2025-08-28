import axios from "axios";
import evEmitter from "./eventEmiiter";
import useAuthStore from "../stores/authStore";

const url = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: url,
  timeout: 10000, // 10 seconds
});

console.log("API_URL in use ", url);
console.log("ENV_MODE in use ", import.meta.env.MODE);

// Header event.
const SESSION_EXPIRE = "x-session-expire";

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState()?.token;
    const isAuthenticated = !!token;

    if (isAuthenticated) config.headers["Authorization"] = `Bearer ${token}`;
    else delete config.headers["Authorization"];

    return config;
  },
  (ex) => Promise.reject(ex)
);

api.interceptors.response.use(null, (ex) => {
  const { request, response } = ex;

  console.log(request, response);

  if (!response) {
    switch (request?.status) {
      case 0:
        return Promise.reject({
          type: "SERVER_ERROR",
          msg: "Server down. Please check back later !",
        });

      case 500:
        return Promise.reject({
          type: "NETWORK_ERROR",
          msg: "Check your internet connection !",
        });
    }
  }

  if (response.headers?.[SESSION_EXPIRE]) {
    evEmitter.emit(SESSION_EXPIRE);
    return Promise.reject({
      type: "SESSION_EXPIRED",
      msg: "Please login again to continue !",
    });
  }

  return Promise.reject({
    type: "Client Side Error",
    msg:
      response.data?.detail ?? "An unknown error occurred on the user's end !",
  });
});

export default api;
