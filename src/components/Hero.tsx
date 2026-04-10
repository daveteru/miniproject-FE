import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef, useState } from "react";
import { useNavAnimation } from "../hooks/useNavAnimation";
import { axiosInstance } from "../lib/axios";

gsap.registerPlugin(SplitText);
const heroImg3 = "https://res.cloudinary.com/dbjnkjxli/image/upload/f_auto,q_auto/1_jar4xn";

// 2. Define the type matching your backend response
type HeroSlide = {
  id: number;
  priority:string;
  status:string
  eventId:number;
  event: {
    name: string;
    startDate: string;
    location: string;
    thumbnail: string;
    description: string;
  };
};

export default function Hero() {
  const { containerRef, onEnter, onLeave } = useNavAnimation();
  const [carousellpage, setCarousellpage] = useState<1 | 2 | 3>(1);
  const [herocontent, setHerocontent] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const carousellcontainer = useRef<HTMLDivElement>(null);

  // Carousell Animation

  useGSAP(
    () => {
      if (!carousellcontainer.current) return;
      gsap.to(carousellcontainer.current, {
        xPercent: -(carousellpage - 1) * (100 / 3),
        duration: 0.6,
        ease: "power2.inOut",
      });
    },
    { dependencies: [carousellpage] },
  );

  //Carousell interval - (5 second )

  useEffect(() => {
    const interval = setInterval(() => {
      setCarousellpage((prev) => (prev === 3 ? 1 : ((prev + 1) as 1 | 2 | 3)));
    }, 5000);
    return () => clearInterval(interval);
  }, [carousellpage]); //5000ms counter reset everytime carousellpage state changed

  //Data Fetching from DB

  useEffect(() => {
    axiosInstance
      .get<HeroSlide[]>("/promotions/hero")
      .then((res) => {
        setHerocontent(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);


  if (loading || herocontent.length === 0) {
    return (
      <header className="w-full h-170 bg-gray-900 flex items-center justify-center text-[#E6FF06]">
        <p className="text-lg animate-pulse">Loading...</p>
      </header>
    );
  }

  return (
    <header className="bg-gray-400 w-full h-170 justify-center items-center relative text-[#E6FF06]  overflow-hidden">
      {/* custom carousell container */}
      <div className="w-screen h-full  justify-between items-center px-20 flex  absolute z-10 pointer-events-none">
        <button
          onClick={() =>
            setCarousellpage((prev) =>
              prev === 1 ? 3 : ((prev - 1) as 1 | 2 | 3),
            )
          }
          className="pointer-events-auto w-8 h-8 rounded-full bg-[#e6ff06] backdrop-blur-sm 
               flex items-center justify-center text-black hover:bg-black/60 hover:text-white transition-colors"
        >
          ←
        </button>
        <button
          onClick={() =>
            setCarousellpage((prev) =>
              prev === 3 ? 1 : ((prev + 1) as 1 | 2 | 3),
            )
          }
          className="pointer-events-auto w-8 h-8 rounded-full bg-[#e6ff06] backdrop-blur-sm 
               flex items-center justify-center text-black hover:bg-black/60 hover:text-white transition-colors"
        >
          →
        </button>
      </div>
      <div ref={carousellcontainer} className="w-[300%] h-full absolute flex">
        <div className="w-screen">
          <img
            className="relative w-full h-full z-0 inset-0 object-cover "
            src={herocontent[0].event.thumbnail}
            alt=""
          />
        </div>
        <div className="w-screen">
          <img
            className="relative w-full h-full z-0 inset-0 object-cover "
            src={herocontent[1].event.thumbnail}
            alt=""
          />
        </div>

        <div className="w-screen">
          <img
            className="relative w-full h-full z-0 inset-0 object-cover "
            src={herocontent[2].event.thumbnail}
            alt=""
          />
        </div>
      </div>

      {/* Gradient overlay on top of image */}

      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/50 to-black/20 lg:to-transparent " />

      <div className="container w-screen mx-auto py-12 px-5 lg:px-30 relative z-2 flex flex-col lg:flex-row h-full  justify-end items-end">
        
        {/* text content top layer */}
        <div className="flex flex-col justify-between  w-full h-full  mb-5 lg:mb-0">
          <div>
            <h1 className="text-5xl md:text-6xl lg:w-150 text-center lg:text-left leading-14 md:leading-17  uppercase">
              {herocontent[carousellpage - 1].event.name}* <br /> @{" "}
              {herocontent[carousellpage - 1].event.location}
            </h1>
            <h1 className="text-xl  lg:w-100 leading-15 text-center  lg:text-right">
              {new Intl.DateTimeFormat("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }).format(new Date(herocontent[carousellpage - 1].event.startDate))}
            </h1>
          </div>
          <div
            ref={containerRef}
            className=" justify-center items-center lg:items-start text-center lg:text-left flex flex-col gap-5"
          >
            <p className="md:w-100 text-sm text-white">
              {herocontent[carousellpage - 1].event.description}
            </p>
            <button
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              className="w-fit transition-all ease-in-out h-fit py-2 px-5 bg-[#E6FF06] text-black  hover:bg-[#dbb303] rounded-xl font-krona-one"
            >
              BUY TICKETS
            </button>
          </div>
        </div>

        {/* carousell Buttons */}
        <div className=" w-full flex justify-center lg:justify-start items-end lg:h-full">
          <div className="text-5xl w-fit gap-2 flex transition-all ease-initial">
            <button
              className={`${carousellpage === 1 ? "w-10" : "w-3"} h-3 ${carousellpage === 1 ? "bg-[#e6ff06]" : "bg-gray-400"} rounded-full transition-all ease-in`}
              onClick={() => setCarousellpage(1)}
            ></button>
            <button
              className={`${carousellpage === 2 ? "w-10" : "w-3"} h-3 ${carousellpage === 2 ? "bg-[#e6ff06]" : "bg-gray-400"} rounded-full transition-all ease-in`}
              onClick={() => setCarousellpage(2)}
            ></button>
            <button
              className={`${carousellpage === 3 ? "w-10" : "w-3"} h-3 ${carousellpage === 3 ? "bg-[#e6ff06]" : "bg-gray-400"} rounded-full transition-all ease-in`}
              onClick={() => setCarousellpage(3)}
            ></button>
          </div>
        </div>
      </div>
    </header>
  );
}
