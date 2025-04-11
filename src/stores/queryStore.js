import { create } from "zustand";

const init = {
  pageSize: 10,
  currentPage: 1,
  searchQuery: "",
  status: null,
};

const queryStore = create((set) => ({
  query: init,

  setSearchQuery: (searchQuery) => set(() => ({ query: { searchQuery } })),

  setStatus: (status) =>
    set((state) => ({ query: { ...state.query, status } })),

  setPageSize: (pageSize) =>
    set((state) => ({ query: { ...state.query, pageSize } })),

  setPage: (page) =>
    set((state) => ({ query: { ...state.query, currentPage: page } })),

  reset: () => set(() => ({ query: init })),
}));

export default queryStore;
