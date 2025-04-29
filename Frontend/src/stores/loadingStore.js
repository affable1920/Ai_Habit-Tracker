import { create } from "zustand";

const loadingStore = create((set) => ({
  loading: false,

  setLoading: (action) => set(() => ({ loading: action })),
}));

export default loadingStore;
