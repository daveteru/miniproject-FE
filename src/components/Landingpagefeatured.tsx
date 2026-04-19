import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import Featuredcard from "./Featuredcard";

type FeaturedEvents = {
  id: number;
  priority: string;
  status: string;
  eventId: number;
  event: {
    name: string;
    artist: string;
    category: string;
    startDate: string;
    location: string;
    thumbnail: string;
    description: string;
    tickets: { price: number }[];
  };
};

export default function Landingpagefeatured() {
  const [featuredContent, setFeaturedContent] = useState<FeaturedEvents[]>([]);
  const [isloading, setisLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get<FeaturedEvents[]>("/promotions/featured")
      .then((res) => {
        setFeaturedContent(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setisLoading(false));
  }, []);

  return (
    <section>
      {" "}
      <div className=" container mx-auto px-5 md:px-15 lg:px-30 my-10  items-center flex flex-col">
        <h1 className="text-2xl text-left  mb-5">FEATURED</h1>
        <div className="grid md:grid-cols-2 md:grid-rows-2 gap-3  w-fit ">
          {featuredContent.map((item, index) => (
            <Featuredcard
              key={index}
              eventid={item.eventId}
              artistName={item.event.artist}
              category={item.event.category}
              thumbnail={item.event.thumbnail}
              tickets={item.event.tickets ?? []}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
