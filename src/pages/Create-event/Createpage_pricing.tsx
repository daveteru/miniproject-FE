import Eventticketform from "../../components/Eventticketform";

type Ticket = {
  ticketLevel: string;
  price: number;
  availableTicket: number;
};

type Props = {
  tickets: Ticket[];
  freetoggle: boolean;
  onTicketChange: (index: number, field: string, value: string | number) => void;
  onAddTicket: () => void;
  onRemoveTicket: (index: number) => void;
};

export default function Createpage_pricing({ tickets,  onTicketChange, onAddTicket, onRemoveTicket }: Props) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-lg font-black uppercase tracking-wider text-neutral-900">
          Pricing
        </h2>
        <small className="text-neutral-400">Maximum 5 Types of Ticket</small>
      </div>
      <div
        className={`border-2 border-dashed border-neutral-300 rounded-2xl p-6 space-y-4 `}
      >
        {tickets.map((ticket, i) => (
          <Eventticketform
            key={i}
            index={i}
            ticket={ticket}
            showRemove={tickets.length > 1}
            onChange={onTicketChange}
            onRemove={onRemoveTicket}
          />
        ))}
        {tickets.length < 5 && (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={onAddTicket}
              className="w-9 h-9 rounded-xl border border-neutral-300 hover:bg-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors text-xl"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
