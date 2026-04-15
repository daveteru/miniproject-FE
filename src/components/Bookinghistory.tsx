import { useEffect, useRef, useState } from "react";
import ticketicon from "../assets/icons/ticket.svg";
import uploadicon from "../assets/icons/uploadicon.svg";
import accordionicon from "../assets/icons/accordionicon.svg";

type BookingHistoryProps = {
  id: number;
  eventName: string;
  paymentStatus:
    | "WAITING_FOR_PAYMENT"
    | "WAITING_FOR_CONFIRM"
    | "PAID"
    | "EXPIRED"
    | "REJECTED";

  information: {
    name: string; // eventdetails.name
    artist: string; // eventdetails.artist
    location: string; // eventdetails.location
    city: string; // eventdetails.city
    startDate: string; // eventdetails.startDate
  };

  tickets: {
    ticketLevel: string; // Ticket.ticketLevel
    qty: number; // CartItem.qty
    price: number; // Ticket.price
    ticketstotal:number
  }[];

  pricing: {
    pointsUsed: number;
    discamount: number; // vouchers.discamount
    total: number;
  };
};

export default function Bookinghistory() {
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
        className="border-b w-full h-15 px-5 py-3 flex items-center justify-between border-neutral-200 "
      >
        <div className="flex items-center gap-2">
          <img src={ticketicon} className="h-8" alt="" />
          Transaction #001 - RAISA LIVE 2027
        </div>
        <div className="flex gap-5">
          <div className="rounded-full h-fit w-fit flex items-center bg-amber-100 outline-amber-400 outline px-2 py-1 text-amber-700">
            <p className="text-[12px]"> STATUS PAYMENT</p>
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
          {" "}
          <h1>Transaction Details</h1>{" "}
          <p className="text-[12px]">BOOKING ID #ASKD2390</p>
        </div>
        <hr className="border-neutral-200 my-2" />
        <div className=" w-full flex pb-5 text-sm ">
          <div className="h-full w-[50%] text-start text-[12px] gap-1 flex flex-col">
            <h1>INFORMATION</h1>
            <hr className="border-neutral-200 my-1 mr-2" />
            <p>EVENT NAME HERE</p>
            <p>ARTIST</p>
            <p>CITY-LOCATION</p>
            <p>TANGGAL</p>
          </div>
          <div className="h-full w-full text-start text-[12px] gap-1 flex flex-col">
            <h1>TICKETS</h1>
            <hr className="border-neutral-200 my-1 " />
            <div className="flex flex-col">
              <div className="justify-between flex ">
                <div>
                  <p>Ruby x 2</p>
                  <p className="text-neutral-300">@IDR 1.500.000/TIX</p>
                </div>
                <p>IDR 3.000.000</p>
              </div>
              <div className="justify-between flex ">
                <div>
                  <p>Reguler x 1</p>
                  <p className="text-neutral-300">@IDR 500.000 / ticket</p>
                </div>
                <p>IDR 500.000</p>
              </div>
            </div>
            <hr className="border-neutral-200 my-1 " />

            <div className="w-full flex justify-between text-[12px]">
              <div>
                <p className=" text-neutral-300">Points Used:</p>
                <p className=" text-neutral-300">Voucher Used:</p>
                <p className="">TOTAL :</p>
              </div>
              <div className="text-end">
                <p className=" text-neutral-300">200.000</p>
                <p className=" text-neutral-300">-IDR 2.000.000</p>
                <p className="">IDR 1.300.000</p>
              </div>
            </div>
          </div>
          {/* divider */}
        </div>
        <button className="items-center h-fit cursor-pointer hover:bg-amber-400 mt-2 text-neutral-700 flex gap-2 rounded-full px-3 py-1 text-sm bg-amber-300 transition ease-initial">
          <img src={uploadicon} alt="" />
          Upload Proof
        </button>
      </div>
    </div>
  );
}
