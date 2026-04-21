import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useGetOrganizerTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/transactions/organizer");
      console.log(data);
      return data;
    },
  });
}
