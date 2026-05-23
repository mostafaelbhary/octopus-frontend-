export type ActionType = "whatsapp" | "external" | "internal" | "cta";

export interface FeatureAction {
  type: ActionType;
  label: string;
  href?: string;
  target?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  actions: FeatureAction[];
}

export const features: Feature[] = [
  {
    id: "luxury-charter",
    title: "Luxury Yacht Charter",
    description:
      "Private yacht charters with full crew, gourmet dining, and bespoke itineraries tailored to your every desire.",
    icon: "anchor",
    actions: [
      {
        type: "whatsapp",
        label: "Book Now",
        href: "https://wa.me/201282256562?text=Hi%20Octups!%20I%27m%20interested%20in%20a%20luxury%20yacht%20charter",
      },
      {
        type: "whatsapp",
        label: "Chat with Concierge",
        href: "https://wa.me/201282256562?text=Hi%20Octups!%20I%27m%20interested%20in%20a%20luxury%20yacht%20charter",
      },
    ],
  },
  {
    id: "concierge",
    title: "24/7 White-Glove Service",
    description:
      "Your personal concierge is available around the clock to arrange excursions, reservations, and any request imaginable.",
    icon: "lifebuoy",
    actions: [
      {
        type: "whatsapp",
        label: "Call Concierge",
        href: "https://wa.me/201282256562",
      },
    ],
  },
  {
    id: "safety",
    title: "Uncompromised Safety",
    description:
      "State-of-the-art navigation, experienced captains, and rigorous safety protocols ensure complete peace of mind at sea.",
    icon: "lifebuoy",
    actions: [
      {
        type: "internal",
        label: "Safety FAQ",
        href: "#faq",
      },
    ],
  },
  {
    id: "events",
    title: "Exclusive Events at Sea",
    description:
      "Host private celebrations, corporate retreats, or milestone events on board with world-class service and stunning ocean views.",
    icon: "ship",
    actions: [
      {
        type: "whatsapp",
        label: "Plan Your Event",
        href: "https://wa.me/201282256562?text=Hi%20Octups!%20I%27m%20interested%20in%20planning%20an%20event",
      },
    ],
  },
];
