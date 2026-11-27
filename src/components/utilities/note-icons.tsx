import type { ReactNode } from "react";

type IconProps = { className?: string };

function Svg({ className = "h-5 w-5", children }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {children}
    </svg>
  );
}

const CakeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20h16M5 20v-6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6" />
    <path d="M5 16.5c2 1.4 3.5 1.4 5 0s3-1.4 4.5 0 3.5 1.4 4.5 0" />
    <path d="M12 12V9" />
    <path d="M12 4.5c.9.9 1 1.6 0 2.5-1-.9-.9-1.6 0-2.5z" />
  </Svg>
);

const HeartIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
  </Svg>
);

const GiftIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="9" width="17" height="4" rx="1" />
    <path d="M5 13v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6M12 9v11" />
    <path d="M12 9S10.5 5 8.5 5a2 2 0 0 0 0 4H12zM12 9s1.5-4 3.5-4a2 2 0 0 1 0 4H12z" />
  </Svg>
);

const FlowerIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="2" />
    <path d="M12 10C10.5 8 10.5 5 12 3.5 13.5 5 13.5 8 12 10zM14 12c2-1.5 5-1.5 6.5 0-1.5 1.5-4.5 1.5-6.5 0zM12 14c1.5 2 1.5 5 0 6.5-1.5-1.5-1.5-4.5 0-6.5zM10 12c-2 1.5-5 1.5-6.5 0 1.5-1.5 4.5-1.5 6.5 0z" />
  </Svg>
);

const BriefcaseIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="7" width="17" height="12" rx="2.5" />
    <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17" />
  </Svg>
);

const BellIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z" />
    <path d="M10 20.5a2 2 0 0 0 4 0" />
  </Svg>
);

const StarIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L12 16.9l-5.25 2.75 1-5.85L3.5 9.65l5.9-.85z" />
  </Svg>
);

const PlaneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M21 4 3 11l7 2.5L12.5 21z" />
    <path d="m10 13.5 11-9.5" />
  </Svg>
);

const BookIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 19.5v-14A2.5 2.5 0 0 1 6.5 3H20v14H6.5A2.5 2.5 0 0 0 4 19.5zm0 0A2.5 2.5 0 0 0 6.5 22H20v-5" />
  </Svg>
);

const WalletIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="7" width="17" height="12" rx="2.5" />
    <path d="M3.5 10.5V6.5A1.5 1.5 0 0 1 5 5h11" />
    <path d="M16.5 13h.01" strokeWidth={2.5} />
  </Svg>
);

const HealthIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
    <path d="M12 8v8M8 12h8" />
  </Svg>
);

const HomeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m3.5 11 8.5-7 8.5 7" />
    <path d="M5.5 9.5V20h13V9.5M10 20v-5h4v5" />
  </Svg>
);

export const NOTE_ICONS: { id: string; label: string; Icon: (p: IconProps) => ReactNode }[] = [
  { id: "cake", label: "Sinh nhật", Icon: CakeIcon },
  { id: "heart", label: "Kỷ niệm", Icon: HeartIcon },
  { id: "gift", label: "Quà tặng", Icon: GiftIcon },
  { id: "flower", label: "Ngày giỗ", Icon: FlowerIcon },
  { id: "briefcase", label: "Công việc", Icon: BriefcaseIcon },
  { id: "bell", label: "Nhắc nhở", Icon: BellIcon },
  { id: "star", label: "Quan trọng", Icon: StarIcon },
  { id: "plane", label: "Du lịch", Icon: PlaneIcon },
  { id: "book", label: "Học tập", Icon: BookIcon },
  { id: "wallet", label: "Thanh toán", Icon: WalletIcon },
  { id: "health", label: "Sức khỏe", Icon: HealthIcon },
  { id: "home", label: "Nhà cửa", Icon: HomeIcon },
];

/** Hiển thị icon của ghi chú; ghi chú cũ chưa chọn icon sẽ dùng ngôi sao. */
export function NoteIcon({ id, className }: { id?: string | null; className?: string }) {
  const found = NOTE_ICONS.find((icon) => icon.id === id) ?? NOTE_ICONS[6]!;
  return <found.Icon className={className} />;
}

export function noteIconLabel(id: string | null | undefined): string {
  return NOTE_ICONS.find((icon) => icon.id === id)?.label ?? "";
}

const GUESSES: [string, RegExp][] = [
  ["cake", /\b(sinh nhat|birthday|sn)\b/],
  ["flower", /\b(ngay gio|dam gio|gio bo|gio me|gio ong|gio ba|gio cu|gio to|tuong nho|ma chay|dam tang|tang le)\b|^gio$/],
  ["heart", /\b(quen nhau|ky niem|dam cuoi|cuoi|hen ho|valentine|tinh yeu|yeu)\b/],
  ["gift", /\b(qua|tang qua|gift|noel|giang sinh)\b/],
  ["plane", /\b(du lich|chuyen bay|flight|di choi|nghi mat|bay)\b/],
  ["health", /\b(kham|benh|thuoc|tiem|bac si|suc khoe)\b/],
  ["book", /\b(hoc|thi|kiem tra|lop|bai tap|bao ve)\b/],
  ["wallet", /\b(thanh toan|tra tien|luong|thue|hoa don|dong tien|tra no)\b/],
  ["home", /\b(nha|chuyen nha|tan gia)\b/],
  ["briefcase", /\b(hop|cong viec|meeting|phong van|lam viec|du an|deadline|han nop)\b/],
  ["bell", /\b(nhac|nho|reminder)\b/],
  ["star", /\b(quan trong|tet|le)\b/],
];

/** Gợi ý icon từ tên ghi chú (bỏ dấu tiếng Việt rồi so từ khóa). Không khớp thì trả về null. */
export function guessNoteIcon(title: string): string | null {
  const text = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .toLowerCase()
    .trim();
  if (!text) return null;
  for (const [id, pattern] of GUESSES) if (pattern.test(text)) return id;
  return null;
}
