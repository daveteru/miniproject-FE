import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useGetEventDetail(eventId: string | undefined) {
  return useQuery({
    queryKey: ["event", String(eventId)],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/events/${eventId}`);
      return data;
    },
  });
}
