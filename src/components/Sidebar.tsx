import { NavLink } from "react-router";
import { useAppStore } from "../store/useAppStore";

const NAV_ITEMS = [
  { label: "Profile", href: "/profile" },
  { label: "Privacy", href: "/privacy" },
  { label: "Event Manager", href: "/event-manager/my-events" },
];

export default function Sidebar() {
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);

  return (
    <aside className="flex flex-col w-[25%] justify-between bg-neutral-100 border border-neutral-200">
      {/* User greeting */}
      <div>
        <div className="flex items-center gap-3 px-6 py-6 border-b border-neutral-200">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user?.fullName || "Username"}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-neutral-300" />
          )}
          <div className="text-sm leading-tight">
            <span className="text-neutral-500">Hello,</span>
            <br />
            <span className="font-semibold text-neutral-900 uppercase tracking-wide">
              {user?.fullName || "USER123"}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col py-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => `
                px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors
                ${
                  isActive
                    ? "bg-neutral-200 text-neutral-900"
                    : "text-neutral-700 hover:bg-neutral-200/60 hover:text-neutral-900"
                }
              `}
            >
              {item.label}
            </NavLink>
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
