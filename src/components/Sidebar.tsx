import { useState } from "react";

const NAV_ITEMS = [
  { label: "Profile", href: "/profile" },
  { label: "My Events", href: "/my-events" },
  { label: "My Purchases", href: "/my-purchases" },
  { label: "Create Event", href: "/create-event" },
];

export default function Sidebar({ userName = "USER_NAME", avatarUrl, activePath = "/profile" }: { userName?: string; avatarUrl?: string; activePath?: string }) {
  const [active, setActive] = useState(activePath);

  return (
    <aside className="flex flex-col w-[25%] bg-neutral-100 border border-neutral-200">
      {/* User greeting */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-neutral-200">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-neutral-300" />
        )}
        <div className="text-sm leading-tight">
          <span className="text-neutral-500">Hello,</span>
          <br />
          <span className="font-semibold text-neutral-900 uppercase tracking-wide">
            {userName}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col py-2">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              setActive(item.href);
            }}
            className={`
              px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors
              ${active === item.href
                ? "bg-neutral-200 text-neutral-900"
                : "text-neutral-700 hover:bg-neutral-200/60 hover:text-neutral-900"
              }
            `}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}