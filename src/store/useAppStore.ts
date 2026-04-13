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
  } | null;
};

type AppActions = {
  setUser: (user: AppState["user"]) => void;
  clearUser: () => void;
};

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: async () => {
        await axiosInstance.post("/auth/logout");
        set({ user: null });
        window.location.href = "/";
      },
    }),
    { name: "auth-store" },
  ),
);
