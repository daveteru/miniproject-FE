import { Link } from "react-router";

type cardProps = {
  category: string;
  title: string;
  thumbnail?:string
};

export default function Card({ category, title,thumbnail }: cardProps) {
  return (
    <Link to="/events">
      <div className=" relative aspect-16/10 rounded-2xl overflow-hidden bg-gray-300  outline-transparent outline hover:outline-3 hover:outline-gray-600  transition-all cursor-pointer">
        <img
          className="absolute z-0  h-full w-full object-cover  "
          src={ thumbnail || "src/assets/photo/example_thumb.jpg"}
          alt=""
        />
        <div className="relative h-full z-1 flex flex-col justify-end px-2 py-2 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="uppercase text-sm w-[80%]">{title}</h3>
          <span className="text-[12px]">{category}</span>
        </div>
      </div>
    </Link>
  );
}
