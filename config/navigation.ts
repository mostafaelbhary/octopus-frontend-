export interface NavItem {
  label: string;
  target: string;
}

export const navigation: NavItem[] = [
  { label: "Home", target: "hero" },
  { label: "About", target: "about" },
  { label: "Features", target: "features" },
  { label: "Showcase", target: "showcase" },
  { label: "Testimonials", target: "testimonials" },
  { label: "FAQ", target: "faq" },
  { label: "Contact", target: "cta" },
];
