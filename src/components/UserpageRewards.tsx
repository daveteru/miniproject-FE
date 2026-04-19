import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "../store/useAppStore";
import { axiosInstance } from "../lib/axios";
import type { Coupon } from "../types/coupon";
import UserpageRewardsCouponCard from "./UserpageRewardsCouponCard";
import pointsIcon from "../assets/icons/points_icon.svg";
import { formatThousand } from "../utility/dateconvert";
import { useState } from "react";
import type { PageableResponse } from "../types/pagination";
import Pagination from "./Pagination";

export default function UserpageRewards() {
  const userId = useAppStore.getState().user?.id;
  const [page, setPage] = useState<number>(1);

  const { data: points, isPending: loadingPoints } = useQuery({
    queryKey: ["totalPoints", userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/points/user/${userId}`);
      return data;
    },
  });

  const { data: coupons, isPending: loadingCoupons } = useQuery({
    queryKey: ["coupons", userId, page],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Coupon>>(
        `/coupons/user/${userId}`,
        { params: { page: page } },
      );
      return data;
    },
  });

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-2xl">My Rewards</h2>
        <div>
          <div className="flex flex-row gap-4  items-center ">
            <img
              src={pointsIcon}
              alt="Coupon icon"
              className="w-10 h-10 borer"
            />
            {!loadingPoints && (
              <p className="font-extrabold  h-full uppercase flex items-center  text-neutral-700  text-2xl">
                {formatThousand(points.totalPoints)} POINTS
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div>
          <p className="font-semibold uppercase tracking-wide text-neutral-700 mb-2">
            Coupons
          </p>
          {coupons && !loadingCoupons ? (
            coupons.data.length > 0 && (
              <div className="flex flex-col border border-neutral-200 rounded-xl px-5 py-3">
                <div className="flex flex-col">
                  {coupons.data.map((coupon) => (
                    <UserpageRewardsCouponCard
                      key={coupon.id}
                      coupon={coupon}
                    />
                  ))}
                  <Pagination
                    currentPage={coupons.meta.page}
                    totalPages={Math.ceil(
                      coupons.meta.total / coupons.meta.take,
                    )}
                    onPageChange={(pg) => {
                      setPage(pg);
                    }}
                  />
                </div>
              </div>
            )
          ) : (
            <div>
              <p>You have no coupons!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
