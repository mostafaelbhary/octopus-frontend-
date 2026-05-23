"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    label: "Phone",
    value: "+201282256562",
    href: "tel:+201282256562",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "octupos-ship@gmail.com",
    href: "mailto:octupos-ship@gmail.com",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Red Sea, Egypt",
    href: "https://maps.google.com/?q=Red+Sea+Egypt",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headingItems = headingRef.current?.querySelectorAll("[data-contact-anim]");
      if (headingItems?.length) {
        gsap.fromTo(
          gsap.utils.toArray(headingItems),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power4.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const cardEls = cardsRef.current?.children;
      if (cardEls?.length) {
        gsap.fromTo(
          gsap.utils.toArray(cardEls),
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power4.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const ctaItems = ctaRef.current?.querySelectorAll("[data-cta-anim]");
      if (ctaItems?.length) {
        gsap.fromTo(
          gsap.utils.toArray(ctaItems),
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power4.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
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
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-amber-50/20 to-white" />

      <div className="mx-auto max-w-7xl">
        <div ref={headingRef} className="text-center">
          <span data-contact-anim className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-sky-500 mb-4">Get In Touch</span>
          <h2 data-contact-anim className="text-4xl font-bold text-slate-900 md:text-5xl lg:text-6xl">Contact Us</h2>
          <p data-contact-anim className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            We&apos;re here to help you plan your perfect Red Sea experience.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="mt-12 grid gap-6 sm:grid-cols-3"
        >
          {contactInfo.map((info, i) => (
            <a
              key={i}
              href={info.href}
              target={info.href.startsWith("http") ? "_blank" : undefined}
              rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col items-center rounded-2xl border border-sky-100 bg-white/70 p-8 text-center shadow-sm backdrop-blur-md transition-all duration-500 hover:border-sky-200 hover:bg-white hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-cyan-100 text-sky-600 transition-transform duration-500 group-hover:scale-110 group-hover:from-sky-200 group-hover:to-cyan-200">
                {info.icon}
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-500">{info.label}</span>
              <span className="mt-2 text-sm font-medium text-slate-700">{info.value}</span>
            </a>
          ))}
        </div>

        <div ref={ctaRef} className="mt-16 text-center">
          <p data-cta-anim className="text-xl font-semibold text-slate-800 md:text-2xl">
            Ready to embark on your luxury yacht adventure?
          </p>
          <div data-cta-anim className="mt-8 inline-flex">
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-all duration-300 hover:from-sky-400 hover:to-cyan-400 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contact via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
