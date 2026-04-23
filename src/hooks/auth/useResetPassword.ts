import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../../lib/axios";
import type { ResetPasswordSchema } from "../../schemas/resetPasswordSchema";

export default function useResetPassword() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: ResetPasswordSchema) => {
      const response = await axiosInstance.post(
        "/auth/reset-password",
        {
          password: payload.password,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password successfuly reset");
      navigate("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Something went wrong!");
    },
  });
}
