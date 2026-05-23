import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type AnimationDirection = "up" | "down" | "left" | "right";

interface StaggerOptions {
  direction?: AnimationDirection;
  distance?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  start?: string;
  markers?: boolean;
}

interface ParallaxOptions {
  speed?: number;
  start?: string;
  end?: string;
}

interface CounterOptions {
  startValue?: number;
  endValue: number;
  duration?: number;
  ease?: string;
  start?: string;
}

interface ClipRevealOptions {
  direction?: "horizontal" | "vertical" | "center";
  duration?: number;
  ease?: string;
  start?: string;
}

export function animateStaggerCards(
  container: HTMLElement,
  cards: HTMLElement[],
  options: StaggerOptions = {}
) {
  const {
    direction = "up",
    distance = 60,
    stagger = 0.1,
    duration = 0.8,
    ease = "power3.out",
    start = "top 80%",
  } = options;

  const fromVars: gsap.TweenVars = {
    opacity: 0,
    ease,
    duration,
    stagger,
    scrollTrigger: {
      trigger: container,
      start,
      toggleActions: "play none none none",
    },
  };

  switch (direction) {
    case "up":
      fromVars.y = distance;
      break;
    case "down":
      fromVars.y = -distance;
      break;
    case "left":
      fromVars.x = distance;
      break;
    case "right":
      fromVars.x = -distance;
      break;
  }

  gsap.fromTo(cards, fromVars, { opacity: 1, x: 0, y: 0 });
}

export function animateParallax(
  element: HTMLElement,
  options: ParallaxOptions = {}
) {
  const { speed = 0.3, start = "top bottom", end = "bottom top" } = options;

  gsap.to(element, {
    y: () => -speed * element.offsetHeight,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: 1.5,
    },
  });
}

export function animateCounter(
  element: HTMLElement,
  options: CounterOptions
) {
  const { startValue = 0, endValue, duration = 2, ease = "power2.out", start = "top 85%" } = options;

  gsap.fromTo(
    element,
    { textContent: startValue },
    {
      textContent: endValue,
      duration,
      ease,
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

export function animateClipReveal(
  element: HTMLElement,
  options: ClipRevealOptions = {}
) {
  const { direction = "center", duration = 1.5, ease = "power4.inOut", start = "top 85%" } = options;

  const clipPaths: Record<string, string> = {
    horizontal: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)",
    vertical: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    center: "polygon(50% 0%, 50% 100%, 50% 100%, 50% 0%)",
  };

  const endClip: Record<string, string> = {
    horizontal: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    vertical: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    center: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  };

  gsap.fromTo(
    element,
    { clipPath: clipPaths[direction] },
    {
      clipPath: endClip[direction],
      duration,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

export function animateSectionEntry(
  element: HTMLElement,
  options: StaggerOptions = {}
) {
  const { direction = "up", distance = 80, duration = 1.2, ease = "power4.out", start = "top 85%" } = options;

  const fromVars: gsap.TweenVars = {
    opacity: 0,
    duration,
    ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none none",
      },
    };

    switch (direction) {
      case "up":
        fromVars.y = distance;
      break;
    case "down":
      fromVars.y = -distance;
      break;
    case "left":
      fromVars.x = distance;
      break;
    case "right":
      fromVars.x = -distance;
      break;
  }

  gsap.fromTo(element, fromVars, { opacity: 1, x: 0, y: 0 });
}

export function createMagneticEffect(element: HTMLElement, strength: number = 0.3) {
  const onMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const onMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  element.addEventListener("mousemove", onMouseMove);
  element.addEventListener("mouseleave", onMouseLeave);
}

export function animateTextLines(
  lines: HTMLElement[],
  options: StaggerOptions = {}
) {
  const { stagger = 0.08, duration = 1, ease = "power3.out", start = "top 85%" } = options;

  gsap.fromTo(
    lines,
    { y: 80, opacity: 0, rotateX: -15 },
    {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: lines[0]?.parentElement,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

export function animateFloat(element: HTMLElement, amplitude: number = 10, duration: number = 3) {
  gsap.to(element, {
    y: amplitude,
    duration,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}
