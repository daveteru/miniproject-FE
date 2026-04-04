import { useState } from "react";
import { Searchbar2 } from "../components/Searchbar";
import YellowButton from "../components/Buttons";
import DiscoverCard from "../components/DiscoverCard";

export default function Discover() {
  return (
    <div className="bg-[#262626]">
      <section className="w-full h-fit py-15 text-amber-50">
        <div className="container mx-auto  px-5 md:px-30 flex flex-col gap-5 ">
          <div className="flex flex-col lg:flex-row gap-5 items-center  ">
            <h1 className="text-xl md:text-[45px] text-nowrap w-fit">
              FIND EVENTS
            </h1>
            <Searchbar2 />
          </div>
          <div className="w-full flex flex-wrap gap-2 justify-center">
            {" "}
            <YellowButton label="FESTIVAL 🎉" />
            <YellowButton label="MUSIC 🎶" />
            <YellowButton label="COMEDY 😂" />
            <YellowButton label="SPORTS ⚽" />
            <YellowButton label="WELLNESS & FITNESS 🧘" />
          </div>
        </div>
      </section>
      <section className="h-fit w-full justify-center flex bg-white text-black">
        {" "}
        <div className=" container mx-auto gap-5  flex flex-col px-5 md:px-30 py-10">
          {" "}
          <h1 className="text-2xl">Explore Events </h1>
          <div className="grid gap-2  md:grid-cols-2 lg:grid-cols-4">
            <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
                       <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
          </div>
        </div>
      </section>
    </div>
  );
}
