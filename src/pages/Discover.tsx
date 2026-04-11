import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
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
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState<Eventsprops[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      axiosInstance
        .get<EventsAPI>(
          `/events?take=20&search=${search}&category=${category}&city=${city}`,
        )
        .then(({ data }) => {
          setEvents(data.data);
          console.log(data.data);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, 500);
    return () => clearTimeout(timeout);
  }, [search, category, city]);

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
            <YellowButton
              value=""
              label="All"
              setter={setCategory}
              selected={category}
            />
            <YellowButton
              value="festival"
              label="FESTIVAL 🎉"
              setter={setCategory}
              selected={category}
            />
            <YellowButton
              value="music"
              label="MUSIC 🎶"
              setter={setCategory}
              selected={category}
            />
            <YellowButton
              value="comedy"
              label="COMEDY 😂"
              setter={setCategory}
              selected={category}
            />
            <YellowButton
              value="sports"
              label="SPORTS ⚽"
              setter={setCategory}
              selected={category}
            />
            <YellowButton
              value="wellness"
              label="WELLNESS & FITNESS 🧘"
              setter={setCategory}
              selected={category}
            />
          </div>
        </div>
      </section>
      <section className="h-fit min-h-200 w-full justify-center flex bg-white text-black">
        {" "}
        <div className=" container mx-auto gap-5  flex flex-col px-5 md:px-30 py-10">
          {" "}
          <h1 className="text-2xl uppercase">
            Explore {category || "events"}{" "}
          </h1>
          {!loading && events.length === 0 ? (
            <div className="flex justify-center items-center py-20 border-2 border-dashed rounded-3xl border-neutral-200 h-[40vh] text-gray-400 text-lg">
              <p>cannot find events searched 😅</p>
            </div>
          ) : (
            <div className="grid gap-2  md:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => (
                <DiscoverCard
                  key={e.id}
                  id={e.id}
                  title={e.name}
                  thumbnail={e.thumbnail}
                  artist={e.artist}
                  category={e.category}
                  city={e.city}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
