import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import NavbarBackground from "./NavbarBackground";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText);

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null);

const { contextSafe } = useGSAP({ scope: containerRef });

const tlMap = useRef<Map<HTMLElement, gsap.core.Timeline>>(new Map());

const onEnter = contextSafe((e: React.MouseEvent<HTMLButtonElement>) => {
  const btn = e.currentTarget;
  tlMap.current.get(btn)?.kill();

  const split = SplitText.create(btn, {
    type: "chars",
    mask: "chars",
  });

  const tl = gsap.timeline()
    .to(split.chars, { y: "-110%", duration: 0.25, stagger: 0.005, ease: "power2.in" })
    .set(split.chars, { y: "110%" })
    .to(split.chars, { y: "0%", duration: 0.25, stagger: 0.02, ease: "power2.out" });

  tlMap.current.set(btn, tl);
});

const onLeave = contextSafe((e: React.MouseEvent<HTMLButtonElement>) => {
  tlMap.current.get(e.currentTarget)?.reverse();
});


  return (
    <nav className="h-15 fixed w-screen z-10">
      <div className="relative flex justify-between items-center px-5 z-1 h-full">
        <img className="w-35" src="src/assets/Logo.svg" alt="" />
        <div
          ref={containerRef}
          className="h-full lg:block hidden font-krona-one"
        >
          <button onMouseEnter={onEnter} onMouseLeave={onLeave} className="hover:bg-black hover:text-white h-full px-10 ">
            <p>ABOUT</p>
          </button>
          <button onMouseEnter={onEnter} onMouseLeave={onLeave} className="hover:bg-black hover:text-white h-full px-10">
            DISCOVER
          </button>
          <button onMouseEnter={onEnter} onMouseLeave={onLeave} className="hover:bg-black hover:text-white h-full px-10">
            HELP
          </button>
          <button onMouseEnter={onEnter} onMouseLeave={onLeave} className="hover:bg-black hover:text-white h-full px-10">
            SIGN IN
          </button>
        </div>
        <button className="lg:hidden font-krona-one wrap w-[20%] text-sm">Menu ↓ </button>
      </div>
      <NavbarBackground />
    </nav>
  );
}
