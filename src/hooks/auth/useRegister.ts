import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../lib/axios";
import type { RegisterSchema } from "../../schemas/registerSchema";

export default function useRegister() {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: async (payload: RegisterSchema) => {
      const response = await axiosInstance.post("/auth/register", {
        fullName: payload.name,
        email: payload.email,
        password: payload.password,
        birthdate: payload.birthdate,
        referral: payload.referral,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Registration failed!");
    },
  });
}
