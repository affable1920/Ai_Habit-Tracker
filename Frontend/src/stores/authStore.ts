import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { persist } from "zustand/middleware";
import http from "../services/api.js";
import type { User } from "../types/genericTypes.js";

interface AuthStore {
  user: any;
  token: string | null;

  logout: () => void;
  getProfile: () => void;
  register: (user: User) => Promise<void>;
  login: (credentials: { [key: string]: string }) => Promise<void>;

  userType: () => void;
  getUser: (jwt: string) => void;
  isAuthenticated: () => boolean;
}

const endPoint = "/auth";
const tokenKey = "token";

const authHeader = "x-auth-token";

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      // Helper Fns
      getUser: (jwt: string) => jwtDecode(jwt),

      isAuthenticated: () => !!get().token,
      userType: () => get().user?.role ?? "Guest",

      login: async (credentials) => {
        try {
          const response = await http.post(endPoint + "/login", credentials);
          const token = response.headers[authHeader];

          set({ user: response.data, token });
        } catch (ex) {
          throw ex;
        }
      },

      register: async (user) => {
        try {
          const response = await http.post(endPoint + "/register", user);
          const token = response.headers[authHeader];

          set({ user: get().getUser(token), token });
        } catch (ex) {
          throw ex;
        }
      },

      logout: () => set({ user: null, token: null }),

      getProfile: async () => {
        if (!get().isAuthenticated) return;

        try {
          const response = await http.get(endPoint + "/profile");
          return response?.data;
        } catch (ex) {
          throw ex;
        }
      },
    }),
    {
      name: tokenKey,
      partialize: (store) => ({
        token: store.token,
      }),
    }
  )
);

export default useAuthStore;
