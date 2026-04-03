import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import Marquee from "./Marquee";
import Navbarbackground from "./Navbarbackground";
import Navbarbuttton from "./Navbarbuttton";

gsap.registerPlugin(Draggable);

// h-81 in Tailwind default scale = 81 * 4px = 324px
const NAVBAR_HIDDEN_Y = -324;
const NAVBAR_VISIBLE_Y = 0;
const DRAG_SNAP_THRESHOLD = NAVBAR_HIDDEN_Y / 2; // -162px — past halfway = snap open

const isMobile = () => window.matchMedia("(max-width: 1023px)").matches;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const draggableInstanceRef = useRef<Draggable[]>([]);

  // Set initial hidden position before paint
  useGSAP(() => {
    gsap.set(navRef.current, { y: NAVBAR_HIDDEN_Y });
  }, {});

  // Init drag-to-reveal on mobile
  useGSAP(() => {
    if (!isMobile()) return;

    draggableInstanceRef.current = Draggable.create(navRef.current, {
      type: "y",
      bounds: { minY: NAVBAR_HIDDEN_Y, maxY: NAVBAR_VISIBLE_Y },
      onDragEnd() {
        const isPassedHalfway = this.y > DRAG_SNAP_THRESHOLD;

        gsap.to(navRef.current, {
          y: isPassedHalfway ? NAVBAR_VISIBLE_Y : NAVBAR_HIDDEN_Y,
          duration: 0.4,
          ease: "power2.out",
        });
        setIsMenuOpen(isPassedHalfway);
      },
    });

    return () => {
      draggableInstanceRef.current.forEach((instance) => instance.kill());
    };
  }, {});

  // Handle resize: disable drag on desktop, re-enable on mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleScreenResize = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // Switched to desktop — disable drag, reset state
        draggableInstanceRef.current.forEach((instance) => instance.disable());
        gsap.set(navRef.current, { y: NAVBAR_HIDDEN_Y });
        setIsMenuOpen(false);
      } else {
        // Switched to mobile — re-enable drag
        draggableInstanceRef.current.forEach((instance) => instance.enable());
        gsap.set(navRef.current, { y: NAVBAR_HIDDEN_Y });
      }
    };

    mediaQuery.addEventListener("change", handleScreenResize);
    return () => mediaQuery.removeEventListener("change", handleScreenResize);
  }, []);

  const toggleMenu = () => {
    const targetY = isMenuOpen ? NAVBAR_HIDDEN_Y : NAVBAR_VISIBLE_Y;
    gsap.to(navRef.current, { y: targetY, duration: 0.4, ease: "power2.inOut" });
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav ref={navRef} className="h-100 fixed w-full z-10">
      {/* MOBILE MENU */}
      <div className="relative z-1 w-full h-80">
        <div className="h-full w-full flex flex-col lg:hidden font-krona-one">
          <Navbarbuttton label="ABOUT" />
          <Navbarbuttton label="DISCOVER" />
          <Navbarbuttton label="HELP" />
          <Navbarbuttton label="SIGN IN" />
        </div>
      </div>

      {/* BIG SCREEN MENU */}
      <div className="relative flex justify-between items-center pl-5 z-1 h-20">
        <img className="w-35" src="src/assets/Logo.svg" alt="" />
        <div className="h-full lg:flex hidden font-krona-one">
          <Navbarbuttton label="ABOUT" />
          <Navbarbuttton label="DISCOVER" />
          <Navbarbuttton label="HELP" />
          <Navbarbuttton label="SIGN IN" />
        </div>

        {/* REVEAL MOBILE MENU BUTTON */}
        <button
          className="lg:hidden h-full font-krona-one wrap w-[27%] md:w-[26%] hover:bg-black hover:text-white text-sm cursor-pointer"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "Close" : "Menu ↓"}
        </button>
      </div>

      {/* AESTHETIC PURPOSES */}
      <Navbarbackground />
      <Marquee />
    </nav>
  );
}
