import { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router";
import Formtext, { Formdate } from "../components/Formtext";

const EMPTY_TIER = { className: "", price: 0, seats: 0 };

export default function Createpage() {
  const [form, setForm] = useState({
    eventName: "",
    artistName: "",
    category: "",
    startDate: "",
    endDate: "",
    description: "",
    faq: "",
    isFree: false,
    isPromotion: false,
    promoDisc: 0,
    promoStartDate: "",
    promoEndDate: "",
    maxVoucher: 0,
  });

  const [tiers, setTiers] = useState([{ ...EMPTY_TIER }]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   const { name, value } = e.target;
  //   setForm((prev) => ({ ...prev, [name]: value }));
  // };

  const handleToggleFree = () => {
    setForm((prev) => ({ ...prev, isFree: !prev.isFree }));
  };

  const handleTogglePromo = () => {
    setForm((prev) => ({ ...prev, isPromotion: !prev.isPromotion }));
  };

  const handleTierChange = (index: number, field: string, value: string) => {
    setTiers((prev) =>
      prev.map((tier, i) => (i === index ? { ...tier, [field]: value } : tier)),
    );
  };

  const addTier = () => {
    setTiers((prev) => [...prev, { ...EMPTY_TIER }]);
  };

  const removeTier = (index: number) => {
    setTiers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit:", { ...form, tiers, thumbnail });
  };

  const handleFieldChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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
              {/* Event Name */}
              <Formtext
                label="EVENT NAME"
                formfunc={(value) => handleFieldChange("eventName", value)}
                value={form.eventName}
              />

              {/* Artist Name */}
              <Formtext
                label="Artist Name"
                formfunc={(value) => handleFieldChange("artistName", value)}
                value={form.artistName}
              />

              {/* Category / Start Date / End Date */}
              <div className="grid grid-cols-3 gap-4">
                <Formtext
                  label="Category"
                  formfunc={(value) => handleFieldChange("category", value)}
                  value={form.category}
                />
                <Formdate
                  label="START DATE"
                  formfunc={(value) => handleFieldChange("category", value)}
                  value={form.startDate}
                />
                <Formdate
                  label="END DATE"
                  formfunc={(value) => handleFieldChange("category", value)}
                  value={form.endDate}
                />
              </div>
              <div className="flex gap-5">
                <Formtext
                  label="City"
                  formfunc={(value) => handleFieldChange("category", value)}
                  value={form.endDate}
                />
                <Formtext
                  label="Location"
                  formfunc={(value) => handleFieldChange("category", value)}
                  value={form.endDate}
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
              value={form.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
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
              <span className="text-xs uppercase tracking-wide text-neutral-500">
                {form.isFree ? (
                  <span className="text-red-500">This event is free</span>
                ) : (
                  "Is this event free?"
                )}
              </span>
              {/* Toggle */}
              <button
                type="button"
                onClick={handleToggleFree}
                className={`relative w-12 h-6 rounded-xl transition-colors ${
                  form.isFree ? "bg-neutral-800" : "bg-neutral-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-xl bg-white shadow transition-transform ${
                    form.isFree ? "-translate-x-5.5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Tier rows — dashed border container */}

            <div
              className={`border-2 border-dashed border-neutral-300 rounded-2xl relative overflow-hidden space-y-4  ${form.isFree ? "hidden " : ""}`}
            >
              <div className={`w-full h-full p-6`}>
                {tiers.map((tier, i) => (
                  <div key={i} className="grid grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
                        Class
                      </label>
                      <input
                        type="text"
                        value={tier.className}
                        onChange={(e) =>
                          handleTierChange(i, "className", e.target.value)
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
                        value={tier.price}
                        onChange={(e) =>
                          handleTierChange(i, "price", e.target.value)
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
                          value={tier.seats}
                          onChange={(e) =>
                            handleTierChange(i, "seats", e.target.value)
                          }
                          className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors"
                        />
                      </div>
                      {tiers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTier(i)}
                          className="mb-0.5 self-end text-neutral-400 hover:text-red-500 transition-colors text-lg leading-none px-1"
                          title="Remove tier"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add tier button */}
                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={addTier}
                    className="w-9 h-9 rounded-xl border border-neutral-300 hover:bg-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors text-xl"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* promotion */}
          <div className="mb-5">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-lg font-black uppercase tracking-wider text-neutral-900">
                PROMOTIONS
              </h2>
              {/* Toggle */}
              <button
                type="button"
                onClick={handleTogglePromo}
                className={`relative w-12 h-6 rounded-xl transition-colors ${
                  form.isPromotion ? "bg-neutral-800" : "bg-neutral-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-xl bg-white shadow transition-transform ${
                    form.isPromotion ? "-translate-x-5.5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          <div
            className={`border px-6 py-8 mb-10 rounded-2xl border-neutral-300 ${form.isPromotion ? "" : "hidden"}`}
          >
            {/* Promotion Name */}
            <div className="mb-5 flex  w-full gap-4">
              <div className="flex flex-col w-full">
                <Formtext
                  label="Promotion Name"
                  formfunc={(value) => handleFieldChange("artistName", value)}
                  value={form.artistName}
                />
              </div>
              <div className="w-[48%]">
                <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
                  DISCOUNT AMOUNT
                </label>
                <div className="border flex  rounded-xl gap-2 border-neutral-300 px-4 py-1.5 focus:border-neutral-500 transition-colors">
                  <span className="text-neutral-400">IDR</span>
                  <input
                    type="number"
                    value={form.promoDisc}
                    onChange={(e) =>
                      handleFieldChange("promoDisc", e.target.value)
                    }
                    className="w-full text-sm outline-none "
                  />
                </div>
              </div>
            </div>

            {/* DISCOUNT AMOUNT / Start Date / End Date */}
            <div className="grid grid-cols-3 gap-4 ">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={form.promoStartDate}
                  onChange={(e) =>
                    handleFieldChange("promoStartDate", e.target.value)
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={form.promoEndDate}
                  onChange={(e) =>
                    handleFieldChange("promoEndDate", e.target.value)
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
                  Available Vouchers
                </label>
                <input
                  type="number"
                  value={form.maxVoucher}
                  onChange={(e) =>
                    handleFieldChange("maxVoucher", e.target.value)
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-10">
            <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-2">
              FAQ
            </label>
            <textarea
              value={form.faq}
              onChange={(e) => handleFieldChange("faq", e.target.value)}
              rows={10}
              className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-500 transition-colors resize-none"
            />
          </div>

          {/* Submit row */}
          <div className="flex items-center gap-6">
            <button
              type="submit"
              className="bg-[#d4f531] hover:bg-[#c5e620] text-neutral-900 font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-xl transition-colors"
            >
              Submit Event
            </button>
            <p className="text-xs text-red-500 ">
              Make sure all details are correct. Lorem ipsum dolor sit amet
              lorem ipsum dolor sit amet
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
