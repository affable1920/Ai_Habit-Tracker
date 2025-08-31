import { create } from "zustand";

interface ModalStore {
  modalProps: { [key: string]: any };
  currentModal: string | null;

  closeModal: () => void;
  openModal: (name: string, payload?: { [key: string]: any }) => void;
}

const useModalStore = create<ModalStore>((set, get) => ({
  modalProps: {},
  currentModal: null,

  openModal: (name: string, payload) => {
    set(() => ({
      ...get(),
      currentModal: name,
      modalProps: payload?.props ?? {},
    }));
  },

  closeModal: (keepProps?: boolean) => {
    set(() => ({
      ...get(),
      currentModal: null,
      modalProps: keepProps ? get()?.modalProps : {},
    }));
  },
}));

export default useModalStore;
