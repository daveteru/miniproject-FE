import { Link } from "react-router";

interface MyEventsCardProps {
  id: number;
  name: string;
  thumbnail: string;
  artist: string;
  description: string;
}

export default function MyEventsCard({
  id,
  name,
  thumbnail,
  artist,
  description,
}: MyEventsCardProps) {
  return (
    <Link to={`${id}/edit`} className="flex flex-row border-b h-25 justify-start items-center border-neutral-200 text-neutral-600 rounded-md hover:bg-neutral-200">
      <div className="flex items-center justify-center w-40">
        <div className="mx-2">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="Coupon icon"
              className="rounded-md h-15 w-25"
            />
          ) : (
            <div className="h-15 w-25 rounded-md bg-neutral-300"></div>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col justify-between mx-2 w-full">
          <p className=" text-[18px]">{name}</p>
          <p className="text-[14px]">{artist}</p>
        </div>
        <div className="w-100 mr-10">
          <p className="line-clamp-3 text-[12px] text-neutral-600 justify-end">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
