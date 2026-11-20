import type { ReactNode } from "react";

type IconProps = { className?: string };

/** Icon nét mảnh (line) cùng kiểu với bộ icon của app: lưới 24, nét 1.7, đầu nét tròn. */
function Svg({ className = "h-5 w-5", children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

// ---- Icon giao diện ----
export const ChatIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 8h8M8 12h5" />
  </Svg>
);

export const SendIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M21 3 10 14" />
    <path d="M21 3l-7 18-4-7-7-4z" />
  </Svg>
);

export const BanIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M5.6 5.6l12.8 12.8" />
  </Svg>
);

export const EyeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.5 12C3.5 10.5 7 6 12 6s8.5 4.5 9.5 6c-1 1.5-4.5 6-9.5 6s-8.5-4.5-9.5-6z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);

export const EyeOffIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 3l18 18" />
    <path d="M10.6 6.1A9.6 9.6 0 0 1 12 6c5 0 8.5 4.5 9.5 6a14 14 0 0 1-2.9 3.3M6.4 7.6A14 14 0 0 0 2.5 12C3.5 13.5 7 18 12 18c1.4 0 2.7-.3 3.8-.9" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
  </Svg>
);

export const UserIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </Svg>
);

export const TypeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 7V5h14v2M12 5v14M9 19h6" />
  </Svg>
);

// ---- Hình avatar (nét line, khớp với bộ icon) ----
export const AVATAR_GLYPHS: Record<string, (p: IconProps) => ReactNode> = {
  star: (p) => (
    <Svg {...p}>
      <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
    </Svg>
  ),
  moon: (p) => (
    <Svg {...p}>
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </Svg>
  ),
  sun: (p) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </Svg>
  ),
  heart: (p) => (
    <Svg {...p}>
      <path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7.2 4.5 4.5 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />
    </Svg>
  ),
  bolt: (p) => (
    <Svg {...p}>
      <path d="M13 3 5 13.5h6L10 21l8-10.5h-6z" />
    </Svg>
  ),
  leaf: (p) => (
    <Svg {...p}>
      <path d="M5 19C5 10 10 5 19 5c0 9-5 14-13 14z" />
      <path d="M5 19l7-7" />
    </Svg>
  ),
  flame: (p) => (
    <Svg {...p}>
      <path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.2 2-4.2.2 1.2.8 2 1.6 2.4C10.3 8 10.6 5 12 3z" />
    </Svg>
  ),
  crown: (p) => (
    <Svg {...p}>
      <path d="M4 18h16M4 18 3 7l5 4 4-6 4 6 5-4-1 11" />
    </Svg>
  ),
  skull: (p) => (
    <Svg {...p}>
      <path d="M7 15.5V17a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1.5a7 7 0 1 0-10 0z" />
      <path d="M9.5 11.5v.01M14.5 11.5v.01M10.5 18v2M13.5 18v2" />
    </Svg>
  ),
  ghost: (p) => (
    <Svg {...p}>
      <path d="M5 20V11a7 7 0 0 1 14 0v9l-3-2-2 2-2-2-2 2-2-2z" />
      <path d="M9.5 11v.01M14.5 11v.01" />
    </Svg>
  ),
  cat: (p) => (
    <Svg {...p}>
      <path d="M5 9 4 4l4.5 2.2a7 7 0 0 1 7 0L20 4l-1 5a7 7 0 0 1 1 3.5c0 3.6-3.6 6.5-8 6.5s-8-2.9-8-6.5A7 7 0 0 1 5 9z" />
      <path d="M9.5 12.5v.01M14.5 12.5v.01M11 15.5h2" />
    </Svg>
  ),
  coffee: (p) => (
    <Svg {...p}>
      <path d="M5 9h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" />
      <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3v2M12 3v2" />
    </Svg>
  ),
  music: (p) => (
    <Svg {...p}>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </Svg>
  ),
  anchor: (p) => (
    <Svg {...p}>
      <circle cx="12" cy="5.5" r="2.5" />
      <path d="M12 8v13M8 12h8M5 12H3a9 9 0 0 0 18 0h-2" />
    </Svg>
  ),
  smile: (p) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14a4.5 4.5 0 0 0 7 0M9 9.5v.01M15 9.5v.01" />
    </Svg>
  ),
  diamond: (p) => (
    <Svg {...p}>
      <path d="M6 4h12l3 5-9 11L3 9zM3 9h18" />
    </Svg>
  ),
};
