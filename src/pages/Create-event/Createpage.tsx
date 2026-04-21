import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import Createpage_pricing from "./Createpage_pricing";
import Createpage_promotions from "./Createpage_promotions";
import FormText, { FormDate } from "../../components/FormComponent";
import { axiosInstance } from "../../lib/axios";
import { useAppStore } from "../../store/useAppStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editEventSchema, type EditEventSchema } from "../../schemas/editEventSchema";

export default function Createpage() {
  const user = useAppStore((state) => state.user);
  const EMPTY_TICKET = { ticketLevel: "reguler", price: 0, availableTicket: 0 };
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm<EditEventSchema>({
      resolver: zodResolver(editEventSchema),
    });

  const [form, setForm] = useState({
    event: {
      name: "",
      artist: "",
      location: "",
      city: "",
      startDate: "",
      endDate: "",
      thumbnail: "" as File | string,
      category: "",
      description: "",
      organizerId: "",
    },
    tickets: [{ ...EMPTY_TICKET }],
    voucher: {
      amount: 0,
      discamount: 0,
      expiredDate: "",
      userId: 1,
    },
  });

  const [freetoggle, setFreetoggle] = useState(false);
  const [promotoggle, setPromotoggle] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate()

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
    setForm((prev) => ({ ...prev, event: { ...prev.event, thumbnail: file } }));
  };

  const handleSubmitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.tickets.length === 0) {
      alert("at least required 1 ticket");
      return;
    }
    setIsloading(true);
    try {
      if (!form.event.thumbnail) {
        alert("Thumbnail is required");
        setIsloading(false);
        return;
      }
      const formData = new FormData();
      if (form.event.thumbnail) {
        formData.append("thumbnail", form.event.thumbnail);
      }

      const { thumbnail, ...eventWithoutThumbnail } = form.event;
      formData.append(
        "event",
        JSON.stringify({ ...eventWithoutThumbnail, organizerId: user!.id }),
      );
      formData.append("tickets", JSON.stringify(form.tickets));
      if (promotoggle) {
        formData.append("voucher", JSON.stringify(form.voucher));
      }

      await axiosInstance.post("/events/bundle", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
       toast.success("Submission sucess");
       navigate("/")
    } catch (error) {
      toast.error("Submission failed");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="w-full  flex min-h-screen">
      <div className="flex flex-col  bg-white px-10 py-8 w-[80%] max-w-250 overflow-y-auto">
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

        <form onSubmit={handleSubmitEvent}>
          {/* Top section: fields + thumbnail */}
          <div className="flex gap-8 mb-6">
            {/* Left column — inputs */}
            <div className="flex-1 space-y-4">
              <FormText
                label="EVENT NAME"
                formFunction={(value) => handleEventChange("name", value)}
                value={form.event.name}
              />
              <FormText
                label="Artist Name"
                formFunction={(value) => handleEventChange("artist", value)}
                value={form.event.artist}
              />
              <div className="grid grid-cols-3 gap-4">
                <FormText
                  label="Category"
                  formFunction={(value) => handleEventChange("category", value)}
                  value={form.event.category}
                />
                <FormDate
                  label="START DATE"
                  formFunction={(value) => handleEventChange("startDate", value)}
                  value={form.event.startDate}
                />
                <FormDate
                  label="END DATE"
                  formFunction={(value) => handleEventChange("endDate", value)}
                  value={form.event.endDate}
                />
              </div>
              <div className="flex gap-5">
                <FormText
                  label="City"
                  formFunction={(value) => handleEventChange("city", value)}
                  value={form.event.city}
                />
                <FormText
                  label="Location"
                  formFunction={(value) => handleEventChange("location", value)}
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

          {/* //---->Pricing section */}
          <Createpage_pricing
            tickets={form.tickets}
            freetoggle={freetoggle}
            onTicketChange={handleTicketChange}
            onAddTicket={addTicket}
            onRemoveTicket={removeTicket}
          />

          <Createpage_promotions
            promotoggle={promotoggle}
            voucher={form.voucher}
            onToggle={() => setPromotoggle(!promotoggle)}
            onVoucherChange={handleVoucherChange}
          />

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
