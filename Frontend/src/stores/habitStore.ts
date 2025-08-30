import { v4 } from "uuid";
import { create } from "zustand";
import api from "../services/api.js";
import type { Habit, Query } from "../types/genericTypes.js";

const endPoint = "/habits";

interface HabitStore {
  habits: Array<Habit>;

  fetchHabits: (query: Query) => void;
  addHabit: (habit: Habit) => void;

  editHabit: (habitId: string, fields: {} | null) => void;
  deleteHabit: (habitId: string) => void;
}

const useHabitStore = create<HabitStore>((set, get) => ({
  habits: [],

  fetchHabits: async (query) => {
    try {
      const response = await api.get(endPoint, {
        params: query,
      });

      set(() => ({ habits: response?.data || [] }));
    } catch (ex) {
      throw ex;
    }
  },

  addHabit: async (habit) => {
    const tempId = v4();
    const tempHabit = { tempId, ...habit };

    set((store) => ({ habits: [tempHabit, ...store.habits] }));

    try {
      const response = await api.post(endPoint, habit);

      set((store) => ({
        habits: store.habits.map((h) =>
          h.tempId === tempId ? { ...(response?.data || {}) } : h
        ),
      }));
    } catch (ex) {
      set((store) => ({
        habits: store.habits.filter((h) => h?.tempId != tempId),
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
      const { data = {} } = await api.put(url, fields);

      set((store) => ({
        ...store,
        habits: store.habits.map((h) => (h.id === habitId ? { ...data } : h)),
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

  deleteHabit: async (habitId: string) => {
    const orgHabits = [...get().habits];

    set((store) => ({
      ...store,
      habits: store.habits.filter((h) => h.id != habitId),
    }));

    try {
      await api.delete(`${endPoint}/${habitId}`);
    } catch (ex) {
      set((store) => ({ ...store, habits: orgHabits }));
      throw ex;
    }
  },
}));

export default useHabitStore;
