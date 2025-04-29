import { create } from "zustand";

const alertStore = create((set) => ({
  alert: false,
  message: "",

  type: "success",
  setAlert: ({ msg, type }) =>
    set(() => ({ alert: true, message: msg, type: type })),

  hideAlert: () => set(() => ({ alert: false, message: "" })),
}));

export default alertStore;
