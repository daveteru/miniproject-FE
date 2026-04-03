import Card from "./Card";

type LandingpagecategoryProps= {
  title : string;
}


export default function Landingpagecategory({title} : LandingpagecategoryProps) {
  const placeholder = [
    { category: "FESTIVAL", title: "HEADS IN THE CLOUD II" },
    { category: "MUSIC", title: "HONNE" },
    { category: "COMEDY", title: "Mens Rea" },
    { category: "COMEDY", title: "SUCRD Raditya Dika" },
  ];

  return (
    <section className="w-full ">
      <div className="w-full h-fit flex-col container mx-auto px-5 lg:px-30 py-10  ">
        <div className="h-full flex flex-col gap-5">
          <div className="font-krona-one flex justify-between gap-5 items-center ">
            <span className="w-fit  text-xl uppercase">{title}</span>
            <span className="underline hover:text-blue-700">VIEW ALL</span>
          </div>
          <div className="w-full h-full  grid md:grid-cols-2 lg:grid-cols-4 gap-5 text-white">
            {placeholder.map((place) => (
              <Card category={place.category} title={place.title} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
