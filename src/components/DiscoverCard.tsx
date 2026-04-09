import { Link } from "react-router";

type discovercardprops = {
  title:string,
  artist?:string,
  category?:string,
  city?:string,
}


export default function DiscoverCard({title}:discovercardprops) {
  return (
<Link to="/events">
      <div className="text-black  p-2 w-full rounded-2xl overflow-hidden gap-2 mb-5 flex flex-col outline-transparent outline  transition-all cursor-pointer hover:shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)]">
        <div className=" aspect-16/10 overflow-hidden rounded-2xl">
          <img
            className="h-full w-full object-cover"
            src="src/assets/photo/example_thumb.jpg"
            alt=""
          />
        </div>
        <div className="">
          <h1>{title}</h1>
          <p>ARTIST - CATEGORY - JAKARTA</p>
          <p>FROM IDR 100.000 - ★ 4.0 - 4 Reviews</p>
        </div>
      </div>
</Link>
  );
}
