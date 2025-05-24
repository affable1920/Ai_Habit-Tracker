import { create } from "zustand";
import { v4 } from "uuid";
import http from "../services/httpService";

const endPoint = "/habits";

const useHabitStore = create((set, get) => ({
  habits: [],

  fetchHabits: async (query) => {
    const response = await http.get(endPoint, {
      params: { ...query },
    });

    set(() => ({ habits: response.data || [] }));
  },

  addHabit: async (habit) => {
    const tempId = v4();
    const tempHabit = { tempId, ...habit };

    set((store) => ({ habits: [tempHabit, ...store.habits] }));

    try {
      const { data } = await http.post(endPoint, habit);

      set((store) => ({
        habits: store.habits.map((h) =>
          h.tempId === tempId ? { ...data } : h
        ),
      }));

      return { success: true, msg: "Habit added successfully !" };
    } catch (ex) {
      set((store) => ({
        habits: store.habits.filter((h) => h.tempId != tempId),
      }));

      return { success: false, msg: ex };
    }
  },

  editHabit: async (habitId, fields) => {
    const orgHabit = get().habits.find((h) => h.id === habitId);

    set((store) => ({
      ...store,
      habits: store.habits.map((habit) =>
        habit.id === habitId ? { ...habit, ...fields } : habit
      ),
    }));

    try {
      const response = await http.put(`${endPoint}/${habitId}`, fields);
      set((store) => ({
        ...store,
        habits: store.habits.map((h) =>
          h.id === habitId ? { ...response.data } : h
        ),
      }));

      return { success: true, msg: "Habit successfully updated !" };
    } catch (ex) {
      set((store) => ({
        ...store,
        habits: store.habits.map((habit) =>
          habit.id === habitId ? { ...orgHabit } : habit
        ),
      }));

      if (typeof ex != "string") ex = "Error updating habit !";
      return { success: false, msg: ex };
    }
  },

  deleteHabit: async (habitId) => {
    const orgHabits = [...get().habits];

    set((store) => ({
      ...store,

      habits: store.habits.filter((h) => h.id != habitId),
    }));

    try {
      await http.delete(`${endPoint}/${habitId}`);
      await get().fetchHabits();

      return { success: true, msg: "Habit successfully deleted" };
    } catch (ex) {
      set((store) => ({ ...store, habits: orgHabits }));

      if (typeof ex != "string") ex = "Unable to delete habit !";
      return { success: false, msg: ex };
    }
  },
}));

export default useHabitStore;
