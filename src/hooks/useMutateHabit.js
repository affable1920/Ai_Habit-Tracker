import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
import auth from "../services/authService";
import AuthContext from "../context/AuthContext";
import QueryContext from "../components/Providers/QueryProvider";

const habitKeys = {
  reminder_Times: {},
  streak: 0,
  completed: false,
  progress: [],
  creationTime: new Date(),
  archived: false,
};

const useMutateHabit = () => {
  const { user } = useContext(AuthContext);
  const query = useContext(QueryContext);

  const key = [user?.uid, "habits"];
  const queryClient = useQueryClient();

  async function addHabit(newHabit) {
    const id = v4();
    const habitDocRef = doc(auth.firestore, "users", user?.uid, "habits", id);

    await setDoc(habitDocRef, {
      id,
      ...newHabit,
      ...habitKeys,
      title: newHabit.title.toLowerCase(),
    });
  }

  async function deleteHabit(id) {
    const habitRef = doc(auth.firestore, "users", user?.uid, "habits", id);
    await deleteDoc(habitRef);
  }

  return useMutation({
    mutationKey: key,
    mutationFn: async (habitRequest) => {
      if (habitRequest.action === "delete") deleteHabit(habitRequest.habitId);
      if (habitRequest.action === "add") addHabit(habitRequest.newHabit);
    },

    onMutate: (habitRequest) => {
      const prevHabits = queryClient.getQueryData([...key, query]);
      queryClient.setQueryData([...key, query], (prevData = {}) => {
        const { habits = [] } = prevData;
        return {
          ...prevData,
          habits:
            habitRequest.action === "add"
              ? [...habits, habitRequest.newHabit]
              : habits.filter((habit) => habit.id != habitRequest.habitId),
        };
      });

      return { prevHabits };
    },

    onSuccess: () => {
      queryClient.invalidateQueries([...key, query]);
    },

    onError: (error, newHabit, context) => {
      if (!context) return;

      return queryClient.setQueryData(
        [...key, query],
        () => context.prevHabits
      );
    },
  });
};

export default useMutateHabit;
