import couponIcon from "../../assets/icons/coupon_icon.svg";
import type { Coupon } from "../../types/coupon";
import { formatDate } from "../../utility/dateconvert";

interface CouponsListProps {
  coupon: Coupon;
}

export default function UserpageRewardsCouponCard({
  coupon,
}: CouponsListProps) {
  return (
    <div className="flex flex-row border-b h-15 justify-start items-center border-neutral-200 text-neutral-600">
      <div className="flex items-center justify-center">
        <div className="mx-2">
          <img src={couponIcon} alt="Coupon icon" className="h-8 w-8" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mx-2 w-full">
        <p className=" text-xl font-krona-one">{coupon.amount}% OFF</p>
        <p className="font-semibold text-[14px]">
          EXPIRES IN: {formatDate(coupon.expiredDate)}
        </p>
      </div>
    </div>
  );
}
