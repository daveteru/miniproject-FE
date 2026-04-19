import { useState } from "react";
import { Link } from "react-router";
import MyEventsCard from "../components/MyEventsCard";
import Pagination from "../components/Pagination";
import useGetMyEvents from "../hooks/events/useGetMyEvents";
import type { MyEvent } from "../types/myEvent";

export default function EventManagerMyEvents() {
  const [page, setPage] = useState<number>(1);
  const { data: events, isPending } = useGetMyEvents(page);

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
        <span className="text-neutral-700">My Events</span>
      </nav>

      <h1 className="text-2xl font-bold uppercase text-neutral-900 mb-8">
        My Events
      </h1>

      <div className="flex flex-col">
        {events && !isPending ? (
          events.data.length > 0 && (
            <div className="flex flex-col border border-neutral-200 rounded-xl px-5 py-3">
              <div className="flex flex-col">
                {events.data.map((myEvent: MyEvent) => (
                  <MyEventsCard
                    key={myEvent.id}
                    id={myEvent.id as number}
                    name={myEvent.name}
                    thumbnail={myEvent.thumbnail}
                    artist={myEvent.artist}
                    description={myEvent.description}
                  />
                ))}
                <Pagination
                  currentPage={events.meta.page}
                  totalPages={Math.ceil(events.meta.total / events.meta.take)}
                  onPageChange={(pg) => {
                    setPage(pg);
                  }}
                />
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <p className="text-lg font-semibold text-gray-700 mb-4">
              You have no events!
            </p>
            <Link
              to="/event-manager/create-event"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Create an event
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
