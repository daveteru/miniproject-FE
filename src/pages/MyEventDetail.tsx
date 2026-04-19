import { Link, Outlet, useParams } from "react-router";
import MyEventDetailNav from "../components/MyEventDetailNav";
import useGetEventDetail from "../hooks/events/useGetEventDetail";

export default function MyEventDetail() {
  const { id } = useParams();
  const { data: event, isPending } = useGetEventDetail(id);

  return (
    <div className="flex flex-col  px-10 py-8 w-[80%] overflow-y-auto">
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
        <Link
          to="/event-manager/my-events"
          className="hover:text-neutral-900 cursor-pointer"
        >
          My Events
        </Link>
        <span className="mx-1">&gt;</span>
        <span className="text-neutral-700">{!isPending ? event.name : ""}</span>
      </nav>

      <h1 className="text-2xl font-bold uppercase text-neutral-900 mb-5">
        {!isPending ? event.name : ""}
      </h1>

      <div className="flex flex-col gap-5">
        <MyEventDetailNav />
        <Outlet />
      </div>
    </div>
  );
}
