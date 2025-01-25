import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
import auth from "../services/authService";
import AuthContext from "../context/AuthContext";
import useHabits from "./useHabits";
import QueryContext from "../context/QueryContext";

const habitKeys = {
  reminder_Times: {},
  streak: 0,
  status: "incomplete",
  progress: [],
  creationTime: new Date(),
};

const useMutateHabit = () => {
  const { user } = useContext(AuthContext);
  const { query } = useContext(QueryContext);
  const { data } = useHabits();
  const key = [user?.uid, "habits"];

  const queryClient = useQueryClient();
  function habitExists(title) {
    const titles = new Set(data?.habits?.map((habit) => habit.title));
    return titles.has(title);
  }

  async function addHabit(newHabit) {
    if (habitExists(newHabit.title))
      throw Error("A same habit already exists !");
    else {
      const id = v4();
      const habitDocRef = doc(auth.firestore, "users", user?.uid, "habits", id);
      try {
        await setDoc(habitDocRef, {
          id,
          ...newHabit,
          ...habitKeys,
          title: newHabit.title.toLowerCase(),
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function deleteHabit(id) {
    const habitRef = doc(auth.firestore, "users", user?.uid, "habits", id);
    try {
      await deleteDoc(habitRef);
    } catch (e) {
      console.log(e);
    }
  }

  return useMutation({
    mutationKey: key,
    mutationFn: async (habitRequest) => {
      if (habitRequest.action === "add") addHabit(habitRequest.newHabit);
      else if (habitRequest.action === "delete")
        deleteHabit(habitRequest.habitId);
    },

    onMutate: (habitRequest) => {
      const prevHabits = queryClient.getQueryData(key);
      queryClient.setQueryData(
        [user?.uid, "habits", query],
        ({ habits: previousHabits }) =>
          habitRequest.action === "add"
            ? [...previousHabits, habitRequest.newHabit]
            : previousHabits.filter(
                (habit) => habit.id !== habitRequest.habitId
              )
      );

      return { prevHabits };
    },

    onSuccess: () => {
      queryClient.invalidateQueries(key);
    },

    onError: (error, newHabit, context) => {
      if (!context) return;
      return queryClient.setQueryData(key, () => context.prevHabits);
    },
  });
};

export default useMutateHabit;
