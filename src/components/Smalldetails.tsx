import locationicon from "../assets/icons/location_pin.svg";
import calendaricon from "../assets/icons/Calendar.svg";
import categoryicon from "../assets/icons/Shopping Tag.svg";

export default function Smalldetails() {
  return (
    <div className="py-5 h-fit gap-2 flex flex-col">
      <p className="flex w-fit h-8 items-center  gap-5">
        <img src={locationicon} alt="" className="pr-2 w-10 h-5 " />
        LOCATION
      </p>
      <p className="flex w-fit h-8 items-center  gap-5">
        <img src={calendaricon} alt="" className="pr-2 w-10 h-5 " />
        Sunday, 28 Mar 2030
      </p>
      <p className="flex w-fit h-8 items-center  gap-5">
        <img src={categoryicon} alt="" className="pr-2 w-10 h-5 " />
        CATEGORY
      </p>
    </div>
  );
}
export function Smalldetailstransaction() {
  return (
    <div className="h-fit flex flex-col">
      <p className="flex w-fit h-8 items-center  gap-5">
        <img src={calendaricon} alt="" className="pr-2 w-10 h-5 " />
        Sunday, 28 Mar 2030
      </p>
      <p className="flex w-fit h-8 items-center  gap-5">
        <img src={locationicon} alt="" className="pr-2 w-10 h-5 " />
        CITY - LOCATION
      </p>
    </div>
  );
}
