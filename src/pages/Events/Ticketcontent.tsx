import { useNavigate } from "react-router";
import { formatThousand } from "../../utility/dateconvert";

type ticketcontentprops = {
  ticketlevel: string;
  description: string;
  price: number;
  eventId: string | undefined;
  ticketId: number;
  availableTicket: number;
};

export default function Ticketcontent({
  ticketlevel,
  description,
  price,
  eventId,
  ticketId,
  availableTicket,
}: ticketcontentprops) {
  const navigate = useNavigate();
  return (
    <div className="border-t border-gray-200 w-full h-fit items-center flex flex-col md:flex-row gap-2 pt-2">
<div className="flex  justify-center items-center w-full">
        <div className="h-full w-full flex  items-center">
          <h1>{ticketlevel}</h1>
        </div>
        <div className="h-full w-[50%]  flex flex-col justify-center">
          <small className="text-neutral-400">
            {availableTicket} tickets left
          </small>
        </div>
</div>
      <div className="h-full w-full md:w-[50%] lg:w-75 flex items-center justify-end">
        <button
          className="w-full h-fit px-5 py-2 bg-[#E6FF06]  hover:bg-amber-300 rounded-xl cursor-pointer transition ease-in"
          onClick={() => navigate(`/transaction?eventId=${eventId}&ticketId=${ticketId}&amount=1`)}
        >
         {price===0? "FREE": `IDR ${formatThousand(price)}`}
        </button>
      </div>
    </div>
  );
}
