import { useEffect, useState } from "react";
import Card from "./Card";
import { axiosInstance } from "../lib/axios";

type LandingpagecategoryProps = {
  title: string;
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

type EventsAPI = {
  data: Eventsprops[];
  meta: {
    page: number;
    take: number;
    total: number;
  };
};

export default function Landingpagecategory({
  title,
}: LandingpagecategoryProps) {
  const [events, setEvents] = useState<Eventsprops[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get<EventsAPI>(`/events?category=${title}&take=4`)
      .then(({ data }) => {
        setEvents(data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full ">
      <div className="w-full h-fit flex-col container mx-auto px-5 lg:px-30 py-10  ">
        <div className="h-full flex flex-col gap-5">
          <div className="font-krona-one flex justify-between gap-5 items-center ">
            <span className="w-fit  text-xl uppercase">Discover {title}</span>
            <span className="underline hover:text-blue-700">VIEW ALL</span>
          </div>
          <div className="w-full h-full  grid md:grid-cols-2 lg:grid-cols-4 gap-5 text-white">
            {events.map((place) => (
              <Card key={place.id} eventid={place.id} category={place.artist} title={place.name} thumbnail={place.thumbnail}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
