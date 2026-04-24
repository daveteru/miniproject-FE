type Voucher = {
  discamount: number;
  amount: number;
  expiredDate: string;
  userId: number;
};

type Props = {
  promotoggle: boolean;
  voucher: Voucher;
  onToggle: () => void;
  onVoucherChange: (field: string, value: string) => void;
};

export default function Createpage_promotions({ promotoggle, voucher, onToggle, onVoucherChange }: Props) {
  return (
    <>
      <div className="mb-5">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-lg font-black uppercase tracking-wider text-neutral-900">
            PROMOTIONS
          </h2>
          <button
            type="button"
            onClick={onToggle}
            className={`relative w-12 h-6 rounded-xl transition-colors ${
              promotoggle ? "bg-neutral-800" : "bg-neutral-300"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-xl bg-white shadow transition-transform ${
                promotoggle ? "-translate-x-5.5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`px-6 py-8 mb-10 rounded-2xl border-neutral-300 border-dashed border-2 ${promotoggle ? "" : "hidden"}`}
      >
        <div className="flex w-full flex-col md:flex-row items-center gap-4">
          <div className="md:w-[40%] w-full">
            <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
              DISCOUNT AMOUNT
            </label>
            <div className="border w-full flex rounded-xl gap-2 border-neutral-300 px-4 py-1.5">
              <span className="text-neutral-400">IDR</span>
              <input
                type="number"
                value={voucher.discamount}
                onChange={(e) => onVoucherChange("discamount", e.target.value)}
                className="w-full text-sm outline-none"
              />
            </div>
          </div>
          <div className="md:w-[20%] w-full">
            <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
              TOTAL  VOUCHER
            </label>
            <div className="border flex rounded-xl gap-2 border-neutral-300 px-4 py-2">
              <input
                type="number"
                value={voucher.amount}
                onChange={(e) => onVoucherChange("amount", e.target.value)}
                className="w-full text-sm outline-none"
              />
            </div>
          </div>
          <div className="md:flex-1 w-full">
            <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
              Expired Date
            </label>
            <input
              type="date"
              value={voucher.expiredDate}
              onChange={(e) => onVoucherChange("expiredDate", e.target.value)}
              className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors"
            />
          </div>
        </div>
      </div>
    </>
  );
}
