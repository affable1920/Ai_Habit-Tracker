import axios from "axios";

axios.interceptors.response.use(null, (ex) => {
  const expectedErr =
    ex.response && ex.response.status >= 400 && ex.response.status <= 500;

  if (!expectedErr) {
    console.log("Logging the error", ex);
    return Promise.reject("An unexpected error occurred !");
  }

  return Promise.reject(ex.response.data.detail);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
