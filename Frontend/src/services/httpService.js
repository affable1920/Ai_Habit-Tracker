import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

axiosInstance.interceptors.response.use(null, (ex) => {
  const expectedErr =
    ex.response && ex.response.status >= 400 && ex.response.status <= 500;

  if (!expectedErr) {
    return Promise.reject("An unexpected error occurred !");
  }

  return Promise.reject(ex.response.data.detail);
});

export function setJwt(jwt) {
  if (!jwt) delete axiosInstance.defaults.headers.common["Authorization"];

  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export default axiosInstance;
