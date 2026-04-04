import { useState } from "react";
import searchicon from "../assets/icons/Search Icon.svg";
import searchiconwhite from "../assets/icons/Search_icon_white.svg";

export default function Searchbar() {
  return (
    <div className="w-full flex absolute -translate-y-5 justify-center">
      <div className="container mx-auto flex justify-center">
        <div
          className="h-10 w-[75%] rounded-full font-[inter] font-light text-lg bg-white p-2 py-6 border border-[#a7a7a7] flex items-center transition-all ease-in hover:shadow-[0px_10px_23px_0px_rgb(230,255,6,0.5)]
 gap-5"
        >
          <img src={searchicon} className="w-7" alt="Search Icon" />
          <input
            type="text"
            placeholder={"Search Events..."}
            className="focus:outline-none w-full"
          />
        </div>
      </div>
    </div>
  );
}

export function Searchbar2() {
  const [location, setLocation] = useState("Jakarta");
  return (
    <div className="h-10 w-full font-[inter] font-light text-lg border-b border-[#a7a7a7] flex items-center transition-all ease-in gap-5">
      <img src={searchiconwhite} className="w-7" alt="Search Icon" />
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="Jakarta">Jakarta</option>
        <option value="Bandung">Bandung</option>
        <option value="Bali">Bali</option>
      </select>
      <input
        type="text"
        id="searchbar"
        placeholder={"Search Events..."}
        className="focus:outline-none w-full"
      />
    </div>
  );
}
