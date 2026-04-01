import NavbarBackground from "./NavbarBackground";
import Marquee from "./Marquee";
import { useNavAnimation } from "../hooks/useNavAnimation";

export default function Navbar() {
  const { containerRef, onEnter, onLeave } = useNavAnimation();

  return (
    <nav className="h-15 fixed w-full z-10 border">
      <div className="relative flex justify-between items-center px-5 z-1 h-full">
        <img className="w-35" src="src/assets/Logo.svg" alt="" />
        <div
          ref={containerRef}
          className="h-full lg:block hidden font-krona-one"
        >
          <button
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="hover:bg-black hover:text-white h-full px-10 "
          >
            <p>ABOUT</p>
          </button>
          <button
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="hover:bg-black hover:text-white h-full px-10"
          >
            DISCOVER
          </button>
          <button
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="hover:bg-black hover:text-white h-full px-10"
          >
            HELP
          </button>
          <button
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="hover:bg-black hover:text-white h-full px-10"
          >
            SIGN IN
          </button>
        </div>
        <button className="lg:hidden font-krona-one wrap w-[20%] text-sm">
          Menu ↓{" "}
        </button>
      </div>
      <NavbarBackground />
      <Marquee />
    </nav>
  );
}
