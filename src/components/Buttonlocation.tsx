import locationpin from "../assets/icons/location_pin.svg";

type buttonlocationprops = {
  location?: string;
  setCity?: React.Dispatch<React.SetStateAction<string>>;
};

export default function Buttonlocation({ setCity }: buttonlocationprops) {
  const cities = ["Jakarta", "Singapore", "Bali", "Malaysia"];

  return (
    <div
      className="relative flex rounded-full items-center  px-5 py-1 w-fit bg-[#E6FF06] text-black 
    "
    >
      <img className="h-5" src={locationpin} alt="" />
      <select
        onChange={(e) => {
          setCity?.(e.target.value);
        }}
        className="appearance-none rounded-full w-40 px-5 py-1 focus:outline-none"
      >
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
