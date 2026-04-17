import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";

type AppState = {
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    birthdate: string;
    avatar: string | null;
    referral: string;
  } | null;
};

type AppActions = {
  setUser: (user: AppState["user"]) => void;
  // updateUser: (updates: Partial<AppState["user"]>) => void;
  clearUser: () => void;
};

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      // updateUser: (updates) =>
      //   set((state) => ({
      //     ...state,
      //     user: state.user ? { ...state.user, ...updates } : null,
      //   })),
      clearUser: async () => {
        await axiosInstance.post("/auth/logout");
        set({ user: null });
        window.location.href = "/";
      },
    }),
    { name: "auth-store" },
  ),
);
