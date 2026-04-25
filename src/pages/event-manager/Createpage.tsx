import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import Createpage_pricing from "../../components/event-manager/Createpage_pricing";
import Createpage_promotions from "../../components/event-manager/Createpage_promotions";
import FormText, { FormDate } from "../../components/FormComponent";
import { axiosInstance } from "../../lib/axios";
import { useAppStore } from "../../store/useAppStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createEventSchema,
  type CreateEventSchema,
} from "../../schemas/createEventSchema";

export default function Createpage() {
  const user = useAppStore((state) => state.user);
  const EMPTY_TICKET = { ticketLevel: "Reguler", price: 0, availableTicket: 0 };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateEventSchema>({
    resolver: zodResolver(createEventSchema),
  });

  const [tickets, setTickets] = useState([{ ...EMPTY_TICKET }]);
  const [voucher, setVoucher] = useState({
    amount: 0,
    discamount: 0,
    expiredDate: "",
    startDate:"",
    userId: 1,
  });

  const [promotoggle, setPromotoggle] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [areyousure, setAreyousure] = useState<Boolean>(false);

  const handleTicketChange = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    setTickets((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [field]: value } : t)),
    );
  };

  const addTicket = () => {
    setTickets((prev) => [...prev, { ...EMPTY_TICKET }]);
  };

  const removeTicket = (index: number) => {
    setTickets((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVoucherChange = (field: string, value: string) => {
    setVoucher((prev) => ({ ...prev, [field]: value }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailPreview(URL.createObjectURL(file));
    setValue("thumbnail", file, { shouldValidate: true });
  };

  const onSubmit = async (data: CreateEventSchema) => {

    setIsloading(true);
    try {
      const formData = new FormData();
      formData.append("thumbnail", data.thumbnail);

      const { thumbnail, ...eventFields } = data;
      formData.append(
        "event",
        JSON.stringify({ ...eventFields, organizerId: user!.id }),
      );
      formData.append("tickets", JSON.stringify(tickets));
      if (promotoggle) {
        formData.append("voucher", JSON.stringify(voucher));
      }
      await axiosInstance.post("/events/bundle", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Submission success");
      navigate("/");
    } catch (error:any) {
      toast.error(error?.response?.data?.message ?? "Network Error / Server Error");
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
          <Link to="/event-manager/stats" className="hover:text-neutral-900 cursor-pointer">
            Event Manager
          </Link>
          <span className="mx-1">&gt;</span>
          <span className="text-neutral-700">Create New Event</span>
        </nav>

        <h1 className="text-2xl font-bold uppercase text-neutral-900 mb-8">
          Create new Event
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Top section: fields + thumbnail */}
          <div className="flex gap-8 mb-6">
            {/* Left column — inputs */}
            <div className="flex-1 space-y-4">
              <FormText
                label="EVENT NAME"
                error={errors.name?.message}
                {...register("name")}
              />
              <FormText
                label="Artist Name"
                error={errors.artist?.message}
                {...register("artist")}
              />
              <div className="grid grid-cols-3 gap-4">
                <FormText
                  label="Category"
                  error={errors.category?.message}
                  {...register("category")}
                />
                <FormDate
                  label="START DATE"
                  error={errors.startDate?.message}
                  {...register("startDate")}
                />
                <FormDate
                  label="END DATE"
                  error={errors.endDate?.message}
                  {...register("endDate")}
                />
              </div>
              <div className="flex gap-5">
                <FormText
                  label="City"
                  error={errors.city?.message}
                  {...register("city")}
                />
                <FormText
                  label="Location"
                  error={errors.location?.message}
                  {...register("location")}
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
                className={`w-48 h-40 rounded-lg border ${errors.thumbnail ? "border-red-400" : "border-neutral-300"} bg-neutral-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-neutral-300 transition-shadow flex items-center justify-center`}
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
              {errors.thumbnail && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.thumbnail.message}
                </p>
              )}
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
              rows={8}
              {...register("description")}
              className={`w-full rounded-2xl border ${errors.description ? "border-red-400" : "border-neutral-300"} px-4 py-3 text-sm outline-none focus:border-neutral-500 transition-colors resize-none`}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Pricing section */}
          <Createpage_pricing
            tickets={tickets}
            onTicketChange={handleTicketChange}
            onAddTicket={addTicket}
            onRemoveTicket={removeTicket}
          />

          <Createpage_promotions
            promotoggle={promotoggle}
            voucher={voucher}
            onToggle={() => setPromotoggle(!promotoggle)}
            onVoucherChange={handleVoucherChange}
          />

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={handleSubmit(() => {
               
                setAreyousure(true);
              })}
              className={`${isloading ? "bg-neutral-500" : "bg-[#d4f531]"} hover:bg-[#c5e620] text-neutral-900 font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-xl transition-colors`}
            >
              {isloading ? "Loading..." : "Submit Event"}
            </button>
            {areyousure ? (
              <button
                type="submit"
                className="w-fit h-fit bg-[#d4f531] rounded-xl px-5 py-[10px] hover:bg-amber-500 transition ease-in"
              >
                Confirm
              </button>
            ) : (
              ""
            )}
            {areyousure ? (
              <p className="text-xs text-red-500">
                Make sure all details are correct.
              </p>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
