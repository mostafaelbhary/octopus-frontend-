"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { siteConfig } from "@/config/site";

const sectionIds = ["exterior", "cabins", "food-more", "videos"];

const sectionLabels: Record<string, string> = {
  exterior: "Exterior",
  cabins: "Cabins",
  "food-more": "Food & More",
  videos: "Videos",
};

export default function ExperienceNav() {
  const [active, setActive] = useState("");
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isClickScrolling = useRef(false);

  const scrollTo = useCallback((target: string) => {
    const el = document.querySelector(target);
    if (!el) return;

    isClickScrolling.current = true;
    const lenis = (window as { __lenis?: { scrollTo: (target: Element | string, options?: { offset?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }

    const id = target.replace("#", "");
    setActive(id);

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 1200);
  }, []);

  useEffect(() => {
    const items = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const topMost = visible[0].target.id;
          setActive(topMost);
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const indicator = indicatorRef.current;
    const nav = navRef.current;
    if (!indicator || !nav) return;

    const activeIdx = sectionIds.indexOf(active);
    const activeItem = itemRefs.current[activeIdx];
    if (!activeItem) {
      gsap.to(indicator, { opacity: 0, duration: 0.3 });
      return;
    }

    gsap.to(indicator, { opacity: 1, duration: 0.2 });

    const navRect = nav.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();

    gsap.to(indicator, {
      x: itemRect.left - navRect.left,
      width: itemRect.width,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [active]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const items = nav.querySelectorAll("[data-nav-item]");

    const onEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    };

    const onLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    items.forEach((item) => {
      item.addEventListener("mouseenter", onEnter);
      item.addEventListener("mouseleave", onLeave);
    });

    return () => {
      items.forEach((item) => {
        item.removeEventListener("mouseenter", onEnter);
        item.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-40 border-b border-sky-100 bg-white/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-nowrap">
          {sectionIds.map((id, i) => (
            <button
              key={id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-nav-item
              onClick={() => scrollTo(`#${id}`)}
              className={`relative whitespace-nowrap px-3 md:px-5 py-2 text-xs md:text-sm font-medium transition-colors duration-300 rounded-full ${
                active === id
                  ? "text-sky-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {sectionLabels[id]}
            </button>
          ))}
        </div>
        <a
          href={siteConfig.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:from-sky-400 hover:to-cyan-400 hover:shadow-md"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Book Now
        </a>
      </div>
      <div
        ref={indicatorRef}
        className="absolute bottom-0 h-0.5 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full"
        style={{ left: 0, width: 0 }}
      />
    </nav>
  );
}
