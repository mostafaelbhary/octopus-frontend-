"use client";

import { useRef, useState, useEffect, useCallback, type ComponentProps } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { videosList } from "@/config/images";
import VideoModal from "@/components/ui/VideoModal";
import CinematicCarousel from "@/components/ui/CinematicCarousel";

gsap.registerPlugin(ScrollTrigger);

const videoMeta = [
  { title: "Life On Board M/Y OCTOPUS", description: "Experience daily life aboard M/Y OCTOPUS, where comfort, relaxation, and world-class hospitality come together in the heart of the Red Sea." },
  { title: "Red Sea Diving Adventures", description: "Explore breathtaking dive sites, crystal-clear waters, vibrant coral reefs, and unforgettable underwater encounters throughout the journey." },
  { title: "Luxury Liveaboard Experience", description: "Discover the perfect combination of adventure and comfort with spacious decks, premium amenities, and exceptional service on every voyage." },
  { title: "Cinematic Red Sea Moments", description: "Witness the beauty of the Red Sea through stunning visuals capturing the essence of life aboard a world-class liveaboard." },
  { title: "The Octopus Difference", description: "See what sets M/Y OCTOPUS apart — from meticulous service to unparalleled access to the Red Sea's most pristine dive sites." },
];

const videos = videosList.map((v, i) => ({
  title: videoMeta[i]?.title || v.title || `Video ${i + 1}`,
  description: videoMeta[i]?.description || "",
  src: v.src,
}));

export default function Videos() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const descRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [activeVideo, setActiveVideo] = useState<{ title: string; src: string } | null>(null);

  const openVideo = useCallback((title: string, src: string) => {
    setActiveVideo({ title, src });
  }, []);

  const closeVideo = useCallback(() => {
    setActiveVideo(null);
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

      const validTitles = titleRefs.current.filter(Boolean) as HTMLElement[];
      const validDescs = descRefs.current.filter(Boolean) as HTMLElement[];
      if (validTitles.length) {
        gsap.fromTo(validTitles, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" } });
      }
      if (validDescs.length) {
        gsap.fromTo(validDescs, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const carouselSectionRef = sectionRef as ComponentProps<typeof CinematicCarousel>["sectionRef"];

  return (
    <>
      <section id="videos" ref={sectionRef} className="relative overflow-hidden px-6 py-24 md:py-32 lg:py-40">
        <div ref={bgRef} className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-sky-50 to-white" />

        <div className="mx-auto max-w-7xl">
          <div data-section-heading className="mb-12 text-center">
            <span data-heading-anim className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-sky-500 mb-4">Media</span>
            <h2 data-heading-anim className="text-4xl font-bold text-slate-900 md:text-5xl lg:text-6xl">Videos</h2>
            <p data-heading-anim className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
              Immerse yourself in the Octups experience through our curated collection of cinematic videos.
            </p>
          </div>

          <CinematicCarousel sectionRef={carouselSectionRef}>
            {videos.map((video, i) => (
              <button
                key={i}
                data-video-card
                onClick={() => openVideo(video.title, video.src)}
                className="group relative w-full overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm text-left transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <div className="aspect-video w-full bg-black/5 relative flex items-center justify-center overflow-hidden">
                  {video.src && (
                    <video
                      src={video.src}
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="auto"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 text-sky-600">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="px-5 py-4">
                  <h3 ref={(el) => { titleRefs.current[i] = el; }} className="text-base font-semibold text-slate-800">{video.title}</h3>
                  {video.description && (
                    <div ref={(el) => { descRefs.current[i] = el; }} className="mt-1.5 text-sm leading-relaxed text-slate-400 line-clamp-2">{video.description}</div>
                  )}
                </div>
              </button>
            ))}
          </CinematicCarousel>
        </div>
      </section>

      <VideoModal
        isOpen={activeVideo !== null}
        onClose={closeVideo}
        videoTitle={activeVideo?.title || ""}
        videoSrc={activeVideo?.src}
      />
    </>
  );
}
