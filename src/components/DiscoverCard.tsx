import { Link } from "react-router";

export default function DiscoverCard() {
  return (
<Link to="/events">
      <div className="text-black h-75 p-1 w-full rounded-2xl overflow-hidden gap-2  flex flex-col outline-transparent outline  transition-all cursor-pointer hover:shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)]">
        <div className="h-50 w-full overflow-hidden rounded-2xl">
          <img
            className="h-full w-full object-cover"
            src="src/assets/photo/example_thumb.jpg"
            alt=""
          />
        </div>
        <div className="">
          <h1>EVENT TITLE</h1>
          <p>ARTIST - CATEGORY - JAKARTA</p>
          <p>FROM IDR 100.000 - ★ 4.0 - 4 Reviews</p>
        </div>
      </div>
</Link>
  );
}
