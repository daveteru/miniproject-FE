import { useState, useRef, useEffect } from "react";
import { useNavAnimation } from "../hooks/useNavAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);
import heroImg1 from "../assets/photo/3.webp";
import heroImg2 from "../assets/photo/2.webp";
import heroImg3 from "../assets/photo/1.webp";

const slides = [
  {
    title: "MensRea",
    date: "12/12/2027",
    location: "Istora Senayan",
    description:
      "Guilty of making you laugh. Indonesia's sharpest comic minds take the mic — no filter, no mercy. One night of uncomfortable truths dressed up as punchlines. Court is in session.",
  },
  {
    title: `Heads in the cloud`,
    date: "01/01/2028",
    location: "Ancol",
    description:
      "Pan-Asian. Genre-fluid. Unapologetically loud. 88rising brings the wave — where hip-hop meets nostalgia and every track feels like a coming-of-age moment. Float up.",
  },
  {
    title: "Tulus",
    date: "03/03/2028",
    location: "ICE BSD",
    description:
      "Ada lagu yang hidup lebih lama dari perasaan yang melahirkannya. Malam ini, suara Tulus mengisi ruang yang selama ini kamu biarkan kosong. Datang dan bawa siapa saja yang kamu rindukan",
  },
];

export default function Hero() {
  const { containerRef, onEnter, onLeave } = useNavAnimation();
  const [carousellpage, setCarousellpage] = useState<1 | 2 | 3>(1);
  const carousellcontainer = useRef<HTMLDivElement>(null);

  // Carousell Animation

  useGSAP(
    () => {
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
            src={heroImg1}
            alt=""
          />
        </div>
        <div className="w-screen">
          <img
            className="relative w-full h-full z-0 inset-0 object-cover "
            src={heroImg2}
            alt=""
          />
        </div>

        <div className="w-screen">
          <img
            className="relative w-full h-full z-0 inset-0 object-cover "
            src={heroImg3}
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
            <h1 className="text-5xl md:text-6xl lg:w-130 text-center lg:text-left leading-14 md:leading-17  uppercase">
              {slides[carousellpage - 1].title}* <br /> @{" "}
              {slides[carousellpage - 1].location}
            </h1>
            <h1 className="text-xl  lg:w-100 leading-15 text-center  lg:text-right">
              {slides[carousellpage - 1].date}
            </h1>
          </div>
          <div
            ref={containerRef}
            className=" justify-center items-center lg:items-start text-center lg:text-left flex flex-col gap-5"
          >
            <p className="md:w-100 text-sm text-white">
              {slides[carousellpage - 1].description}
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
