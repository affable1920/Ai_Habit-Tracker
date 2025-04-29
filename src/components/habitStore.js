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
      const { data } = await http.post(endPoint + "/create", habit);

      set((store) => ({
        habits: store.habits.map((h) =>
          h.tempId === tempId ? { ...data } : h
        ),
      }));

      return { success: true, msg: "Habit added successfully !" };
    } catch (err) {
      set((store) => ({
        habits: store.habits.filter((h) => h.tempId != tempId),
      }));

      return { success: false, msg: err };
    }
  },

  editHabit: async (habitId, fields) => {
    const orgHabits = [...get().habits];

    set((store) => ({
      habits: store.habits.map((habit) =>
        habit.id === habitId ? { ...habit, ...fields } : habit
      ),
    }));

    try {
      const {
        data: { response },
      } = await http.put(`${endPoint}/${habitId}`, fields);

      return response.msg;
    } catch (err) {
      set((store) => ({ habits: orgHabits, ...store }));

      console.log(err);
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
      return "Habit successfullt deleted";
    } catch (err) {
      set((store) => ({ ...store, habits: orgHabits }));
      console.log(err);
    }
  },
}));

export default useHabitStore;
