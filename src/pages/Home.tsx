import Featuredcard from "../components/Featuredcard";
import Hero from "../components/Hero";
import Searchbar from "../components/Searchbar";

export default function Home() {
  return (
    <div className="relative z-9">
      <Hero />
      <Searchbar />
      <div className="bg-black w-full h-40 flex justify-center items-center px-5 *:">
        <h1 className="text-[#E6FF06] text-xl">
          Find What's Happening, Make tonight count.
        </h1>
      </div>
      {/* <div className=" container mx-auto px-30 my-10">
        <h1 className="text-2xl mb-5">FEATURED</h1>
        <div className="grid grid-cols-2 grid-rows-2 gap-5 ">
          <Featuredcard/>
          <Featuredcard/>
          <Featuredcard/>
          <Featuredcard/>
        </div>
      </div> */}
    </div>
  );
}
