import { Link } from "react-router";

interface MyEventsCardProps {
  id: string;
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
    <Link
      to={`${id}/edit`}
      className="flex items-center border-b border-neutral-200 rounded-md hover:bg-neutral-200 p-3 gap-5 text-neutral-600"
    >
      <div className="shrink-0 w-32 h-20 flex items-center justify-center">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt="Event thumbnail"
            className="rounded-md object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full rounded-md bg-neutral-300"></div>
        )}
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <p className="text-lg font-medium">{name}</p>
          <p className="text-sm text-neutral-500">{artist}</p>
        </div>
        <p className="text-xs text-neutral-600 line-clamp-3 mt-2">
          {description}
        </p>
      </div>
    </Link>
  );
}
