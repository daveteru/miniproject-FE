export default function Review() {
  return (
    <div className="border-t border-gray-200 flex items-center p-5 gap-5">
      <img className="w-15 h-15 rounded-full bg-black"></img>
      <div className="flex-1">
        <div className="flex gap-2">
          {" "}
          <h1>username</h1>•<span className="text-amber-500">★★★★</span>
        </div>
        <p>
          {" "}
          Lorem ipsum dolor sit amet consectetur. Vestibulum massa purus eu
          iaculis arcu. Platea ultrices urna ultrices nullam nullam auctor
          potenti. Vulputate fermentum nulla lobortis arcu sceleris
        </p>
      </div>
    </div>
  );
}
