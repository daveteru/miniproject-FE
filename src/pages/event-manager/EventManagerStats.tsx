import { Link } from "react-router";

export default function EventManagerStats() {
  return (
    <div className="flex flex-col  px-10 py-8 w-full overflow-y-auto">
      <nav className="text-xs uppercase tracking-wide text-neutral-500 mb-1">
        <Link to="/" className="hover:text-neutral-900 cursor-pointer">
          Home
        </Link>
        <span className="mx-1">&gt;</span>
        <Link
          to="/event-manager/my-events"
          className="hover:text-neutral-900 cursor-pointer"
        >
          Event Manager
        </Link>
        <span className="mx-1">&gt;</span>
        <span className="text-neutral-700">Dashboard</span>
      </nav>

      <h1 className="text-2xl font-bold uppercase text-neutral-900 mb-8">
        DASHBOARD
      </h1>
    </div>
  );
}
