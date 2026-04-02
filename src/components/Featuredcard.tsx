export default function Featuredcard() {
  return (
    <div
      className="flex flex-col gap-2  hover:shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)]
 p-2 rounded-lg transition-all ease-in"
    >
      <div className=" bg-gray-400 w-full h-[350px] rounded-xl"></div>
      <div className="flex justify-between w-full">
        <div>
          <h1 className="text-sm">CATEGORY</h1>
          <p className="font-[inter] text-sm">ARTIST_NAME</p>
        </div>
        <div className="px-5 py-1 border rounded-full flex items-center">
          from IDR 250.000
        </div>
      </div>
    </div>
  );
}
