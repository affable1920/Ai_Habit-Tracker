import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { persist } from "zustand/middleware";
import http from "../services/httpService";

const endPoint = "/auth";
const tokenKey = "token";

const useAuthStore = create()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      // Helper Func
      getUser: (jwt) => jwtDecode(jwt),

      login: async (userCred) => {
        try {
          const response = await http.post(endPoint + "/login", userCred);

          const token = response.headers["x-auth-token"];
          set({ user: response.data, token });
        } catch (ex) {
          throw ex;
        }
      },

      register: async (user) => {
        try {
          const response = await http.post(endPoint + "/register", user);

          const token = respnse.headers["x-auth-token"];
          set({ user: get().getUser(token), token });
        } catch (ex) {
          throw ex;
        }
      },

      logout: () => set({ user: null, token: null }),

      getProfile: async () => {
        if (!get().token) return;

        try {
          const response = await http.get(endPoint + "/profile");
          return response.data;
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
