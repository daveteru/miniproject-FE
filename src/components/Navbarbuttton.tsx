import { Link } from "react-router";
import { useNavAnimation } from "../hooks/useNavAnimation";

type NavbarbuttonProps = {
  label: string;
  link?: string;
  closeFunction? : ()=>void;
};

export default function Navbarbuttton({ label, link = "/" , closeFunction }: NavbarbuttonProps) {
  const { containerRef, onEnter, onLeave } = useNavAnimation();
  return (
    <div ref={containerRef} className="h-full lg:w-fit w-full">
      <Link to={link}>
        <button
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onClick={closeFunction}
          className="hover:bg-[#121212] hover:text-white w-full h-full px-10 text-sm"
        >
          <p>{label}</p>
        </button>
      </Link>
    </div>
  );
}
