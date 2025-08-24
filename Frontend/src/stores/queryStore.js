import { create } from "zustand";

const init = {
  max: 5,
  page: 1,
  status: null,
  searchQuery: "",
};

const useQueryStore = create((set, get) => ({
  query: init,

  setSearchQuery: (sq) =>
    set((get) => ({
      query: { ...get.query, searchQuery: sq, status: null },
    })),

  setMax: (max) => set(() => ({ query: { ...get.query, max } })),

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
