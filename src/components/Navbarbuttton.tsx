import { useNavAnimation } from "../hooks/useNavAnimation";

type NavbarbuttonProps={
    label : string
}

export default function Navbarbuttton({label}:NavbarbuttonProps) {
  const { containerRef, onEnter, onLeave } = useNavAnimation();
  return (
    <div ref={containerRef} className="h-full lg:w-fit w-full">
      <button
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="hover:bg-black hover:text-white w-full h-full px-10 "
      >
        <p>{label}</p>
      </button>
    </div>
  );
}
