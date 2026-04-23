import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../lib/axios";
import type { LoginSchema } from "../../schemas/loginSchema";
import { useAppStore } from "../../store/useAppStore";

export default function useLogin() {
  const navigate = useNavigate();
  const setUser = useAppStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (payload: LoginSchema) => {
      const response = await axiosInstance.post("/auth/login", {
        email: payload.email,
        password: payload.password,
      });
      return response.data;
    },
    onSuccess: (response) => {
      setUser({
        id: response.user.id,
        fullName: response.user.fullName,
        email: response.user.email,
        avatar: response.user.avatar,
        role: response.user.role,
        birthdate: response.user.birthdate,
        referral: response.user.referral,
      });
      toast.success("Login successful!");
      if (response.user.role === "USER") navigate("/");
      if (response.user.role === "ORGANIZER") navigate("/event-manager/stats");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Login failed!");
    },
  });
}
