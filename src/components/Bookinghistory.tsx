import { useEffect, useRef, useState } from "react";
import ticketicon from "../assets/icons/ticket.svg";
import uploadicon from "../assets/icons/uploadicon.svg";
import accordionicon from "../assets/icons/accordionicon.svg";

export default function Bookinghistory() {
  const [isopen, setIsopen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(()=>{
    if (contentRef.current){
        setHeight(contentRef.current.scrollHeight)
    }
  },[])

  return (
    <div  ref={contentRef}
    style={{ height: isopen ? height : 60 }}
      className={`w-full  bg-white transition-[height] overflow-hidden  duration-400 ease-in-out  `}
    >
      <button
        onClick={() => setIsopen(!isopen)}
        className="border-b w-full h-15 px-5 py-3 flex items-center justify-between border-neutral-200 "
      >
        <div className="flex items-center gap-2">
          <img src={ticketicon} className="h-8" alt="" />
          Transaction #001 - RAISA LIVE 2027
        </div>
        <div className="rounded-full h-fit w-fit flex items-center bg-amber-100 outline-amber-400 outline px-2 py-1 text-amber-700">
          <small> STATUS PAYMENT</small>
        </div>
        <img
          src={accordionicon}
          alt=""
          className={`${isopen ? "rotate-[270deg] duration-400" : "rotate-180 duration-400"}  transition-transform ease-in-out`}
        />
      </button>
      <div className="mx-5 my-3 h-fit font-[inter]">
        <div className="flex justify-between items-center">
          {" "}
          <h1>Transaction Details</h1> <small>BOOKING ID #ASKD2390</small>
        </div>
        <hr className="border-neutral-200 my-2" />
        <div className=" w-full grid grid-cols-3 pb-5 text-sm items-end">
          <div>
            <p>EVENT NAME HERE</p>
            <p>ARTIST</p>
            <p>CITY-LOCATION</p>
            <p>TANGGAL</p>
          </div>
          <div className="text-end">
            <p>Ruby x 1</p>
            <p>reguler x 1</p>
            <p>VIP x 1</p>
          </div>
          <div className="text-end">
            <small className="font-bold">TOTAL : IDR 2.000.000</small>
          </div>
        </div>
        <button className="items-center h-fit cursor-pointer hover:bg-amber-400 mt-2 text-neutral-700 flex gap-2 rounded-full px-3 py-1 text-sm bg-amber-300 transition ease-initial">
          <img src={uploadicon} alt="" />
          Upload Proof
        </button>
      </div>
    </div>
  );
}
