type Ticket = {
  ticketLevel: string;
  price: number;
  availableTicket: number;
};

type Props = {
  index: number;
  ticket: Ticket;
  showRemove: boolean;
  onChange: (index: number, field: string, value: string | number) => void;
  onRemove: (index: number) => void;
};

export default function Eventticketform({ index, ticket, showRemove, onChange, onRemove }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 items-end">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
          Class
        </label>
        <input
          type="text"
          value={ticket.ticketLevel}
          onChange={(e) => onChange(index, "ticketLevel", e.target.value)}
          placeholder="e.g. VIP, Regular"
          className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
          Price
        </label>
        <input
          type="number"
          value={ticket.price}
          onChange={(e) => onChange(index, "price", Number(e.target.value))}
          className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
            Seat Available
          </label>
          <input
            type="number"
            value={ticket.availableTicket}
            onChange={(e) => onChange(index, "availableTicket", Number(e.target.value))}
            className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors"
          />
        </div>
        {showRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="mb-0.5 self-end text-neutral-400 hover:text-red-500 transition-colors text-lg leading-none px-1"
            title="Remove tier"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
