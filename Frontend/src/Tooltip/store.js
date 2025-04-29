import { create } from "zustand";

const tootlipStore = create((set) => ({
  visible: false,
  element: null,

  message: "",
  position: null,

  hide: () => set(() => ({ visible: false, message: "", element: null })),
  setPosition: (position) => set((state) => ({ ...state, position })),

  show: ({ msg = "", element }) =>
    set(() => ({ visible: true, message: msg, element })),
}));

export default tootlipStore;
