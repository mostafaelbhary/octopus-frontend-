"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  "Explore the deep south of the Red Sea aboard the ultra-luxury yacht M/Y OCTOPUS, a modern 5-deck liveaboard designed for premium diving experiences and ultimate comfort.",
  "This journey takes you through some of the most iconic diving locations in Egypt, including St. John\u2019s Reef, Rocky Island, and Zabargad, offering breathtaking underwater landscapes and rich marine biodiversity.",
  "The yacht features fully equipped double cabins with private bathrooms, air conditioning, and modern amenities designed for comfort during long diving expeditions.",
  "Guests enjoy a full-board luxury experience including freshly prepared meals, snacks, and refreshments served daily on board.",
  "The itinerary includes multiple days of guided diving with professional support, offering access to some of the most pristine and untouched dive sites in the Red Sea.",
  "Divers benefit from high-level onboard facilities including Nitrox support, technical diving assistance, and a professional crew ensuring safety and comfort throughout the voyage.",
  "This experience is designed for diving enthusiasts seeking adventure, exploration, and world-class underwater environments in one of the most beautiful marine destinations on the planet.",
];

export default function YachtOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgRef.current && sectionRef.current) {
        gsap.to(bgRef.current, {
          y: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      const lines = sectionRef.current?.querySelectorAll("[data-overview-line]");
      if (lines?.length) {
        gsap.utils.toArray(lines).forEach((line, i) => {
          const el = line as HTMLElement;
          const direction = i % 2 === 0 ? 1 : -1;
          gsap.fromTo(
            el,
            { x: 60 * direction, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 0.9, ease: "power4.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      const cta = sectionRef.current?.querySelectorAll("[data-overview-cta]");
      if (cta?.length) {
        gsap.fromTo(
          gsap.utils.toArray(cta),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
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
      id="yacht-overview"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 md:py-32 lg:py-40"
    >
      <div ref={bgRef} className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sky-50 via-white to-white" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center" data-overview-line>
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-sky-500 mb-4">
            The Yacht
          </span>
          <h2 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
            M/Y OCTOPUS
            <span className="block mt-2 text-xl font-normal tracking-wide text-slate-500 md:text-2xl">
              Red Sea Luxury Liveaboard Experience
            </span>
          </h2>
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          {paragraphs.map((text, i) => (
            <p
              key={i}
              data-overview-line
              className="text-base leading-relaxed text-slate-600 md:text-lg md:leading-8"
            >
              {text}
            </p>
          ))}
        </div>

        <div
          data-overview-cta
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            action={{
              type: "whatsapp",
              label: "Book Now",
              href: siteConfig.social.whatsapp,
            }}
          >
            Book Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            action={{
              type: "whatsapp",
              label: "Contact Captain",
              href: siteConfig.social.whatsapp,
            }}
          >
            Contact Captain
          </Button>
        </div>
      </div>
    </section>
  );
}
