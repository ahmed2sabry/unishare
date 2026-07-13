import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { logoutAction } from "../actions/actions";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,

      login: (data) =>
        set({
          accessToken: data.accessToken,
          user: {
            email: data.email,
            role: data.role,
            userName: data.userName,
            fullName: data.fullName,
          },
        }),

      logout: async () => {
        try {
          await logoutAction();
        } finally {
          set({ accessToken: null, user: null });
          // if (typeof window !== "undefined") {
          //   localStorage.removeItem("auth-storage");
          // }
        }
      },

      setAccessToken: (token) => set({ accessToken: token }),
    }),
    {
      name: "auth-storage",

      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
    },
  ),
);
