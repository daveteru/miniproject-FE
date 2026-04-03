import Featuredcard from "./Featuredcard";

const featuredData = [
  { artistName: "Tulus", category: "CONCERT", price: "250.000" },
  { artistName: "Raisa", category: "CONCERT", price: "300.000" },
  { artistName: "Pamungkas", category: "LIVE MUSIC", price: "150.000" },
  { artistName: "Yura Yunita", category: "CONCERT", price: "200.000" },
];

export default function Landingpagefeatured() {
  return (
    <section>
      {" "}
      <div className=" container mx-auto px-5 md:px-15 lg:px-30 my-10">
        <h1 className="text-2xl mb-5">FEATURED</h1>
        <div className="grid lg:grid-cols-2 lg:grid-rows-2 gap-3 ">
          {featuredData.map((item, index) => (
            <Featuredcard
              key={index}
              artistName={item.artistName}
              category={item.category}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
