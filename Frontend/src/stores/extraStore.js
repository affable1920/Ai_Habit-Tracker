import { create } from "zustand";

const useExtraStore = create((set, get) => ({
  extra: {},

  setValues: (value) => {
    set((store) => ({ ...store, extra: { ...value } }));
  },
}));

export default useExtraStore;
