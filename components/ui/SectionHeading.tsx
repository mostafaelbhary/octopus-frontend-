"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const labelEl = el.querySelector("[data-anim='label']");
    const titleEl = el.querySelector("[data-anim='title']");
    const subtitleEl = el.querySelector("[data-anim='subtitle']");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      if (labelEl) {
        tl.fromTo(
          labelEl,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
      }

      if (titleEl) {
        tl.fromTo(
          titleEl,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
          "-=0.3"
        );
      }

      if (subtitleEl) {
        tl.fromTo(
          subtitleEl,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`max-w-4xl mb-16 md:mb-24 ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      <span
        data-anim="label"
        className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-sky-500 mb-5"
      >
        {label}
      </span>
      <h2
        data-anim="title"
        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-wide text-slate-900"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          data-anim="subtitle"
          className="mt-5 text-lg md:text-xl text-slate-500 leading-relaxed md:leading-8"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
