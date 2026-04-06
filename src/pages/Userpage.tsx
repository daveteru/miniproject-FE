import { useState } from "react";

import Sidebar from "../components/Sidebar";
import { Link } from "react-router";

type User = {
  name?: string;
  email?: string;
  phone?: string;
  twitter?: string;
  instagram?: string;
  description?: string;
  avatarUrl?: string;
};

export default function Userpage({ user = {} }: { user?: User }) {
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    twitter: user.twitter || "",
    instagram: user.instagram || "",
    description: user.description || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit:", form);
  };
  return (
    <div className="w-full border flex min-h-screen">
      <Sidebar />
      <div className="flex-1 px-5 flex overflow-y-auto">
      {/* Breadcrumb */}
      <div className="w-[70%] flex flex-col  bg-white px-5 justify-center py-8">
            <nav className="text-xs uppercase tracking-wide text-neutral-500 mb-1">
                <Link to="/"><span className="hover:text-neutral-900 cursor-pointer">Home</span></Link>
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
                    {user.avatarUrl ? (
                        <img
                        src={user.avatarUrl}
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
                    <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                        Your Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-full border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors"
                    />
                    </div>
        
                    {/* Your Email */}
                    <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                        Your Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-full border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors"
                    />
                    </div>
        
                    {/* Phone / Twitter / Instagram */}
                    <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">
                        Phone Number
                        </label>
                        <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full rounded-full border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">
                        Twitter
                        </label>
                        <input
                        type="text"
                        name="twitter"
                        value={form.twitter}
                        onChange={handleChange}
                        className="w-full rounded-full border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">
                        Instagram
                        </label>
                        <input
                        type="text"
                        name="instagram"
                        value={form.instagram}
                        onChange={handleChange}
                        className="w-full rounded-full border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors"
                        />
                    </div>
                    </div>
                </div>
                </div>
        
                {/* Description */}
                <div className="mb-10">
                <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-2">
                    Description
                </label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-500 transition-colors resize-none"
                />
                </div>
        
                {/* My Bookings Section */}
                <h2 className="text-2xl font-bold  text-neutral-900 mb-2">
                My Bookings
                </h2>
        
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-2">
                Description
                </p>
        
                <div className="w-full min-h-[400px] rounded-2xl border border-neutral-300 mb-10">
                {/* Bookings content goes here */}
                <div className="p-4 text-sm text-neutral-400">
                    {/* Placeholder — replace with booking list/table */}
                </div>
                </div>
        
                {/* Submit row */}
                <div className="flex items-center gap-6">
                <button
                    type="submit"
                    className="bg-[#d4f531] hover:bg-[#c5e620] text-neutral-900 font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-full transition-colors"
                >
                    Submit Event
                </button>
                <p className="text-xs text-red-500 italic">
                    Make sure all details are correct. Lorem ipsum dolor sit amet lorem
                    ipsum dolor sit amet
                </p>
                </div>
            </form>
      </div>
     </div>
    </div>
  );
}
