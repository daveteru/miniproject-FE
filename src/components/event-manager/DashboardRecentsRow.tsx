import { formatThousand } from "../../utility/utils";

interface RecentsRowProps {
  name: string;
  avatar: string;
  email: string;
  saleAmount: number;
}

export default function DashboardRecentsRow({
  name,
  avatar,
  email,
  saleAmount,
}: RecentsRowProps) {
  return (
    <div className="grid grid-cols-[1fr_5fr] border-b border-neutral-200 py-2 px-1 gap-3 items-center">
      <div className="w-full h-full">
        {avatar ? (
          <img
            src={avatar}
            alt="Customer avatar"
            className="rounded-full w-full h-full object-cover"
          />
        ) : (
          <div className="rounded-full w-full h-full bg-neutral-300"></div>
        )}
      </div>
      <div className="flex flex-col gap-1 text-[12px]">
        <p className="text-neutral-600 text-[11px]">{email}</p>
        <div className="flex gap-0.5 items-center justify-between">
          <p>{name}</p>
          <p className="text-end">Rp. {formatThousand(saleAmount)}</p>
        </div>
      </div>
    </div>
  );
}
