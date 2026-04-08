import { useEffect, useState } from "react";
import Featuredcard from "./Featuredcard";
import { axiosInstance } from "../lib/axios";

const featuredData = [
  { artistName: "Tulus", category: "CONCERT", price: "250.000" },
  { artistName: "Raisa", category: "CONCERT", price: "300.000" },
  { artistName: "Pamungkas", category: "LIVE MUSIC", price: "150.000" },
  { artistName: "Yura Yunita", category: "CONCERT", price: "200.000" },
];

type FeaturedEvents = {
  id: number;
  priority: string;
  status: string;
  eventId: number;
  event: {
    name: string;
    artist:string;
    category:string;
    startDate: string;
    location: string;
    thumbnail: string;
    description: string;
  };
};

export default function Landingpagefeatured() {
  const [featuredContent, setFeaturedContent] = useState<FeaturedEvents[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get<FeaturedEvents[]>("/promotions/featured")
      .then((res) => {
        setFeaturedContent(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      {" "}
      <div className=" container mx-auto px-5 md:px-15 lg:px-30 my-10">
        <h1 className="text-2xl mb-5">FEATURED</h1>
        <div className="grid lg:grid-cols-2 lg:grid-rows-2 gap-3 ">
          {featuredContent.map((item, index) => (
            <Featuredcard
              key={index}
              artistName={item.event.artist}
              category={item.event.category}
              thumbnail={item.event.thumbnail}
              price="test"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
