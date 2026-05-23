"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 50, suffix: "+", label: "Luxury Vessels" },
  { value: 120, suffix: "+", label: "Destinations Worldwide" },
  { value: 99.7, suffix: "%", label: "Guest Satisfaction" },
  { value: 15, suffix: "+", label: "Industry Awards" },
];

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = sectionRef.current?.querySelectorAll("[data-count]");
      const statItems = sectionRef.current?.querySelectorAll("[data-stat]");

      if (counters?.length) {
        gsap.utils.toArray(counters).forEach((counter) => {
          const el = counter as HTMLElement;
          const target = parseFloat(el.getAttribute("data-count") || "0");
          const isDecimal = target % 1 !== 0;

          gsap.fromTo(
            el,
            { textContent: 0 },
            {
              textContent: target,
              duration: 2.5,
              ease: "power2.out",
              snap: { textContent: isDecimal ? 0.1 : 1 },
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      if (statItems?.length && sectionRef.current) {
        gsap.fromTo(
          gsap.utils.toArray(statItems),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="statistics"
      ref={sectionRef}
      className="relative px-6 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sky-50 via-white to-sky-50" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              data-stat
              className="text-center"
            >
              <div className="text-4xl font-bold text-sky-600 md:text-5xl lg:text-6xl">
                <span data-count={stat.value}>{0}</span>
                <span>{stat.suffix}</span>
              </div>
              <p className="mt-2 text-sm text-slate-500 md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
