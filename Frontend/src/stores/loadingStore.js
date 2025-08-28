import { create } from "zustand";

const useLoadingStore = create((set) => ({
  loading: false,

  loaderProps: {},
  loadingStates: {
    btn: "",
    app: "",
  },

  setLoading: (action, payload) => {
    set(() => ({
      loading: action ?? true,
      loaderProps: payload?.props ?? {},
    }));
  },
}));

export default useLoadingStore;
