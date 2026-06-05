import { useListClients } from "@workspace/api-client-react";
import type { Client } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";

/* ── Fallback data (text-based — no logo images) ── */
const FALLBACK_CLIENTS: Client[] = [
  { id: 1,  name: "Saudi Aramco",          industry: "Oil & Gas",          logoUrl: null, website: null, sortOrder: 1,  isActive: true },
  { id: 2,  name: "SABIC",                 industry: "Petrochemicals",     logoUrl: null, website: null, sortOrder: 2,  isActive: true },
  { id: 3,  name: "STC",                   industry: "Telecommunications", logoUrl: null, website: null, sortOrder: 3,  isActive: true },
  { id: 4,  name: "Almarai",               industry: "Food & Beverage",    logoUrl: null, website: null, sortOrder: 4,  isActive: true },
  { id: 5,  name: "Ma'aden",               industry: "Mining",             logoUrl: null, website: null, sortOrder: 5,  isActive: true },
  { id: 6,  name: "Dr. Sulaiman Al Habib", industry: "Healthcare",         logoUrl: null, website: null, sortOrder: 6,  isActive: true },
  { id: 7,  name: "Bupa Arabia",           industry: "Insurance",          logoUrl: null, website: null, sortOrder: 7,  isActive: true },
  { id: 8,  name: "Sipchem",               industry: "Petrochemicals",     logoUrl: null, website: null, sortOrder: 8,  isActive: true },
  { id: 9,  name: "NEOM",                  industry: "Mega Projects",      logoUrl: null, website: null, sortOrder: 9,  isActive: true },
  { id: 10, name: "Qiddiya",               industry: "Entertainment",      logoUrl: null, website: null, sortOrder: 10, isActive: true },
  { id: 11, name: "Jarir Bookstore",        industry: "Retail",             logoUrl: null, website: null, sortOrder: 11, isActive: true },
  { id: 12, name: "NADEC",                 industry: "Food & Beverage",    logoUrl: null, website: null, sortOrder: 12, isActive: true },
];

/* Industry → accent colour mapping */
const INDUSTRY_COLORS: Record<string, { text: string; dot: string; border: string }> = {
  "Oil & Gas":          { text: "text-orange-400", dot: "bg-orange-400", border: "border-orange-400/20" },
  "Petrochemicals":     { text: "text-blue-400",   dot: "bg-blue-400",   border: "border-blue-400/20"   },
  "Telecommunications": { text: "text-purple-400", dot: "bg-purple-400", border: "border-purple-400/20" },
  "Food & Beverage":    { text: "text-green-400",  dot: "bg-green-400",  border: "border-green-400/20"  },
  "Mining":             { text: "text-amber-400",  dot: "bg-amber-400",  border: "border-amber-400/20"  },
  "Healthcare":         { text: "text-red-400",    dot: "bg-red-400",    border: "border-red-400/20"    },
  "Insurance":          { text: "text-sky-400",    dot: "bg-sky-400",    border: "border-sky-400/20"    },
  "Mega Projects":      { text: "text-cyan-400",   dot: "bg-cyan-400",   border: "border-cyan-400/20"   },
  "Entertainment":      { text: "text-pink-400",   dot: "bg-pink-400",   border: "border-pink-400/20"   },
  "Retail":             { text: "text-lime-400",   dot: "bg-lime-400",   border: "border-lime-400/20"   },
};

function getAccent(industry: string | null | undefined) {
  return INDUSTRY_COLORS[industry ?? ""] ?? { text: "text-secondary", dot: "bg-secondary", border: "border-secondary/20" };
}

/* ── Single company card — premium text layout ── */
function ClientCard({ client }: { client: Client }) {
  const accent = getAccent(client.industry);
  const initials = client.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`
        flex-none flex items-center gap-4 px-5 py-4 rounded-2xl cursor-default
        border ${accent.border} border-opacity-100
        bg-white/[0.03] hover:bg-white/[0.07]
        backdrop-blur-sm transition-all duration-300 group
        hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20
      `}
      style={{ minWidth: 240 }}
    >
      {/* Monogram badge */}
      <div
        className={`
          flex-none w-11 h-11 rounded-xl flex items-center justify-center
          bg-white/[0.06] border border-white/10
          font-black text-sm tracking-tight text-white/80
          group-hover:bg-white/[0.10] transition-colors duration-300 select-none
        `}
      >
        {initials}
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="font-bold text-white text-[14px] leading-tight truncate group-hover:text-white transition-colors">
          {client.name}
        </p>
        {client.industry && (
          <p className={`flex items-center gap-1.5 mt-1 text-[10px] font-semibold uppercase tracking-widest ${accent.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-none ${accent.dot}`} />
            {client.industry}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Marquee track ── */
interface TrackProps {
  clients: Client[];
  reverse?: boolean;
  speed?: number;
}

function MarqueeTrack({ clients, reverse = false, speed = 40 }: TrackProps) {
  const doubled = [...clients, ...clients, ...clients];
  const duration = clients.length * speed;
  return (
    <div className="flex overflow-hidden mask-marquee">
      <div
        className="flex gap-3 shrink-0 will-change-transform"
        style={{ animation: `marquee-scroll ${duration}s linear infinite ${reverse ? "reverse" : ""}` }}
      >
        {doubled.map((client, i) => (
          <ClientCard key={`${client.id}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
}

/* ── Section export ── */
export function ClientMarquee() {
  const { t } = useLanguage();
  const { data: clients } = useListClients();

  const items: Client[] = (clients && clients.length > 0 ? clients : FALLBACK_CLIENTS).filter(
    (c: Client) => c.isActive !== false,
  );

  const half  = Math.ceil(items.length / 2);
  const row1  = items.slice(0, half);
  const row2  = items.slice(half);

  return (
    <section className="py-20 overflow-hidden bg-background relative">
      {/* Edge fade masks */}
      <div
        className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, hsl(var(--background)) 0%, transparent 100%)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, hsl(var(--background)) 0%, transparent 100%)" }}
      />

      {/* Heading */}
      <div className="text-center mb-14 relative z-10 px-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-secondary text-[10px] font-bold tracking-[0.4em] uppercase mb-3"
        >
          {t("TRUSTED BY INDUSTRY LEADERS", "ثقة قادة الصناعة")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-white"
        >
          {t("Saudi Arabia's", "تثق بنا")}
          <span className="text-secondary"> {t("Top Companies Trust Us", "أبرز الشركات السعودية")}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-3 text-muted-foreground text-sm max-w-lg mx-auto"
        >
          {t(
            "From NEOM mega-projects to FMCG giants — we handle logistics for Saudi Arabia's most demanding cargo.",
            "من مشاريع نيوم العملاقة إلى كبرى شركات السلع الاستهلاكية — نتولى لوجستيات أكثر الشحنات تحدياً.",
          )}
        </motion.p>
      </div>

      {/* Marquee rows */}
      <div className="flex flex-col gap-3 py-2">
        <MarqueeTrack clients={row1} speed={44} />
        <MarqueeTrack clients={row2.length > 0 ? row2 : row1} reverse speed={48} />
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .mask-marquee {
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
      `}</style>
    </section>
  );
}
