import { useEffect, useState } from "react";

import { Link } from "react-router";
import Bookinghistory from "./Bookinghistory";
import Sidebar from "../../components/Sidebar";
import UserpageProfile from "./UserpageProfile";
import UserpageRewards from "./UserpageRewards";
import { axiosInstance } from "../../lib/axios";
import { useAppStore } from "../../store/useAppStore";

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

type txhistoryprops = {
  id: number;
  uuid:string;
  expiredAt: string;
  paymentProof: string | null;
  paymentStatus:
    | "WAITING_FOR_PAYMENT"
    | "WAITING_FOR_CONFIRM"
    | "PAID"
    | "EXPIRED"
    | "REJECTED"
    | "";
  pointsUsed: number;
  coupon: { amount: number };
  event: {
    name: string;
    artist: string;
    location: string;
    city: string;
    startDate: string;
  };
  voucher: { discamount: number } | null;
  items: TransactionItem[];
  totalbeforecoupon: number;
  coupondisc: number;
  totalPrice: number;
};

type txhistoryresponse = {
  data: txhistoryprops[];
  meta: {
    page: number;
    take: number;
    total: number;
  };
};
export default function formpage() {
  const [txhistory, setTxhistory] = useState<txhistoryprops[]>([]);
  const [burger, setBurger] = useState<boolean>(false);

  const user = useAppStore((state) => state.user);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data: response } = await axiosInstance.get<txhistoryresponse>(
          `/transactions/history/${user?.id}`,
        );
        setTxhistory(response?.data ?? []);
      } catch (err) {}
    };
    fetchTransactions();
  }, [user?.id]);

  

  return (
    <div className="w-full h-full flex min-h-screen">
      <Sidebar burger={burger} setBurger={setBurger} />
      <div className="flex-1 flex overflow-y-auto bg-neutral-100">
        <div className="w-full lg:w-[70%] lg:max-w-275 flex flex-col  bg-white md:px-10 px-5  py-8 ">
          {/* Breadcrumb */}
          <button onClick={()=>setBurger(true)} className="md:hidden px-2 py-1 bg-amber-300 w-fit rounded-full text-sm mb-2">SIDE MENU</button>
          <nav className="text-xs uppercase tracking-wide text-neutral-500 mb-1">
            <Link to="/">
              <span className="hover:text-neutral-900 cursor-pointer">
                Home
              </span>
            </Link>
            <span className="mx-1">&gt;</span>
            <span className="text-neutral-700">Profile Page</span>
          </nav>
          {/* Page title */}
          <h1 className="text-2xl font-bold  text-neutral-900 mb-8">
            Profile Page
          </h1>
          <UserpageProfile />
          <hr className="my-5 border-neutral-200"></hr>
          <UserpageRewards />
          <hr className="my-5 border-neutral-200"></hr>

          {/* My Bookings Section */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              My Bookings
            </h2>
          </div>
          <div className="w-full  flex-col min-h-25 flex rounded-2xl border border-neutral-300 mb-10 overflow-hidden">
            {/* Bookings content goes here */}
            {txhistory ? (
              txhistory.map((data, index) => (
                <Bookinghistory
                  txno={index + 1}
                  uuid={data.uuid}
                  id={data.id}
                  expiredAt={data.expiredAt}
                  paymentProof={data.paymentProof}
                  paymentStatus={data.paymentStatus}
                  pointsUsed={data.pointsUsed}
                  coupon={data.coupon?.amount}
                  event={data.event}
                  voucher={data.voucher}
                  items={data.items}
                  totalPrice={data.totalPrice}
                  totalbeforecoupon={data.totalbeforecoupon}
                  coupondisc={data.coupondisc}
                />
              ))
            ) : (
              <p>no items found here</p>
            )}
          </div>

          <hr className="mb-5 border-neutral-200" />
        </div>
      </div>
    </div>
  );
}
