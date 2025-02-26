import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "./../context/AuthContext";
import useHabits from "./useHabits";
import { updateDoc, doc } from "firebase/firestore";
import { firestore } from "../services/authService";
import QueryContext from "../context/QueryContext";

const useUpdateHabit = () => {
  const { user } = useContext(AuthContext);
  const { habits } = useHabits();
  const { query } = useContext(QueryContext);

  const queryClient = useQueryClient();
  const key = [user?.uid, "habits"];
  return useMutation({
    queryKey: key,
    mutationFn: (habitId) => {
      const habitRef = doc(firestore, "users", user?.uid, "habits", habitId);
      updateDoc(habitRef, { status: "complete" });
    },
    onMutate: async (habitId) => {
      const prevHabits = queryClient.getQueryData([...key, query]);
      queryClient.setQueryData([...key, query], (prevData = {}) => {
        const { habits = [] } = prevData;

        return {
          ...prevData,
          habits: habits.map((habit) =>
            habit.id === habitId ? { ...habit, status: "complete" } : habit
          ),
        };
      });

      return prevHabits;
    },
    onSuccess: () => queryClient.invalidateQueries([...key, query]),
    onError: (error, updatedHabit, context) => {
      console.log(error);
      if (!context) return;
      return queryClient.setQueryData(
        [...key, query],
        () => context.prevHabits
      );
    },
  });
};

export default useUpdateHabit;
