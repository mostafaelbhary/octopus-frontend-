"use client";

import { useRef, useState, useEffect, useCallback, type ComponentProps } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { exteriorImages } from "@/config/images";
import { mediaPath } from "@/lib/utils";
import LightboxModal from "@/components/ui/LightboxModal";
import CinematicCarousel from "@/components/ui/CinematicCarousel";

gsap.registerPlugin(ScrollTrigger);

const gradients = [
  "from-sky-300 via-cyan-400 to-blue-500",
  "from-blue-300 via-indigo-400 to-sky-500",
  "from-teal-300 via-emerald-400 to-cyan-500",
  "from-amber-300 via-orange-400 to-rose-500",
  "from-cyan-300 via-sky-400 to-blue-500",
  "from-rose-300 via-pink-400 to-orange-500",
  "from-emerald-300 via-teal-400 to-cyan-500",
  "from-violet-300 via-purple-400 to-pink-500",
];

const images = exteriorImages.map((img, i) => ({
  src: mediaPath(img.src),
  label: img.label || `Exterior ${i + 1}`,
  gradient: gradients[i % gradients.length],
}));

export default function Exterior() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  const openLightbox = useCallback((index: number, e?: React.MouseEvent) => {
    setOriginRect(e ? (e.currentTarget as HTMLElement).getBoundingClientRect() : null);
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector("[data-section-heading]");
      if (heading) {
        gsap.fromTo(
          heading.querySelectorAll("[data-heading-anim]"),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power4.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const carouselSectionRef = sectionRef as ComponentProps<typeof CinematicCarousel>["sectionRef"];

  return (
    <>
      <section id="exterior" ref={sectionRef} className="relative overflow-hidden px-6 py-24 md:py-32 lg:py-40">
        <div ref={bgRef} className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-sky-50 to-white" />

        <div className="mx-auto max-w-7xl">
          <div data-section-heading className="mb-12 text-center">
            <span data-heading-anim className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-sky-500 mb-4">Virtual Tour</span>
            <h2 data-heading-anim className="text-4xl font-bold text-slate-900 md:text-5xl lg:text-6xl">Exterior</h2>
            <p data-heading-anim className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
              Step aboard and explore the stunning exterior spaces designed for luxury, relaxation, and unforgettable moments at sea.
            </p>
          </div>

          <CinematicCarousel sectionRef={carouselSectionRef}>
            {images.map((img, i) => (
              <button
                key={i}
                data-exterior-card
                onClick={(e) => openLightbox(i, e)}
                className="group relative w-full overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm text-left transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <div
                  data-parallax
                  className={`aspect-video w-full bg-gradient-to-br ${img.gradient} relative flex items-center justify-center overflow-hidden`}
                >
                  {img.src && (
                    <img
                      src={img.src}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onLoad={() => ScrollTrigger.refresh()}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sky-600">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </CinematicCarousel>
        </div>
      </section>

      <LightboxModal
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={images}
        currentIndex={lightboxIndex}
        onPrev={prevImage}
        onNext={nextImage}
        originRect={originRect}
      />
    </>
  );
}
