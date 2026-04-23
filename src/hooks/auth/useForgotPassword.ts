import { useMutation } from "@tanstack/react-query";
import type { ForgotPasswordSchema } from "../../schemas/forgotPasswordSchema";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import type { AxiosError } from "axios";

export default function useForgotPassword() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (payload: ForgotPasswordSchema) => {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email: payload.email,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Email sent! Token expires in 15 minutes.");
      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Something went wrong!");
    },
  });
}
