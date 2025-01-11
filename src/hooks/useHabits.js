import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import auth from "../services/authService";
import AuthContext from "../context/AuthContext";

const useHabits = () => {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: [user?.displayName, "habits"],
    queryFn: async () => {
      if (!user) return [];

      const userDoc = await getDoc(
        doc(auth.firestore, "users", user?.displayName)
      );
      const userData = userDoc.data();
      return userData.habits || [];
    },
    retry: 5,
    enabled: !!user?.displayName,
  });
};

export default useHabits;
