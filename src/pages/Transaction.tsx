import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import discountticket from "../assets/icons/discount.svg";
import { Smalldetailstransaction } from "../components/Smalldetails";
import TicketCard from "../components/TicketCard";
import Toggler from "../components/Toggler";
import { axiosInstance } from "../lib/axios";

type Ticket = {
  id: number;
  ticketLevel: string;
  price: number;
  availableTicket: number;
};

export default function Transaction() {
  const [isvoucher, setIsvoucher] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [eventdetails , setEventdetails] = useState()
  const [searchParams] = useSearchParams();
  const [cart , setCart ] = useState<[{}]>([{}])
  const eventId = searchParams.get("eventId");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await axiosInstance.get(`/events/detail/${eventId}`);
        setTickets(data.tickets);
      } catch (err) {
        console.error(err);
      }
    };
    if (eventId) fetchTickets();
  }, [eventId]);

  return (
    <div className="w-full mih-h-screen border border-transparent bg-neutral-100 h-min-screen ">
      <section className="bg-white container mx-auto w-full max-w-250 h-full mt-20 rounded-t-2xl border-t border-x overflow-hidden border-neutral-300 ">
        <img src="" alt="" className="w-full h-80 bg-neutral-400 " />
        <div className="flex w-full text-center items-center mt-4 justify-center p-2">
          <hr className="flex-1 border-neutral-200 mx-5" />
          <p className="text-neutral-500">EVENT TITLE 2024</p>
          <hr className="flex-1 border-neutral-200 mx-5" />
        </div>
        <h1 className="text-xl mt-5 pb-3 px-10 ">ONLINE SALE</h1>
        <div className="w-full h-full flex px-10  mb-50 gap-5">
          {" "}
          <div className="w-[60%] h-full  gap-2 flex flex-col">
            <div className="flex flex-col gap-4">
              {tickets.map((t) => (
                <TicketCard
                  key={t.id}
                  ticketLevel={t.ticketLevel}
                  price={t.price}
                  availableTicket={t.availableTicket}
                />
              ))}
            </div>
          </div>
          <div className="w-full flex-1 flex-col flex gap-2">
            <div className="w-full h-fit border rounded-lg border-neutral-300 p-5 drop-shadow-lg flex flex-col justify-between bg-white">
              <div className="flex flex-col gap-2">
                <h1>Event Title Here</h1>
                <Smalldetailstransaction />
                <hr className="border-neutral-300"></hr>
                <h1>Current Transaction</h1>
                <div className="w-full h-60 border-2 border-dashed border-neutral-300 rounded-2xl mb-2">
                  {/* map selected tickets here */}
                </div>
                <hr className="border-neutral-300"></hr>
               {isvoucher? <div className="items-center flex justify-between">
                  <small>Voucher Discount</small>
                  <strong>-IDR 50.000</strong>
                </div> : ""}
                <div className="items-center flex justify-between">
                  <small>Total Purchase</small>
                  <strong>IDR 200.000</strong>
                </div>
              </div>
              <button className="bg-[#E6FF06] font-krona-one px-5 py-2 mt-3 rounded-md w-full">
                Confirm Purchase
              </button>
            </div>
            <div className="w-full h-20 border  justify-between rounded-lg text-neutral-500 font-[inter] flex items-center border-neutral-300 p-5 drop-shadow-lg bg-white">
              <img src={discountticket} className="mr-2" />
              <small>Use Event Voucher?</small>{" "}
              <Toggler setter={setIsvoucher} state={isvoucher} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
