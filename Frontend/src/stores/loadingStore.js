import { create } from "zustand";

const useLoadingStore = create((set) => ({
  loading: false,
  loaderProps: {},

  setLoading: (action, payload) => {
    set(() => ({
      loading: action ?? true,
      props: payload?.props ?? {},
    }));
  },
}));

export default useLoadingStore;
