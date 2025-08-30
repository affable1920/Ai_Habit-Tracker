import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
  dark: boolean;
  toggle: () => void;
}

const useThemeStore = create<ThemeStore>()(
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
