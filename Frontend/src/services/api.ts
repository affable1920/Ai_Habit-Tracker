/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import axios, { AxiosError } from "axios";
import evEmitter from "./eventEmiiter.js";
import useAuthStore from "../stores/authStore.js";
import { type ErrorAPI } from "../types/genericTypes.js";

const url = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

const statusMap: Record<number, ErrorAPI> = {};
statusMap[0] = {
  status: 501,
  type: "Server Error",
  msg: "Server Down ! Please check back later.",
};
statusMap[500] = {
  status: 500,
  type: "Network Error",
  msg: "NO connection. Please check your network connection.",
};
statusMap[401] = {
  status: 401,
  type: "Authentication Error",
  msg: "You are not authenticated. Please log in or sign up.",
};
statusMap[403] = {
  status: 403,
  type: "Forbidden Error",
  msg: "You don't have enough permissions to access this resource.",
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

api.interceptors.response.use(null, (ex: AxiosError) => {
  const { request, response } = ex;

  if (!response) return Promise.reject(statusMap[request.status]);
  const { headers = {} } = response;

  if (HDR_SESSION_EXP in headers) {
    evEmitter.emit(HDR_SESSION_EXP);
    return Promise.reject(statusMap[response?.status || 403]);
  }

  return Promise.reject(
    statusMap[response?.status] ?? {
      type: "Unknown Error",
      msg: response?.data ?? "An unknown error occurred !",
      status: response?.status,
    }
  );
});

export default api;
