import { useEffect, useState } from "react";
import Marquee from "./Marquee";
import Navbarbackground from "./Navbarbackground";
import Navbarbuttton from "./Navbarbuttton";

export default function Navbar() {
  const [drawermenu, setDrawermenu] = useState(false);


    
  {/* USEEFFECT FOR CHECKING WINDOW RESIZE */}
  useEffect(() => { 
    const windowsizecheck = window.matchMedia("(min-width: 1024px)");
    const resizeEvent = (e: MediaQueryListEvent) => {
      if (e.matches) setDrawermenu(false);
    };

    windowsizecheck.addEventListener("change", resizeEvent);
    return () => windowsizecheck.removeEventListener("change", resizeEvent);
  }, []);

  return (
    <nav
      className={`h-100 ${drawermenu ? "" : "-translate-y-81"} fixed w-full z-10 transition ease-in-out`}
    >
      {/* MOBILE MENU */}

      <div className="relative z-1 w-full h-80 ">
        <div className="h-full w-full flex flex-col lg:hidden font-krona-one">
          <Navbarbuttton label="ABOUT" />
          <Navbarbuttton label="DISCOVER" />
          <Navbarbuttton label="HELP" />
          <Navbarbuttton label="SIGN IN" />
        </div>
      </div>

      {/* BIG SCREEN MENU */}

      <div className="relative flex justify-between items-center pl-5 z-1 h-20">
        <img className="w-35" src="src/assets/Logo.svg" alt="" />
        <div className="h-full lg:flex hidden font-krona-one">
          <Navbarbuttton label="ABOUT" />
          <Navbarbuttton label="DISCOVER" />
          <Navbarbuttton label="HELP" />
          <Navbarbuttton label="SIGN IN" />
        </div>

        {/* REVEAL MOBILE MENU BUTTON*/}

        <button
          className="lg:hidden  h-full font-krona-one wrap w-[27%] md:w-[26%] hover:bg-black hover:text-white text-sm cursor-pointer"
          onClick={() => setDrawermenu(!drawermenu)}
        >
          {drawermenu ? "Close" : "Menu ↓"}
        </button>
      </div>

      {/* AESTHETIC PURPOSES */}

      <Navbarbackground />
      <Marquee />
    </nav>
  );
}
