import type React from "react";
import { create } from "zustand";

interface ModalStore {
  modalProps: { [key: string]: any };
  currentModal: string | null | React.ReactNode;

  closeModal: (keepProps?: boolean) => void;
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

  closeModal: (keepProps = false) => {
    set(() => ({
      ...get(),
      currentModal: null,
      modalProps: keepProps ? get()?.modalProps : {},
    }));
  },
}));

export default useModalStore;
