"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "An absolutely unforgettable experience. The attention to detail on board was extraordinary — every meal, every excursion, every moment felt curated just for us.",
    name: "Isabella Martinez",
    role: "CEO, Horizon Travel Group",
    color: "from-sky-400 to-cyan-500",
  },
  {
    quote:
      "We chartered a private yacht for our company retreat and it exceeded every expectation. The crew was impeccable, the destinations breathtaking.",
    name: "James Whitfield",
    role: "Managing Director, Atlantic Ventures",
    color: "from-amber-400 to-orange-500",
  },
  {
    quote:
      "The Mediterranean cruise with Octups was the highlight of our year. World-class service, stunning ports, and memories that will last a lifetime.",
    name: "Sofia Laurent",
    role: "Founder, Azure Media",
    color: "from-teal-400 to-emerald-500",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll("[data-testimonial]");

      if (cards?.length) {
        gsap.utils.toArray(cards).forEach((card, i) => {
          const el = card as HTMLElement;

          gsap.fromTo(
            el,
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              delay: i * 0.2,
              ease: "power4.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );

          const quoteEl = el.querySelector("[data-quote]");
          if (quoteEl) {
            gsap.fromTo(
              quoteEl,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 1.2,
                delay: i * 0.2 + 0.3,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Testimonials"
          title="What Our Guests Say"
          subtitle="Hear from travelers who have experienced the Octups difference firsthand."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-testimonial
              className="group relative rounded-2xl border border-sky-100 bg-white p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-6 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="text-amber-400"
                  >
                    <path d="M8 1l1.9 3.9 4.3.6-3.1 3 0.7 4.4L8 11.6l-3.8 2.3 0.7-4.4-3.1-3 4.3-0.6L8 1z" />
                  </svg>
                ))}
              </div>

              <p
                data-quote
                className="mb-6 leading-relaxed text-slate-600 italic"
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full bg-gradient-to-br ${t.color}`}
                />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
