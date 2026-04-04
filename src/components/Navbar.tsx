import { useNavbarDrag } from "../hooks/useNavbarDrag";
import Marquee from "./Marquee";
import Navbarbackground from "./Navbarbackground";
import Navbarbuttton from "./Navbarbuttton";
import navbarlogo from "../assets/Logo.svg"
import { Link } from "react-router";

export default function Navbar() {
  const { navRef, isMenuOpen, toggleMenu , closeMenu } = useNavbarDrag();

  return (
    <nav ref={navRef} className="h-100 fixed w-full z-10">
      {/* MOBILE MENU */}
      <div className="relative z-1 w-full h-80">
        <div className="h-full w-full flex flex-col lg:hidden font-krona-one">
          <Navbarbuttton label="ABOUT" />
          <Navbarbuttton link="/discover" label="DISCOVER" closeFunction={closeMenu}/>
          <Navbarbuttton label="HELP" />
          <Navbarbuttton label="SIGN IN" />
        </div>
      </div>

      {/* BIG SCREEN MENU */}
      <div className="relative flex justify-between items-center pl-5 z-1 h-20">
        <Link to="/"><img className="w-35" src={navbarlogo} onClick={closeMenu} alt="" /></Link>
        <div className="h-full lg:flex hidden font-krona-one">
          <Navbarbuttton label="ABOUT" />
          <Navbarbuttton link="/discover"  label="DISCOVER"  />
          <Navbarbuttton label="HELP" />
          <Navbarbuttton label="SIGN IN" />
        </div>

        {/* REVEAL MOBILE MENU BUTTON */}
        <button
          className="lg:hidden h-full font-krona-one wrap w-[27%] md:w-[26%] hover:bg-[#121212] hover:text-white text-sm cursor-pointer"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "Close" : "Menu ↓"}
        </button>
      </div>

      {/* AESTHETIC PURPOSES */}
      <Navbarbackground />
      <Marquee />
    </nav>
  );
}
