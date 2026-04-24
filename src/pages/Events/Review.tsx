type ReviewProps = {
  key:number;
  text: string;
  rating: number;
  reviewername: string;
  revieweravatar: string;
};

export default function Review({
  text,
  rating,
  reviewername,
  revieweravatar,
}: ReviewProps) {
  return (
    <div className="border-t border-gray-200 flex items-center p-5 gap-5">
      <img
        src={revieweravatar}
        className="w-15 h-15 rounded-full bg-black object-cover"
      ></img>
      <div className="flex-1">
        <div className="flex gap-2">
          <h1>{reviewername}</h1>•
          <span className="text-amber-500">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </span>
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
}
