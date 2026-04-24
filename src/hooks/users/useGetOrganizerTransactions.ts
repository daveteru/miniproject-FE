import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import type { PageableResponse } from "../../types/pagination";
import type { Transaction } from "../../types/transaction";

export default function useGetOrganizerTransactions(page: number, take?: number) {
  return useQuery({
    queryKey: ["transactions", page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Transaction>>(
        "/transactions/organizer",
        { params: { page: page, take: take } },
      );
      return data;
    },
  });
}
