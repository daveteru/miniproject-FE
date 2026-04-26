import type { Attendee } from "../../types/attendee";
import { formatThousand } from "../../utility/utils";

interface AttendeesRowProps {
  attendee: Attendee;
}

export default function MyEventDetailAttendeesRow({
  attendee,
}: AttendeesRowProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 justify-between items-center text-center border-b border-neutral-200 py-2 text-xs sm:text-sm md:text-[12px]">
      <p className="truncate">{attendee.fullName}</p>
      <p className="truncate">{attendee.email}</p>
      <div className="hidden sm:flex flex-col">
        {attendee.tickets.map((ticket, idx) => (
          <p key={idx}>
            {ticket.ticketLevel} {ticket.quantity}x
          </p>
        ))}
      </div>
      <p className="hidden sm:block">
        Rp. {formatThousand(attendee.totalPaid)}
      </p>
    </div>
  );
}
