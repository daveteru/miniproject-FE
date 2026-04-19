import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";

export function useCarousel(total: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      if (!trackRef.current) return;
      gsap.to(trackRef.current, {
        xPercent: -(index * (100 / total)),
        duration: 0.6,
        ease: "power2.inOut",
      });
      currentRef.current = index;
      setCurrent(index);
    },
    [total],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentRef.current + 1) % total;
      goTo(next);
    }, 5000);
    return () => clearInterval(interval);
  }, [total, goTo]);

  return { trackRef, current, goTo };
}
