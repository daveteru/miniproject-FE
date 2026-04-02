import Buttonlocation from "./Buttonlocation";
import Card from "./Card";

export default function Landingpagewhatsup() {
  return (
    <div className="w-full bg-black">
      <div className="w-full h-110  text-white flex-col container mx-auto px-30 py-15 ">
        <div className="h-full flex flex-col gap-5">
          <div className="font-krona-one flex gap-5 items-center ">
            <span className="text-2xl">What's Up</span>
            <Buttonlocation />
            <span>?</span>
          </div>
          <div className="w-full h-full  grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
          </div>
        </div>
      </div>
    </div>
  );
}
