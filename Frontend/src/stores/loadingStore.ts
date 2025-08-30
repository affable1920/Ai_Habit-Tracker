import { create } from "zustand";

interface LoadingStore {
  loading: boolean;
  loaderProps: {};

  loadingStates: {};
  setLoading: (action: boolean, payload: { [key: string]: {} | any }) => void;
}

const useLoadingStore = create<LoadingStore>((set) => ({
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
