export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

interface LenisInstance {
  scrollTo: (target: Element | string, options?: { offset?: number }) => void;
}

export function scrollToElement(target: string) {
  const el = document.querySelector(target);
  if (!el) return;
  const lenis = (window as { __lenis?: LenisInstance }).__lenis;
  if (lenis) {
    lenis.scrollTo(el);
    return;
  }
  el.scrollIntoView({ behavior: "smooth" });
}
