import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { v4 } from "uuid";
import auth from "../services/authService";
import AuthContext from "../context/AuthContext";
import useHabits from "./useHabits";

const habitKeys = {
  reminder_Times: {},
  streak: 0,
  status: "incomplete",
  progress: [],
  creationTime: new Date(),
};

const useAddHabit = () => {
  const { user } = useContext(AuthContext);
  const { data: habits } = useHabits();
  const key = [user?.displayName, "habits"];

  const queryClient = useQueryClient();
  function habitExists(title) {
    const titles = new Set(habits.map((habit) => habit.title));
    return titles.has(title);
  }

  return useMutation({
    mutationKey: key,
    mutationFn: async (newHabit) => {
      if (habitExists(newHabit.title))
        throw Error("A same habit already exists !");
      else {
        const docRef = doc(auth.firestore, "users", user?.displayName);
        await updateDoc(docRef, {
          habits: arrayUnion({ id: v4(), ...newHabit, ...habitKeys }),
        });
      }
    },

    onSuccess: (savedHabit, newHabit) => {
      queryClient.invalidateQueries({
        queryKey: key,
      });
    },
  });
};

export default useAddHabit;
