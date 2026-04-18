import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import type { ChangePasswordSchema } from "../../schemas/changePasswordSchema";

export default function useChangePassword() {
  return useMutation({
    mutationFn: async (payload: ChangePasswordSchema) => {
      const response = await axiosInstance.patch("/auth/change-password", {
        password: payload.password,
        newPassword: payload.newPassword,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password change successful!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Password change failed!");
    },
  });
}
