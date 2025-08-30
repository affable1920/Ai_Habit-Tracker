import { create } from "zustand";
import type { Query } from "../types/genericTypes.js";

const init = {
  max: 5,
  page: 1,
  status: null,
  searchQuery: "",
};

interface QueryStore {
  query: Query;

  reset: () => void;
  setMax: (max: number) => void;

  setStatus: (status: string | null) => void;
  setSearchQuery: (searchQuery: string) => void;

  setPage: (page: number) => void;
  setQuery: (updates: Query) => void;
}

const useQueryStore = create<QueryStore>((set, get) => ({
  query: init,

  setSearchQuery: (sq) => {
    set((get) => ({
      query: { ...get.query, searchQuery: sq, status: null },
    }));
  },

  setMax: (max) => set(() => ({ query: { ...get().query, max } })),

  setStatus: (status) =>
    set(() => ({
      query: {
        ...get().query,
        status,
      },
    })),

  setPage: (page) => set((get) => ({ query: { ...get.query, page } })),

  reset: () => set({ query: { ...init } }),

  setQuery: (updates) => set(() => ({ query: { ...updates } })),
}));

export default useQueryStore;
