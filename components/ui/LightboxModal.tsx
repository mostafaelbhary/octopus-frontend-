"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mediaPath } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface LightboxImage {
  gradient?: string;
  src?: string;
  label: string;
  group?: string;
  description?: string;
}

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImage[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  originRect?: DOMRect | null;
}

export default function LightboxModal({ isOpen, onClose, images, currentIndex, onPrev, onNext, originRect }: LightboxModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<DOMRect | null>(null);

  originRef.current = originRect ?? null;

  const animateOut = useCallback(() => {
    if (!overlayRef.current || !modalRef.current) return;

    const rect = originRef.current;
    let vars: gsap.TweenVars = { scale: 0.9, opacity: 0, duration: 0.3, ease: "power3.in" };

    if (rect) {
      const modal = modalRef.current;
      const modalW = modal.offsetWidth;
      const modalH = modal.offsetHeight;
      const scaleX = rect.width / modalW;
      const scaleY = rect.height / modalH;
      const s = Math.max(0.08, Math.min(scaleX, scaleY));
      const tx = rect.left + rect.width / 2 - window.innerWidth / 2;
      const ty = rect.top + rect.height / 2 - window.innerHeight / 2;
      vars = { x: tx, y: ty, scale: s, opacity: 0, duration: 0.35, ease: "power3.in" };
    }

    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, vars)
      .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.15");
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const overlay = overlayRef.current;
    const modal = modalRef.current;
    if (!overlay || !modal) return;

    document.body.style.overflow = "hidden";

    const rect = originRef.current;
    const tl = gsap.timeline();

    tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });

    if (rect) {
      const modalW = modal.offsetWidth;
      const modalH = modal.offsetHeight;
      const scaleX = rect.width / modalW;
      const scaleY = rect.height / modalH;
      const s = Math.max(0.08, Math.min(scaleX, scaleY));
      const tx = rect.left + rect.width / 2 - window.innerWidth / 2;
      const ty = rect.top + rect.height / 2 - window.innerHeight / 2;

      tl.fromTo(
        modal,
        { x: tx, y: ty, scale: s, opacity: 0 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.3)" },
        "-=0.15"
      );
    } else {
      tl.fromTo(
        modal,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power4.out" },
        "-=0.15"
      );
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") animateOut();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      gsap.killTweensOf(modal);
      gsap.killTweensOf(overlay);
    };
  }, [isOpen, animateOut, onPrev, onNext]);

  useEffect(() => {
    if (!isOpen || !imageRef.current || !captionRef.current) return;
    gsap.fromTo(imageRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" });
    gsap.fromTo(captionRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
  }, [currentIndex, isOpen]);

  if (!isOpen) return null;

  const image = images[currentIndex];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={(e) => { if (e.target === overlayRef.current) animateOut(); }}
    >
      <div ref={modalRef} className="relative w-full max-w-5xl">
        <div className="absolute -top-12 right-0 left-0 flex items-center justify-between px-2">
          <span className="text-sm text-white/60">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={animateOut}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 2l14 14M16 2L2 16" />
            </svg>
          </button>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        <div ref={imageRef} className="overflow-hidden rounded-2xl">
          {image.src ? (
            <img
              src={mediaPath(image.src)}
              alt={image.label}
              className="aspect-[16/10] w-full object-cover"
              onLoad={() => ScrollTrigger.refresh()}
            />
          ) : (
            <div className={`aspect-[16/10] w-full bg-gradient-to-br ${image.gradient} flex items-center justify-center`}>
              <span className="text-2xl font-bold text-white/40 md:text-3xl">{image.label}</span>
            </div>
          )}
        </div>

        <div ref={captionRef} className="mt-4 text-center">
          <p className="text-lg font-medium text-white">{image.label}</p>
          {image.description && (
            <p className="mt-1 text-sm text-white/60">{image.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
