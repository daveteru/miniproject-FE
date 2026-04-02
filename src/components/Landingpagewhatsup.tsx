import Buttonlocation from "./Buttonlocation";
import Card from "./Card";

export default function Landingpagewhatsup() {
  const placeholder = [
    { category: "FESTIVAL", title: "HEADS IN THE CLOUD II" },
    { category: "MUSIC", title: "HONNE" },
    { category: "COMEDY", title: "Mens Rea" },
    { category: "COMEDY", title: "SUCRD Raditya Dika" },
  ];

  return (
    <div className="w-full bg-black">
      <div className="w-full h-110  text-white flex-col container mx-auto px-30 py-15 ">
        <div className="h-full flex flex-col gap-5">
          <div className="font-krona-one flex gap-5 items-center ">
            <span className="text-xl">What's Up</span>
            <Buttonlocation />
            <span>?</span>
          </div>
          <div className="w-full h-full  grid md:grid-cols- lg:grid-cols-4 gap-5">
            {placeholder.map((place) => (
              <Card category={place.category} title={place.title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
