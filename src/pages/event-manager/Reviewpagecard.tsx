type ReviewpagecardProps = {
  eventName: string;
  avatar: string;
  text: string;
  rating: number;
  reviewerName: string;
};

export default function Reviewpagecard({
  eventName,
  avatar,
  text,
  rating,
  reviewerName,
}: ReviewpagecardProps) {
  return (
    <div className="border rounded-2xl gap-5 h-fit flex lg:flex-col border-neutral-300 drop-shadow-md p-5 bg-white">
      <img
        src={avatar ?? "https://placehold.co/100"}
        className="bg-gray-400 rounded-full h-20 lg:w-20 aspect-square object-cover"
      />
      <div className="h-full flex flex-col gap-2 justify-between">
        <div className="flex gap-2">
          <span className="text-amber-500">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </span>
          -<span>{reviewerName}</span>
        </div>
        <h1>{eventName}</h1>
        <p>{text}</p>
      </div>
    </div>
  );
}
