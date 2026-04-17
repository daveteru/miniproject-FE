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
  voucher: { discamount: number } | null;
  items: TransactionItem[];
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
        setTxhistory(response.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchTransactions();
  }, []);

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

            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-2">
              Description
            </p>
          </div>
          <div className="w-full  flex-col min-h-[100px] flex rounded-2xl border border-neutral-300 mb-10 p-5">
            {/* Bookings content goes here */}
            {txhistory ? (
              txhistory.map((data, index) => (
                <Bookinghistory
                  txno={index + 1}
                  expiredAt={data.expiredAt}
                  paymentProof={data.paymentProof}
                  paymentStatus={data.paymentStatus}
                  pointsUsed={data.pointsUsed}
                  voucher={data.voucher}
                  items={data.items}
                  totalPrice={data.totalPrice}
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
