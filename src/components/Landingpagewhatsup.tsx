import { useEffect, useState } from "react";
import Buttonlocation from "./Buttonlocation";
import Card from "./Card";
import { axiosInstance } from "../lib/axios";

type EventAPI = {
  data: Eventsprops[];
  meta: {
    page: number;
    take: number;
    total: number;
  };
};

type Eventsprops = {
  id: number;
  name: string;
  artist: string;
  location: string;
  city: string;
  startDate: string;
  thumbnail: string;
  category: string;
  organizerId: number;
};

export default function Landingpagewhatsup() {
  const [cityContent, setCityContent] = useState<Eventsprops[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("jakarta");

  useEffect(() => {
    axiosInstance
      .get<EventAPI>(`/events?city=${city}&take=4`)
      .then(({ data }) => {
        setCityContent(data.data);
        console.log(data.data);
        console.log(city)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [city]);

  return (
    <div className="w-full bg-[#121212]">
      <div className="w-full h-fit  text-white flex-col container mx-auto px-5 lg:px-30 py-15 ">
        <div className="h-full flex flex-col gap-5">
          <div className="font-krona-one flex  gap-5 items-center ">
            <span className="w-fit  text-xl uppercase">What's Up</span>
            <Buttonlocation setCity={setCity} />
            <span>?</span>
          </div>
          <div className="w-full h-full  grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {cityContent.map((e) => (
              <Card category={e.category} title={e.name} thumbnail={e.thumbnail} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
