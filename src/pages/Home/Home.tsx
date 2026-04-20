import Hero from "./Hero";
import Landingpagecategory from "./Landingpagecategory";
import Landingpagefeatured from "./Landingpagefeatured";
import Landingpagesoon from "./Landingpagesoon";
import Landingpagewhatsup from "./Landingpagewhatsup";
import Marquee from "./Marquee";
import Partners from "./Partners";
import Searchbar from "./Searchbar";

export default function Home() {
  return (
    <div className="relative z-9">
      <Marquee/>
      <Hero />
      <Searchbar />

      <div className="bg-[#121212] w-full h-40 flex justify-center items-center px-5 *:">
        <h1 className="text-[#E6FF06] text-xl">
          Find What's Happening, be at the FRNTROW*.
        </h1>
      </div>

      <Landingpagefeatured />
      <Landingpagewhatsup />
      <Landingpagecategory title="music"/>
      <Landingpagecategory title="comedy"/>
      <Landingpagesoon/>
      <Partners/>
    </div>
  );
}
