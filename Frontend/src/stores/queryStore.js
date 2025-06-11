import { create } from "zustand";

const init = {
  page: 1,
  search_query: "",
  status: null,
  max: 5,
};

const queryStore = create((set) => ({
  query: init,

  setSearchQuery: (searchQuery) => {
    set((state) => ({
      query: {
        ...state.query,
        search_query: searchQuery,
        status: null,
      },
    }));
  },

  setMax: (max) => set((state) => ({ query: { ...state.query, max } })),

  setStatus: (status) =>
    set((state) => ({ query: { ...state.query, status } })),

  setPageSize: (pageSize) =>
    set((state) => ({ query: { ...state.query, pageSize } })),

  setPage: (page) => set((state) => ({ query: { ...state.query, page } })),

  reset: (max) => set({ query: { ...init, max } }),

  setQuery: (updates) =>
    set((state) => ({ query: { ...state.query, ...updates } })),
}));

export default queryStore;
