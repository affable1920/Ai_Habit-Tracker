import { create } from "zustand";
import { v4 } from "uuid";
import { toast } from "sonner";
import http from "../services/httpService";

const url = "http://localhost:8000";

const useHabitStore = create((set, get) => ({
  habits: [],

  fetchHabits: async (userId, query) => {
    const {
      data: { response },
    } = await http.get(`${url}/${userId}/habits`, {
      params: { ...query },
    });

    set(() => ({ habits: response?.habits || [] }));
  },

  addHabit: async (habit, userId, query) => {
    const tempId = v4();
    const tempHabit = { tempId, ...habit };

    set((store) => ({ habits: [tempHabit, ...store.habits] }));

    try {
      const {
        data: { response },
      } = await http.post(`${url}/${userId}/habits`, habit, {
        params: { ...query },
      });

      set((store) => ({
        habits: store.habits.map((h) =>
          h.tempId === tempId ? { ...response?.server_habit } : h
        ),
      }));

      return response.msg;
    } catch (err) {
      set((store) => ({
        habits: store.habits.filter((h) => h.tempId != tempId),
      }));

      console.log(err);
    }
  },

  editHabit: async (userId, habitId, fields) => {
    const orgHabits = [...get().habits];

    set((store) => ({
      habits: store.habits.map((habit) =>
        habit.id === habitId ? { ...habit, ...fields } : habit
      ),
    }));

    try {
      const {
        data: { response },
      } = await http.put(`${url}/${userId}/habits/${habitId}`, fields);

      return response.msg;
    } catch (err) {
      set((store) => ({ habits: orgHabits, ...store }));

      console.log(err);
    }
  },

  deleteHabit: async (userId, habitId) => {
    const orgHabits = [...get().habits];

    set((store) => ({
      ...store,
      habits: store.habits.filter((h) => h.id != habitId),
    }));

    try {
      await http.delete(`${url}/${userId}/habits/${habitId}`);
      return "Habit successfullt deleted";
    } catch (err) {
      set((store) => ({ ...store, habits: orgHabits }));
      console.log(err);
    }
  },
}));

export default useHabitStore;
