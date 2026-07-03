import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldTopo from "world-atlas/countries-110m.json";
import { useLanguage } from "@/lib/language-context";

const VB_W = 1000;
const VB_H = 500;

// Region focus: Red Sea / Arabian Peninsula across the Gulf to South Asia.
// Use a MultiPoint of corner coordinates — points carry no polygon winding
// ambiguity, so d3-geo fits to the intended box rather than its complement.
const REGION_BOUNDS = {
  type: "MultiPoint" as const,
  coordinates: [
    [33, 6],
    [82, 6],
    [33, 35],
    [82, 35],
  ] as [number, number][],
};

// Countries that host an ENVOD office — highlighted with the brand accent
const OFFICE_COUNTRIES = new Set([
  "Saudi Arabia",
  "United Arab Emirates",
  "Bahrain",
  "India",
]);
// GCC / regional neighbours — subtly lifted for context
const REGION_COUNTRIES = new Set([
  "Qatar",
  "Kuwait",
  "Oman",
  "Yemen",
  "Jordan",
  "Iraq",
  "Iran",
  "Egypt",
  "Pakistan",
]);

const OFFICES = [
  { id: "riyadh", lat: 24.71, lng: 46.68, isHub: true },
  { id: "dammam", lat: 26.43, lng: 50.1 },
  { id: "jeddah", lat: 21.49, lng: 39.19 },
  { id: "manama", lat: 26.23, lng: 50.58 },
  { id: "dubai", lat: 25.2, lng: 55.27 },
  { id: "karnataka", lat: 13.0, lng: 77.6 },
];

