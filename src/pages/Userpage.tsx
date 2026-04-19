import { useEffect, useState } from "react";

import { Link } from "react-router";
import Bookinghistory from "../components/Bookinghistory";
import Sidebar from "../components/Sidebar";
import UserpageProfile from "../components/UserpageProfile";
import UserpageRewards from "../components/UserpageRewards";
import { axiosInstance } from "../lib/axios";
import { useAppStore } from "../store/useAppStore";

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
  const user = useAppStore((state) => state.user);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data: response } = await axiosInstance.get<txhistoryresponse>(
          `/transactions/history/${user?.id}`,
        );
        setTxhistory(response?.data ?? []);
        console.table(response);
      } catch (err) {
      }
    };
    fetchTransactions();
  }, [user?.id]);

  return (
    <div className="w-full  flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex overflow-y-auto bg-neutral-100">
        <div className="w-[70%] max-w-275 flex flex-col  bg-white px-5  py-8">
          {/* Breadcrumb */}
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
