import { useEffect, useRef, useState } from "react";
import ticketicon from "../assets/icons/ticket.svg";
import uploadicon from "../assets/icons/uploadicon.svg";
import accordionicon from "../assets/icons/accordionicon.svg";
import {
  formatDate,
  formatThousand,
  formatCountdown,
  formatSnakeCase,
} from "../utility/dateconvert";

type TransactionItem = {
  id: string;
  transactionId: number;
  ticketId: number;
  quantity: number;
  price: number;
  ticket: {
    id: number;
    ticketLevel: string;
    availableTicket: number;
    deletedAt: string | null;
    eventId: number;
    price: number;
    event: {
      name: string;
      artist: string;
      location: string;
      city: string;
      startDate: string;
    };
  };
};

type BookingHistoryProps = {
  txno: number;
  id?: number;
  expiredAt?: string;
  paymentProof?: string | null;
  paymentStatus?:
    | "WAITING_FOR_PAYMENT"
    | "WAITING_FOR_CONFIRM"
    | "PAID"
    | "EXPIRED"
    | "REJECTED"
    | "";
  pointsUsed?: number;
  voucher?: { discamount: number } | null;
  items?: TransactionItem[];
  totalPrice?: number;
};

export default function Bookinghistory({
  txno,
  id,
  expiredAt,
  paymentProof,
  paymentStatus,
  pointsUsed,
  voucher,
  items,
  totalPrice,
}: BookingHistoryProps) {
  const [isopen, setIsopen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, []);

  return (
    <div
      ref={contentRef}
      style={{ height: isopen ? height : 60 }}
      className={`w-full  bg-white transition-[height] overflow-hidden  duration-400 ease-in-out  `}
    >
       
      <button
        onClick={() => setIsopen(!isopen)}
        className="border-b w-full h-15 px-5 py-3 flex items-center justify-between border-neutral-200 cursor-pointer "
      >
        <div className="flex items-center gap-2">
          <img src={ticketicon} className="h-8" alt="" />
          Transaction #{txno} - {items?.[0]?.ticket.event.name}
        </div>
        <div className="flex gap-5">
          <div className="rounded-full h-fit w-fit flex items-center bg-amber-100 outline-amber-400 outline px-2 py-1 text-amber-700">
            <p className="text-[12px]">{formatSnakeCase(paymentStatus?? "")}</p>
          </div>
          <img
            src={accordionicon}
            alt=""
            className={`${isopen ? "rotate-[270deg] duration-400" : "rotate-180 duration-400"}  transition-transform ease-in-out`}
          />
        </div>
      </button>
      <div className="mx-5 my-3 h-fit font-[inter]">
        <div className="flex justify-between items-center">
          <h1>Transaction Details</h1>
          <div className="text-[12px] font-bold text-red-500 flex gap-2">
            <p>Expires in:</p>{expiredAt ? formatCountdown(expiredAt) : "-"}
          </div>
        </div>
        <hr className="border-neutral-200 my-2" />
        <div className="w-full flex pb-5 text-sm">
          <div className="h-full w-[50%] text-start text-[12px] gap-1 flex flex-col">
            <h1>INFORMATION</h1>
            <hr className="border-neutral-200 my-1 mr-5" />
            <p>{items?.[0]?.ticket.event.name ?? "-"}</p>
            <p>{items?.[0]?.ticket.event.artist ?? "-"}</p>
            <hr className="border-neutral-200 my-1 mr-5" />

            <p>
              {items?.[0]?.ticket.event.location},{" "}
              {items?.[0]?.ticket.event.city}
            </p>
            <p>{formatDate(items?.[0]?.ticket.event.startDate ?? "")}</p>
          </div>
          <div className="h-full w-full text-start text-[12px] gap-1 flex flex-col">
            <h1>TICKETS</h1>
            <hr className="border-neutral-200 my-1" />
            <div className="flex flex-col">
              {items?.map((item) => (
                <div key={item.id} className="justify-between flex border-b py-1 border-neutral-200 border-dashed">
                  <div>
                    <p>
                      {item.ticket.ticketLevel} x {item.quantity}
                    </p>
                    <p className="text-neutral-300">
                      @IDR {formatThousand(item.ticket.price)}/TIX
                    </p>
                  </div>
                  <p>IDR {formatThousand(item.price)}</p> 
                </div>  
              ))}
            </div>
            <div className="w-full flex justify-between text-[12px]">
              <div>
                <p className="text-neutral-300">Points Used:</p>
                {voucher && (
                  <p className="text-red-300">Voucher Discount:</p>
                )}
                <span className="font-bold">TOTAL:</span>
              </div>
              <div className="text-end">
                <p className="text-neutral-300">
                  {" "}
                  {formatThousand(pointsUsed ?? 0)}
                </p>
                {voucher && (
                  <p className="text-red-300">
                    -IDR {formatThousand(voucher.discamount)}
                  </p>
                )}
                <p className="font-bold">IDR {formatThousand(totalPrice ?? 0)}</p>
              </div>
            </div>
          </div>
        </div>
        <button className="items-center h-fit cursor-pointer hover:bg-amber-400 mt-2 text-neutral-700 flex gap-2 rounded-full px-3 py-1 text-sm bg-amber-300 transition ease-initial">
          <img src={uploadicon} alt="" />
          Upload Proof
        </button>
      </div>
    </div>
  );
}
