"use client";

import { useRef, useState, useEffect, useCallback, type ComponentProps } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { foodImages, foodVideos } from "@/config/images";
import VideoModal from "@/components/ui/VideoModal";
import LightboxModal from "@/components/ui/LightboxModal";
import CinematicCarousel from "@/components/ui/CinematicCarousel";

gsap.registerPlugin(ScrollTrigger);

const gradients = [
  "from-rose-300 via-pink-400 to-orange-500",
  "from-amber-300 via-yellow-400 to-orange-500",
  "from-teal-300 via-emerald-400 to-cyan-500",
  "from-indigo-300 via-purple-400 to-pink-500",
  "from-sky-300 via-blue-400 to-indigo-500",
];

const images = foodImages.map((img, i) => ({
  src: img.src,
  label: img.label || `Food ${i + 1}`,
  gradient: gradients[i % gradients.length],
}));

const featureVideo = foodVideos.length > 0
  ? { title: foodVideos[0].title || "Culinary Journey Aboard Octups", src: foodVideos[0].src }
  : { title: "Culinary Journey Aboard Octups", src: "" };

export default function FoodMore() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
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

  const openVideo = useCallback(() => {
    setVideoOpen(true);
  }, []);

  const closeVideo = useCallback(() => {
    setVideoOpen(false);
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
      <section id="food-more" ref={sectionRef} className="relative overflow-hidden px-6 py-24 md:py-32 lg:py-40">
        <div ref={bgRef} className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-amber-50/30 to-white" />

        <div className="mx-auto max-w-7xl">
          <div data-section-heading className="mb-12 text-center">
            <span data-heading-anim className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-sky-500 mb-4">Lifestyle</span>
            <h2 data-heading-anim className="text-4xl font-bold text-slate-900 md:text-5xl lg:text-6xl">Food &amp; More</h2>
            <p data-heading-anim className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
              From world-class dining to rejuvenating wellness experiences, every moment aboard is crafted for your pleasure.
            </p>
          </div>

          <CinematicCarousel sectionRef={carouselSectionRef}>
            {images.map((img, i) => (
              <button
                key={`img-${i}`}
                data-food-card
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
                      alt={img.label || "M/Y Octopus gourmet dining experience"}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onLoad={() => ScrollTrigger.refresh()}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sky-600">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            ))}

            <button
              key="video"
              data-food-card
              onClick={openVideo}
              className="group relative w-full overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm text-left transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <div className="aspect-video w-full bg-black/5 relative flex items-center justify-center overflow-hidden">
                {featureVideo.src && (
                  <video
                    src={featureVideo.src}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="auto"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 text-indigo-600">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-slate-800">{featureVideo.title}</h3>
                <p className="mt-0.5 text-sm text-slate-400">Click to watch</p>
              </div>
            </button>
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

      <VideoModal
        isOpen={videoOpen}
        onClose={closeVideo}
        videoTitle={featureVideo.title}
        videoSrc={featureVideo.src || undefined}
      />
    </>
  );
}
