"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    lenis.on("scroll", () => ScrollTrigger.update());

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      (window as any).__lenis = undefined;
      lenis.destroy();
      gsap.ticker.lagSmoothing(1);
    };
  }, []);

  useEffect(() => {
    const refreshScrollTrigger = () => ScrollTrigger.refresh();

    const imgs = document.querySelectorAll("img");
    let loaded = 0;
    const total = imgs.length;

    if (total === 0) {
      refreshScrollTrigger();
      return;
    }

    const onLoad = () => {
      loaded++;
      if (loaded >= total) {
        refreshScrollTrigger();
        setTimeout(refreshScrollTrigger, 500);
      }
    };

    imgs.forEach((img) => {
      if (img.complete) onLoad();
      else img.addEventListener("load", onLoad, { once: true });
    });

    const onWinLoad = () => {
      refreshScrollTrigger();
      setTimeout(refreshScrollTrigger, 1000);
    };

    if (document.readyState === "complete") onWinLoad();
    else window.addEventListener("load", onWinLoad);

    return () => {
      window.removeEventListener("load", onWinLoad);
      imgs.forEach((img) => img.removeEventListener("load", onLoad));
    };
  }, []);

  return <>{children}</>;
}
