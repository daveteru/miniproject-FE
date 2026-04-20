import { useState, type Dispatch, type SetStateAction } from "react";
import { formatThousand } from "../../utility/dateconvert";

export type CartItem = {
  id: number;
  ticketLevel: string;
  price: number;
  availableTicket: number;
  qty: number;
};

type ticketcardprops = {
  id: number;
  ticketLevel: string;
  price: number;
  availableTicket: number;
  setCart: Dispatch<SetStateAction<CartItem[]>>;
};

export default function TicketCard({
  id,
  ticketLevel,
  price,
  availableTicket,
  setCart,
}: ticketcardprops) {
  const [qty, setQty] = useState(0);

  const updateCart = (newQty: number) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === id);
      if (newQty === 0) return prev.filter((item) => item.id !== id);
      if (exists)
        return prev.map((item) =>
          item.id === id ? { ...item, qty: newQty } : item,
        );
      return [
        ...prev,
        { id, ticketLevel, price, availableTicket, qty: newQty },
      ];
    });
  };

  const handleMinus = () => {
    const newQty = Math.max(0, qty - 1);
    setQty(newQty);
    updateCart(newQty);
  };

  const handlePlus = () => {
    const newQty = Math.min(availableTicket, qty + 1);
    setQty(newQty);
    updateCart(newQty);
  };

  return (
    <div className="w-[95%] h-30 rounded-xl bg-white border border-neutral-300 flex justify-between items-center px-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold">{ticketLevel}</h1>
        <small className="text-neutral-500">
          {availableTicket} tickets left
        </small>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-bold">IDR {formatThousand(price)}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={handleMinus}
            className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-lg leading-none"
          >
            −
          </button>
          <span className="w-5 text-center">{qty}</span>
          <button
            onClick={handlePlus}
            className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-lg leading-none"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
