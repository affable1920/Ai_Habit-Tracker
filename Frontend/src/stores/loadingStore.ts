import { create } from "zustand";

interface LoadingStore {
  loading: boolean;
  loaderProps?: { [key: string]: any };

  loadingStates: { [key: string]: any };
  setLoading: (action?: boolean, payload?: { [key: string]: any }) => void;
}

const useLoadingStore = create<LoadingStore>((set) => ({
  loading: false,

  loaderProps: {},
  loadingStates: {
    btn: "",
    app: "",
  },

  setLoading: (action?: boolean, payload?) => {
    set(() => ({
      loading: action ?? true,
      loaderProps: payload?.props ?? null,
    }));
  },
}));

export default useLoadingStore;
