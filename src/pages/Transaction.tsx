import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import discountticket from "../assets/icons/discount.svg";
import { Smalldetailstransaction } from "../components/Smalldetails";
import TicketCard, { type CartItem } from "../components/TicketCard";
import Toggler from "../components/Toggler";
import { axiosInstance } from "../lib/axios";
import Cartcard from "../components/Cartcard";
import { formatThousand } from "../utility/dateconvert";


type Ticket = {
  id: number;
  ticketLevel: string;
  price: number;
  availableTicket: number;
};
type eventdetails = {
  id: number;
  name: string;
  artist: string;
  location: string;
  city: string;
  startDate: string;
  endDate: string;
  thumbnail: string;
  totalTicket: number;
  category: string;
  description: string;
  deletedAt: string | null;
  organizerId: number;
  tickets: {
    id: number;
    ticketLevel: string;
    availableTicket: number;
    deletedAt: string | null;
    eventId: number;
    price: number;
  }[];
  organizer: {
    fullName: string;
    avatar: string | null;
  };
  vouchers: {
    expiredDate: string;
    discamount: number;
    amount: number;
  }[];
};

type transactiondetails = {
  id: number;
  uuid: string;
  expiredAt: string;
  paymentProof: string;
  paymentStatus: string;
  userId: string;
  ticketId: string;
  voucherId: string;
  couponId: number;
  pointsUsed: string;
  tickets: {
    id: number;
    ticketLevel: string;
    qty: number;
  }[];
};

export default function Transaction() {
  const [isvoucher, setIsvoucher] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [eventdetails,setEventdetails] = useState<eventdetails | null>(null)
  const [searchParams] = useSearchParams();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [transaction,setTransaction] = useState<transactiondetails|null>(null)


  const eventId = searchParams.get("eventId");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await axiosInstance.get(`/events/detail/${eventId}`);
        setTickets(data.tickets);
        setEventdetails(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (eventId) fetchTickets();
  }, [eventId]);

  useEffect(()=>{
    const subtotal = cart.reduce((a, item) => a + item.price * item.qty, 0);
    const voucherdiscount = eventdetails?.vouchers[0].discamount ?? 0
    if (isvoucher){
     return  setTotal(subtotal-voucherdiscount)
    }
    return setTotal(subtotal)
  },[cart,isvoucher]);

  return (
    <div className="w-full mih-h-screen border border-transparent bg-neutral-100 h-min-screen ">
      <section className="bg-white container mx-auto w-full max-w-250 h-full mt-20 rounded-t-2xl border-t border-x overflow-hidden border-neutral-300 ">
        <div className="w-full h-80 bg-neutral-400 overflow-hidden "><img src={eventdetails?.thumbnail} alt="" className="object-cover " /></div>
        <div className="flex w-full text-center items-center mt-4 justify-center p-2">
          <hr className="flex-1 border-neutral-200 mx-5" />
          <p className="text-neutral-500">{eventdetails?.name}</p>
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
                  id={t.id}
                  ticketLevel={t.ticketLevel}
                  price={t.price}
                  availableTicket={t.availableTicket}
                  setCart={setCart}
                />
              ))}
            </div>
          </div>
          <div className="w-full flex-1 flex-col flex gap-2">
            <div className="w-full h-fit border rounded-lg border-neutral-300 p-5 drop-shadow-lg flex flex-col justify-between bg-white">
              <div className="flex flex-col gap-2">
                <h1>{eventdetails?.name}</h1>
                <Smalldetailstransaction location={eventdetails?.location} city={eventdetails?.city} date={eventdetails?.startDate}/>
                <hr className="border-neutral-300"></hr>
                {/* CURRENT TRANSACTION */}
                <h1>Current Transaction</h1>
                <div className="w-full h-fit min-h-20 border-2 border-dashed p-2 flex flex-col gap-2 border-neutral-300 rounded-2xl mb-2">
                  {cart.map((cart) => (
                    <Cartcard
                      ticketLevel={cart.ticketLevel}
                      qty={cart.qty}
                      price={cart.price}
                    />
                  ))}
                </div>

                <hr className="border-neutral-300"></hr>
                {isvoucher ? (
                  <div className="items-center flex justify-between">
                    <small>Voucher Discount</small>
                    <strong>-IDR {formatThousand(eventdetails?.vouchers[0].discamount?? 0)}</strong>
                  </div>
                ) : (
                  ""
                )}
                <div className="items-center flex justify-between">
                  <small>Total Purchase</small>
                  <strong>IDR {formatThousand(total)}</strong>
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
