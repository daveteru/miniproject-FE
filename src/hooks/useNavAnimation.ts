import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText);

export function useNavAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });
  const tlMap = useRef<Map<HTMLElement, gsap.core.Timeline>>(new Map());

  const onEnter = contextSafe((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    tlMap.current.get(btn)?.kill();

    const split = SplitText.create(btn, {
      type: "chars",
      mask: "chars",
    });

    const tl = gsap
      .timeline()
      .to(split.chars, {
        y: "-110%",
        duration: 0.25,
        stagger: 0.005,
        ease: "power2.in",
      })
      .set(split.chars, { y: "110%" })
      .to(split.chars, {
        y: "0%",
        duration: 0.25,
        stagger: 0.02,
        ease: "power2.out",
      });

    tlMap.current.set(btn, tl);
  });

  const onLeave = contextSafe((e: React.MouseEvent<HTMLButtonElement>) => {
    tlMap.current.get(e.currentTarget)?.reverse();
  });

  return { containerRef, onEnter, onLeave };
}
