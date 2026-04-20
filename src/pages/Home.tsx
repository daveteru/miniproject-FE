import Landingpagecategory from "./Home/Landingpagecategory";
import Landingpagefeatured from "./Home/Landingpagefeatured";
import Landingpagesoon from "./Home/Landingpagesoon";
import Landingpagewhatsup from "./Home/Landingpagewhatsup";
import Partners from "./Home/Partners";
import Searchbar from "./Home/Searchbar";
import Hero from "./Home/Hero";
import Marquee from "./Home/Marquee";

export default function Home() {
  return (
    <div className="relative z-9">
      <Marquee />
      <Hero />
      <Searchbar />

      <div className="bg-[#121212] w-full h-40 flex justify-center items-center px-5 *:">
        <h1 className="text-[#E6FF06] text-xl">
          Find What's Happening, be at the FRNTROW*.
        </h1>
      </div>

      <Landingpagefeatured />
      <Landingpagewhatsup />
      <Landingpagecategory title="music" />
      <Landingpagecategory title="comedy" />
      <Landingpagesoon />
      <Partners />
    </div>
  );
}
