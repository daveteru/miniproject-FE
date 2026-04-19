import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useGetMyEvents(page: number) {
  return useQuery({
    queryKey: ["events", page],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/events/organizer", {
        params: { page: page },
      });
      return data;
    },
  });
}
