import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import accordionicon from "../assets/icons/accordionicon.svg";
import ticketicon from "../assets/icons/ticket.svg";
import uploadicon from "../assets/icons/uploadicon.svg";
import { axiosInstance } from "../lib/axios";
import {
  formatCountdown,
  formatDate,
  formatThousand,
} from "../utility/dateconvert";
import TransactionStatusIndicator from "./TransactionStatusIndicator";

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
  coupon?: number;
  event?: {
    name: string;
    artist: string;
    location: string;
    city: string;
    startDate: string;
  };
  voucher?: { discamount: number } | null;
  totalbeforecoupon: number;
  coupondisc?: number;
  items?: TransactionItem[];
  totalPrice: number;
};

export default function Bookinghistory({
  txno,
  id,
  expiredAt,
  paymentProof,
  coupon,
  coupondisc,
  event,
  paymentStatus,
  pointsUsed,
  voucher,
  items,
  totalbeforecoupon,
  totalPrice,
}: BookingHistoryProps) {
  const [isopen, setIsopen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [proofPreview, setProofPreview] = useState<string | null>(
    paymentProof ?? null,
  );
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const proofInputRef = useRef<HTMLInputElement>(null);

  const handleProofUpload = async (file: File) => {
    if (!id) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("paymentProof", file);
      await axiosInstance.patch(`/transactions/${id}/proof`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      toast.error("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, []);

  return (
    <div
      ref={contentRef}
      style={{ height: isopen ? height : 60 }}
      className={`w-full  border-b border-dashed border-neutral-200 transition-[height] overflow-hidden  duration-400 ease-in-out   `}
    >
      <button
        onClick={() => setIsopen(!isopen)}
        className="border-b w-full h-15 px-5 py-3 flex items-center justify-between border-neutral-200 cursor-pointer hover:bg-neutral-100 bg-white drop-shadow-sm transition-all "
      >
        <div className="flex items-center gap-2">
          <img src={ticketicon} className="h-8" alt="" />
          Transaction #{txno} - {event?.name ?? "null"}
        </div>
        <div className="flex gap-5">
          <TransactionStatusIndicator paymentStatus={paymentStatus ?? ""} />
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
            {paymentStatus === "WAITING_FOR_PAYMENT"
              ? "expires in : " + formatCountdown(expiredAt ?? "")
              : ""}
          </div>
        </div>
        <hr className="border-neutral-200 my-2" />
        <div className="w-full flex pb-5 text-sm">
          <div className="h-full w-[50%] text-start text-[12px] gap-1 flex flex-col">
            <h1>INFORMATION</h1>
            <hr className="border-neutral-200 my-1 mr-5" />
            <p>{event?.name ?? "-"}</p>
            <p>{event?.artist ?? "-"}</p>
            <hr className="border-neutral-200 my-1 mr-5" />

            <p>
              {event?.location}, {event?.city}
            </p>
            <p>{formatDate(event?.startDate ?? "")}</p>
          </div>
          <div className="h-full w-full text-start text-[12px] gap-1 flex flex-col">
            <h1>TICKETS</h1>
            <hr className="border-neutral-200 my-1" />
            <div className="flex flex-col">
              {items?.map((item) => (
                <div
                  key={item.id}
                  className="justify-between flex border-b py-1 border-neutral-200 border-dashed"
                >
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
            <div className="w-full flex flex-col  text-[12px]">
              <div className="flex justify-between text-red-300">
                <p>Points Used:</p>
                <p>{formatThousand(pointsUsed ?? 0)}</p>
              </div>

              {voucher && (
                <div className="flex justify-between text-red-300">
                  <p>Voucher Used:</p>
                  <p>-IDR {formatThousand(voucher.discamount)}</p>
                </div>
              )}
              <hr className="border-neutral-200 my-1"></hr>
              <div className="flex justify-between text-neutral-300">
                <p>Sub-Total</p>
                <p>IDR {formatThousand(totalbeforecoupon ?? 0)}</p>
              </div>
              <div
                className={`flex justify-between ${coupon ? "text-red-300" : "text-neutral-300"}`}
              >
                <p>Coupon ({coupon}%):</p>
                <p>-IDR {formatThousand(coupondisc ?? 0)}</p>
              </div>
              <hr className="border-neutral-200 my-1"></hr>
              <div className="flex justify-between text-black">
                <p>Total</p>
                <strong>IDR {formatThousand(totalPrice ?? 0)}</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <button
            disabled={
              isUploading ||
              paymentStatus === "EXPIRED" ||
              paymentStatus === "PAID" ||
              paymentStatus === "REJECTED" ||
              paymentStatus === "WAITING_FOR_CONFIRM"
            }
            onClick={() => proofInputRef.current?.click()}
            className="items-center h-fit flex gap-2 rounded-full px-3 py-1 text-sm transition ease-initial disabled:bg-neutral-300 disabled:text-neutral-400 disabled:cursor-not-allowed bg-amber-300 hover:bg-amber-400 cursor-pointer text-neutral-700"
          >
            <img src={uploadicon} alt="" />
            Upload Proof
          </button>
          {proofPreview && (
            <img
              src={proofPreview}
              alt="Payment proof preview"
              className="w-12 h-12 rounded-md object-cover border border-neutral-300"
            />
          )}
          <input
            ref={proofInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setProofFile(file);
              setProofPreview(URL.createObjectURL(file));
              handleProofUpload(file);
            }}
          />
        </div>
      </div>
    </div>
  );
}
