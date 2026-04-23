import ticketicon from "../../assets/icons/ticket.svg";
import { formatThousand } from "../../utility/dateconvert";

type cartcardprops = {
  ticketLevel: string;
  price: number;
  qty: number;
};

export default function Cartcard({ ticketLevel, price, qty }: cartcardprops) {
  return (
    <div className="border py-2 px-4 gap-2 flex md:flex-row flex-col items-center justify-between border-neutral-200 h-fit rounded-lg drop-shadow-lg bg-white">
      <div className="flex gap-1 items-center text-sm">
        <img src={ticketicon} className="w-6 mr-1"></img>{" "}
        <p>{ticketLevel ?? "Tier"}</p>
        <p>x</p>
        <p>{qty ?? "1"}</p>
      </div>
      <p className="text-sm font-bold">IDR {formatThousand(price ?? 10000)}</p>
    </div>
  );
}
