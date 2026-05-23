"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import type { FeatureAction, ActionType } from "@/config/features";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  action?: FeatureAction;
  href?: string;
  target?: string;
  onClick?: () => void;
  className?: string;
  magnetic?: boolean;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:from-sky-400 hover:to-cyan-400 shadow-lg shadow-sky-500/25",
  secondary:
    "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-sm",
  outline:
    "border border-slate-300 text-slate-600 hover:border-sky-400 hover:text-sky-600",
  ghost: "text-slate-400 hover:text-slate-700",
};

const sizeStyles: Record<string, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const actionConfig: Record<
  ActionType,
  { defaultHref: string; defaultTarget: string }
> = {
  whatsapp: {
    defaultHref: "https://wa.me/201282256562",
    defaultTarget: "_blank",
  },
  external: { defaultHref: "#", defaultTarget: "_blank" },
  internal: { defaultHref: "#", defaultTarget: "_self" },
  cta: { defaultHref: "#cta", defaultTarget: "_self" },
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  action,
  href,
  target,
  onClick,
  className,
  magnetic = true,
}: ButtonProps) {
  const btnRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const resolvedHref =
    href ?? action?.href ?? actionConfig[action?.type ?? "cta"].defaultHref;
  const resolvedTarget =
    target ?? action?.target ?? actionConfig[action?.type ?? "cta"].defaultTarget;
  const isExternal = resolvedTarget === "_blank";

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn || !magnetic || !("ontouchstart" in window)) return;

    const onMove = (e: Event) => {
      const me = e as MouseEvent;
      const rect = btn.getBoundingClientRect();
      const x = me.clientX - rect.left - rect.width / 2;
      const y = me.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
        overwrite: "auto",
      });
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, [magnetic]);

  const handleClick = (e: React.MouseEvent) => {
    if (action?.type === "internal" && resolvedHref.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(resolvedHref);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    onClick?.();
  };

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 cursor-pointer select-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (isExternal) {
    return (
      <a
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        href={resolvedHref}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      ref={btnRef as React.Ref<HTMLAnchorElement>}
      href={resolvedHref}
      className={classes}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
