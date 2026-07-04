import { useEffect, useRef, useState } from "react";
import { useListClients } from "@workspace/api-client-react";
import type { Client } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/language-context";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Package, Building2, Award, Clock, Globe2 } from "lucide-react";

/* ─────────────────────────── Data ─────────────────────────── */
const FALLBACK_CLIENTS: Client[] = [
  { id: 1,  name: "Saudi Aramco",          industry: "Oil & Gas",          logoUrl: null, website: null, sortOrder: 1,  isActive: true },
  { id: 2,  name: "SABIC",                 industry: "Oil & Gas",          logoUrl: null, website: null, sortOrder: 2,  isActive: true },
  { id: 3,  name: "Sipchem",               industry: "Oil & Gas",          logoUrl: null, website: null, sortOrder: 3,  isActive: true },
  { id: 4,  name: "STC",                   industry: "Telecommunications", logoUrl: null, website: null, sortOrder: 4,  isActive: true },
  { id: 5,  name: "Almarai",               industry: "Food & Beverage",    logoUrl: null, website: null, sortOrder: 5,  isActive: true },
  { id: 6,  name: "NADEC",                 industry: "Food & Beverage",    logoUrl: null, website: null, sortOrder: 6,  isActive: true },
  { id: 7,  name: "Ma'aden",               industry: "Mining",             logoUrl: null, website: null, sortOrder: 7,  isActive: true },
  { id: 8,  name: "Dr. Sulaiman Al Habib", industry: "Healthcare",         logoUrl: null, website: null, sortOrder: 8,  isActive: true },
  { id: 9,  name: "Bupa Arabia",           industry: "Healthcare",         logoUrl: null, website: null, sortOrder: 9,  isActive: true },
  { id: 10, name: "NEOM",                  industry: "Mega Projects",      logoUrl: null, website: null, sortOrder: 10, isActive: true },
  { id: 11, name: "Qiddiya",               industry: "Mega Projects",      logoUrl: null, website: null, sortOrder: 11, isActive: true },
  { id: 12, name: "Jarir Bookstore",        industry: "Retail",             logoUrl: null, website: null, sortOrder: 12, isActive: true },
  { id: 13, name: "Saudi Electricity",      industry: "Energy",             logoUrl: null, website: null, sortOrder: 13, isActive: true },
  { id: 14, name: "Olayan Group",           industry: "Conglomerate",       logoUrl: null, website: null, sortOrder: 14, isActive: true },
];

/* ─────────────────────────── Palette ─────────────────────────── */
const PALETTE: Record<string, { accent: string; glow: string; tag: string; ring: string }> = {
  "Oil & Gas":          { accent: "#f97316", glow: "rgba(249,115,22,0.15)",  tag: "text-orange-400",  ring: "rgba(249,115,22,0.25)" },
  "Telecommunications": { accent: "#a855f7", glow: "rgba(168,85,247,0.15)", tag: "text-purple-400",  ring: "rgba(168,85,247,0.25)" },
  "Food & Beverage":    { accent: "#22c55e", glow: "rgba(34,197,94,0.15)",   tag: "text-emerald-400", ring: "rgba(34,197,94,0.25)"  },
  "Mining":             { accent: "#eab308", glow: "rgba(234,179,8,0.15)",   tag: "text-yellow-400",  ring: "rgba(234,179,8,0.25)"  },
  "Healthcare":         { accent: "#ef4444", glow: "rgba(239,68,68,0.15)",   tag: "text-red-400",     ring: "rgba(239,68,68,0.25)"  },
  "Mega Projects":      { accent: "#06b6d4", glow: "rgba(6,182,212,0.15)",   tag: "text-cyan-400",    ring: "rgba(6,182,212,0.25)"  },
  "Retail":             { accent: "#84cc16", glow: "rgba(132,204,22,0.15)",  tag: "text-lime-400",    ring: "rgba(132,204,22,0.25)" },
  "Energy":             { accent: "#3b82f6", glow: "rgba(59,130,246,0.15)",  tag: "text-blue-400",    ring: "rgba(59,130,246,0.25)" },
  "Conglomerate":       { accent: "#8b5cf6", glow: "rgba(139,92,246,0.15)",  tag: "text-violet-400",  ring: "rgba(139,92,246,0.25)" },
};
const DEFAULT_PALETTE = { accent: "#D62828", glow: "rgba(214,40,40,0.15)", tag: "text-secondary", ring: "rgba(214,40,40,0.25)" };

function getPalette(industry: string | null | undefined) {
  return PALETTE[industry ?? ""] ?? DEFAULT_PALETTE;
}

/* ─────────────────────────── Animated counter ─────────────────────────── */
function AnimCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 60;
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 20);
    return () => clearInterval(id);
  }, [inView, to]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ─────────────────────────── Industry mark (no letter icon) ─────────────────────────── */
