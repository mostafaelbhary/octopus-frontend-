"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { exteriorImages, cabinsImages, foodImages } from "@/config/images";
import { mediaPath } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const mp = (src?: string) => mediaPath(src || "");
const projects = [
  {
    title: "Luxury Exterior Experience",
    category: "Premium Yacht Design",
    description:
      "Step aboard and experience the breathtaking exterior spaces of M/Y Octopus. From the panoramic sundeck to the infinity pool, every detail is crafted for luxury and relaxation on the Red Sea.",
    img: mp(exteriorImages[0]?.src),
  },
  {
    title: "Premium Cabins & Comfort",
    category: "Luxury Accommodations",
    description:
      "Our cabins and suites offer unparalleled comfort with ocean views, premium amenities, and elegant design. Each space is a private sanctuary crafted for the discerning traveler.",
    img: mp(cabinsImages[0]?.src),
  },
  {
    title: "Dining & Onboard Lifestyle",
    category: "Culinary Excellence",
    description:
      "World-class dining meets ocean views. Our onboard chefs craft exquisite multi-course menus using the freshest ingredients, complemented by premium beverages and sunset cocktail service.",
    img: mp(foodImages[0]?.src) || mp(exteriorImages[1]?.src) || "",
  },
];

const gradients = [
  "from-sky-200/40 to-cyan-200/40",
  "from-teal-200/40 to-emerald-200/40",
  "from-amber-200/40 to-orange-200/40",
];

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll("[data-project]");
      if (!cards?.length) return;

      gsap.utils.toArray(cards).forEach((card, i) => {
        const el = card as HTMLElement;
        const direction = i % 2 === 0 ? -60 : 60;

        gsap.fromTo(
          el,
          { opacity: 0, x: direction, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            delay: i * 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        const img = el.querySelector("[data-parallax]") as HTMLElement;
        if (img) {
          gsap.to(img, {
            y: "20%",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Showcase"
          title="Signature Voyages"
          subtitle="Explore the unparalleled luxury and beauty of M/Y Octopus through our curated experiences."
        />

        <div className="space-y-8 md:space-y-12">
          {projects.map((project, i) => (
            <div
              key={i}
              data-project
              className="group relative overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
                  <div
                    data-parallax
                    className={`absolute inset-0 bg-gradient-to-br ${gradients[i]}`}
                  >
                    {project.img && (
                      <img
                        src={project.img}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onLoad={() => ScrollTrigger.refresh()}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>

                <div className="flex flex-col justify-center p-8 md:p-12">
                  <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-sky-500">
                    {project.category}
                  </span>
                  <h3 className="mb-4 text-2xl font-bold text-slate-800 md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-slate-500">
                    {project.description}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      size="sm"
                      action={{ type: "whatsapp", label: "Book Now", href: "https://wa.me/201282256562" }}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
