import { formatSnakeCase } from "../../utility/utils";

type indicatorprops = {
  paymentStatus: string;
};

export default function TransactionStatusIndicator({
  paymentStatus,
}: indicatorprops) {
  const statusConfig: Record<
    string,
    { bg: string; text: string; outline: string }
  > = {
    PAID: {
      bg: "bg-green-100",
      text: "text-green-600",
      outline: "outline-green-600",
    },
    WAITING_FOR_PAYMENT: {
      bg: "bg-amber-100",
      text: "text-amber-600",
      outline: "outline-amber-600",
    },
    WAITING_FOR_CONFIRM: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      outline: "outline-blue-600",
    },
    EXPIRED: {
      bg: "bg-neutral-100",
      text: "text-neutral-600",
      outline: "outline-neutral-600",
    },
    REJECTED: {
      bg: "bg-red-100",
      text: "text-red-600",
      outline: "outline-red-600",
    },
    CANCELLED: {
      bg: "bg-red-100",
      text: "text-red-600",
      outline: "outline-red-600",
    },
  };

  return (
    <div>
      {
        <div
          className={`rounded-full h-fit w-fit flex items-center outline px-2 py-1
            ${statusConfig[paymentStatus].bg ?? "bg-neutral-100"}  
             ${statusConfig[paymentStatus].text ?? "text-neutral-100"} 
             ${statusConfig[paymentStatus].outline ?? "bg-outline-100"}`}
        >
          <p className="text-[12px]">{formatSnakeCase(paymentStatus)}</p>
        </div>
      }
    </div>
  );
}
