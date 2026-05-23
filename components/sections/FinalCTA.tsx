"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      const ctaItems = sectionRef.current?.querySelectorAll("[data-cta-anim]");
      if (ctaItems?.length) {
        tl.fromTo(
          gsap.utils.toArray(ctaItems),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power4.out" }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-blue-700 to-cyan-800" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400/30 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p
          data-cta-anim
          className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-sky-200"
        >
          Book Your Expedition
        </p>
        <h2
          data-cta-anim
          className="text-4xl font-bold leading-tight tracking-wide text-white md:text-5xl lg:text-6xl"
        >
          Ready to Dive the
          <br />
          Red Sea?
        </h2>
        <p
          data-cta-anim
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sky-100 md:leading-8"
        >
          Join us aboard M/Y Octopus for the ultimate Red Sea diving safari.
          Book your expedition today and experience world-class underwater
          adventures.
        </p>
        <div
          data-cta-anim
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
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