export function GlobalNetworkMap() {
  const { t, isRtl } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const meta: Record<string, { name: string; label?: string }> = {
    riyadh: {
      name: t("Riyadh, Saudi Arabia", "الرياض، المملكة العربية السعودية"),
      label: t("Head Office", "المقر الرئيسي"),
    },
    dammam: { name: t("Dammam, Saudi Arabia", "الدمام، المملكة العربية السعودية") },
    jeddah: { name: t("Jeddah, Saudi Arabia", "جدة، المملكة العربية السعودية") },
    manama: { name: t("Manama, Bahrain", "المنامة، البحرين") },
    dubai: { name: t("Dubai, UAE", "دبي، الإمارات العربية المتحدة") },
    karnataka: { name: t("Karnataka, India", "كارناتاكا، الهند") },
  };

  // Build the projection + country geometry once (independent of language)
  const { countryPaths, points } = useMemo(() => {
    const projection = geoMercator().fitExtent(
      [
        [36, 36],
        [VB_W - 36, VB_H - 36],
      ],
      REGION_BOUNDS as never,
    );
    const pathGen = geoPath(projection);

    const world = feature(
      worldTopo as never,
      (worldTopo as unknown as { objects: { countries: unknown } }).objects
        .countries as never,
    ) as unknown as { features: Array<{ properties?: { name?: string }; }> };

    const countryPaths = world.features
      .map((f) => ({
        name: f.properties?.name ?? "",
        d: pathGen(f as never),
      }))
      .filter((c): c is { name: string; d: string } => !!c.d);

    const points: Record<string, { x: number; y: number }> = {};
    for (const o of OFFICES) {
      const p = projection([o.lng, o.lat]);
      if (p) points[o.id] = { x: p[0], y: p[1] };
    }

    return { countryPaths, points };
  }, []);

  const hub = points["riyadh"];

  return (
    <div
      className="w-full relative overflow-hidden bg-[#040c18] border-b border-white/[0.05]"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Depth gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0a192f_0%,#040c18_72%)] opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040c18]/40 to-[#040c18] pointer-events-none" />

      <div className="container mx-auto px-6 pt-20 pb-16 relative z-10">
        <div className="max-w-3xl mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-8 h-[2px] bg-secondary" />
            <span className="text-secondary text-[11px] font-black uppercase tracking-[0.3em]">
              {t("Global Reach", "حضور عالمي")}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight"
          >
            {t("Our Global Logistics Network", "شبكتنا اللوجستية العالمية")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl"
          >
            {t(
              "Connecting Saudi Arabia with the GCC and international markets through strategically located offices and trusted logistics operations.",
              "نربط المملكة العربية السعودية بدول الخليج والأسواق العالمية عبر مكاتب موزعة استراتيجياً وعمليات لوجستية موثوقة.",
            )}
          </motion.p>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative w-full aspect-[16/9] md:aspect-[2/1] max-h-[520px] rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-[#06101e]"
          dir="ltr"
        >
          {/* Grid sheen */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full"
          >
            <defs>
              <radialGradient id="envod-hub-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D62828" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#D62828" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Countries */}
            {countryPaths.map((c, i) => {
              const isOffice = OFFICE_COUNTRIES.has(c.name);
              const isRegion = REGION_COUNTRIES.has(c.name);
              return (
                <path
                  key={`c-${i}`}
                  d={c.d}
                  fill={
                    isOffice ? "#122b45" : isRegion ? "#0d1f36" : "#0a1729"
                  }
                  stroke={isOffice ? "rgba(214,40,40,0.35)" : "rgba(255,255,255,0.08)"}
                  strokeWidth={isOffice ? 1 : 0.6}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

            {/* Route arcs from Riyadh hub */}
            {hub &&
              OFFICES.filter((o) => !o.isHub).map((o, i) => {
                const p = points[o.id];
                if (!p) return null;
                const mx = (hub.x + p.x) / 2;
                const my = (hub.y + p.y) / 2;
                const dist = Math.hypot(p.x - hub.x, p.y - hub.y);
                const lift = Math.min(dist * 0.32, 130);
                const d = `M ${hub.x} ${hub.y} Q ${mx} ${my - lift} ${p.x} ${p.y}`;
                return (
                  <g key={`arc-${o.id}`}>
                    <path
                      d={d}
                      fill="none"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth={1}
                      vectorEffect="non-scaling-stroke"
                    />
                    <motion.path
                      d={d}
                      fill="none"
                      stroke="#D62828"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.55 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 1.4,
                        delay: prefersReducedMotion ? 0 : 0.4 + i * 0.18,
                        ease: "easeInOut",
                      }}
                    />
                    {!prefersReducedMotion && (
                      <motion.path
                        d={d}
                        fill="none"
                        stroke="#ff5a5a"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeDasharray="3 16"
                        vectorEffect="non-scaling-stroke"
                        initial={{ strokeDashoffset: 0, opacity: 0 }}
                        whileInView={{ strokeDashoffset: -38, opacity: 0.9 }}
                        viewport={{ once: true }}
                        transition={{
                          strokeDashoffset: {
                            duration: 1.1,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 1.4 + i * 0.18,
                          },
                          opacity: { duration: 0.6, delay: 1.4 + i * 0.18 },
                        }}
                      />
                    )}
                  </g>
                );
              })}

            {/* Hub glow */}
            {hub && (
              <circle cx={hub.x} cy={hub.y} r={46} fill="url(#envod-hub-glow)" />
            )}
          </svg>

          {/* Markers (HTML overlay for rich tooltips) */}
          {OFFICES.map((o) => {
            const p = points[o.id];
            if (!p) return null;
            const leftPct = (p.x / VB_W) * 100;
            const topPct = (p.y / VB_H) * 100;
            const flip = leftPct > 68;
            const m = meta[o.id];
            return (
              <div
                key={o.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
              >
                <div className="relative flex items-center justify-center">
                  <span
                    className={`absolute rounded-full ${
                      o.isHub
                        ? "w-9 h-9 bg-secondary/25 animate-ping"
                        : "w-6 h-6 bg-white/10 group-hover:bg-secondary/25 transition-colors duration-500"
                    }`}
                    style={o.isHub ? { animationDuration: "2.8s" } : undefined}
                  />
                  <span
                    className={`relative z-10 rounded-full ring-2 ring-[#06101e] ${
                      o.isHub
                        ? "w-3.5 h-3.5 bg-secondary shadow-[0_0_16px_#D62828]"
                        : "w-2.5 h-2.5 bg-white group-hover:bg-secondary transition-colors duration-300"
                    }`}
                  />
                </div>

                {/* Tooltip */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 ${
                    flip ? "right-5" : "left-5"
                  } opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-30`}
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  <div className="bg-[#040c18]/95 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2 shadow-2xl whitespace-nowrap">
                    {o.isHub && m.label && (
                      <span className="block text-secondary text-[10px] font-black uppercase tracking-wider mb-0.5">
                        {m.label}
                      </span>
                    )}
                    <span className="text-white text-sm font-semibold">{m.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Office roster (always visible, doubles as mobile fallback) */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {OFFICES.map((o) => {
            const m = meta[o.id];
            return (
              <div
                key={o.id}
                className="bg-white/[0.03] border border-white/10 rounded-xl p-4 hover:border-secondary/30 hover:bg-secondary/[0.06] transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      o.isHub ? "bg-secondary" : "bg-white/40 group-hover:bg-secondary transition-colors"
                    }`}
                  />
                  {o.isHub && m.label && (
                    <span className="text-secondary text-[9px] font-black uppercase tracking-[0.15em]">
                      {m.label}
                    </span>
                  )}
                </div>
                <div className="text-white/90 text-[13px] font-semibold leading-snug">
                  {m.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
