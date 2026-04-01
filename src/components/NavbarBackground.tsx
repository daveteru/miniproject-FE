import { useGSAP } from "@gsap/react";
import gsap from "gsap";
gsap.registerPlugin(useGSAP);

export default function NavbarBackground() {
  useGSAP(() => {
    gsap.to(".GSAPmarquee", {
      xPercent: -50,
      repeat: -1,
      duration: 25,
      ease: "none",
    });
  });

  const todaydate: Date = new Date();
  return (
    <div className="fixed top-0 left-0 w-screen z-0 pointer-events-none">
      <div className="w-screen h-15 bg-[#E6FF06] grid grid-cols-4 grid-span">
        <div className="border-r-2 border-dashed w-full h-full col-span-3 lg:col-span-1 flex justify-end items-end">
          <p className=" mr-2 mb-7 text-[8px] md:text-[12px] rotate-90 ">
            {todaydate.toLocaleDateString()}
          </p>

          <img
            src="src/assets/decorative_element.svg"
            alt=""
            className=" w-20 -translate-y-2 -translate-x-5 "
          />
        </div>
        <div className="w-full col-span-1 lg:col-span-3 flex items-end">
          <svg
            className="-translate-x-[18px]"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="18"
            viewBox="0 0 32 18"
            fill="none"
          >
            <path
              d="M15.5884 0L31.1768 18H-7.82013e-05L15.5884 0Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      <div className="w-screen h-fit bg-black py-1 overflow-hidden">
        <div className="GSAPmarquee whitespace-nowrap flex w-[200vw] h-full">
          <span className="text-[#E6FF06] text-[10px] uppercase flex items-center w-screen justify-left overflow-hidden mr-5">
            FRNTROW* is Indonesia's leading ticket marketplace, you are dealing with official distribution platform || 🎫 88RISING CONCERT in 2028 -- ONLY IN FRNTROW* BOOK NOW! 🎟️ BLACKPINK @ GBK 
          </span>
          <span className="text-[#E6FF06] text-[10px] uppercase flex items-center w-screen justify-left overflow-hidden">
            FRNTROW* is Indonesia's leading ticket marketplace, you are dealing with official distribution platform || 🎫 88RISING CONCERT in 2028 -- ONLY IN FRNTROW* BOOK NOW! 🎟️ BLACKPINK @ GBK 
          </span>
        </div>
      </div>
    </div>
  );
}
