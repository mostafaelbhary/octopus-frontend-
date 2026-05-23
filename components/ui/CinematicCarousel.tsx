"use client";

import { useRef, useState, useEffect, useCallback, type ReactNode, Children } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CinematicCarouselProps {
  children: ReactNode;
  sectionRef: React.RefObject<HTMLElement | null>;
  showDots?: boolean;
}

export default function CinematicCarousel({ children, sectionRef, showDots = true }: CinematicCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const items = Children.toArray(children);
  const total = items.length;
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isAnimating = useRef(false);
  const displayIdxRef = useRef(1);
  const containerWidthRef = useRef(0);

  const displayItems = [items[total - 1], ...items, items[0]];

  const getItemMetrics = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return { step: 0, itemW: 0, offset: 0 };

    const firstChild = track.children[0] as HTMLElement;
    if (!firstChild) return { step: 0, itemW: 0, offset: 0 };

    const cw = container.getBoundingClientRect().width;
    const iw = firstChild.getBoundingClientRect().width;
    const gap = window.innerWidth < 768 ? 16 : 24;
    const step = iw + gap;
    const offset = (cw - iw) / 2;

    return { step, itemW: iw, offset };
  }, []);

  const animateToDisplay = useCallback((displayIdx: number, smooth = true) => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const { step, offset } = getItemMetrics();
    if (step === 0) return;

    const targetX = -(displayIdx * step) + offset;

    if (smooth) {
      isAnimating.current = true;
      gsap.to(track, {
        x: targetX,
        duration: 0.7,
        ease: "power3.inOut",
        overwrite: "auto",
        onComplete: () => {
          isAnimating.current = false;
          checkLoop(displayIdx);
        },
      });
    } else {
      gsap.set(track, { x: targetX });
      checkLoop(displayIdx);
    }
  }, [getItemMetrics]);

  const checkLoop = useCallback((displayIdx: number) => {
    if (displayIdx === total + 1) {
      displayIdxRef.current = 1;
      gsap.set(trackRef.current, { x: -(1 * getItemMetrics().step) + getItemMetrics().offset });
      setCurrent(0);
    } else if (displayIdx === 0) {
      displayIdxRef.current = total;
      gsap.set(trackRef.current, { x: -(total * getItemMetrics().step) + getItemMetrics().offset });
      setCurrent(total - 1);
    } else {
      setCurrent(displayIdx - 1);
    }
  }, [total, getItemMetrics]);

  const advance = useCallback(() => {
    if (isAnimating.current || total <= 1) return;
    displayIdxRef.current += 1;
    animateToDisplay(displayIdxRef.current);
  }, [total, animateToDisplay]);

  const goBack = useCallback(() => {
    if (isAnimating.current || total <= 1) return;
    displayIdxRef.current -= 1;
    animateToDisplay(displayIdxRef.current);
  }, [total, animateToDisplay]);

  const goTo = useCallback((idx: number) => {
    if (isAnimating.current || total <= 1) return;
    displayIdxRef.current = idx + 1;
    animateToDisplay(displayIdxRef.current);
  }, [total, animateToDisplay]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    containerWidthRef.current = container.getBoundingClientRect().width;

    const handleResize = () => {
      containerWidthRef.current = container.getBoundingClientRect().width;
      animateToDisplay(displayIdxRef.current, false);
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [animateToDisplay]);

  useEffect(() => {
    animateToDisplay(1, true);
  }, []);

  useEffect(() => {
    if (total <= 1) {
      clearTimeout(timerRef.current);
      return;
    }

    timerRef.current = setTimeout(() => {
      advance();
    }, 4000);

    return () => clearTimeout(timerRef.current);
  }, [current, total, advance]);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const cards = Array.from(track.children).filter((_, i) => i > 0 && i < total + 1);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.1, ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      const parallaxEls = cards
        .map((card) => card.querySelector("[data-parallax]") as HTMLElement)
        .filter(Boolean);
      if (parallaxEls.length) {
        gsap.fromTo(
          parallaxEls,
          { scale: 1.05, opacity: 0.6 },
          {
            scale: 1, opacity: 1, duration: 1.2, stagger: 0.08, ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, track);

    return () => ctx.revert();
  }, [sectionRef, total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        const el = card.querySelector("[data-parallax]") as HTMLElement;
        if (!el) return;
        gsap.to(el, {
          y: "18%", ease: "none",
          scrollTrigger: {
            trigger: card, start: "top bottom", end: "bottom top", scrub: 1.2,
          },
        });
      });
    }, track);

    return () => ctx.revert();
  }, []);

  if (total <= 1) {
    return <>{children}</>;
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="relative">
        <div ref={containerRef} className="overflow-hidden" style={{ touchAction: "pan-y" }}>
          <div ref={trackRef} className="flex gap-4 md:gap-6">
            {displayItems.map((item, i) => (
              <div key={i} className="flex-shrink-0 w-[80vw] md:w-[65vw] lg:w-[55vw]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={goBack}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-sky-200/60 bg-white/70 text-sky-600 shadow-sm backdrop-blur-sm opacity-70 transition-all duration-300 hover:opacity-100 hover:bg-white hover:shadow-md active:scale-95"
          aria-label="Previous"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={advance}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-sky-200/60 bg-white/70 text-sky-600 shadow-sm backdrop-blur-sm opacity-70 transition-all duration-300 hover:opacity-100 hover:bg-white hover:shadow-md active:scale-95"
          aria-label="Next"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sky-400">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>

        {showDots && total <= 12 ? (
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => { clearTimeout(timerRef.current); goTo(i); }}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-6 bg-sky-500"
                    : "w-2 bg-sky-200 hover:bg-sky-300"
                }`}
                aria-label={`Go to item ${i + 1}`}
              />
            ))}
          </div>
        ) : (
          <span className="text-xs font-medium tracking-wide text-sky-400">
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        )}

        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sky-400">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
