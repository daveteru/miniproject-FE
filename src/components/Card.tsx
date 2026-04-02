export default function Card() {
  return (
    <div className=" relative rounded-2xl overflow-hidden bg-gray-300 hover:border-amber-500 border border-black transition-all ">
      <img
        className="absolute z-0  h-full w-full object-cover  "
        src="src/assets/photo/example_thumb.jpg"
        alt=""
      />
      <div className="relative h-full z-1 flex flex-col justify-end p-5 bg-gradient-to-t from-black/30 to-transparent">
        <h3>CATEGORY</h3>
        <span>EVT_TITLE</span>
      </div>
    </div>
  );
}
