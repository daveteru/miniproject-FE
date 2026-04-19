import Hero from "../components/Hero";
import Landingpagecategory from "../components/Landingpagecategory";
import Landingpagefeatured from "../components/Landingpagefeatured";
import Landingpagesoon from "../components/Landingpagesoon";
import Landingpagewhatsup from "../components/Landingpagewhatsup";
import Marquee from "../components/Marquee";
import Partners from "../components/Partners";
import Searchbar from "../components/Searchbar";

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
