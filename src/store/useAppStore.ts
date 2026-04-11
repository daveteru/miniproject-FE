import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppState = {
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    birthdate: string;
    avatar: string;
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
      clearUser: () => set({ user: null }),
    }),
    { name: "auth-store" }
  )
);
