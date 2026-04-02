import Featuredcard from "../components/Featuredcard";
import Hero from "../components/Hero";
import Landingpagefeatured from "../components/Landingpagefeatured";
import Landingpagewhatsup from "../components/Landingpagewhatsup";
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

      <Landingpagefeatured />
      <Landingpagewhatsup />
    </div>
  );
}
