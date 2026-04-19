import { useState } from "react";
import { useNavigate } from "react-router";
import searchicon from "../assets/icons/Search Icon.svg";
import searchiconwhite from "../assets/icons/Search_icon_white.svg";

type searchbar2props = {
  setCity: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function Searchbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (query.trim())
      navigate(`/discover?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="w-full flex absolute -translate-y-5 justify-center">
      <div className="container mx-auto flex justify-center">
        <div
          className="h-10 w-[75%] rounded-full font-[inter] font-light text-lg bg-white p-2 py-6 border border-[#a7a7a7] flex items-center transition-all ease-in hover:shadow-[0px_10px_23px_0px_rgb(230,255,6,0.5)]
 gap-5"
        >
          <img
            src={searchicon}
            className="w-7 cursor-pointer"
            alt="Search Icon"
            onClick={handleSubmit}
          />
          <input
            type="text"
            placeholder={"Search Events..."}
            className="focus:outline-none w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
}

export function Searchbar2({
  city,
  setCity,
  search,
  setSearch,
}: searchbar2props) {
  return (
    <div className="h-10 w-full font-[inter] font-light text-lg border-b border-[#a7a7a7] flex items-center transition-all ease-in gap-5">
      <img src={searchiconwhite} className="w-7" alt="Search Icon" />
      <select
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          console.log({ city });
        }}
      >
        <option value="Jakarta">Jakarta</option>
        <option value="Malaysia">Malaysia</option>
        <option value="Singapore">Singapore</option>
        <option value="Bangkok">Bangkok</option>
        <option value="Bali">Bali</option>
      </select>
      <input
        type="text"
        id="searchbar"
        value={search}
        placeholder={"Search Events..."}
        onChange={(e) => setSearch(e.target.value)}
        className="focus:outline-none w-full"
      />
    </div>
  );
}
