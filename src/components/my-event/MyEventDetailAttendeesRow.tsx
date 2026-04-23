import type { Attendee } from "../../types/attendee";
import { formatThousand } from "../../utility/utils";

interface AttendeesRowProps {
  attendee: Attendee;
}

export default function MyEventDetailAttendeesRow({
  attendee,
}: AttendeesRowProps) {
  return (
    <div className="grid grid-cols-4 justify-between items-center text-center border-b border-neutral-200 py-2 text-[12px]">
      <p>{attendee.fullName}</p>
      <p>{attendee.email}</p>
      <div className="flex flex-col">
        {attendee.tickets.map((ticket) => (
          <p>
            {ticket.ticketLevel} {ticket.quantity}x
          </p>
        ))}
      </div>
      <p>Rp. {formatThousand(attendee.totalPaid)}</p>
    </div>
  );
}
