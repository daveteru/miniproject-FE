import { useEffect, useState } from "react";
import Cardsoon from "./Cardsoon";
import { axiosInstance } from "../lib/axios";
import { formatDate } from "../utility/dateconvert";

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

export default function Landingpagesoon() {
  const placeholder = [
    { category: "FESTIVAL", title: "HEADS IN THE CLOUD II" },
    { category: "MUSIC", title: "HONNE" },
    { category: "COMEDY", title: "Mens Rea" },
    { category: "COMEDY", title: "SUCRD Raditya Dika" },
    { category: "FESTIVAL", title: "HEADS IN THE CLOUD II" },
    { category: "MUSIC", title: "HONNE" },
    { category: "COMEDY", title: "Mens Rea" },
    { category: "COMEDY", title: "SUCRD Raditya Dika" },
  ];

  const [soonEvents, setSoonEvents] = useState<Eventsprops[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get<EventsAPI>(`/events?sortBy=startDate&sortOrder=asc`)
      .then(({ data }) => {
        setSoonEvents(data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full mb-20 ">
      <div className="w-full h-fit flex-col container mx-auto px-5 lg:px-30 py-10  ">
        <div className="h-full flex flex-col gap-5">
          <div className="font-krona-one flex justify-between gap-5 items-center ">
            <span className="w-fit  text-xl uppercase">EVENTS COMING SOON</span>
            <span className="underline hover:text-blue-700">VIEW ALL</span>
          </div>
          <div className="w-full h-full  grid grid-rows-3 md:grid-cols-1 lg:grid-cols-2 gap-2 text-white">
            {soonEvents.map((e) => (
              <Cardsoon
                key={e.id}
                name={e.name}
                category={e.category}
                date={formatDate(e.startDate)}
                city={e.city}
                thumbnail={e.thumbnail}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
