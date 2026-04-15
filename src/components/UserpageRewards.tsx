import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "../store/useAppStore";
import { axiosInstance } from "../lib/axios";
import type { Coupon } from "../types/coupon";
import UserpageRewardsCouponCard from "./UserpageRewardsCouponCard";
import pointsIcon from "../assets/icons/points_icon.svg";

export default function UserpageRewards() {
  const userId = useAppStore.getState().user?.id;

  const {
    data: points,
    isPending: loadingPoints,
    error: errorPoints,
    refetch: refetchPoints,
  } = useQuery({
    queryKey: ["totalPoints", userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/points/user/${userId}`);
      return data;
    },
  });

  const {
    data: coupons,
    isPending: loadingCoupons,
    error: errorCoupons,
    refetch: refetchCoupons,
  } = useQuery({
    queryKey: ["coupons", userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Coupon[]>(
        `/coupons/user/${userId}`,
      );
      console.log(data);

      return data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl">My Rewards</h2>
      <div className="grid grid-cols-2 mt-3">
        <div>
          <p className="font-semibold uppercase tracking-wide text-neutral-700 mb-2">
            Points
          </p>
          <div className="flex flex-row gap-4 items-center">
            <img src={pointsIcon} alt="Coupon icon" className="w-12 h-12" />
            {points && (
              <p className="font-extrabold uppercase tracking-wide text-neutral-700 mb-2 text-5xl">
                {points.totalPoints}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-wide text-neutral-700 mb-2">
            Coupons
          </p>
          {coupons ? coupons.length > 0 && (
            <div className="flex flex-col gap-2">
              {coupons.map((coupon) => (
                <UserpageRewardsCouponCard key={coupon.id} coupon={coupon} />
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
