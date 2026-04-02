import locationpin from "../assets/icons/location_pin.svg";
export default function Buttonlocation() {
  const cities = ["Jakarta", "Bandung", "Bali", "Surabaya"];

  return (
    <div
      className="relative flex rounded-full items-center  px-5 py-1 w-fit bg-[#E6FF06] text-black 
    "
    >
      <img className="h-5" src={locationpin} alt="" />
      <select className="appearance-none rounded-full w-40 px-5 py-1 focus:outline-none">
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        ▼
      </span>
    </div>
  );
}

