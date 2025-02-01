import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
import auth from "../services/authService";
import AuthContext from "../context/AuthContext";
import QueryContext from "../context/QueryContext";
import { getPrompt } from "./../Utils/handleAi";
import Gemini from "../hooks/GeminiSDK";
import useHabits from "./useHabits";

const systemInstruction = `
You are an AI assistant that checks if a new habit is similar to any existing habits in a user's collection.
Always return responses in a simple and structured JSON format for easy parsing. 
Rules:
Compare the new_habit with existing_habits.
Ensure the response is in easy-to-parse JSON format.

Same Habit:
The habit is either exactly the same by wording or means the same thing in practice.
Example: "JavaScript for backend" vs. "JS for backend" → Same Habit
Example: "Morning meditation" vs. "Meditating in the morning" → Same Habit

Similar Habit:
The habit is different in words but has a closely related meaning or function.
Example: "Cardio workout" vs. "Running for 30 minutes" → Similar Habit
Example: "Javascript for frontend" vs. "Javascript for backend" → Neither same or a Similar

"Same" habits trigger an error/alert.
"Similar" habits give the user a choice to proceed or not.
"Unique" habits are approved for addition.
      `;
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

  const key = [user?.uid, "habits"];
  const queryClient = useQueryClient();

  const { data: { habits = [], count } = {} } = useHabits();
  const genAi = new Gemini(systemInstruction);

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

  const habitExists = (title, description) => {
    const titles = new Set(habits?.map((habit) => habit.title));
    const descriptions = new Set(habits?.map((habit) => habit.description));

    return titles.has(title) && descriptions.has(description);
  };

  return useMutation({
    mutationKey: key,
    mutationFn: async (habitRequest) => {
      const { newHabit = {} } = habitRequest;
      if (habitRequest.action === "delete") deleteHabit(habitRequest.habitId);

      if (habitRequest.action === "add") {
        if (count > 0) {
          if (habitExists(newHabit.title, newHabit.description))
            throw Error("A same habit already exists in your collection !");

          genAi.prompt = getPrompt([...habits, { ...habitRequest.newHabit }]);
          const ifSimilar = JSON.parse(await genAi.fetch());
          if (ifSimilar) throw Error("A similar habit might already exist !");
        } else {
          addHabit(habitRequest.newHabit);
          return "Habit successfully added !";
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
      if (!context || !error) return;
      return queryClient.setQueryData(
        [...key, query],
        () => context.prevHabits
      );
    },
  });
};

export default useMutateHabit;
