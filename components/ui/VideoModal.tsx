"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
  videoSrc?: string;
}

export default function VideoModal({ isOpen, onClose, videoTitle, videoSrc }: VideoModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const animateOut = useCallback(() => {
    if (!overlayRef.current || !modalRef.current) return;
    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
      },
    });
    tl.to(modalRef.current, {
      scale: 0.85,
      opacity: 0,
      duration: 0.3,
      ease: "power3.in",
    }).to(
      overlayRef.current,
      { opacity: 0, duration: 0.2 },
      "-=0.2"
    );
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const overlay = overlayRef.current;
    const modal = modalRef.current;
    if (!overlay || !modal) return;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();
    tl.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    ).fromTo(
      modal,
      { scale: 0.8, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power4.out" },
      "-=0.15"
    );

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") animateOut();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, animateOut]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === overlayRef.current) animateOut();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <button
          onClick={animateOut}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 2l14 14M16 2L2 16" />
          </svg>
        </button>

        <div className="aspect-video w-full bg-black">
          {videoSrc ? (
            <video
              src={videoSrc || ""}
              controls
              autoPlay
              className="h-full w-full"
              playsInline
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-200 to-cyan-200">
              <div className="text-center">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mx-auto mb-3 text-sky-600/60"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <p className="text-sm font-medium text-sky-700/60">{videoTitle}</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-slate-800">{videoTitle}</h3>
        </div>
      </div>
    </div>
  );
}