function IndustryMark({ industry }: { industry: string | null | undefined }) {
  const p = getPalette(industry);
  const shapes: Record<string, string> = {
    "Oil & Gas":          "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",
    "Telecommunications": "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z",
    "Food & Beverage":    "M7 2v11h3v9l7-12h-4l4-8z",
    "Mining":             "M12 2L2 19h20L12 2z",
    "Healthcare":         "M12 2a10 10 0 100 20A10 10 0 0012 2zm1 14h-2v-4H7v-2h4V6h2v4h4v2h-4v4z",
    "Mega Projects":      "M3 3h18v18H3V3zm2 2v14h14V5H5z",
    "Retail":             "M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3z",
    "Energy":             "M7 2v11h3v9l7-12h-4l4-8z",
  };
  const d = shapes[industry ?? ""] ?? "M12 2L2 19h20L12 2z";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={p.accent} style={{ filter: `drop-shadow(0 0 4px ${p.glow})` }}>
      <path d={d} />
    </svg>
  );
}

/* ─────────────────────────── Glass card ─────────────────────────── */
function ClientCard({ client, paused }: { client: Client; paused: boolean }) {
  const p = getPalette(client.industry);
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex-none relative group cursor-default select-none"
      style={{
        minWidth: 220,
        animationPlayState: paused ? "paused" : "running",
      }}
    >
      {/* Hover glow ring */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at 50% 100%, ${p.glow} 0%, transparent 70%)` }}
      />

      {/* Card body */}
      <div
        className="relative flex items-center gap-3.5 px-5 py-4 rounded-2xl border transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.035)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(255,255,255,0.07)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = p.ring;
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.065)";
          (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${p.glow}, 0 0 0 1px ${p.ring}`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.035)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Industry icon */}
        <div
          className="flex-none w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{ background: `${p.glow}`, border: `1px solid ${p.ring}` }}
        >
          <IndustryMark industry={client.industry} />
        </div>

        {/* Text */}
        <div className="min-w-0">
          <p className="font-bold text-white text-[14px] leading-tight truncate">
            {client.name}
          </p>
          {client.industry && (
            <p className={`text-[10px] font-semibold uppercase tracking-widest mt-0.5 ${p.tag}`}>
              {client.industry}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────── Marquee track ─────────────────────────── */
function MarqueeTrack({ clients, reverse = false, paused }: { clients: Client[]; reverse?: boolean; paused: boolean }) {
  const tripled = [...clients, ...clients, ...clients];
  const duration = clients.length * 5;
  return (
    <div className="flex overflow-hidden" style={{ WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)", maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
      <div
        className="flex gap-3 shrink-0 will-change-transform"
        style={{
          animation: `cm-scroll ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {tripled.map((c, i) => <ClientCard key={`${c.id}-${i}`} client={c} paused={paused} />)}
      </div>
    </div>
  );
}

/* ─────────────────────────── Stats strip ─────────────────────────── */
const STATS = [
  { icon: Package,   to: 5000, suffix: "+", label: "Shipments Completed",  labelAr: "شحنة مكتملة"      },
  { icon: Building2, to: 100,  suffix: "+", label: "Corporate Clients",    labelAr: "عميل مؤسسي"        },
  { icon: Award,     to: 25,   suffix: "+", label: "Years of Excellence",  labelAr: "عاماً من التميز"   },
  { icon: Clock,     to: 99,   suffix: "%", label: "On-Time Delivery",     labelAr: "دقة في التسليم"    },
  { icon: Globe2,    to: 50,   suffix: "+", label: "Countries Served",     labelAr: "دولة نخدمها"       },
];

/* ─────────────────────────── Trust strip ─────────────────────────── */
const TRUST = [
  { en: "ISO Quality Standards",          ar: "معايير الجودة ISO"              },
  { en: "Customs Clearance Experts",      ar: "خبراء التخليص الجمركي"          },
  { en: "Project Logistics Specialists",  ar: "متخصصو لوجستيات المشاريع"       },
  { en: "Temperature-Controlled Cargo",   ar: "شحن بدرجات حرارة متحكم بها"     },
  { en: "Dangerous Goods Certified",      ar: "معتمد للبضائع الخطرة"            },
  { en: "ATA Carnet Handling",            ar: "معالجة كارنيه ATA"               },
  { en: "Breakbulk & Oversized Cargo",    ar: "البضائع السائبة والبضائع الضخمة" },
];

/* ─────────────────────────── Main section ─────────────────────────── */
export function ClientMarquee() {
  const { t, isRtl } = useLanguage();
  const { data: clients } = useListClients();
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const items: Client[] = (clients && clients.length > 0 ? clients : FALLBACK_CLIENTS).filter(
    (c: Client) => c.isActive !== false,
  );

  const half = Math.ceil(items.length / 2);
  const row1 = items.slice(0, half);
  const row2 = items.slice(half).length > 0 ? items.slice(half) : items;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24"
      style={{ background: "linear-gradient(180deg, #050e1c 0%, #030a15 60%, #050e1c 100%)" }}
    >
      {/* ── Background depth ── */}
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.055]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(214,40,40,0.06) 0%, transparent 70%)" }}
      />
      {/* Top & bottom fades */}
      <div className="absolute inset-x-0 top-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to bottom, #050e1c, transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, #050e1c, transparent)" }} />
      {/* Moving light streak */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -left-32 w-96 h-px opacity-20" style={{ background: "linear-gradient(to right, transparent, rgba(214,40,40,0.6), transparent)", animation: "light-streak 8s ease-in-out infinite" }} />
        <div className="absolute top-2/3 -right-32 w-64 h-px opacity-10" style={{ background: "linear-gradient(to left, transparent, rgba(100,150,255,0.5), transparent)", animation: "light-streak 12s ease-in-out 2s infinite reverse" }} />
      </div>

      {/* ── Stats strip ── */}
      <div className="container mx-auto px-6 mb-16 relative z-10">
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 ${isRtl ? "direction-rtl" : ""}`}>
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -3 }}
              className={`group flex flex-col ${isRtl ? "items-end" : "items-start"} gap-2.5 px-5 py-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-secondary/30 hover:bg-white/[0.055] hover:shadow-[0_10px_34px_rgba(214,40,40,0.12)]`}
            >
              <div className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                <div className="w-9 h-9 rounded-lg bg-secondary/10 border border-secondary/15 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-secondary/20 group-hover:scale-110">
                  <s.icon className="w-4.5 h-4.5 text-secondary" aria-hidden="true" />
                </div>
                <span className="text-[26px] font-black text-white tracking-tight leading-none">
                  <AnimCounter to={s.to} suffix={s.suffix} />
                </span>
              </div>
              <span className="text-[11px] text-white/50 font-semibold uppercase tracking-widest leading-tight group-hover:text-white/70 transition-colors">
                {isRtl ? s.labelAr : s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Heading ── */}
      <div className={`text-center mb-14 relative z-10 px-6 ${isRtl ? "text-right" : ""}`}>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-secondary text-[10px] font-bold tracking-[0.4em] uppercase mb-3"
        >
          {t("POWERING SAUDI ARABIA'S TOP ENTERPRISES", "نُشغِّل كبرى المؤسسات السعودية")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="text-3xl md:text-[2.75rem] font-black text-white leading-tight"
        >
          {t("Trusted by Saudi Arabia's", "تثق بنا")} <span className="text-secondary">{t("Leading Enterprises", "أبرز المؤسسات السعودية")}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="mt-4 text-white/45 text-[14px] max-w-2xl mx-auto leading-relaxed"
        >
          {t(
            "From mega-projects and government contractors to FMCG, healthcare, oil & gas, retail and manufacturing — ENVOD delivers logistics solutions trusted across the Kingdom.",
            "من المشاريع العملاقة والمقاولين الحكوميين إلى السلع الاستهلاكية والرعاية الصحية والنفط والغاز والتجزئة والتصنيع — إنفود تقدم حلول لوجستية موثوقة في أنحاء المملكة.",
          )}
        </motion.p>
      </div>

      {/* ── Marquee rows ── */}
      <div
        className="flex flex-col gap-3 py-2 relative z-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <MarqueeTrack clients={row1} paused={paused} />
        <MarqueeTrack clients={row2} reverse paused={paused} />
      </div>

      {/* ── Trust indicators ── */}
      <div className="container mx-auto px-6 mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-3 ${isRtl ? "flex-row-reverse" : ""}`}
        >
          {TRUST.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
              className={`flex items-center gap-2 text-[12px] text-white/50 ${isRtl ? "flex-row-reverse" : ""}`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span>{isRtl ? item.ar : item.en}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Quote ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-white/25 text-[13px] leading-relaxed max-w-2xl mx-auto mt-10 italic"
        >
          {t(
            "Every shipment represents trust. From urgent air freight to complex project cargo, ENVOD supports Saudi Arabia's most demanding supply chains with precision and reliability.",
            "كل شحنة تمثل ثقة. من الشحن الجوي العاجل إلى البضائع المعقدة، تدعم إنفود سلاسل التوريد الأكثر تطلباً في المملكة بدقة وموثوقية.",
          )}
        </motion.p>
      </div>

      <style>{`
        @keyframes cm-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes light-streak {
          0%   { transform: translateX(-100%); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(200%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
