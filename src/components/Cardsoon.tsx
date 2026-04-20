import { Link } from "react-router";

type soonprops = {
  id:number;
  name: string;
  category?: string;
  date?: string;
  city?: string;
  thumbnail?: string;
};

export default function Cardsoon({
  name,
  category,
  date,
  id,
  city,
  thumbnail,
}: soonprops) {
  return (
<Link to={`/events/${id}`}>
      <div className="border relative border-gray-400 rounded-2xl flex h-30 p-2 text-black justify-between cursor-pointer">
        <div className="flex w-fit gap-5">
          <div className=" aspect-16/10 hidden md:block h-full w-40 bg-gray-400 rounded-xl  overflow-hidden">
            <img src={thumbnail} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-between">
            <h3>{date}</h3>
            <div className="flex flex-col">
              <h1>{category}</h1>
              <p>{name}</p>
            </div>
          </div>
        </div>
  
        <div className="uppercase h-full w-25 flex flex-col text-right justify-end text-amber-500 pr-2">
          {city}
        </div>
      </div>
</Link>
  );
}
