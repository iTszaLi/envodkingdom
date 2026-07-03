import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import { geoMercator, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";
import worldTopo from "world-atlas/countries-110m.json";
import {
  Building2, Plane, Ship, Truck, Phone, Mail, MapPin, Clock3, Globe2,
  ChevronRight, ArrowRight, Anchor, Warehouse,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

/* ───────────────────────── Geometry constants ───────────────────────── */
const VB_W = 1000;
const VB_H = 600;
const PAD = 30;
const EASE = [0.22, 1, 0.36, 1] as const;
const ZOOM_MS = 900;

// Corner points of the visible region (MultiPoint carries no winding ambiguity)
// From western Europe / Atlantic edge across Africa & the Gulf to China.
const REGION_BOUNDS = {
  type: "MultiPoint" as const,
  coordinates: [
    [-14, -10],
    [132, -10],
    [-14, 58],
    [132, 58],
  ] as [number, number][],
};

/* ───────────────────────────── Data model ───────────────────────────── */
type Mode = "air" | "sea" | "road";

interface Office {
  id: string;
  city: string;
  cityAr: string;
  country: string;
  countryAr: string;
  countryName: string; // world-atlas match
  flag: string;
  lat: number;
  lng: number;
  isHub?: boolean;
  services: [string, string][]; // [en, ar]
  phone: string;
  email: string;
  years: string;
  icon: typeof Building2;
}

interface Reach {
  id: string;
  labelEn: string;
  labelAr: string;
  countryName: string;
  flag: string;
  lat: number;
  lng: number;
  mode: Mode;
}

const PHONE = "+966 50 226 0256";
const EMAIL = "info@envodkingdom.net";

const OFFICES: Office[] = [
  {
    id: "riyadh", city: "Riyadh", cityAr: "الرياض",
    country: "Saudi Arabia", countryAr: "المملكة العربية السعودية",
    countryName: "Saudi Arabia", flag: "🇸🇦", lat: 24.71, lng: 46.68, isHub: true,
    services: [["Customs Clearance", "التخليص الجمركي"], ["ATA Carnet", "كارنيه ATA"], ["Project Cargo", "بضائع المشاريع"], ["Air & Sea Freight", "الشحن الجوي والبحري"]],
    phone: PHONE, email: EMAIL, years: "25+", icon: Building2,
  },
  {
    id: "dammam", city: "Dammam", cityAr: "الدمام",
    country: "Saudi Arabia", countryAr: "المملكة العربية السعودية",
    countryName: "Saudi Arabia", flag: "🇸🇦", lat: 26.43, lng: 50.1,
    services: [["Sea Freight", "الشحن البحري"], ["Road Transport", "النقل البري"], ["Warehousing", "التخزين"], ["Customs Clearance", "التخليص الجمركي"]],
    phone: PHONE, email: EMAIL, years: "25+", icon: Anchor,
  },
  {
    id: "jeddah", city: "Jeddah", cityAr: "جدة",
    country: "Saudi Arabia", countryAr: "المملكة العربية السعودية",
    countryName: "Saudi Arabia", flag: "🇸🇦", lat: 21.49, lng: 39.19,
    services: [["Sea Freight", "الشحن البحري"], ["Air Freight", "الشحن الجوي"], ["Exhibition Logistics", "لوجستيات المعارض"], ["Customs Clearance", "التخليص الجمركي"]],
    phone: PHONE, email: EMAIL, years: "25+", icon: Ship,
  },
  {
    id: "manama", city: "Manama", cityAr: "المنامة",
    country: "Bahrain", countryAr: "البحرين",
    countryName: "Bahrain", flag: "🇧🇭", lat: 26.23, lng: 50.58,
    services: [["Road Transport", "النقل البري"], ["GCC Distribution", "التوزيع الخليجي"], ["Customs Clearance", "التخليص الجمركي"]],
    phone: PHONE, email: EMAIL, years: "25+", icon: Truck,
  },
  {
    id: "dubai", city: "Dubai", cityAr: "دبي",
    country: "United Arab Emirates", countryAr: "الإمارات العربية المتحدة",
    countryName: "United Arab Emirates", flag: "🇦🇪", lat: 25.2, lng: 55.27,
    services: [["Air Freight", "الشحن الجوي"], ["Sea Freight", "الشحن البحري"], ["Re-Export", "إعادة التصدير"], ["Transit Cargo", "بضائع العبور"]],
    phone: PHONE, email: EMAIL, years: "25+", icon: Plane,
  },
  {
    id: "karnataka", city: "Bengaluru", cityAr: "بنغالورو",
    country: "Karnataka, India", countryAr: "كارناتاكا، الهند",
    countryName: "India", flag: "🇮🇳", lat: 12.97, lng: 77.59,
    services: [["Ocean Freight", "الشحن البحري"], ["Air Freight", "الشحن الجوي"], ["Consolidation", "التجميع"]],
    phone: PHONE, email: EMAIL, years: "25+", icon: Warehouse,
  },
];

const REACH: Reach[] = [
  { id: "kuwait", labelEn: "Kuwait", labelAr: "الكويت", countryName: "Kuwait", flag: "🇰🇼", lat: 29.37, lng: 47.98, mode: "road" },
  { id: "qatar", labelEn: "Qatar", labelAr: "قطر", countryName: "Qatar", flag: "🇶🇦", lat: 25.29, lng: 51.53, mode: "road" },
  { id: "oman", labelEn: "Oman", labelAr: "عُمان", countryName: "Oman", flag: "🇴🇲", lat: 23.59, lng: 58.41, mode: "sea" },
  { id: "china", labelEn: "China", labelAr: "الصين", countryName: "China", flag: "🇨🇳", lat: 31.23, lng: 121.47, mode: "sea" },
  { id: "europe", labelEn: "Europe", labelAr: "أوروبا", countryName: "Netherlands", flag: "🇪🇺", lat: 51.92, lng: 4.48, mode: "air" },
  { id: "africa", labelEn: "Africa", labelAr: "أفريقيا", countryName: "Kenya", flag: "🇰🇪", lat: -1.29, lng: 36.82, mode: "air" },
];

const OFFICE_COUNTRIES = new Set(OFFICES.map((o) => o.countryName));
const REACH_COUNTRIES = new Set([
  "Qatar", "Kuwait", "Oman", "Yemen", "Jordan", "Iraq", "Iran", "Egypt",
  "Pakistan", "China", "Kenya", "Netherlands", "Germany", "France", "Turkey", "Ethiopia",
]);

const STATS: { value: number; suffix: string; en: string; ar: string }[] = [
  { value: 25, suffix: "+", en: "Years Experience", ar: "سنة خبرة" },
  { value: 6, suffix: "", en: "Strategic Offices", ar: "مكاتب استراتيجية" },
  { value: 100, suffix: "+", en: "Global Partners", ar: "شريك عالمي" },
  { value: 24, suffix: "/7", en: "Operations", ar: "عمليات مستمرة" },
];

const MODE_EMOJI: Record<Mode, string> = { air: "✈", sea: "🚢", road: "🚛" };

// Deterministic ambient particles inside the map
const MAP_PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  x: (i * 137.5) % 100,
  y: (i * 61.8) % 100,
  size: 1 + (i % 3),
  dur: 6 + (i % 5) * 1.5,
  delay: (i % 7) * 0.6,
  opacity: 0.15 + (i % 4) * 0.08,
}));

