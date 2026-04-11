import React from "react";
import TicketCard from "../components/TicketCard";
import discountticket from "../assets/icons/discount.svg"

export default function Transaction() {
  return (
    <div className="w-full mih-h-screen border border-transparent bg-neutral-100 h-min-screen ">
      <section className="bg-white container mx-auto w-full max-w-250 h-full mt-20 rounded-t-2xl border-t border-x overflow-hidden border-neutral-300 ">
        <img src="" alt="" className="w-full h-80 bg-neutral-400 " />
        <div className="flex w-full text-center items-center mt-4 justify-center p-2">
          <hr className="flex-1 border-neutral-200 mx-5" />
          <p className="text-neutral-500">EVENT TITLE 2024</p>
          <hr className="flex-1 border-neutral-200 mx-5" />
        </div>
        <h1 className="text-xl mt-5 pb-3 px-10 ">ONLINE SALE</h1>
        <div className="w-full h-full flex px-10  mb-50 gap-5">
          {" "}
          <div className="w-[60%] h-full  gap-2 flex flex-col">
            <div className="flex flex-col gap-4">
              <TicketCard />
              <TicketCard />
              <TicketCard />
            </div>
          </div>
          <div className="w-full flex-1 flex-col flex gap-2">
            <div className="w-full h-60 border rounded-lg border-neutral-300 p-5 drop-shadow-lg flex flex-col justify-between bg-white">
              test
              <button className="bg-[#E6FF06] font-krona-one px-5 py-2 rounded-md w-full">Confirm Purchase</button>
            </div>
            <div className="w-full h-20 border rounded-lg text-neutral-500 font-[inter] flex items-center border-neutral-300 p-5 drop-shadow-lg bg-white">
              <img src={discountticket} className="mr-2"/>Use Event Voucher?
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
