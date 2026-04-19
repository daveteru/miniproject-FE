import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useGetEventAttendees from "../hooks/events/useGetEventAttendees";
import MyEventDetailAttendeesRow from "../components/MyEventDetailAttendeesRow";
import Pagination from "../components/Pagination";

export default function MyEventDetailAttendees() {
  const { id } = useParams();
  const [ page, setPage ] = useState(1);

  const {
    data: attendees,
    isPending,
    error,
    refetch,
  } = useGetEventAttendees(id, page);

  useEffect(() => {
    console.log(attendees);
  }, [attendees]);

  return (
    <div>
      <div className="flex flex-col">
        <div className="grid grid-cols-4 text-center border-y border-black py-4 bg-[#f2ff7b] font-krona-one text-[14px]">
          <p className="">Name</p>
          <p className="">Email</p>
          <p className="">Tickets</p>
          <p className="">Total Paid</p>
        </div>
        {attendees && !isPending ? (
            attendees.data.length > 0 && (
              <div className="flex flex-col">
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
            )
          ) : (
            <div></div>
          )}
      </div>
    </div>
  );
}
