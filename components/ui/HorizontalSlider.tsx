"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalSliderProps {
  children: ReactNode;
  sectionRef: React.RefObject<HTMLElement | null>;
}

export default function HorizontalSlider({ children, sectionRef }: HorizontalSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const state = useRef({ isDown: false, startX: 0, scrollLeft: 0, velocity: 0, isHovering: false, resumeTimer: 0 as unknown as ReturnType<typeof setTimeout> });
  const driftTween = useRef<gsap.core.Tween | null>(null);

  const startDrift = () => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const s = state.current;
    if (s.isDown || s.isHovering) return;

    const max = Math.max(0, track.scrollWidth - container.clientWidth);
    if (max <= 0) return;

    driftTween.current?.kill();
    driftTween.current = gsap.to(track, {
      x: -max,
      duration: Math.max(8, max * 0.04),
      ease: "none",
      repeat: -1,
      yoyo: true,
      overwrite: "auto",
      onUpdate: () => {
        s.scrollLeft = -gsap.getProperty(track, "x") as number;
      },
    });
  };

  const stopDrift = () => {
    driftTween.current?.pause();
  };

  const resumeDrift = () => {
    const s = state.current;
    clearTimeout(s.resumeTimer);
    s.resumeTimer = setTimeout(() => {
      if (!s.isDown && !s.isHovering) {
        driftTween.current?.resume();
      }
    }, 1500);
  };

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const getMax = () => Math.max(0, track.scrollWidth - container.clientWidth);
    let wheelTimeout: ReturnType<typeof setTimeout>;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      stopDrift();
      const s = state.current;
      s.scrollLeft = gsap.utils.clamp(0, getMax(), s.scrollLeft + e.deltaY);
      gsap.to(track, {
        x: -s.scrollLeft,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto",
      });
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        resumeDrift();
      }, 1500);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
      clearTimeout(wheelTimeout);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const getMax = () => Math.max(0, track.scrollWidth - container.clientWidth);

    const onPointerDown = (e: PointerEvent) => {
      const s = state.current;
      s.isDown = true;
      s.startX = e.clientX - s.scrollLeft;
      s.velocity = 0;
      container.setPointerCapture(e.pointerId);
      gsap.killTweensOf(track);
      stopDrift();
    };

    const onPointerMove = (e: PointerEvent) => {
      const s = state.current;
      if (!s.isDown) return;
      const x = e.clientX - s.startX;
      s.velocity = x - s.scrollLeft;
      s.scrollLeft = gsap.utils.clamp(0, getMax(), x);
      gsap.set(track, { x: -s.scrollLeft });
    };

    const onPointerUp = () => {
      const s = state.current;
      s.isDown = false;
      if (Math.abs(s.velocity) > 2) {
        const target = gsap.utils.clamp(0, getMax(), s.scrollLeft + s.velocity * 4);
        gsap.to(track, {
          x: -target,
          duration: 0.9,
          ease: "power3.out",
          overwrite: "auto",
          onUpdate: () => { s.scrollLeft = -gsap.getProperty(track, "x") as number; },
          onComplete: () => resumeDrift(),
        });
      } else {
        resumeDrift();
      }
    };

    const onPointerEnter = () => {
      state.current.isHovering = true;
      stopDrift();
    };

    const onPointerLeave = () => {
      state.current.isHovering = false;
      resumeDrift();
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerleave", onPointerUp);
    container.addEventListener("pointerenter", onPointerEnter);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerleave", onPointerUp);
      container.removeEventListener("pointerenter", onPointerEnter);
      clearTimeout(state.current.resumeTimer);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!track || !container) return;

    const checkScroll = () => {
      if (track.scrollWidth > container.clientWidth) {
        startDrift();
      }
    };

    checkScroll();
    ScrollTrigger.refresh();

    const handleResize = () => {
      const s = state.current;
      const max = Math.max(0, track.scrollWidth - container.clientWidth);
      s.scrollLeft = Math.min(s.scrollLeft, max);
      gsap.set(track, { x: -s.scrollLeft });
      driftTween.current?.kill();
      ScrollTrigger.refresh();
      checkScroll();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      driftTween.current?.kill();
      clearTimeout(state.current.resumeTimer);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const cards = Array.from(track.children) as HTMLElement[];
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 0.85, stagger: 0.06, ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, track);

    return () => ctx.revert();
  }, [sectionRef]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        const el = card.querySelector("[data-parallax]") as HTMLElement;
        if (!el) return;
        gsap.to(el, {
          y: "18%",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div className="relative">
        <div
          ref={containerRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
          style={{ touchAction: "pan-y" }}
        >
          <div ref={trackRef} className="flex gap-6">
            {children}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />

        <div className="mt-6 flex justify-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sky-400">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span className="text-xs uppercase tracking-widest text-sky-400">Scroll or drag to explore</span>
        </div>
      </div>
    </div>
  );
}
