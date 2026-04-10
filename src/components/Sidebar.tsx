import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAppStore } from "../store/useAppStore";
import { axiosInstance } from "../lib/axios";

const NAV_ITEMS = [
  { label: "Profile", href: "/profile" },
  { label: "My Events", href: "/my-events" },
  { label: "My Purchases", href: "/my-purchases" },
  { label: "Create Event", href: "/createevent" },
];

export default function Sidebar({
  userName = "USER_NAME",
  avatarUrl,
  activePath = "/profile",
}: {
  userName?: string;
  avatarUrl?: string;
  activePath?: string;
}) {
  const [active, setActive] = useState(activePath);
  const storeuser = useAppStore((state) => state.user);
  const navigate = useNavigate();
  const clearUser = useAppStore((state) => state.clearUser);

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      clearUser();
      navigate("/");
    } catch (error) {
      alert("error");
    }
  };

  return (
    <aside className="flex flex-col w-[25%] justify-between bg-neutral-100 border border-neutral-200">
      {/* User greeting */}
      <div>
        <div className="flex items-center gap-3 px-6 py-6 border-b border-neutral-200">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={storeuser?.fullName || "USER123"}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-neutral-300" />
          )}
          <div className="text-sm leading-tight">
            <span className="text-neutral-500">Hello,</span>
            <br />
            <span className="font-semibold text-neutral-900 uppercase tracking-wide">
              {storeuser?.fullName || "USER123"}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col py-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setActive(item.href)}
              className={`
                px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors
                ${
                  active === item.href
                    ? "bg-neutral-200 text-neutral-900"
                    : "text-neutral-700 hover:bg-neutral-200/60 hover:text-neutral-900"
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <button
        className={`
              px-6 py-3 text-sm sticky bottom-0 font-semibold  uppercase tracking-wide transition-colors bg-neutral-600 text-neutral-100 cursor-pointer
              `}
        onClick={logout}
      >
        Log out
      </button>
    </aside>
  );
}
