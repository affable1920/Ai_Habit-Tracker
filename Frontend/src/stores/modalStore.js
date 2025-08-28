import { create } from "zustand";

const useModalStore = create((set, get) => ({
  modalProps: {},
  currentModal: null,

  openModal: (name, payload) => {
    set(() => ({
      ...get(),
      currentModal: name,
      modalProps: payload?.props ?? { ...(get().modalProps || {}) },
    }));
  },

  closeModal: (keepProps = false) => {
    set(() => ({
      ...get(),
      currentModal: null,
      modalProps: keepProps ? get()?.modalProps : {},
    }));
  },
}));

export default useModalStore;
