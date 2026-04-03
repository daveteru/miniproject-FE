import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";

gsap.registerPlugin(Draggable);

const NAVBAR_HIDDEN_Y = -324;
const NAVBAR_VISIBLE_Y = 0;
const DRAG_SNAP_THRESHOLD = NAVBAR_HIDDEN_Y / 2;

export function useNavbarDrag() {
  const navRef = useRef<HTMLElement>(null);
  const draggableInstanceRef = useRef<Draggable[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(() => {
    const deviceScreen = gsap.matchMedia();

    // Desktop: rest at hidden position (desktop nav row stays visible), no drag
    deviceScreen.add("(min-width: 1024px)", () => {
      gsap.set(navRef.current, { y: NAVBAR_HIDDEN_Y });
      setIsMenuOpen(false);
    });

    // Mobile: hidden by default, drag-to-reveal
    deviceScreen.add("(max-width: 1023px)", () => {
      gsap.set(navRef.current, { y: NAVBAR_HIDDEN_Y });
      setIsMenuOpen(false);

      draggableInstanceRef.current = Draggable.create(navRef.current, {
        type: "y",
        bounds: { minY: NAVBAR_HIDDEN_Y, maxY: NAVBAR_VISIBLE_Y },
        onDragEnd() {
          const isPassedHalfway = this.y > DRAG_SNAP_THRESHOLD;
          gsap.to(navRef.current, {
            y: isPassedHalfway ? NAVBAR_VISIBLE_Y : NAVBAR_HIDDEN_Y,
            duration: 0.4,
            ease: "power2.out",
          });
          setIsMenuOpen(isPassedHalfway);
        },
      });

      return () => {
        draggableInstanceRef.current.forEach((instance) => instance.kill());
        draggableInstanceRef.current = [];
      };
    });

    return () => deviceScreen.revert();
  }, {});

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      gsap.to(navRef.current, {
        y: next ? NAVBAR_VISIBLE_Y : NAVBAR_HIDDEN_Y,
        duration: 0.4,
        ease: "power2.inOut",
      });
      return next;
    });
  };

  const closeMenu = () => {                                                 
    gsap.to(navRef.current, { y: NAVBAR_HIDDEN_Y, duration: 0, ease:      
  "none" });                                                        
    setIsMenuOpen(false);                     
  };      

  return { navRef, isMenuOpen, toggleMenu , closeMenu };
}
