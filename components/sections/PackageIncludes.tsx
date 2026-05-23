"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const includes = [
  {
    title: "Luxury Accommodation On Board",
    description: "Enjoy comfortable and modern cabins designed for relaxation throughout your journey.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7" />
        <path d="M21 7H3l2-4h14l2 4z" />
        <path d="M9 21V11h6v10" />
      </svg>
    ),
  },
  {
    title: "All Meals & Refreshments",
    description: "Freshly prepared meals, snacks, and beverages served daily on board.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <path d="M6 1v3" />
        <path d="M10 1v3" />
        <path d="M14 1v3" />
      </svg>
    ),
  },
  {
    title: "Unlimited Diving Experience",
    description: "Access incredible dive sites and enjoy multiple diving opportunities during your voyage.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h3l3-3 4 5 4-3 4 2 2-2" />
        <circle cx="5" cy="7" r="2" />
        <path d="M22 17l-2-2-4 1-3-4-3 3" />
      </svg>
    ),
  },
  {
    title: "Professional Diving Guide",
    description: "Experienced dive professionals ensuring safety and unforgettable underwater adventures.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Diving Equipment Support",
    description: "Professional onboard diving facilities and equipment assistance available throughout the trip.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    title: "Free Wi-Fi Access",
    description: "Stay connected while exploring the beauty of the Red Sea.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0114.08 0" />
        <path d="M1.42 9a16 16 0 0121.16 0" />
        <path d="M8.53 16.11a6 6 0 016.95 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

export default function PackageIncludes() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = cardsRef.current?.children;
      if (items && items.length) {
        gsap.fromTo(
          gsap.utils.toArray(items),
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power4.out",
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
      id="package-includes"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-cyan-50/30 to-white" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Inclusions"
          title="Package Includes"
          subtitle="Everything you need for an unforgettable Red Sea liveaboard experience."
        />

        <div
          ref={cardsRef}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {includes.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-sky-100/80 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all duration-500 hover:border-sky-200 hover:bg-white hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-cyan-100 text-sky-600 transition-transform duration-500 group-hover:scale-110 group-hover:from-sky-200 group-hover:to-cyan-200">
                {item.icon}
              </div>
              <h3 className="text-base font-semibold text-slate-800">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
