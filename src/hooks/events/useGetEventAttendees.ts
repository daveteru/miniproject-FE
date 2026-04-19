import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import type { Attendee } from "../../types/attendee";
import type { PageableResponse } from "../../types/pagination";

export default function useGetEventAttendees(
  eventId: string | undefined,
  page: number,
) {
  return useQuery({
    queryKey: ["events", eventId, page],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Attendee>>(
        `/events/attendees/${eventId}`,
        { params: { page: page, take: 10 } },
      );
      return data;
    },
  });
}
