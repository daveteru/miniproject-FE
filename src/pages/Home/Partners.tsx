import sponsor1 from "../../assets/sponsor1.png";
import sponsor2 from "../../assets/sponsor2.png";
import sponsor3 from "../../assets/sponsor3.png";

export default function Partners() {
  return (
    <div className="w-full h-fit bg-[#121212] p-20 flex gap-10 flex-col justify-center items-center text-[#E6FF06]">
      <h1>PARTNERS</h1>
      <div className="w-full h-full grid  lg:grid-cols-3 gap-20 justify-center items-center  ">
        <div className=" justify-center flex">
          {" "}
          <img src={sponsor1} alt="" className="h-20" />
        </div>
        <div className=" justify-center flex">
          {" "}
          <img src={sponsor2} alt="" className="h-12" />
        </div>
        <div className=" justify-center flex">
          {" "}
          <img src={sponsor3} alt="" className="h-25" />
        </div>
      </div>
    </div>
  );
}
