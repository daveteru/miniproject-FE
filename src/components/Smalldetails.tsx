import calendaricon from "../assets/icons/Calendar.svg";
import locationicon from "../assets/icons/location_pin.svg";
import categoryicon from "../assets/icons/Shopping Tag.svg";
import { formatDate } from "../utility/dateconvert";

type smalldetailsprops = {
  location: string | undefined;
  city: string | undefined;
  date: string | undefined;
  category: string | undefined;
};

type Smalldetailstransactionprops = {
  location: string | undefined;
  city: string | undefined;
  date: string | undefined;
};

export default function Smalldetails({
  location,
  city,
  date,
  category,
}: smalldetailsprops) {
  return (
    <div className="py-5 h-fit gap-2 flex flex-col">
      <p className="flex w-fit h-8 items-center  gap-5">
        <img src={locationicon} alt="" className="pr-2 w-10 h-5 " />
        {location} - {city}
      </p>
      <p className="flex w-fit h-8 items-center  gap-5">
        <img src={calendaricon} alt="" className="pr-2 w-10 h-5 " />
        {date}
      </p>
      <p className="flex w-fit h-8 items-center  gap-5">
        <img src={categoryicon} alt="" className="pr-2 w-10 h-5 " />
        {category}
      </p>
    </div>
  );
}
export function Smalldetailstransaction({
  location,
  city,
  date,
}: Smalldetailstransactionprops) {
  return (
    <div className="h-fit flex flex-col">
      <p className="flex w-fit h-8 items-center  gap-5">
        <img src={calendaricon} alt="" className="pr-2 w-10 h-5 " />
        {formatDate(date ?? "99-99-999")}
      </p>
      <p className="flex w-fit h-8 items-center  gap-5">
        <img src={locationicon} alt="" className="pr-2 w-10 h-5 " />
        {city ?? "CITY"} - {location ?? "LOCATION"}
      </p>
    </div>
  );
}