/* ───────────────────────── Animated stat counter ─────────────────────── */
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setN(value); return; }
    let raf = 0;
    const start = performance.now();
    const dur = 1800;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setN(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      {n}
      <span className="text-secondary">{suffix}</span>
    </span>
  );
}

/* ─────────────────────────── Main component ──────────────────────────── */
export function GlobalNetworkMap() {
  const { t, isRtl } = useLanguage();
  const reduce = useReducedMotion();

  const [hoverId, setHoverId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [view, setView] = useState({ k: 1, cx: VB_W / 2, cy: VB_H / 2 });

  // Projection + geometry (language-independent, computed once)
  const { countryPaths, graticule, pts, reachPts } = useMemo(() => {
    const projection = geoMercator().fitExtent(
      [[PAD, PAD], [VB_W - PAD, VB_H - PAD]],
      REGION_BOUNDS as never,
    );
    const pathGen = geoPath(projection);

    const world = feature(
      worldTopo as never,
      (worldTopo as unknown as { objects: { countries: unknown } }).objects.countries as never,
    ) as unknown as { features: Array<{ properties?: { name?: string } }> };

    const countryPaths = world.features
      .map((f) => ({ name: f.properties?.name ?? "", d: pathGen(f as never) }))
      .filter((c): c is { name: string; d: string } => !!c.d);

    const graticule = pathGen(geoGraticule10()) ?? "";

    const pts: Record<string, { x: number; y: number }> = {};
    for (const o of OFFICES) {
      const p = projection([o.lng, o.lat]);
      if (p) pts[o.id] = { x: p[0], y: p[1] };
    }
    const reachPts: Record<string, { x: number; y: number }> = {};
    for (const r of REACH) {
      const p = projection([r.lng, r.lat]);
      if (p) reachPts[r.id] = { x: p[0], y: p[1] };
    }
    return { countryPaths, graticule, pts, reachPts };
  }, []);

  const hub = pts["riyadh"];

  // Build a curved route path between two points
  const routeD = useCallback((a: { x: number; y: number }, b: { x: number; y: number }) => {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    const lift = Math.min(dist * 0.28, 150);
    return `M ${a.x} ${a.y} Q ${mx} ${my - lift} ${b.x} ${b.y}`;
  }, []);

  // All routes emanate from the Riyadh hub
  const routes = useMemo(() => {
    if (!hub) return [];
    const list: { id: string; d: string; mode: Mode; weight: number; office?: boolean }[] = [];
    OFFICES.filter((o) => !o.isHub).forEach((o) => {
      const p = pts[o.id];
      if (p) list.push({ id: o.id, d: routeD(hub, p), mode: o.services.length > 3 ? "air" : "road", weight: 1.8, office: true });
    });
    REACH.forEach((r) => {
      const p = reachPts[r.id];
      if (p) list.push({ id: r.id, d: routeD(hub, p), mode: r.mode, weight: r.mode === "sea" ? 2.2 : 1.6 });
    });
    return list;
  }, [hub, pts, reachPts, routeD]);

  const focusOffice = useCallback((id: string) => {
    const p = pts[id];
    if (!p) return;
    setActiveId(id);
    setView(reduce ? { k: 1.6, cx: p.x, cy: p.y } : { k: 2.4, cx: p.x, cy: p.y });
  }, [pts, reduce]);

  const resetView = useCallback(() => {
    setActiveId(null);
    setView({ k: 1, cx: VB_W / 2, cy: VB_H / 2 });
  }, []);

  // World transform (top-left origin) — drives SVG + markers, CSS-transitioned
  const tx = 50 - (view.cx / VB_W) * view.k * 100;
  const ty = 50 - (view.cy / VB_H) * view.k * 100;
  const worldStyle = {
    transform: `translate(${tx}%, ${ty}%) scale(${view.k})`,
    transformOrigin: "0 0",
    transition: reduce ? "none" : `transform ${ZOOM_MS}ms cubic-bezier(0.22,1,0.36,1)`,
  } as const;
  const counterScale = {
    transform: `scale(${1 / view.k})`,
    transition: reduce ? "none" : `transform ${ZOOM_MS}ms cubic-bezier(0.22,1,0.36,1)`,
  } as const;

  // Popup target (hover wins over the clicked selection)
  const displayId = hoverId ?? activeId;
  const displayOffice = displayId ? OFFICES.find((o) => o.id === displayId) ?? null : null;
  const dp = displayId ? pts[displayId] : null;
  const fx = dp ? 0.5 + ((dp.x - view.cx) / VB_W) * view.k : 0.5;
  const fy = dp ? 0.5 + ((dp.y - view.cy) / VB_H) * view.k : 0.5;
  const flipX = fx > 0.62;
  const below = fy < 0.34;

  return (
    <section className="relative overflow-hidden bg-[#040c18]" dir={isRtl ? "rtl" : "ltr"}>
      {/* ── Layered premium background ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0b1f3a_0%,#040c18_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(30,64,120,0.12),transparent_45%,rgba(214,40,40,0.08))] pointer-events-none" />
      {!reduce && (
        <>
          <motion.div
            className="absolute -top-24 -left-16 w-[520px] h-[520px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(37,99,235,0.16),transparent 68%)", filter: "blur(20px)" }}
            animate={{ x: [0, 60, 0], y: [0, 40, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 -right-24 w-[480px] h-[480px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(214,40,40,0.14),transparent 68%)", filter: "blur(20px)" }}
            animate={{ x: [0, -50, 0], y: [0, 60, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* sweeping light beams */}
          <motion.div
            className="absolute top-0 left-1/4 w-[2px] h-full pointer-events-none"
            style={{ background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.08),transparent)" }}
            animate={{ x: ["-30vw", "60vw"], opacity: [0, 0.6, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="container mx-auto px-5 sm:px-6 pt-24 pb-20 relative z-10">
        {/* ── Header ── */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="flex items-center gap-3 mb-5"
          >
            <span className="w-10 h-[2px] bg-secondary" />
            <span className="text-secondary text-xs font-black uppercase tracking-[0.4em]">
              {t("Global Reach", "حضور عالمي")}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.05]"
          >
            {t("Our Global", "شبكتنا")}{" "}
            <span className="bg-gradient-to-r from-secondary to-[#ff6b5a] bg-clip-text text-transparent">
              {t("Logistics Network", "اللوجستية العالمية")}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.12 }}
            className="text-white/65 text-lg md:text-xl leading-relaxed max-w-2xl"
          >
            {t(
              "Connecting Saudi Arabia with the GCC, Asia, Europe and Africa through strategically located offices and trusted, round-the-clock logistics operations.",
              "نربط المملكة العربية السعودية بدول الخليج وآسيا وأوروبا وأفريقيا عبر مكاتب موزعة استراتيجياً وعمليات لوجستية موثوقة على مدار الساعة.",
            )}
          </motion.p>
        </div>

        {/* ── Key statistics ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12 md:mb-14">
          {STATS.map((s, i) => (
            <motion.div
              key={s.en}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, ease: EASE }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm px-5 py-6 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-3xl md:text-4xl font-black text-white mb-1.5">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="relative text-[11px] md:text-xs font-semibold text-white/50 uppercase tracking-widest">
                {t(s.en, s.ar)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Map card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: EASE }}
          className="relative"
        >
          {/* Ambient glow behind the card */}
          <div className="absolute -inset-4 rounded-[36px] bg-[radial-gradient(ellipse_at_center,rgba(214,40,40,0.12),transparent_70%)] blur-2xl pointer-events-none" />

          <div
            className="relative rounded-[28px] border border-white/10 overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)]"
            style={{ aspectRatio: `${VB_W} / ${VB_H}`, background: "linear-gradient(160deg,#071628 0%,#040c18 100%)" }}
            dir="ltr"
          >
            {/* inner border highlight */}
            <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/[0.06] pointer-events-none z-30" />

            {/* Zoomable world (SVG + markers share one transform) */}
            <div className="absolute inset-0" style={worldStyle}>
              <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                <defs>
                  <radialGradient id="ocean" cx="50%" cy="38%" r="75%">
                    <stop offset="0%" stopColor="#0e2743" />
                    <stop offset="100%" stopColor="#06101e" />
                  </radialGradient>
                  <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#D62828" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#D62828" stopOpacity="0" />
                  </radialGradient>
                  <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="2.2" />
                  </filter>
                </defs>

                {/* Ocean */}
                <rect x="0" y="0" width={VB_W} height={VB_H} fill="url(#ocean)" />

                {/* Graticule (lat/long grid) */}
                <path d={graticule} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={0.5} vectorEffect="non-scaling-stroke" />

                {/* Countries */}
                {countryPaths.map((c, i) => {
                  const office = OFFICE_COUNTRIES.has(c.name);
                  const region = REACH_COUNTRIES.has(c.name);
                  return (
                    <path
                      key={`c-${i}`} d={c.d}
                      fill={office ? "#153554" : region ? "#0f2740" : "#0b1c31"}
                      stroke={office ? "rgba(214,40,40,0.4)" : "rgba(255,255,255,0.07)"}
                      strokeWidth={office ? 1 : 0.5}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}

                {/* Routes */}
                {routes.map((r, i) => {
                  const isActive = activeId === r.id;
                  return (
                    <g key={`route-${r.id}`}>
                      {/* soft red glow beneath the route */}
                      <path d={r.d} fill="none" stroke="#D62828" strokeWidth={r.weight + 4} strokeLinecap="round" opacity={isActive ? 0.45 : 0.2} filter="url(#soft)" vectorEffect="non-scaling-stroke" />
                      {/* base track */}
                      <path d={r.d} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={r.weight} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                      {/* animated crisp route */}
                      <motion.path
                        id={`route-${r.id}`} d={r.d} fill="none"
                        stroke={isActive ? "#ff9575" : "#ff5a5a"}
                        strokeWidth={isActive ? r.weight + 1.2 : r.weight}
                        strokeLinecap="round" vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: isActive ? 1 : 0.8 }}
                        viewport={{ once: true }}
                        transition={{ duration: reduce ? 0 : 1.5, delay: reduce ? 0 : 0.3 + i * 0.12, ease: "easeInOut" }}
                      />
                      {/* moving light particles (cargo movement) */}
                      {!reduce && [0, 1.4, 2.8].map((begin, k) => (
                        <circle key={k} r={isActive ? 3.2 : 2.2} fill={isActive ? "#ffd0c0" : "#ff7a5a"} filter="url(#soft)">
                          <animateMotion dur={`${3.4 + (i % 3) * 0.5}s`} begin={`${begin + i * 0.15}s`} repeatCount="indefinite" rotate="auto" path={r.d} />
                          <animate attributeName="opacity" values="0;1;1;0" dur={`${3.4 + (i % 3) * 0.5}s`} begin={`${begin + i * 0.15}s`} repeatCount="indefinite" />
                        </circle>
                      ))}
                      {/* transport icon on international routes */}
                      {!reduce && (r.id === "china" || r.id === "europe" || r.id === "africa" || r.id === "karnataka") && (
                        <text fontSize={20} textAnchor="middle" dominantBaseline="central" opacity={0.9}>
                          <animateMotion dur={`${9 + i}s`} repeatCount="indefinite" path={r.d} />
                          {MODE_EMOJI[r.mode]}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Hub glow */}
                {hub && <circle cx={hub.x} cy={hub.y} r={54} fill="url(#hubGlow)" />}

                {/* Reach endpoint dots + labels */}
                {REACH.map((r) => {
                  const p = reachPts[r.id];
                  if (!p) return null;
                  return (
                    <g key={`reach-${r.id}`}>
                      <circle cx={p.x} cy={p.y} r={3} fill="#8fb4e8" opacity={0.85} />
                      <circle cx={p.x} cy={p.y} r={6} fill="none" stroke="#8fb4e8" strokeWidth={0.7} opacity={0.4} vectorEffect="non-scaling-stroke" />
                    </g>
                  );
                })}
              </svg>

              {/* Office markers (HTML overlay, inside the transformed world) */}
              {OFFICES.map((o) => {
                const p = pts[o.id];
                if (!p) return null;
                const isActive = activeId === o.id;
                return (
                  <div
                    key={o.id}
                    className="absolute z-20 cursor-pointer"
                    style={{ left: `${(p.x / VB_W) * 100}%`, top: `${(p.y / VB_H) * 100}%`, transform: "translate(-50%,-50%)" }}
                    onMouseEnter={() => setHoverId(o.id)}
                    onMouseLeave={() => setHoverId(null)}
                    onClick={() => focusOffice(o.id)}
                  >
                    <div style={counterScale}>
                      <div className="relative flex items-center justify-center">
                        {/* pulse rings */}
                        {!reduce && (
                          <>
                            <span
                              className={`absolute rounded-full animate-ping ${o.isHub ? "w-12 h-12 bg-secondary/30" : "w-5 h-5 bg-secondary/20"}`}
                              style={{ animationDuration: o.isHub ? "2.4s" : "3s" }}
                            />
                            {o.isHub && (
                              <span className="absolute rounded-full w-16 h-16 bg-secondary/15 animate-ping" style={{ animationDuration: "3.6s" }} />
                            )}
                          </>
                        )}
                        {/* glowing ring */}
                        <span
                          className={`absolute rounded-full ${o.isHub ? "w-10 h-10" : isActive ? "w-6 h-6" : "w-5 h-5"} transition-all duration-300`}
                          style={{ boxShadow: o.isHub ? "0 0 22px 6px rgba(214,40,40,0.55)" : "0 0 11px 2px rgba(214,40,40,0.4)", background: "rgba(214,40,40,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}
                        />
                        {/* center icon */}
                        <span
                          className={`relative z-10 flex items-center justify-center rounded-full ring-2 ring-[#040c18] ${o.isHub ? "w-7 h-7 bg-secondary" : "w-4 h-4 bg-white"} ${!reduce ? "envod-float" : ""}`}
                          style={{ animationDelay: `${(o.city.length % 5) * 0.3}s` }}
                        >
                          <o.icon className={`${o.isHub ? "w-3.5 h-3.5 text-white" : "w-2 h-2 text-secondary"}`} strokeWidth={2.5} />
                        </span>
                      </div>
                      {/* HQ badge */}
                      {o.isHub && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 rounded-full bg-secondary/90 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-lg">
                            <MapPin className="w-2.5 h-2.5" /> {t("Global Operations HQ", "المقر العالمي")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ambient particles (fixed, not zoomed) */}
            {!reduce && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                {MAP_PARTICLES.map((p) => (
                  <span
                    key={p.id} className="absolute rounded-full bg-white"
                    style={{
                      left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: p.opacity,
                      animation: `envod-particle ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* "Our Global Reach" floating badge */}
            <div className="absolute top-4 left-4 z-40 max-w-[190px]">
              <div className="rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl px-4 py-3 shadow-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Globe2 className="w-4 h-4 text-secondary" />
                  <span className="text-white text-xs font-black uppercase tracking-wider">{t("Global Reach", "حضور عالمي")}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[["Saudi Arabia", "السعودية"], ["GCC", "الخليج"], ["Asia", "آسيا"], ["Europe", "أوروبا"], ["Africa", "أفريقيا"]].map((c) => (
                    <span key={c[0]} className="rounded-md bg-white/[0.08] px-2 py-0.5 text-[10px] font-medium text-white/75">
                      {t(c[0], c[1])}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t("Connected Worldwide", "متصل عالمياً")}
                </div>
              </div>
            </div>

            {/* Reset view button */}
            <AnimatePresence>
              {activeId && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  onClick={resetView}
                  className="absolute top-4 right-4 z-40 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] backdrop-blur-xl px-4 py-2 text-xs font-bold text-white hover:bg-white/[0.15] transition-colors"
                >
                  <Globe2 className="w-3.5 h-3.5" /> {t("Reset View", "إعادة العرض")}
                </motion.button>
              )}
            </AnimatePresence>

            {/* Hover / active popup (frosted glass) */}
            <AnimatePresence>
              {displayOffice && dp && (
                <motion.div
                  key={displayOffice.id}
                  initial={{ opacity: 0, scale: 0.94, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 8 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="absolute z-50 w-[260px] pointer-events-none"
                  style={{
                    left: `${fx * 100}%`,
                    top: `${fy * 100}%`,
                    transform: `translate(${flipX ? "calc(-100% - 18px)" : "18px"}, ${below ? "8px" : "-50%"})`,
                  }}
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  <div className="rounded-2xl border border-white/15 bg-[#0a1628]/80 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
                    {/* office image (branded gradient) */}
                    <div className="relative h-20 flex items-center justify-between px-4 overflow-hidden" style={{ background: "linear-gradient(120deg,#0e2743,#153554)" }}>
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 30%,#D62828 0,transparent 40%)" }} />
                      <div className="relative">
                        <div className="text-2xl leading-none mb-1">{displayOffice.flag}</div>
                        <div className="text-white font-black text-base leading-tight">{isRtl ? displayOffice.cityAr : displayOffice.city}</div>
                        <div className="text-white/55 text-[11px]">{isRtl ? displayOffice.countryAr : displayOffice.country}</div>
                      </div>
                      <displayOffice.icon className="relative w-9 h-9 text-white/25" strokeWidth={1.5} />
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${displayOffice.isHub ? "bg-secondary/20 text-secondary" : "bg-white/10 text-white/70"}`}>
                          {displayOffice.isHub ? t("Head Office", "المقر الرئيسي") : t("Branch Office", "مكتب فرعي")}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {t("Online", "متصل")}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {displayOffice.services.slice(0, 4).map((s) => (
                          <span key={s[0]} className="rounded-md bg-white/[0.07] px-2 py-0.5 text-[10px] text-white/75">
                            {isRtl ? s[1] : s[0]}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-1.5 pt-1 border-t border-white/10">
                        <div className="flex items-center gap-2 text-[11px] text-white/70" dir="ltr">
                          <Phone className="w-3 h-3 text-secondary flex-shrink-0" /> {displayOffice.phone}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-white/70" dir="ltr">
                          <Mail className="w-3 h-3 text-secondary flex-shrink-0" /> {displayOffice.email}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-white/70">
                          <Clock3 className="w-3 h-3 text-secondary flex-shrink-0" /> {displayOffice.years} {t("years operating", "سنة من التشغيل")}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Branch location cards (slider on mobile, grid on desktop) ── */}
        <div className="mt-10 md:mt-14">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-bold text-lg md:text-xl">{t("Our Offices", "مكاتبنا")}</h3>
            <span className="text-white/40 text-xs hidden md:block">{t("Click a card to explore on the map", "انقر على البطاقة للاستكشاف على الخريطة")}</span>
          </div>
          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto md:overflow-visible pb-3 md:pb-0 snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 envod-hide-scroll">
            {OFFICES.map((o, i) => {
              const isActive = activeId === o.id;
              return (
                <motion.button
                  key={o.id}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06, ease: EASE }}
                  onClick={() => focusOffice(o.id)}
                  onMouseEnter={() => setHoverId(o.id)}
                  onMouseLeave={() => setHoverId(null)}
                  className={`group relative flex-shrink-0 w-[220px] md:w-auto snap-start text-left rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1.5 ${
                    isActive ? "border-secondary/60 bg-secondary/[0.1]" : "border-white/10 bg-white/[0.03] hover:border-secondary/30 hover:bg-white/[0.06]"
                  }`}
                  style={{ backdropFilter: "blur(8px)" }}
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top,rgba(214,40,40,0.14),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="relative flex items-center justify-between mb-3">
                    <span className={`flex items-center justify-center w-9 h-9 rounded-xl ${o.isHub ? "bg-secondary/20" : "bg-white/[0.06]"}`}>
                      <o.icon className={`w-4 h-4 ${o.isHub ? "text-secondary" : "text-white/70"}`} />
                    </span>
                    <span className="text-2xl leading-none">{o.flag}</span>
                  </div>
                  <div className="relative">
                    <div className="text-white font-bold text-[15px] leading-tight">{isRtl ? o.cityAr : o.city}</div>
                    <div className="text-white/45 text-xs mb-2.5">{isRtl ? o.countryAr : o.country}</div>
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${o.isHub ? "bg-secondary/20 text-secondary" : "bg-white/[0.07] text-white/60"}`}>
                        {o.isHub ? t("Head Office", "المقر الرئيسي") : t("Branch", "فرع")}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {t("Online", "متصل")}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {t("View details", "عرض التفاصيل")}
                      {isRtl ? <ChevronRight className="w-3 h-3 rotate-180" /> : <ArrowRight className="w-3 h-3" />}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
