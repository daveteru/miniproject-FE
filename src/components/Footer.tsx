import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";


gsap.registerPlugin(useGSAP);

export default function Footer() {
  const container1 = useRef(null);
  useGSAP(
    () => {
      gsap.to(".GSAProtate", {
        rotation: 360,
        repeat: -1,
        duration: 5,
        ease: "none",
      });
    },
    { scope: container1 },
  );

  return (
    <footer>


      {/* divider */}
      <div className="w-full bg-[#E6FF06] h-7 flex justify-center relative z-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="57"
          height="60"
          viewBox="0 0 57 60"
          fill="none"
        >
          {" "}
          <ellipse
            cx="28.139"
            cy="30"
            rx="28.139"
            ry="30"
            fill="#E6FF06"
          />{" "}
        </svg>
      </div>

      <div className="w-full bg-[#121212] h-75 grid grid-cols-2">
        {/* Footer Kiri */}

        <div className="border-r border-dashed h-full border-gray-500 grid lg:grid-cols-4 p-5 text-white">
          <div className=" flex flex-col justify-end">
            <img
              className="w-30 -translate-y-1"
              src="src/assets/Logo_white.svg"
              alt=""
            />
          </div>
          <div className=" flex flex-col justify-end">
            <p className="text-[12px]">Support</p>
            <p className="text-[12px]">Email: Help@frntrow.id</p>
          </div>
          <div className=""></div>
          <div className=" flex flex-col justify-end">
            <ul>
              <li className="hover:underline">Careers</li>
              <li className="hover:underline">Contact Us</li>
              <li className="hover:underline">Privacy Policy</li>
              <li className="hover:underline">Terms & Condition</li>
            </ul>
          </div>
        </div>

        {/* // Footer Kanan */}

        <div className="grid grid-cols-2 p-5 text-white ">
          <div ref={container1} className="flex flex-col justify-end">
            <img
              className="w-15 GSAProtate"
              src="src/assets/footer_icon.svg"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-end items-end gap-5">
            <button className="py-2 px-10 text-sm border border-white rounded-full hover:bg-[#E6FF06]  hover:text-black hover:border-none">
              {" "}
              Join As Organizer{" "}
            </button>
            <small className="text-[10px]">
              2026 FRNTROW - PT Bintang Sinar Abadi. All Rights Reserved
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}
