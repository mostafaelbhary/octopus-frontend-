"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What types of vessels does Octups offer?",
    answer:
      "Octups operates a prestigious fleet including luxury motor yachts, classic sailing yachts, and expedition vessels. Each is meticulously maintained and staffed by experienced crews dedicated to providing an exceptional experience at sea.",
  },
  {
    question: "How do I book a voyage with Octups?",
    answer:
      "Booking is simple. You can reserve your voyage directly through our website, contact us on WhatsApp for personalized assistance, or speak with your dedicated concierge who will handle every detail of your journey from start to finish.",
  },
  {
    question: "What destinations do you serve?",
    answer:
      "We offer voyages across the Mediterranean, Caribbean, Aegean Sea, South Pacific, and Southeast Asia. Our curated itineraries include both popular ports and hidden gems, with new destinations added regularly based on guest feedback.",
  },
  {
    question: "Can I customize my itinerary?",
    answer:
      "Absolutely. Our private charter options allow you to design a completely personalized itinerary. Work with our voyage planners to select your destinations, activities, dining preferences, and onboard experiences tailored exactly to your wishes.",
  },
  {
    question: "What is included in the price?",
    answer:
      "Every Octups voyage includes luxurious accommodation, gourmet dining with premium beverages, a dedicated crew, port fees, and selected excursions. Private charters can be fully customized with additional services upon request.",
  },
  {
    question: "Is Octups suitable for families and groups?",
    answer:
      "Yes. We offer family-friendly voyages with dedicated activities for all ages, as well as private charters perfect for group celebrations, corporate retreats, and milestone events. Our crew will ensure every guest has a memorable experience.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll("[data-faq-item]");

      if (items?.length) {
        gsap.utils.toArray(items).forEach((item, i) => {
          const el = item as HTMLElement;

          gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.08,
              ease: "power4.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-sky-50/50 to-white" />

      <div className="mx-auto max-w-3xl">
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about sailing with Octups and planning your perfect voyage."
        />

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  faq,
}: {
  faq: { question: string; answer: string };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (isOpen) {
      gsap.to(content, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      data-faq-item
      className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-sky-50/50"
      >
        <span className="text-base font-medium text-slate-700 md:text-lg">
          {faq.question}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 text-sky-400 transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <path d="M10 4v12M4 10h12" />
        </svg>
      </button>
      <div
        ref={contentRef}
        className="h-0 opacity-0"
      >
        <div className="px-6 pb-5 pt-0">
          <p className="leading-relaxed text-slate-500">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}
