import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const endpoint = "https://jsonplaceholder.typicode.com/users";

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get(endpoint).then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000, // 24h
  });

export default useUsers;
