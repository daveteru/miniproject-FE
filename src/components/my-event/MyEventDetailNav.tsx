import { NavLink } from "react-router";

const NAV_ITEMS = [
  { label: "View & Edit", href: "edit" },
  { label: "Attendees", href: "attendees" },
];

export default function EventManagerSidebar() {
  return (
    <nav className="flex flex-row justify-between bg-neutral-100 border-b border-neutral-200">
      <div>
        <nav className="flex flex-row px-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              className={({ isActive }) => `
                mx-1 px-6 py-3 text-sm font-semibold uppercase tracking-wide rounded-t-md transition-colors
                ${isActive ? "bg-neutral-200 text-neutral-900" : "text-neutral-700 hover:bg-neutral-200/60 hover:text-neutral-900"}
              `}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </nav>
  );
}
