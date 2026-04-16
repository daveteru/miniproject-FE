import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import decor from "../assets/decorative_element.svg"
gsap.registerPlugin(useGSAP);

export default function Navbarbackground() {
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
    <div className="absolute top-0 left-0 w-full z-0 pointer-events-none border-b-8 border-[#262626] bg-[#E6FF06] ">
      <div className="w-full h-80 border-b border-dashed"></div>
      <div className="w-full h-15 grid grid-cols-4 grid-span">
        <div className="border-r border-dashed w-full h-15 col-span-3 lg:col-span-1 flex justify-end  items-end">
          <p className=" mr-2 mb-7 text-[8px] md:text-[12px] rotate-90 -translate-y-1">
            {todaydate.toLocaleDateString()}
          </p>

          <img
            src={decor}
            alt=""
            className=" w-20 -translate-y-3 -translate-x-5 "
          />
        </div>
        <div className="w-full col-span-1 lg:col-span-3 flex items-end">
          <svg
            className="-translate-x-[16px] "
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="18"
            viewBox="0 0 32 18"
            fill="none"
          >
            <path
              d="M15.5884 0L31.1768 18H-7.82013e-05L15.5884 0Z"
              fill="#262626"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
