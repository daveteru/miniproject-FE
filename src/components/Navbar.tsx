import { Link } from "react-router";
import navbarlogo from "../assets/Logo.svg";
import organizerlogo from "../assets/Logo_organizer.svg";
import { useNavbarDrag } from "../hooks/useNavbarDrag";
import { useAppStore } from "../store/useAppStore";
import Navbarbackground from "./NavbarBackground";
import Navbarbuttton from "./Navbarbuttton";

export default function Navbar() {
  const { navRef, isMenuOpen, toggleMenu, closeMenu } = useNavbarDrag();

  const user = useAppStore((state) => state.user);
  const isLoggedIn = !!user;

  return (
    <div className="border border-red-500 h-16">
        <nav
          ref={navRef}
          className={`h-100 fixed lg:relative w-full z-10 -translate-y-81`}
        >
          {/* MOBILE MENU */}
          <div className="relative z-1 w-full bg-[#E6FF06] h-80">
            <div className="h-full w-full flex flex-col lg:hidden font-krona-one">
              <Navbarbuttton label="ABOUT" />
              <Navbarbuttton
                link="/discover"
                label="DISCOVER"
                closeFunction={closeMenu}
              />
              <Navbarbuttton label="HELP" />
              <Navbarbuttton
                key={isLoggedIn ? "mobile-logged-in" : "mobile-logged-out"}
                link={isLoggedIn ? "/profile" : "/login"}
                label={isLoggedIn ? `Hello, ${user?.fullName}` : "SIGN IN"}
                closeFunction={closeMenu}
              />
            </div>
          </div>

          {/* BIG SCREEN MENU */}
          <div className="relative flex justify-between items-center pl-5 z-1 h-16 ">
            <Link to="/">
              <img
                className="w-35"
                src={user?.role === "ORGANIZER" ? organizerlogo : navbarlogo}
                onClick={closeMenu}
                alt=""
              />
            </Link>
            <div className="h-full lg:flex hidden font-krona-one">
              <Navbarbuttton label="ABOUT" />
              <Navbarbuttton link="/discover" label="DISCOVER" />
              <Navbarbuttton label="HELP" />
              {isLoggedIn ? (
                <Navbarbuttton
                  key="logged-in"
                  link="/profile"
                  label={`HELLO , ${user.fullName}`}
                />
              ) : (
                <Navbarbuttton key="logged-out" link="/login" label="SIGN IN" />
              )}
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
        </nav>
    </div>
  );
}
