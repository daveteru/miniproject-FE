import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";

export default function useRejectTransaction() {
  return useMutation({
    mutationKey: ["transaction"],
    mutationFn: async (uuid: string) => {
      const response = await axiosInstance.patch(
        `/transactions/reject/${uuid}`,
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Payment rejected!");
      location.reload();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Something went wrong!");
    },
  });
}
