import { redirect } from "react-router";
import { useAppStore } from "../store/useAppStore";

export const authLoader = (allowedRoutes?: String[]) => {
  return () => {
    const { user } = useAppStore.getState();

    if (!user) {
      return redirect("/login");
    }

    if (allowedRoutes && !allowedRoutes.includes(user.role)) {
      return redirect("/");
    }

    return;
  };
};

export const loggedInLoader = () => {
  const { user } = useAppStore.getState();
  if (user) return redirect("/");
  return null;
};
