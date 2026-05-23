import type { FC, ReactNode } from "react";

interface IconProps {
  size?: number;
  className?: string;
}

const createIcon = (children: ReactNode): FC<IconProps> =>
  function Icon({ size = 24, className }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        {children}
      </svg>
    );
  };

export const icons = {
  anchor: createIcon(
    <>
      <path d="M12 2v20" />
      <path d="M8 12a4 4 0 0 0 8 0" />
      <path d="M2 12h20" />
      <path d="M6 8l-4 4 4 4" />
      <path d="M18 8l4 4-4 4" />
    </>
  ),
  compass: createIcon(
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  ship: createIcon(
    <>
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4a11.6 11.6 0 0 0 1.62 6" />
      <path d="M12 3v7" />
      <path d="M9 6l3-3 3 3" />
    </>
  ),
  lifebuoy: createIcon(
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <path d="M4.93 4.93l4.24 4.24" />
      <path d="M14.83 14.83l4.24 4.24" />
      <path d="M4.93 19.07l4.24-4.24" />
      <path d="M14.83 9.17l4.24-4.24" />
    </>
  ),
  wine: createIcon(
    <>
      <path d="M8 2h8" />
      <path d="M9 2v4.5a3 3 0 0 0 6 0V2" />
      <path d="M12 8v10" />
      <path d="M7 18h10a2 2 0 0 1 2 2v2H5v-2a2 2 0 0 1 2-2z" />
    </>
  ),
  sun: createIcon(
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M6.34 17.66l-1.41 1.41" />
      <path d="M19.07 4.93l-1.41 1.41" />
    </>
  ),
  wave: createIcon(
    <>
      <path d="M2 12c2-2 4-4 6-2s4 4 6 2 4-4 6-2" />
      <path d="M2 17c2-2 4-4 6-2s4 4 6 2 4-4 6-2" />
    </>
  ),
} as const;

export type IconName = keyof typeof icons;
