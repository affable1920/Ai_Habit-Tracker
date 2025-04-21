import axios from "axios";
import { toast } from "sonner";

axios.interceptors.response.use(null, (err) => {
  console.log(err);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
