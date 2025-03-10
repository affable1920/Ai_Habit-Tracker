import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
import auth from "../services/authService";
import AuthContext from "../context/AuthContext";
import QueryContext from "../components/Providers/QueryProvider";
import Gemini from "../hooks/GeminiSDK";
import useHabits from "./useHabits";
import getPrompt from "../Utils/handleAi";

const habitKeys = {
  reminder_Times: {},
  streak: 0,
  completed: false,
  status: null,
  progress: [],
  creationTime: new Date(),
  archived: false,
};

const useMutateHabit = () => {
  const { user } = useContext(AuthContext);
  const { query } = useContext(QueryContext);

  const key = [user?.uid, "habits"];
  const queryClient = useQueryClient();

  const { data: { habits = [], count } = {} } = useHabits();

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

  const genAi = new Gemini("habit_check");

  const habitExists = async (habit) => {
    genAi.prompt = getPrompt(habits, habit);

    const response = await genAi.fetch();
    console.log(response);

    if (response.use_case === "habit_check" && response.habit_check) {
      const { exists, message } = response.habit_check;
      return { exists, message };
    }
  };

  return useMutation({
    mutationKey: key,
    mutationFn: async (habitRequest) => {
      if (habitRequest.action === "delete") deleteHabit(habitRequest.habitId);

      if (habitRequest.action === "add") {
        const { newHabit } = habitRequest;

        if (habits.length === 0) addHabit(newHabit);
        else {
          genAi.prompt = getPrompt(habits, newHabit);

          const { habit_check } = await genAi.fetch();
          if (habit_check.exists) throw Error(habit_check?.message);
          addHabit(newHabit);
        }
      }
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

    onSuccess: (message) => {
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
