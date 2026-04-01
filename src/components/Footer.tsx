import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function Footer() {

    const container1 = useRef(null);
    useGSAP(()=>{
        gsap.to('.GSAProtate',{
            rotation:360,
            repeat:-1,
            duration:5,
            ease:"none",
        })
    }, {scope:container1})

  return (
    <div>
      <div className="w-screen bg-black h-7 "></div>
      <div className="w-screen bg-[#E6FF06] h-75 grid grid-cols-2">
        {/* Footer Kiri */}

        <div className="border-r border-dashed h-full border-gray-500 grid lg:grid-cols-4 p-5 ">
          <div className=" flex flex-col justify-end">
            <img className="w-35" src="src/assets/Logo.svg" alt="" />
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

        <div className="grid grid-cols-2 p-5 ">
          <div ref={container1} className="flex flex-col justify-end">
            <img className="w-15 GSAProtate" src="src/assets/footer_icon.svg" alt=""  />
          </div>
          <div className="flex flex-col justify-end items-end gap-5">
            <button className="py-2 px-10 text-sm border border-black rounded-full hover:bg-black hover:text-white"> Join As Organizer </button>
            <small className="text-[10px]">
              2026 FRNTROW - PT Bintang Sinar Abadi. All Rights Reserved
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
