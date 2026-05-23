"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import { exteriorImages } from "@/config/images";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      const words = textRef.current?.querySelectorAll("[data-anim='word']");
      const fadeItems = textRef.current?.querySelectorAll("[data-anim='fade-item']");

      if (words?.length) {
        tl.fromTo(
          gsap.utils.toArray(words),
          { y: "100%", opacity: 0, rotateX: -20 },
          { y: "0%", opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.12 },
          "-=1.2"
        );
      }

      if (fadeItems?.length) {
        tl.fromTo(
          gsap.utils.toArray(fadeItems),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
          "-=0.5"
        );
      }

      if (indicatorRef.current) {
        gsap.to(indicatorRef.current, {
          y: 8,
          duration: 1.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const bg = bgRef.current;
    const section = sectionRef.current;
    if (!bg || !section) return;

    const ctx = gsap.context(() => {
      gsap.to(bg, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const title = "M/Y Octopus";
  const words = title.split(" ");

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-cyan-50 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_var(--tw-gradient-stops))] from-sky-300/30 via-cyan-200/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_var(--tw-gradient-stops))] from-cyan-300/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />

        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(14,165,233,0.4) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />

        {exteriorImages.length > 0 && (
          <img
            src={exteriorImages[0].src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            onLoad={() => ScrollTrigger.refresh()}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100/70 via-cyan-50/60 to-white/80 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_var(--tw-gradient-stops))] from-sky-300/20 via-cyan-200/15 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_var(--tw-gradient-stops))] from-cyan-300/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />

        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-sky-200/20 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 h-80 w-80 rounded-full bg-cyan-200/20 blur-[100px]" />
      </div>

      <div ref={textRef} className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="mb-4 inline-block rounded-full border border-sky-200/60 bg-white/80 px-4 py-1.5 text-xs font-medium tracking-[0.15em] text-sky-600 shadow-sm backdrop-blur-sm uppercase" data-anim="fade-item">
          {siteConfig.tagline}
        </div>

        <h1 className="text-6xl font-bold leading-[0.9] tracking-wide text-slate-900 sm:text-7xl md:text-8xl lg:text-9xl">
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden"
              style={{ perspective: "800px" }}
            >
              <span data-anim="word" className="inline-block">
                {word}{i < words.length - 1 ? "\u00A0" : ""}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-anim="fade-item"
          className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-500 md:text-xl md:leading-8"
        >
          {siteConfig.description}
        </p>

        <div
          data-anim="fade-item"
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg" action={{ type: "whatsapp", label: "Book Now", href: siteConfig.social.whatsapp }}>
            Book Now
          </Button>
          <Button variant="outline" size="lg" action={{ type: "internal", label: "Explore the Yacht", href: "#yacht-overview" }}>
            Explore the Yacht
          </Button>
        </div>
      </div>

      <div
        ref={indicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sky-400"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="1" width="14" height="22" rx="7" />
          <circle cx="8" cy="8" r="2" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
