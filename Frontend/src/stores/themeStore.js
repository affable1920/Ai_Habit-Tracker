import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create()(
  persist(
    (set) => ({
      dark: true,
      toggle: () => set((store) => ({ dark: !store.dark })),
    }),
    {
      name: "theme",
      partialize: (store) => ({ dark: store.dark }),
    }
  )
);

export default useThemeStore;
