import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  and,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import auth from "../services/authService";
import AuthContext from "../context/AuthContext";
import QueryContext from "./../context/QueryContext";

const useHabits = () => {
  const { user } = useContext(AuthContext);
  const { query: queryObject } = useContext(QueryContext);

  const { searchQuery, pageSize, currentPage, status } = queryObject;
  return useQuery({
    queryKey: [user?.uid, "habits", queryObject],
    queryFn: async () => {
      const fallbackObject = { habits: [] };
      const habitsCollection = collection(
        auth.firestore,
        "users",
        user?.uid,
        "habits"
      );

      const all = await getDocs(
        query(habitsCollection, orderBy("creationTime", "desc"))
      );
      const count = all.docs.length;
      if (count === 0 || !all.docs) return fallbackObject;

      const start = all.docs[(currentPage - 1) * pageSize];

      const queryArray = [
        orderBy("creationTime", "desc"),
        startAt(start),
        limit(pageSize),
      ];

      if (searchQuery) {
        queryArray.splice(0, 1);
        queryArray.unshift(
          orderBy("title", "asc"),
          where("title", ">=", searchQuery.toLowerCase()),
          where("title", "<=", searchQuery.toLowerCase() + "\uf8ff")
        );
      }
      if (status) {
        queryArray.unshift(where("status", "==", status));
      }
      const habitsQuery = query(habitsCollection, ...queryArray);

      const habitDocs = await getDocs(habitsQuery);
      const maxPages = Math.ceil(count / pageSize);

      return {
        habits: habitDocs.docs.map((doc) => doc.data()),
        maxPages,
        count,
      };
    },
    staleTime: 6 * 60 * 60 * 1000, // 6hr
    enabled: !!user?.uid,
  });
};

export default useHabits;
