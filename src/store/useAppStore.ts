import { create } from "zustand";

type AppState = {
  // Add your global state fields here
};

type AppActions = {
  // Add your global actions here
};

export const useAppStore = create<AppState & AppActions>(() => ({
  // Initial state values here
}));
