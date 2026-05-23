"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Feature } from "@/config/features";
import { icons, type IconName } from "@/components/icons";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, card);

    return () => ctx.revert();
  }, [index]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const glowEl = card.querySelector("[data-glow]") as HTMLElement;

    const onMove = (e: Event) => {
      const me = e as MouseEvent;
      const rect = card.getBoundingClientRect();
      const x = me.clientX - rect.left;
      const y = me.clientY - rect.top;
      if (glowEl) {
        gsap.to(glowEl, {
          opacity: 1,
          left: x,
          top: y,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const onLeave = () => {
      if (glowEl) {
        gsap.to(glowEl, { opacity: 0, duration: 0.3 });
      }
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const Icon = icons[feature.icon as IconName];

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl border border-sky-100 bg-white p-6 shadow-sm shadow-sky-900/5 transition-all hover:shadow-md hover:shadow-sky-900/10 md:p-8"
    >
      <div
        data-glow
        className="pointer-events-none absolute -z-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/10 blur-3xl opacity-0"
      />
      <div className="relative z-10">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-cyan-100 text-sky-600">
          {Icon ? <Icon size={22} /> : null}
        </div>
        <h3 className="mb-3 text-xl font-semibold text-slate-800">
          {feature.title}
        </h3>
        <p className="mb-6 leading-relaxed text-slate-500">
          {feature.description}
        </p>
        <div className="flex flex-wrap gap-3">
          {feature.actions.map((action, i) => (
            <Button
              key={i}
              action={action}
              variant={i === 0 ? "primary" : "outline"}
              size="sm"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
