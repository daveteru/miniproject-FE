import { useState } from "react";
import { useParams } from "react-router";
import MyEventDetailAttendeesRow from "../../components/my-event/MyEventDetailAttendeesRow";
import Pagination from "../../components/Pagination";
import useGetEventAttendees from "../../hooks/events/useGetEventAttendees";
import MyEventDetailAttendeesRowSkeleton from "../../components/my-event/MyEventDetailAttendeesSkeleton";

export default function MyEventDetailAttendees() {
  const { id } = useParams();
  const [page, setPage] = useState(1);

  const { data: attendees, isPending } = useGetEventAttendees(id, page);

  return (
    <div>
      <div className="flex flex-col">
        {/* Header row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 text-center border-y border-black py-3 sm:py-4 bg-[#f2ff7b] font-krona-one text-xs sm:text-sm md:text-[14px]">
          <p>Name</p>
          <p>Email</p>
          <p className="hidden sm:block">Tickets</p>
          <p className="hidden sm:block">Total Paid</p>
        </div>

        {attendees && !isPending ? (
          attendees.data.length > 0 ? (
            <div className="flex flex-col space-y-2 sm:space-y-3">
              {attendees.data.map((attendee) => (
                <MyEventDetailAttendeesRow
                  key={attendee.id}
                  attendee={attendee}
                />
              ))}
              <Pagination
                currentPage={attendees.meta.page}
                totalPages={Math.ceil(
                  attendees.meta.total / attendees.meta.take,
                )}
                onPageChange={(pg) => {
                  setPage(pg);
                }}
              />
            </div>
          ) : (
            <div className="text-center mt-3 text-sm sm:text-base text-neutral-500 tracking-wide px-2">
              <p>This event has no attendants yet...</p>
            </div>
          )
        ) : (
          <div className="flex flex-col space-y-2 sm:space-y-3">
            <MyEventDetailAttendeesRowSkeleton />
            <MyEventDetailAttendeesRowSkeleton />
            <MyEventDetailAttendeesRowSkeleton />
          </div>
        )}
      </div>
    </div>
  );
}
