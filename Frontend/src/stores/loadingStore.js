import { create } from "zustand";

const useLoadingStore = create((set) => ({
  loading: false,
  setLoading: (action) => set(() => ({ loading: action })),
}));

export default useLoadingStore;
