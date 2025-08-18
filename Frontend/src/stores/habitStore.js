import { v4 } from "uuid";
import { create } from "zustand";
import http from "../services/httpService";

const endPoint = "/habits";

const useHabitStore = create((set, get) => ({
  habits: [],

  fetchHabits: async (query) => {
    try {
      const response = await http.get(endPoint, {
        params: { ...query },
      });

      set(() => ({ habits: response?.data || [] }));
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  },

  addHabit: async (habit) => {
    const tempId = v4();
    const tempHabit = { tempId, ...habit };

    set((store) => ({ habits: [tempHabit, ...store.habits] }));

    try {
      const response = await http.post(endPoint, habit);

      set((store) => ({
        habits: store.habits.map((h) =>
          h.tempId === tempId ? { ...(response?.data || {}) } : h
        ),
      }));
    } catch (ex) {
      set((store) => ({
        habits: store.habits.filter((h) => h.tempId != tempId),
      }));

      throw ex;
    }
  },

  editHabit: async (habitId, fields = null) => {
    const url = !!fields
      ? `${endPoint}/${habitId}`
      : `${endPoint}/complete/${habitId}`;

    const orgHabit = get().habits.find((h) => h.id === habitId);

    if (!orgHabit) throw new Error("Habit not found !");

    set((store) => ({
      ...store,
      habits: store.habits.map((h) =>
        h.id === habitId ? { ...h, ...fields } : h
      ),
    }));

    try {
      const response = await http.put(url, fields);
      set((store) => ({
        ...store,
        habits: store.habits.map((h) =>
          h.id === habitId ? { ...response?.data } : h
        ),
      }));
    } catch (ex) {
      set((store) => ({
        ...store,
        habits: store.habits.map((h) =>
          h.id === habitId ? { ...orgHabit } : h
        ),
      }));

      throw ex;
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
    } catch (ex) {
      set((store) => ({ ...store, habits: orgHabits }));
      throw ex;
    }
  },
}));

export default useHabitStore;
