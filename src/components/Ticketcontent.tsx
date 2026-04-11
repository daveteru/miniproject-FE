import { useNavigate } from "react-router";
import { formatThousand } from "../utility/dateconvert";

type ticketcontentprops = {
  ticketlevel: string;
  description: string;
  price: number;
  eventId: string | undefined;
  availableTicket: number;
};

export default function Ticketcontent({ ticketlevel, description, price, eventId, availableTicket }: ticketcontentprops) {
  const navigate = useNavigate();
  return (
    <div className="border-t border-gray-200 w-full h-15 items-center grid grid-cols-3 gap-2 pt-2">
      <div className="h-full flex items-center">
        <h1>{ticketlevel}</h1>
      </div>
      <div className="h-full flex flex-col justify-center">
        <small>{description}</small>
        <small className="text-neutral-400">{availableTicket} tickets left</small>
      </div>
      <div className="h-full flex items-center justify-end">
        <button
          className="w-fit h-fit px-5 py-2 bg-amber-300 rounded-xl"
          onClick={() => navigate(`/transaction?eventId=${eventId}`)}
        >
          IDR {formatThousand(price)}
        </button>
      </div>
    </div>
  );
}
