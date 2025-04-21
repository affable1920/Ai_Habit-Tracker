import { create } from "zustand";

const init = {
  limit: 10,
  page: 1,
  search_query: "",
  status: null,
};

const queryStore = create((set) => ({
  query: init,

  setSearchQuery: (searchQuery) =>
    set(() => ({
      query: { search_query: searchQuery, page: 1, status: null },
    })),

  setStatus: (status) =>
    set((state) => ({ query: { ...state.query, status } })),

  setPageSize: (limit) =>
    set((state) => ({ query: { ...state.query, limit } })),

  setPage: (page) => set((state) => ({ query: { ...state.query, page } })),

  reset: () => set(() => ({ query: init })),
}));

export default queryStore;
