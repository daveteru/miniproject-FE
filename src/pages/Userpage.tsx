import { useState, useEffect } from "react";

import { Link, useParams } from "react-router";
import Formtext from "../components/Formtext";
import Sidebar from "../components/Sidebar";
import { useAppStore } from "../store/useAppStore";
import { formatDate } from "../utility/dateconvert";
import UserpageRewards from "../components/UserpageRewards";
import Bookinghistory from "../components/Bookinghistory";
import { axiosInstance } from "../lib/axios";

type form = {
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  referrer: string;
  avatar: string;
};

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
    |"";
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
  const [form, setForm] = useState<form>({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    birthdate: "",
    referrer: "",
   });
  const [txhistory, setTxhistory] = useState<txhistoryprops[]>([]);
  const formdata = useAppStore((state) => state.user);

  const handleFieldChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };


  useEffect(() => {
    if (formdata) {
      setForm((prev) => ({
        ...prev,
        name: formdata.fullName,
        email: formdata.email,
        birthdate: formdata.birthdate,
      }));
    }
  }, [formdata]);

  useEffect(() => {
    if (!formdata?.id) return;
    const fetchTransactions = async () => {
      try {
        const res = await axiosInstance.get<txhistoryresponse>(
          `/transactions/history/${formdata.id}`,
        );
        setTxhistory(res.data?.data ?? []);
      } catch (err) {
        alert(err);
      }
    };
    fetchTransactions();
  }, [formdata?.id]);

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
          <form onSubmit={handleSubmit}>
            {/* Avatar + fields row */}
            <div className="flex gap-8 mb-6">
              {/* Display Picture */}
              <div className="shrink-0">
                <label className="block text-xs font-medium text-neutral-600 mb-2">
                  Display Picture
                </label>
                <div className="w-24 h-24 rounded-full bg-neutral-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-neutral-300 transition-shadow">
                  {form.avatar ? (
                    <img
                      src={form.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-300" />
                  )}
                </div>
              </div>

              {/* Right fields */}
              <div className="flex-1 space-y-4">
                {/* Your Name */}
                <Formtext
                  label="Your Name"
                  formfunc={(value) => handleFieldChange("name", value)}
                  value={form.name}
                />

                {/* Your Email */}
                <Formtext
                  label="Your Email"
                  formfunc={(value) => handleFieldChange("email", value)}
                  value={form.email}
                />

                {/* Phone / birthdate / referral code */}
                <div className="grid grid-cols-3 gap-4">
                  <Formtext
                    label="Phone"
                    formfunc={(value) => handleFieldChange("phone", value)}
                    value={form.phone}
                  />
                  <Formtext
                    label="Birthdate"
                    editable={false}
                    formfunc={(value) => handleFieldChange("birthdate", value)}
                    value={formatDate(form.birthdate)}
                  />
                  <Formtext
                    label="Referrer"
                    editable={false}
                    formfunc={(value) => handleFieldChange("referrer", value)}
                    value={form.referrer}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-5">
              <button
                type="submit"
                className="bg-[#d4f531] hover:bg-[#c5e620] text-neutral-900 font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-full transition-colors"
              >
                Submit Change
              </button>
              <p className="text-xs text-red-500 italic">
                Make sure all details are correct.
              </p>
            </div>
          </form>
          <hr className="my-5 border-neutral-200"></hr>
          <UserpageRewards />
          <hr className="my-5 border-neutral-200"></hr>

          {/* My Bookings Section */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              My Bookings
            </h2>

          </div>
          <div className="w-full  flex-col min-h-[100px] flex rounded-2xl border border-neutral-300 mb-10 overflow-hidden">
            {/* Bookings content goes here */}
            {txhistory? txhistory.map((data, index)=>(<Bookinghistory
            txno={index+1}
            expiredAt={data.expiredAt}
            paymentProof={data.paymentProof}
            paymentStatus={data.paymentStatus}
            pointsUsed={data.pointsUsed}
            voucher={data.voucher}
            items={data.items}
            totalPrice={data.totalPrice}
            />)): <p>no items found here</p>}
          </div>

          <hr className="mb-5 border-neutral-200" />
        </div>
      </div>
    </div>
  );
}
