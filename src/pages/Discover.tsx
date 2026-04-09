import { useEffect, useState } from "react";
import { Searchbar2 } from "../components/Searchbar";
import YellowButton from "../components/Buttons";
import DiscoverCard from "../components/DiscoverCard";
import { axiosInstance } from "../lib/axios";

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

export default function Discover() {
  const [events, setEvents] = useState<Eventsprops[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      axiosInstance
        .get<EventsAPI>(`/events?take=20&search=${search}&category=${category}`)
        .then(({ data }) => {
          setEvents(data.data);
          console.log(data.data);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    },500);
    return () => clearTimeout(timeout);
  }, [search, category,city]);

  return (
    <div className="bg-[#262626]">
      <section className="w-full h-fit py-15 text-amber-50">
        <div className="container mx-auto  px-5 md:px-30 flex flex-col gap-5 ">
          <div className="flex flex-col lg:flex-row gap-5 items-center  ">
            <h1 className="text-xl md:text-[45px] text-nowrap w-fit">
              FIND EVENTS
            </h1>
            <Searchbar2
              setCity={setCity}
              city={city}
              search={search}
              setSearch={setSearch}
            />
          </div>
          <div className="w-full flex flex-wrap gap-2 justify-center">
            {" "}
            <YellowButton value="festival" label="FESTIVAL 🎉" setter={setCategory} selected={category}/>
            <YellowButton value="music" label="MUSIC 🎶" setter={setCategory} selected={category}/>
            <YellowButton value="comedy" label="COMEDY 😂" setter={setCategory} selected={category}/>
            <YellowButton value="sports" label="SPORTS ⚽" setter={setCategory} selected={category}/>
            <YellowButton value="wellness" label="WELLNESS & FITNESS 🧘" setter={setCategory} selected={category}/>
          </div>
        </div>
      </section>
      <section className="h-fit w-full justify-center flex bg-white text-black">
        {" "}
        <div className=" container mx-auto gap-5  flex flex-col px-5 md:px-30 py-10">
          {" "}
          <h1 className="text-2xl">Explore Events </h1>
          <div className="grid gap-2  md:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <DiscoverCard key={e.id} title={e.name} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
