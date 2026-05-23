"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { exteriorImages } from "@/config/images";
import { mediaPath } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = contentRef.current?.querySelectorAll("[data-anim='line']");
      if (lines?.length) {
        gsap.utils.toArray(lines).forEach((line, i) => {
          const el = line as HTMLElement;
          const direction = i % 2 === 0 ? -1 : 1;
          gsap.fromTo(
            el,
            { x: -50 * direction, opacity: 0 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        visual,
        { clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: visual,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, visual);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="About"
          title="Red Sea Luxury Diving"
          subtitle="Octups curates extraordinary liveaboard diving safaris aboard M/Y Octopus, offering world-class underwater experiences in the Red Sea's most pristine locations."
          align="left"
        />

        <div className="mt-12 grid items-center gap-16 lg:grid-cols-2">
          <div ref={contentRef} className="space-y-6">
            <p
              data-anim="line"
              className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-8"
            >
              Born from a passion for the Red Sea and a commitment to
              uncompromising luxury diving experiences, Octups has
              redefined the liveaboard experience in Egypt&apos;s most
              breathtaking underwater environments.
            </p>
            <p
              data-anim="line"
              className="text-lg leading-relaxed text-slate-500 md:leading-8"
            >
              M/Y Octopus, our flagship 5-deck liveaboard, is crewed by
              seasoned diving professionals offering access to iconic sites
              like St. John&apos;s Reef, Rocky Island, and Zabargad — some of
              the most pristine dive locations in the Red Sea.
            </p>
            <p
              data-anim="line"
              className="text-lg leading-relaxed text-slate-500 md:leading-8"
            >
              From Nitrox-supported technical diving to gourmet onboard
              dining, every Octopus journey is a masterpiece of adventure
              and refinement, crafted for discerning diving enthusiasts.
            </p>
            <div data-anim="line" className="flex gap-4 pt-4">
              <Button variant="primary" size="md" action={{ type: "whatsapp", label: "Book a Safari", href: "https://wa.me/201282256562" }}>
                Book a Safari
              </Button>
              <Button variant="outline" size="md" action={{ type: "whatsapp", label: "Contact Captain", href: "https://wa.me/201282256562" }}>
                Contact Captain
              </Button>
            </div>
          </div>

          <div
            ref={visualRef}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-sky-100 via-white to-cyan-100 border border-sky-200"
          >
            {exteriorImages[0]?.src && (
              <img
                src={mediaPath(exteriorImages[0].src)}
                alt="M/Y Octopus"
                className="absolute inset-0 h-full w-full object-cover"
                onLoad={() => ScrollTrigger.refresh()}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/5 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-4 rounded-xl bg-white/90 p-4 backdrop-blur-sm border border-sky-100 shadow-sm">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-sky-400 to-cyan-500"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">500+ Diving Expeditions</p>
                  <p className="text-xs text-slate-400">Red Sea&apos;s premier liveaboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
