import Featuredcard from "./Featuredcard";

export default function Landingpagefeatured() {
  return (
    <div>
      {" "}
      <div className=" container mx-auto px-5 md:px-15 lg:px-30 my-10">
        <h1 className="text-2xl mb-5">FEATURED</h1>
        <div className="grid lg:grid-cols-2 lg:grid-rows-2 gap-3 ">
          <Featuredcard />
          <Featuredcard />
          <Featuredcard />
          <Featuredcard />
        </div>
      </div>
    </div>
  );
}
