/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import axios from "axios";
import evEmitter from "./eventEmiiter.js";
import useAuthStore from "../stores/authStore.js";

const url = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

const statusMap = new Map();
statusMap[0] = {
  type: "Server Error",
  msg: "Server Down ! Please check back later.",
  status: "501",
};
statusMap[500] = {
  type: "Network Error",
  msg: "NO connection. Please check your network connection.",
  status: "500",
};
statusMap[401] = {
  type: "Auth Error",
  msg: "You are not authenticated. Please log in or sign up.",
  status: "000",
};
statusMap[403] = {
  type: "Forbidden",
  msg: "You are not authenticated. Please log in or sign up.",
  status: "000",
};

const api = axios.create({
  baseURL: url,
  timeout: 10000, // 10 seconds
});

console.log("API_URL in use ", url);
console.log("ENV_MODE in use ", import.meta.env.MODE);

const HDR_SESSION_EXP = "x-session-expire";

api.interceptors.request.use(
  (config) => {
    const { isAuthenticated, token } = useAuthStore.getState();

    if (isAuthenticated()) config.headers["Authorization"] = `Bearer ${token}`;
    else delete config.headers["Authorization"];

    return config;
  },
  (ex) => {
    return Promise.reject(ex);
  }
);

api.interceptors.response.use(null, (ex) => {
  const { request, response } = ex;

  if (!response) return Promise.reject(statusMap[request?.status]);
  const { headers = {} } = response;

  if (HDR_SESSION_EXP in headers) {
    evEmitter.emit(HDR_SESSION_EXP);
    return Promise.reject(statusMap[response?.status || 403]);
  }

  return Promise.reject(
    statusMap[response?.status] ?? {
      type: "Unknown Error",
      msg: response?.data?.detail ?? "An unknown error occurred !",
      status: response?.status,
    }
  );
});

export default api;
