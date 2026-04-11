import { useState } from "react";
import { formatThousand } from "../utility/dateconvert";

type ticketcardprops = {
  ticketLevel: string;
  price: number;
  availableTicket: number;
};

export default function TicketCard({ ticketLevel, price, availableTicket }: ticketcardprops) {
  const [qty, setQty] = useState(0);

  return (
    <div className="w-[95%] h-30 rounded-xl bg-white border border-neutral-300 flex justify-between items-center px-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold">{ticketLevel}</h1>
        <small className="text-neutral-500">{availableTicket} tickets left</small>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-bold">IDR {formatThousand(price)}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQty((q) => Math.max(0, q - 1))}
            className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-lg leading-none"
          >
            −
          </button>
          <span className="w-5 text-center">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(availableTicket, q + 1))}
            className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-lg leading-none"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
