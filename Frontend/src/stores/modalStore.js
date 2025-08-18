import { create } from "zustand";

const useModalStore = create((set, get) => ({
  modalProps: {},
  currentModal: null,

  openModal: (name, payload) => {
    set(() => ({
      ...get(),
      modalProps: payload?.props ?? {},
      currentModal: name,
    }));
  },

  // Later add keep props state parameter
  closeModal: (keepProps = false) => {
    set(() => ({
      ...get(),
      modalProps: keepProps ? get()?.modalProps : {},
      currentModal: null,
    }));
  },
}));

export default useModalStore;
