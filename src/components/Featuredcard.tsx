
type FeaturedcardProps = {
  artistName: string;
  category: string;
  price: string;
  thumbnail?: string;
};

export default function Featuredcard({
  artistName,
  category,
  price,
  thumbnail,
}: FeaturedcardProps) {
  return (
    <div
      className="flex flex-col gap-5 lg:w-130 hover:shadow-[0px_4px_6px_0px_rgba(0,0,0,0.3)]
 p-2 rounded-lg transition-all ease-in cursor-pointer"
    >
      <div className="bg-gray-400 aspect-16/10 rounded-xl overflow-hidden">
        <img
          src={thumbnail}
          className="w-full h-full object-cover object-center"
          alt=""
        />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-sm">{category}</h1>

          <p className="font-[inter] text-sm">{artistName}</p>
        </div>

        <div className="px-5 py-1 border rounded-full flex items-center">
          from IDR {price}
        </div>
      </div>
    </div>
  );
}
