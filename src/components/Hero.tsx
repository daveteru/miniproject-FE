import { useNavAnimation } from "../hooks/useNavAnimation";

export default function Hero() {
  const { containerRef, onEnter, onLeave } = useNavAnimation();
  return (
    <div>
      <div className="bg-gray-400 w-full h-170 relative text-[#E6FF06]">
        <img
          className="absolute z-0 inset-0 w-full h-full object-cover object-center"
          src="src/assets/photo/903389_1200.jpg"
          alt=""
        />
        {/* Gradient overlay on top of image */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="container mx-auto py-12 px-5 lg:px-30 relative z-2 flex flex-col justify-between h-full">
          <div>
            <h1 className="text-5xl md:text-6xl lg:w-120 text-center lg:text-left leading-14 md:leading-17  uppercase">
              MensRea* <br></br>@ Istora Senayan
            </h1>
            <h1 className="text-xl  lg:w-100 leading-15 text-center  lg:text-right">12/12/2027</h1>
          </div>
          <div ref={containerRef} className=" justify-center items-center lg:items-start text-center lg:text-left flex flex-col gap-5">
            <p className="md:w-100 text-sm text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              mollitia delectus aspernatur eum dolorum est voluptates
              accusantium aliquid maiores nisi minus ipsam aliquam molestias
              sunt quia, alias ullam ipsum quam vel? lorem pisum 
            </p>
            <button
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              className="w-fit transition-all ease-in-out h-fit py-2 px-5 bg-[#E6FF06] text-black hover:text-white hover:bg-black rounded-xl font-krona-one"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
