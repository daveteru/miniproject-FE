import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText);

export function useNavAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });
  const tlMap = useRef<Map<HTMLElement, gsap.core.Timeline>>(new Map());
  const splitMap = useRef<Map<HTMLElement, ReturnType<typeof SplitText.create>>>(new Map());

  const onEnter = contextSafe((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    tlMap.current.get(btn)?.kill();
    splitMap.current.get(btn)?.revert();

    const split = SplitText.create(btn, {
      type: "chars",
      mask: "chars",
    });
    splitMap.current.set(btn, split);

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
    const btn = e.currentTarget;
    const tl = tlMap.current.get(btn);
    if (tl) {
      tl.reverse().then(() => {
        splitMap.current.get(btn)?.revert();
        splitMap.current.delete(btn);
      });
    }
  });

  return { containerRef, onEnter, onLeave };
}
