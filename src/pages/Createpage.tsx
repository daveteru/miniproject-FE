import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router";
import Formtext, { Formdate } from "../components/Formtext";
import { axiosInstance } from "../lib/axios";
import { useAppStore } from "../store/useAppStore";

export default function Createpage() {
  const user = useAppStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "ORGANIZER") {
      alert("this page is only for event organizer");
      navigate("/");
    }
  }, [user]);

  const EMPTY_TICKET = { ticketLevel: "reguler", price: 0, availableTicket: 0 };

  const [form, setForm] = useState({
    event: {
      name: "",
      artist: "",
      location: "",
      city: "",
      startDate: "",
      endDate: "",
      thumbnail: "",
      category: "",
      description: "",
      organizerId: "",
    },
    tickets: [{ ...EMPTY_TICKET }],
    voucher: {
      amount: 0,
      expiredDate: "",
      userId: 1,
    },
  });

  const [freetoggle, setFreetoggle] = useState(false);
  const [promotoggle, setPromotoggle] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEventChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, event: { ...prev.event, [field]: value } }));
  };

  const handleTicketChange = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    setForm((prev) => ({
      ...prev,
      tickets: prev.tickets.map((t, i) =>
        i === index ? { ...t, [field]: value } : t,
      ),
    }));
  };

  const addTicket = () => {
    setForm((prev) => ({
      ...prev,
      tickets: [...prev.tickets, { ...EMPTY_TICKET }],
    }));
  };

  const removeTicket = (index: number) => {
    setForm((prev) => ({
      ...prev,
      tickets: prev.tickets.filter((_, i) => i !== index),
    }));
  };

  const handleVoucherChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      voucher: { ...prev.voucher, [field]: value },
    }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
    try {
      await axiosInstance.post("/events/bundle", {
        event: { ...form.event, organizerId: user!.id },
        tickets: form.tickets,
        ...(promotoggle && { voucher: form.voucher }),
      });
       alert("Submission sucess");
    } catch (err: any) {
      alert("Submission failed");
      console.log(
        err.response?.data?.errors ??
          err.response?.data?.message ??
          err.message,
      );
    } finally {
     

      setIsloading(false);
    }
  };
  // --- Render ---

  return (
    <div className="w-full  flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col  px-10 py-8 w-[60%] overflow-y-auto">
        {/* Breadcrumb */}
        <nav className="text-xs uppercase tracking-wide text-neutral-500 mb-1">
          <Link to="/" className="hover:text-neutral-900 cursor-pointer">
            Home
          </Link>
          <span className="mx-1">&gt;</span>
          <Link to="/profile" className="hover:text-neutral-900 cursor-pointer">
            Admin Page
          </Link>
          <span className="mx-1">&gt;</span>
          <span className="text-neutral-700">Create New Event</span>
        </nav>

        <h1 className="text-2xl font-bold uppercase text-neutral-900 mb-8">
          Create new Event
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Top section: fields + thumbnail */}
          <div className="flex gap-8 mb-6">
            {/* Left column — inputs */}
            <div className="flex-1 space-y-4">
              <Formtext
                label="EVENT NAME"
                formfunc={(value) => handleEventChange("name", value)}
                value={form.event.name}
              />
              <Formtext
                label="Artist Name"
                formfunc={(value) => handleEventChange("artist", value)}
                value={form.event.artist}
              />
              <div className="grid grid-cols-3 gap-4">
                <Formtext
                  label="Category"
                  formfunc={(value) => handleEventChange("category", value)}
                  value={form.event.category}
                />
                <Formdate
                  label="START DATE"
                  formfunc={(value) => handleEventChange("startDate", value)}
                  value={form.event.startDate}
                />
                <Formdate
                  label="END DATE"
                  formfunc={(value) => handleEventChange("endDate", value)}
                  value={form.event.endDate}
                />
              </div>
              <div className="flex gap-5">
                <Formtext
                  label="City"
                  formfunc={(value) => handleEventChange("city", value)}
                  value={form.event.city}
                />
                <Formtext
                  label="Location"
                  formfunc={(value) => handleEventChange("location", value)}
                  value={form.event.location}
                />
              </div>
            </div>

            {/* Thumbnail upload */}
            <div className="shrink-0">
              <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
                Thumbnail
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-48 h-40 rounded-lg border border-neutral-300 bg-neutral-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-neutral-300 transition-shadow flex items-center justify-center"
              >
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-neutral-400 text-xs">
                    Click to upload
                  </span>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-2">
              Description
            </label>
            <textarea
              value={form.event.description}
              onChange={(e) => handleEventChange("description", e.target.value)}
              rows={8}
              className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-500 transition-colors resize-none"
            />
          </div>

          {/* Pricing section */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-lg font-black uppercase tracking-wider text-neutral-900">
                Pricing
              </h2>
              <small className="text-neutral-400">Maximum 5 Types of Ticket</small>
            </div>
            <div
              className={`border-2 border-dashed border-neutral-300 rounded-2xl p-6 space-y-4 ${freetoggle ? "hidden" : ""}`}
            >
              {form.tickets.map((ticket, i) => (
                <div key={i} className="grid grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
                      Class
                    </label>
                    <input
                      type="text"
                      value={ticket.ticketLevel}
                      onChange={(e) =>
                        handleTicketChange(i, "ticketLevel", e.target.value)
                      }
                      placeholder="e.g. VIP, Regular"
                      className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      value={ticket.price}
                      onChange={(e) =>
                        handleTicketChange(i, "price", Number(e.target.value))
                      }
                      className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
                        Seat Available
                      </label>
                      <input
                        type="number"
                        value={ticket.availableTicket}
                        onChange={(e) =>
                          handleTicketChange(
                            i,
                            "availableTicket",
                            Number(e.target.value),
                          )
                        }
                        className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors"
                      />
                    </div>
                    {form.tickets.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTicket(i)}
                        className="mb-0.5 self-end text-neutral-400 hover:text-red-500 transition-colors text-lg leading-none px-1"
                        title="Remove tier"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
               {form.tickets.length < 5 && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={addTicket}
                  className="w-9 h-9 rounded-xl border border-neutral-300 hover:bg-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors text-xl"
                >
                  +
                </button>
              </div>
              )}
            </div>
          </div>

          {/* Promotions */}
          <div className="mb-5">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-lg font-black uppercase tracking-wider text-neutral-900">
                PROMOTIONS
              </h2>
              <button
                type="button"
                onClick={() => setPromotoggle(!promotoggle)}
                className={`relative w-12 h-6 rounded-xl transition-colors ${
                  promotoggle ? "bg-neutral-800" : "bg-neutral-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-xl bg-white shadow transition-transform ${
                    promotoggle ? "-translate-x-5.5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          <div
            className={` px-6 py-8 mb-10 rounded-2xl border-neutral-300 border-dashed border-2 ${promotoggle ? "" : "hidden"}`}
          >
            <div className="flex w-full gap-4">
              <div className="w-[48%]">
                <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
                  DISCOUNT AMOUNT
                </label>
                <div className="border flex rounded-xl gap-2 border-neutral-300 px-4 py-1.5">
                  <span className="text-neutral-400">IDR</span>
                  <input
                    type="number"
                    value={form.voucher.amount}
                    onChange={(e) =>
                      handleVoucherChange("amount", e.target.value)
                    }
                    className="w-full text-sm outline-none"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
                  Expired Date
                </label>
                <input
                  type="date"
                  value={form.voucher.expiredDate}
                  onChange={(e) =>
                    handleVoucherChange("expiredDate", e.target.value)
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* FAQ */} 
          {/* <div className="mb-10">
            <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-2">
              FAQ
            </label>
            <textarea
              value={form.event.description}
              onChange={(e) => handleEventChange("description", e.target.value)}
              rows={10}
              className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-500 transition-colors resize-none"
            />
          </div> */}

          {/* Submit row */}
          <div className="flex items-center gap-6">
            <button
              type="submit"
              className={`${isloading ? "bg-neutral-500" : "bg-[#d4f531]"} hover:bg-[#c5e620] text-neutral-900 font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-xl transition-colors`}
            >
              {isloading ? "Loading..." : "Submit Event"}
            </button>
            <p className="text-xs text-red-500 ">
              Make sure all details are correct. 
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
