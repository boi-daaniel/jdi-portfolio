import { type ElementType, type ReactNode, type RefObject, useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ScrollFloat.css";

gsap.registerPlugin(ScrollTrigger);

type ScrollFloatProps = {
  as?: ElementType;
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
};

export default function ScrollFloat({
  as: Tag = "h2",
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  const splitText = useMemo(() => {
    if (typeof children !== "string") {
      return children;
    }

    return children.split("").map((char, index) => (
      <span className="char" key={`${char}-${index}`}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element || typeof children !== "string") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const characters = element.querySelectorAll(".char");
    if (characters.length === 0) return;

    const context = gsap.context(() => {
      const scroller = scrollContainerRef?.current;
      const animation = gsap.fromTo(
        characters,
        {
          willChange: "opacity, transform",
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: "50% 0%",
        },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          paused: true,
        }
      );

      ScrollTrigger.create({
        trigger: element,
        start: scrollStart,
        end: scrollEnd,
        invalidateOnRefresh: true,
        ...(scroller ? { scroller } : {}),
        onEnter: () => animation.play(),
        onEnterBack: () => animation.play(),
        onLeaveBack: () => animation.progress(0).pause(),
      });

      window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, element);

    return () => context.revert();
  }, [children, scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <Tag ref={containerRef} className={`scroll-float ${containerClassName}`.trim()}>
      <span className={`scroll-float-text ${textClassName}`.trim()}>{splitText}</span>
    </Tag>
  );
}
