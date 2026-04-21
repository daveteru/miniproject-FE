import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import ticketicon from "../../assets/icons/Ticket_use_fill.svg";
import Landingpagecategory from "../Home/Landingpagecategory";
import Partners from "../Home/Partners";
import Review from "./Review";
import Revieweditor from "./Revieweditor";
import { default as Smalldetails } from "../../components/Smalldetails";
import Ticketcontent from "./Ticketcontent";
import { axiosInstance } from "../../lib/axios";
import { useAppStore } from "../../store/useAppStore";
import { formatDate, formatThousand } from "../../utility/utils";

type EventDetailsAPI = {
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
    id?: number;
  }[];
  reviews: {
    text: string;
    rating: number;
    reviewer: {
      fullName: string;
      avatar: string;
    };
  }[];
};
export default function Events() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const [event, setEvent] = useState<EventDetailsAPI | null>(null);
  const [ispromo, setIspromo] = useState<boolean>(false);
  const [fromprice, setFromprice] = useState<number[]>([]);
  const user = useAppStore((state) => state.user);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axiosInstance.get<EventDetailsAPI>(
          `/events/detail/${id}`,
        );
        setEvent(data);
        setFromprice(data.tickets?.map((t) => t.price) ?? []);
        data.vouchers.length == 0 ? setIspromo(false) : setIspromo(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvent();
  }, [id]);

  return (
    <div className="w-full flex flex-col items-center ">
      <div className="w-full h-115 bg-gray-500 overflow-hidden">
        <img
          src={event?.thumbnail}
          alt=""
          className="object-cover w-full h-full  scale-110"
        />
      </div>
      <div className="w-full h-10 bg-black"></div>
      <div className=" w-full h-fit ">
        {" "}
        {/* start of sticky bar parent */}
        <div className="w-full h-20 border-b-gray-400 drop-shadow-xl flex bg-white sticky z-5 top-0">
          <div className="container mx-auto w-full flex   h-full pl-25">
            <div className="flex justify-center px-5 flex-col   h-full w-[70%]">
              <h1 className="text-xl">{event?.name}</h1>
              <p>{event?.artist}</p>
            </div>
            <div className="border-2 border-gray-100 w-[30%] h-20 flex justify-between items-center p-3 bg-white">
              <div className="w-fit h-full  ">
                <small className="text-[10px]">TICKET PRICE FROM</small>
                <div className="font-bold">
                  <p className="font-bold">
                    IDR{" "}
                    {fromprice[0] === 0
                      ? "-"
                      : formatThousand(Math.min(...fromprice))}
                  </p>
                </div>
              </div>
              <button
                className="w-fit h-fit font-krona-one px-5 py-2 bg-[#E6FF06] hover:bg-amber-400 transition-colors  rounded-xl"
                onClick={() =>
                  targetRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              >
                GET TICKETS
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto w-full  flex-1 flex  pl-25">
          <section className="w-[70%] h-fit  pl-5 pr-10 mb-25">
            <Smalldetails
              location={event?.location ?? ""}
              city={event?.city ?? ""}
              date={event?.startDate ? formatDate(event.startDate) : ""}
              category={event?.category ?? ""}
            />
            <hr className="my-5 border-gray-300"></hr>
            <article className=" mt-5 flex flex-col gap-2">
              <h1>DESCRIPTION</h1>
              <p>{event?.description}</p>
            </article>

            <div
              ref={targetRef}
              className="scroll-mt-25 w-full h-fit drop-shadow-xl bg-white border border-gray-100  rounded-2xl my-15 flex flex-col gap-2 p-5"
            >
              <div className=" w-full h-10 items-center flex justify-between">
                <div className="flex gap-2">
                  <img src={ticketicon} alt="" />
                  <h1>TICKETS</h1>
                </div>
                {fromprice.length===0 ?<button className="font-krona-one  bg-[#e5ff07] px-5 py-2 rounded-2xl hover:bg-amber-300 transition ease-in">OPEN FOR PUBLIC</button>:""}
              </div>
              {event?.tickets?.map((t) => (
                <Ticketcontent
                  key={t.id}
                  ticketlevel={t.ticketLevel}
                  description={""}
                  price={t.price}
                  eventId={id}
                  ticketId={t.id}
                  availableTicket={t.availableTicket}
                />
              ))}
            </div>

            <article className=" mt-5 flex flex-col gap-2">
              <h1>TERMS & CONDITION</h1>
              <ul className="list-disc translate-x-4 flex flex-col gap-1 text-sm text-neutral-700">
                <li>
                  Tiket yang telah dibeli tidak dapat dikembalikan atau
                  ditukarkan dalam kondisi apapun.
                </li>
                <li>
                  Tiket hanya berlaku untuk satu kali masuk dan tidak dapat
                  digunakan ulang.
                </li>
                <li>
                  Penonton wajib membawa tiket (fisik atau digital) beserta
                  identitas diri yang sah saat memasuki venue.
                </li>
                <li>
                  Panitia berhak menolak masuk penonton yang tidak dapat
                  menunjukkan tiket atau identitas yang valid.
                </li>
                <li>
                  Dilarang membawa senjata tajam, bahan berbahaya, minuman
                  keras, atau obat-obatan terlarang ke dalam venue.
                </li>
                <li>
                  Dilarang melakukan tindakan yang mengganggu kenyamanan dan
                  keselamatan penonton lain.
                </li>
                <li>
                  Penonton yang melanggar tata tertib dapat dikeluarkan dari
                  venue tanpa pengembalian dana.
                </li>
                <li>
                  Pengambilan foto dan video untuk keperluan pribadi
                  diperbolehkan, namun dilarang menggunakan kamera profesional
                  tanpa izin resmi dari panitia.
                </li>
                <li>
                  Panitia tidak bertanggung jawab atas kehilangan barang bawaan
                  penonton selama acara berlangsung.
                </li>
                <li>
                  Jadwal acara dapat berubah sewaktu-waktu. Informasi terbaru
                  akan disampaikan melalui kanal resmi penyelenggara.
                </li>
              </ul>
              <br />
              <h1>THINGS TO REMEMBER</h1>
              <ul className="list-disc translate-x-4 flex flex-col gap-1 text-sm text-neutral-700">
                <li>
                  Harap tiba lebih awal untuk menghindari antrean panjang di
                  pintu masuk.
                </li>
                <li>
                  Ikuti arahan petugas keamanan dan panitia selama berada di
                  dalam venue.
                </li>
                <li>
                  Jaga kebersihan venue — buang sampah pada tempat yang telah
                  disediakan.
                </li>
                <li>
                  Perhatikan kondisi kesehatan Anda. Jika merasa tidak sehat,
                  segera hubungi petugas medis yang bertugas.
                </li>
                <li>
                  Tetap jaga barang bawaan pribadi Anda selama acara
                  berlangsung.
                </li>
                <li>
                  Hormati sesama penonton dan ciptakan suasana yang aman dan
                  menyenangkan bagi semua.
                </li>
              </ul>
              <br />
              <h1>LOCATION</h1>
              <div>
                <ul className="list-disc translate-x-4">
                  <li>
                    By MRT → Stop at Blok M BCA Station, exit via ASEAN gate,
                    then 5–7 min walk to Row9 Building.
                  </li>
                  <li>
                    By Busway (TransJakarta) → Stop at Blok M terminal, then
                    7–10 min walk.
                  </li>
                  <li>
                    By Car/Online Ride → Set your maps to Row9 Building, Jalan
                    Panglima Polim IX. Parking is limited, so we recommend MRT
                    or online ride-hailing.
                  </li>
                  <li>
                    By Foot → From Blok M Square, it’s a short walk through
                    Panglima Polim area. Look for Row9 signage at the front.
                  </li>
                </ul>
              </div>
            </article>
            <h1 className="mt-10 mb-5">EVENT REVIEWS</h1>
            {event?.endDate &&
            new Date(event.endDate).getTime() < new Date().getTime() ? (
              <article>
                <Revieweditor
                  username={user?.fullName}
                  avatar={user?.avatar ?? undefined}
                  userId={user?.id}
                  eventId={event.id}
                />
                {event?.reviews?.map((e) => (
                  <Review
                    text={e.text}
                    rating={e.rating}
                    reviewername={e.reviewer.fullName}
                    revieweravatar={e.reviewer.avatar}
                  />
                ))}
              </article>
            ) : (
              <div className="w-full text-neutral-300 border-2 min-h-100 border-neutral-200  border-dashed rounded-3xl  flex items-center justify-center">
                {" "}
                Reviews are available once the event has ended.{" "}
              </div>
            )}
          </section>
          {/* end of sticky bar parent */}

          {/* sidebar sticky ticket window */}
          <div className="flex-1 sticky top-20 h-fit ">
            <div className="flex bg-white flex-1 h-fit rounded-b-2xl  overflow-hidden drop-shadow-md flex-col">
              <div className="w-full aspect-16/10 bg-gray-400 ">
                <img
                  src={event?.thumbnail}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              {ispromo ? (
                <div className="bg-amber-500 w-full p-5 text-white h-20">
                  <div className="flex justify-between">
                    {" "}
                    <h1 className="text-sm">LIMITED VOUCHER</h1>{" "}
                    <small>{event?.vouchers[0].amount} remaining</small>
                  </div>
                  <div className="flex justify-between items-center">
                    <strong>
                      IDR {formatThousand(event?.vouchers[0].discamount ?? 0)}
                    </strong>
                    <small className="">
                      Expires at:{" "}
                      {formatDate(event?.vouchers[0].expiredDate ?? "")}
                    </small>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="w-full px-5">
                <Smalldetails
                  location={event?.location ?? ""}
                  city={event?.city ?? ""}
                  date={event?.startDate ? formatDate(event.startDate) : ""}
                  category={event?.category ?? ""}
                />
              </div>
              <div className="w-full  bg-white border-t border-dashed flex items-center gap-5 border-gray-300 flex-1 px-5">
                <div className="flex flex-col py-5">
                  <small className="text-gray-400">ORGANIZED BY</small>
                  <p>{event?.organizer.fullName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className=" w-full h-fit my-10 border-t border-dashed border-gray-200 relative -z-1">
        <Landingpagecategory title="" />
      </section>
      <Partners />
    </div>
  );
}
