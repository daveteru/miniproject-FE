import { useMutation } from "@tanstack/react-query";
import type { EditProfileSchema } from "../../schemas/editProfileSchema";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { useAppStore } from "../../store/useAppStore";

export default function useEditProfile() {
  const navigate = useNavigate();
  const { setUser } = useAppStore.getState();

  return useMutation({
    mutationFn: async (payload: EditProfileSchema) => {
      const form = new FormData();
      if (payload.fullName) {
        form.append("fullName", payload.fullName);
      }
      if (payload.birthdate) {
        form.append("birthdate", payload.birthdate);
      }
      if (payload.avatar) {
        form.append("avatar", payload.avatar);
      }
      const response = await axiosInstance.patch("/users", form);
      return response.data;
    },
    onSuccess: (response) => {
      toast.success("User update successful!");
      setUser(response.user);
      navigate("/profile");
    },
    onError: () => {
      toast.error("User update failed!");
    },
  });
}
