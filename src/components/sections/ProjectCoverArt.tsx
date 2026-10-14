import {
  Bike,
  CalendarCheck,
  CircleCheck,
  Cpu,
  Fan,
  Headphones,
  House,
  Laptop,
  MapPin,
  Microwave,
  Monitor,
  Refrigerator,
  ScanFace,
  ShoppingCart,
  Sprout,
  Star,
  Tv,
  WashingMachine,
} from "lucide-react";
import type { CoverArt } from "@/content/profile";

// Decorative illustrations for projects that have no screenshot. All are aria-hidden;
// the card's title and description carry the meaning.

const GLOW_BACKDROP =
  "bg-[radial-gradient(circle_at_25%_20%,rgb(58_214_181/0.16),transparent_55%),radial-gradient(circle_at_80%_85%,rgb(194_236_92/0.14),transparent_55%)]";

function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div aria-hidden="true" className={`relative flex h-full items-center justify-center overflow-hidden ${GLOW_BACKDROP} ${className}`}>
      {children}
    </div>
  );
}

function PhoneShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative w-40 rounded-[1.75rem] border border-line-strong bg-ink p-1.5 shadow-2xl transition-transform duration-700 ${className}`}
    >
      <div className="relative h-full overflow-hidden rounded-[1.4rem]">{children}</div>
    </div>
  );
}

function GourdFlower({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path d="M50 92 C20 80 12 52 30 40 C40 58 48 70 50 92 Z" fill="#3f6b2a" />
      <path d="M50 92 C80 80 88 52 70 40 C60 58 52 70 50 92 Z" fill="#52863a" />
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={angle} cx="50" cy="28" rx="13" ry="19" fill="#f3d23c" transform={`rotate(${angle} 50 46)`} />
      ))}
      <circle cx="50" cy="46" r="8" fill="#c99a12" />
      <circle cx="50" cy="46" r="4" fill="#7a8f1f" />
    </svg>
  );
}

function GourdPhoneArt() {
  return (
    <Frame className="items-end bg-[radial-gradient(ellipse_at_50%_100%,rgb(194_236_92/0.22),transparent_65%)]">
      <PhoneShell className="h-64 translate-y-12 group-hover:translate-y-8 lg:h-[26rem] lg:w-56 lg:translate-y-16 lg:group-hover:translate-y-10">
        <div className="h-full bg-[radial-gradient(circle_at_50%_40%,#2b3a1c,#0b0f08_70%)]">
          <span className="absolute top-2 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-ink" />
          <GourdFlower className="absolute top-[20%] left-1/2 size-20 -translate-x-1/2 lg:size-28" />
          <span className="absolute top-[16%] left-1/2 size-28 -translate-x-1/2 lg:size-36 rounded-xl border-2 border-dashed border-accent/80" />
          <span className="absolute inset-x-6 bottom-14 lg:bottom-24 rounded-lg whitespace-nowrap bg-ink/80 px-2 py-1.5 text-center font-mono text-[10px] text-accent">
            ♀ female
          </span>
        </div>
      </PhoneShell>
    </Frame>
  );
}

function FarmMapArt() {
  return (
    <Frame className="bg-[#0d1a12]">
      <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <g stroke="rgb(236 235 228 / 0.07)" strokeWidth="10" fill="none">
          <path d="M-10 70 H410" />
          <path d="M-10 160 H410" />
          <path d="M110 -10 V230" />
          <path d="M290 -10 V230" />
        </g>
        <g fill="rgb(58 214 181 / 0.08)">
          <rect x="20" y="90" width="70" height="50" rx="6" />
          <rect x="135" y="10" width="130" height="40" rx="6" />
          <rect x="310" y="85" width="80" height="55" rx="6" />
          <rect x="135" y="180" width="130" height="40" rx="6" />
        </g>
        <path
          d="M60 115 C 60 70, 110 70, 160 70 S 290 70, 290 115 S 330 160, 350 112"
          stroke="#c2ec5c"
          strokeWidth="3"
          strokeDasharray="8 7"
          fill="none"
          className="opacity-80"
        />
      </svg>
      <span className="absolute top-[42%] left-[11%] flex size-9 items-center justify-center rounded-full bg-teal/20 text-teal ring-1 ring-teal/50">
        <Sprout className="size-4" />
      </span>
      <span className="absolute top-[38%] right-[9%] flex size-9 items-center justify-center rounded-full bg-accent/20 text-accent ring-1 ring-accent/60">
        <MapPin className="size-4" />
      </span>
      <span className="absolute top-[21%] left-[48%] flex size-8 items-center justify-center rounded-full bg-accent text-ink shadow-[0_0_20px_rgb(194_236_92/0.7)] transition-transform duration-700 group-hover:translate-x-10">
        <Bike className="size-4" />
      </span>
      <span className="absolute bottom-3 left-3 rounded-lg border border-line bg-ink/85 px-2.5 py-1.5 font-mono text-[10px] text-paper/80">
        order on the way · <span className="text-accent">live</span>
      </span>
    </Frame>
  );
}

const SHOP_CATEGORIES = [
  { Icon: Cpu, label: "Components" },
  { Icon: Laptop, label: "Laptops" },
  { Icon: Monitor, label: "Displays" },
  { Icon: Headphones, label: "Audio" },
];

function MobileShopArt() {
  return (
    <Frame className="items-end">
      <PhoneShell className="h-56 translate-y-12 group-hover:translate-y-8">
        <div className="flex h-full flex-col gap-2 bg-surface-raised p-3">
          <div className="flex items-center justify-between">
            <span className="font-display text-[11px] font-semibold">TeknoRigRealm</span>
            <ShoppingCart className="size-3.5 text-accent" />
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {SHOP_CATEGORIES.map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 rounded-lg bg-ink/70 py-2.5">
                <Icon className="size-5 text-teal" />
                <span className="text-[8px] text-paper/70">{label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-ink/70 px-2 py-1.5">
            {[0, 1, 2, 3, 4].map((star) => (
              <Star key={star} className="size-2.5 fill-accent text-accent" />
            ))}
            <span className="ml-1 text-[8px] text-paper/60">new review</span>
          </div>
        </div>
      </PhoneShell>
    </Frame>
  );
}

const APPLIANCES = [Refrigerator, WashingMachine, Microwave, Tv, Fan, Refrigerator];

function WebShopArt() {
  return (
    <Frame className="px-6 pt-6">
      <div className="h-full w-full translate-y-4 rounded-t-xl border border-b-0 border-line-strong bg-surface-raised shadow-2xl transition-transform duration-700 group-hover:translate-y-1">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="size-2 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2 rounded-full bg-[#febc2e]/80" />
          <span className="size-2 rounded-full bg-[#28c840]/80" />
          <span className="ml-2 font-display text-[11px] font-semibold">HAB Appliances</span>
          <span className="ml-auto flex items-center gap-1 text-[10px] text-accent">
            <ShoppingCart className="size-3.5" /> 2
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 p-3">
          {APPLIANCES.map((Icon, index) => (
            <div key={index} className="flex flex-col items-center gap-1.5 rounded-lg bg-ink/60 py-3">
              <Icon className="size-6 text-paper/70" />
              <span className="h-1 w-8 rounded-full bg-paper/15" />
              <span className="h-1 w-5 rounded-full bg-accent/50" />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function WireframeHouseArt() {
  // Isometric house: base box + pitched roof, drawn as edges with vertex dots.
  const vertices = [
    [140, 150], [200, 180], [260, 150], [200, 120],
    [140, 95], [200, 125], [260, 95], [200, 65],
    [170, 55], [230, 85],
  ];
  return (
    <Frame>
      <svg
        viewBox="80 20 240 190"
        className="h-[85%] text-teal transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-2"
      >
        <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round">
          <path d="M140 150 L200 180 L260 150 L200 120 Z" opacity="0.35" />
          <path d="M140 95 L200 125 L260 95" />
          <path d="M140 150 V95 M200 180 V125 M260 150 V95 M200 120 V65" opacity="0.6" />
          <path d="M140 95 L170 55 L230 85 L260 95 M200 125 L230 85 M170 55 L200 65" />
          <path d="M140 150 L200 180 L260 150" />
          <path d="M175 165 V140 L190 147 V172" stroke="#c2ec5c" />
          <path d="M218 150 L240 139 V122 L218 133 Z" stroke="#c2ec5c" />
        </g>
        {vertices.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#c2ec5c" />
        ))}
      </svg>
      <span className="absolute bottom-3 left-3 rounded-lg border border-line bg-ink/85 px-2.5 py-1.5 font-mono text-[10px] text-paper/80">
        prompt: <span className="text-accent">&quot;two-storey house&quot;</span>
      </span>
    </Frame>
  );
}

const CALENDAR_DAYS = Array.from({ length: 21 }, (_, index) => index + 1);
const BOOKED_DAY = 12;

function HouseBookingArt() {
  return (
    <Frame className="gap-4 px-6">
      <div className="grid grid-cols-7 gap-1 rounded-xl border border-line bg-surface-raised/80 p-3 transition-transform duration-700 group-hover:-translate-y-1">
        {CALENDAR_DAYS.map((day) => (
          <span
            key={day}
            className={`flex size-6 items-center justify-center rounded-md text-[9px] ${
              day === BOOKED_DAY ? "bg-accent font-bold text-ink" : "bg-ink/50 text-paper/50"
            }`}
          >
            {day}
          </span>
        ))}
      </div>
      <div className="flex w-36 flex-col gap-2 rounded-xl border border-line bg-surface-raised/80 p-3 transition-transform duration-700 group-hover:translate-y-1">
        <House className="size-7 text-teal" />
        <span className="font-display text-xs font-semibold">House tour</span>
        <span className="flex items-center gap-1 text-[10px] text-accent">
          <CalendarCheck className="size-3" /> booked · 10:00 AM
        </span>
      </div>
    </Frame>
  );
}

function FaceScanArt() {
  return (
    <Frame className="gap-5 px-6">
      <div className="relative flex size-32 items-center justify-center rounded-2xl border border-line bg-surface-raised/80">
        <ScanFace className="size-16 text-paper/70" strokeWidth={1.25} />
        <span className="absolute inset-3 rounded-lg border-2 border-accent shadow-[0_0_18px_rgb(194_236_92/0.45)] transition-all duration-700 group-hover:inset-5" />
      </div>
      <ul className="flex flex-col gap-1.5 font-mono text-[10px]">
        {["student 01", "student 02", "student 03"].map((name, index) => (
          <li key={name} className="flex items-center gap-2 rounded-md border border-line bg-ink/70 px-2 py-1 text-paper/70">
            <CircleCheck className={`size-3 ${index < 2 ? "text-accent" : "text-paper/25"}`} />
            {name}
            <span className={index < 2 ? "text-accent" : "text-paper/30"}>{index < 2 ? "present" : "…"}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

const ART_COMPONENTS: Record<CoverArt, () => React.ReactElement> = {
  "gourd-phone": GourdPhoneArt,
  "farm-map": FarmMapArt,
  "mobile-shop": MobileShopArt,
  "web-shop": WebShopArt,
  "wireframe-house": WireframeHouseArt,
  "house-booking": HouseBookingArt,
  "face-scan": FaceScanArt,
};

export function ProjectCoverArt({ art }: { art: CoverArt }) {
  const Art = ART_COMPONENTS[art];
  return <Art />;
}
