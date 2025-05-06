import axios from "axios";
import { toast } from "sonner";

const url = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const axiosInstance = axios.create({
  baseURL: url,
});

axiosInstance.interceptors.response.use(null, (ex) => {
  console.log(ex);

  const expectedErr =
    ex.response && ex.response.status >= 400 && ex.response.status <= 500;

  if (!expectedErr) return Promise.reject("An unexpected error occurred !");

  const { response } = ex;
  if (
    response.headers["session_exp"] &&
    response.headers["session_exp"] == "true"
  ) {
    setJwt(null);
    toast.info("Session expired !", {
      description: "You have been logged out. Please log in again !",
    });
  }

  return Promise.reject(ex.response.data.detail);
});

export function setJwt(jwt) {
  if (!jwt) delete axiosInstance.defaults.headers.common["Authorization"];

  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export default axiosInstance;
