import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import type { EditEventSchema } from "../../schemas/editEventSchema";

export default function useEditEvent(eventId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["events", eventId],
    mutationFn: async (payload: EditEventSchema) => {
      const form = new FormData();
      if (payload.name) {
        form.append("name", payload.name);
      }
      if (payload.artist) {
        form.append("artist", payload.artist);
      }
      if (payload.category) {
        form.append("category", payload.category);
      }
      if (payload.startDate) {
        form.append("startDate", payload.startDate);
      }
      if (payload.endDate) {
        form.append("endDate", payload.endDate);
      }
      if (payload.city) {
        form.append("city", payload.city);
      }
      if (payload.location) {
        form.append("location", payload.location);
      }
      if (payload.description) {
        form.append("description", payload.description);
      }
      if (payload.thumbnail) {
        form.append("thumbnail", payload.thumbnail);
      }
      const response = await axiosInstance.patch(`/events/${eventId}`, form);

      return response.data;
    },
    onSuccess: (response) => {
      console.log(response);

      queryClient.setQueryData(["event", String(eventId)], response);
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
      toast.success("Event update successful!");
    },
    onError: () => {
      toast.error("Event update failed!");
    },
  });
}
