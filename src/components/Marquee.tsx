import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Marquee() {
  useGSAP(() => {
    gsap.to(".GSAPmarquee", {
      xPercent: -50,
      repeat: -1,
      duration: 25,
      ease: "none",
    });
  });

  return (
    <div>
      <div className="w-full relative h-fit bg-black py-1 overflow-hidden">
        <div className="GSAPmarquee whitespace-nowrap flex w-[200vw] h-full">
          <span className="text-[#E6FF06] text-[10px] uppercase flex items-center w-full justify-left overflow-hidden mr-5">
            FRNTROW* is Indonesia's leading ticket marketplace, you are dealing
            with official distribution platform || 🎫 88RISING CONCERT in 2028
            -- ONLY IN FRNTROW* BOOK NOW! 🎟️ BLACKPINK @ GBK
          </span>
          <span className="text-[#E6FF06] text-[10px] uppercase flex items-center w-full justify-left overflow-hidden">
            FRNTROW* is Indonesia's leading ticket marketplace, you are dealing
            with official distribution platform || 🎫 88RISING CONCERT in 2028
            -- ONLY IN FRNTROW* BOOK NOW! 🎟️ BLACKPINK @ GBK
          </span>
        </div>
      </div>
    </div>
  );
}
