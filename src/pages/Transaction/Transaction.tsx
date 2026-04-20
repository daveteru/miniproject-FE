import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import discountticket from "../../assets/icons/discount.svg";
import Cartcard from "./Cartcard";
import { Smalldetailstransaction } from "../../components/Smalldetails";
import TicketCard, { type CartItem } from "./TicketCard";
import Toggler from "./Toggler";
import { axiosInstance } from "../../lib/axios";
import { useAppStore } from "../../store/useAppStore";
import { formatThousand } from "../../utility/dateconvert";
import pointsicon from "../../assets/icons/points_icon.svg";
import toast from "react-hot-toast";

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
    id: number;
    expiredDate: string;
    discamount: number;
    amount: number;
  }[];
};

type Coupon = {
  id: number;
  code: string;
  amount: number;
};

export default function Transaction() {
  const [isvoucher, setIsvoucher] = useState<boolean>(false);
  const [ispoints, setIspoints] = useState<boolean>(false);
  const [, setIscoupon] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [eventdetails, setEventdetails] = useState<eventdetails | null>(null);
  const [searchParams] = useSearchParams();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isloading, setIsloading] = useState(false);
  const [subtotal, setsubTotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [coupondiscount, setCoupondiscount] = useState<number>(0);
  const [cartResetKey, setCartResetKey] = useState(0);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const { user } = useAppStore();
  const navigate = useNavigate();
  const eventId = searchParams.get("eventId");
  const preselectedTicketId = Number(searchParams.get("ticketId"));

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

    const fetchpoints = async () => {
      try {
        const { data } = await axiosInstance.get(`/points/user/${user?.id}`);
        setPoints(data.totalPoints);
      } catch (err) {
      }
    };
    fetchpoints();

    const fetchCoupons = async () => {
      if (!user?.id) return;
      try {
        const { data } = await axiosInstance.get(`/coupons/all/${user.id}`);
        setCoupons(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCoupons();
  }, [eventId, user?.id]);

  useEffect(() => {
    if (!preselectedTicketId || tickets.length === 0) return;
    const ticket = tickets.find((t) => t.id === preselectedTicketId);
    if (!ticket) return;
    setCart([
      {
        id: ticket.id,
        ticketLevel: ticket.ticketLevel,
        price: ticket.price,
        availableTicket: ticket.availableTicket,
        qty: 1,
      },
    ]);
  }, [tickets]);

  //------->cart total calculator
  useEffect(() => {
    const subtotal = cart.reduce((a, item) => a + item.price * item.qty, 0);
    const voucherdiscount = isvoucher
      ? (eventdetails?.vouchers[0]?.discamount ?? 0)
      : 0;
    const pointsdiscount = ispoints ? (points ?? 0) : 0;
    const totalbeforecoupon = subtotal - voucherdiscount - pointsdiscount;
    setsubTotal(totalbeforecoupon);
    const coupondiscount = selectedCoupon
      ? totalbeforecoupon * (selectedCoupon.amount / 100)
      : 0;
    setCoupondiscount(coupondiscount);
    const total = totalbeforecoupon - coupondiscount;

    if (total < 0) return setTotal(0);
    return setTotal(total);
  }, [cart, isvoucher, ispoints, selectedCoupon]);

  const processTransaction = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Cart must not be empty");
      return;
    }
    setIsloading(true);
    try {
      const voucherPayload = isvoucher
        ? { voucherId: eventdetails?.vouchers[0]?.id }
        : {};
      const payload = {
        userId: Number(user?.id),
        pointsUsed: points,
        eventId: Number(eventId),
        couponId: selectedCoupon?.id ?? null,
        ...voucherPayload,
        items: cart.map(({ id: ticketId, qty: quantity }) => ({
          ticketId,
          quantity,
        })),
      };
      await axiosInstance.post("/transactions", payload);
      toast.success("Submission sucess");
      setCart([]);
      navigate(`/events/${eventId}`);
    } catch (err: unknown) {
      alert("Submission failed");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="w-full mih-h-screen border border-transparent bg-neutral-100 h-min-screen ">
      <section className="bg-white container mx-auto w-full max-w-250 h-full mt-20 rounded-t-2xl border-t border-x overflow-hidden border-neutral-300 ">
        <div className="w-full h-80 bg-neutral-400 overflow-hidden ">
          <img src={eventdetails?.thumbnail} alt="" className="object-cover " />
        </div>
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
                  key={`${t.id}-${cartResetKey}`}
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
                <Smalldetailstransaction
                  location={eventdetails?.location}
                  city={eventdetails?.city}
                  date={eventdetails?.startDate}
                />
                <hr className="border-neutral-300"></hr>
                {/* CURRENT TRANSACTION */}
                <h1>Current Transaction</h1>
                <div className="w-full h-fit  border-2 border-dashed p-2 flex flex-col gap-2 border-neutral-300 rounded-2xl ">
                  {cart.map((cart) => (
                    <Cartcard
                      ticketLevel={cart.ticketLevel}
                      qty={cart.qty}
                      price={cart.price}
                    />
                  ))}
                  {cart.length <= 0 ? (
                    <p className="text-center text-neutral-300">
                      No tickets in cart..
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                {cart.length <= 0 ? (
                  ""
                ) : (
                  <button
                    onClick={() => {
                      setCart([]);
                      setCartResetKey((k) => k + 1);
                      setIscoupon(false);
                      setIsvoucher(false);
                      setIspoints(false);
                    }}
                    className="underline hover:text-red-600 cursor-pointer text-sm"
                  >
                    Clear Cart
                  </button>
                )}

                <hr className="border-neutral-300"></hr>
                {isvoucher ? (
                  <div className="items-center flex justify-between">
                    <span className="text-sm">Voucher Discount</span>
                    <strong className="text-red-300 text-[12px]">
                      IDR -
                      {formatThousand(
                        eventdetails?.vouchers[0]?.discamount ?? 0,
                      )}
                    </strong>
                  </div>
                ) : (
                  ""
                )}

                {ispoints ? (
                  <div className="items-center flex justify-between">
                    <span className="text-sm">Points</span>
                    <strong className="text-red-300 text-[12px] flex">
                      <img src={pointsicon} className="w-4 mr-2" />

                      {formatThousand(points ?? 0)}
                    </strong>
                  </div>
                ) : (
                  ""
                )}
                <hr className="border-neutral-300"></hr>
                <div className="items-center flex justify-between">
                  <span className="text-sm">Sub-Total</span>
                  <strong className="text-neutral-300 text-[12px] flex">
                    IDR {formatThousand(subtotal ?? 0)}
                  </strong>
                </div>

                {selectedCoupon && (
                  <div className="items-center flex justify-between">
                    <span className="text-sm">
                      Coupon ({selectedCoupon.amount}%)
                    </span>
                    <strong className="text-red-300 text-[12px]">
                      IDR -{formatThousand(coupondiscount)}
                    </strong>
                  </div>
                )}

                <div className="items-center flex justify-between">
                  <span className="text-sm">Total Purchase</span>
                  <strong>IDR {formatThousand(total)}</strong>
                </div>
              </div>
              {isloading ? (
                <button className="bg-[#aaaaaa] font-krona-one px-5 py-2 mt-3 rounded-md w-full">
                  Loading
                </button>
              ) : (
                <button
                  onClick={processTransaction}
                  className="bg-[#E6FF06] font-krona-one px-5 py-2 mt-3 rounded-md w-full hover:bg-amber-300 transition-colors ease-in cursor-pointer"
                >
                  Confirm Purchase
                </button>
              )}
            </div>

            {/* voucher module */}
            {eventdetails?.vouchers ? (
              <div className="w-full h-20 border  justify-between rounded-lg text-neutral-500 font-[inter] flex items-center border-neutral-300 p-5 drop-shadow-lg bg-white">
                <img src={discountticket} className="mr-2" />
                <p>Use Event Voucher?</p>{" "}
                <Toggler setter={setIsvoucher} state={isvoucher} />
              </div>
            ) : (
              ""
            )}
            {/* points usage module */}
            {points ? (
              <div className="w-full h-20 border  justify-between rounded-lg text-neutral-500 font-[inter] flex items-center border-neutral-300 p-5 drop-shadow-lg bg-white">
                <img src={pointsicon} className="w-10 mr-2" />
                <p>Use Points?</p>{" "}
                <Toggler setter={setIspoints} state={ispoints} />
              </div>
            ) : (
              ""
            )}
            {coupons.length > 0 && (
              <div className="w-full h-fit border justify-between rounded-lg text-neutral-500 font-[inter] flex items-center border-neutral-300 p-5 drop-shadow-lg bg-white gap-3">
                <p className="whitespace-nowrap">Use Coupon</p>
                <select
                  className="flex-1 border border-neutral-300 rounded-md px-2 py-1 text-sm text-neutral-700 bg-white"
                  value={selectedCoupon?.id ?? ""}
                  onChange={(e) => {
                    const found = coupons.find(
                      (c) => c.id === Number(e.target.value),
                    );
                    setSelectedCoupon(found ?? null);
                  }}
                >
                  <option value="">-- No coupon --</option>
                  {coupons.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code} {formatThousand(c.amount ?? 0)}% off
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
        {}
      </section>
    </div>
  );
}
