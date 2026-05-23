"use client";

import { useRef } from "react";
import { features } from "@/config/features";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureCard from "@/components/ui/FeatureCard";

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-sky-50/50 to-white" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Experiences"
          title="The Octups Difference"
          subtitle="From private charters to world-class amenities, every aspect of your journey is designed for perfection."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
