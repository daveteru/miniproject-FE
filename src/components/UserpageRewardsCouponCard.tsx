import type { Coupon } from "../types/coupon";
import { formatDate } from "../utility/dateconvert";
import couponIcon from "../assets/icons/coupon_icon.svg";

interface CouponsListProps {
  coupon: Coupon;
}

export default function UserpageRewardsCouponCard({
  coupon,
}: CouponsListProps) {
  return (
    <div className="flex flex-row border h-15 justify-start items-center rounded-xl border-neutral-600 text-neutral-600 hover:text-neutral-400">
      <div className="flex items-center justify-center border-r border-neutral-600 bg-amber-300 h-full rounded-l-xl">
        <div className="mx-2">
          <img src={couponIcon} alt="Coupon icon" className="h-8 w-8" />
        </div>
      </div>
      <div className="flex flex-col mx-2">
        <p className=" text-xl font-[impact]">{coupon.amount}% OFF</p>
        <p className="font-semibold text-xs">
          EXPIRES IN: {formatDate(coupon.expiredDate)}
        </p>
      </div>
    </div>
  );
}
