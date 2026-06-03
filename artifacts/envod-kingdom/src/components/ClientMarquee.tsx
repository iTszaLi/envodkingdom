import { useListClients } from "@workspace/api-client-react";
import type { Client } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";

const FALLBACK_CLIENTS: Client[] = [
  { id: 1,  name: "Saudi Aramco",           industry: "Oil & Gas",          logoUrl: null, website: null, sortOrder: 1,  isActive: true },
  { id: 2,  name: "SABIC",                  industry: "Petrochemicals",     logoUrl: null, website: null, sortOrder: 2,  isActive: true },
  { id: 3,  name: "STC",                    industry: "Telecommunications", logoUrl: null, website: null, sortOrder: 3,  isActive: true },
  { id: 4,  name: "Ma'aden",                industry: "Mining",             logoUrl: null, website: null, sortOrder: 4,  isActive: true },
  { id: 5,  name: "Almarai",                industry: "Food & Beverage",    logoUrl: null, website: null, sortOrder: 5,  isActive: true },
  { id: 6,  name: "Dr. Sulaiman Al Habib",  industry: "Healthcare",         logoUrl: null, website: null, sortOrder: 6,  isActive: true },
  { id: 7,  name: "Bupa Arabia",            industry: "Insurance",          logoUrl: null, website: null, sortOrder: 7,  isActive: true },
  { id: 8,  name: "Sipchem",                industry: "Petrochemicals",     logoUrl: null, website: null, sortOrder: 8,  isActive: true },
  { id: 9,  name: "NEOM",                   industry: "Mega Projects",      logoUrl: null, website: null, sortOrder: 9,  isActive: true },
  { id: 10, name: "Qiddiya",                industry: "Entertainment",      logoUrl: null, website: null, sortOrder: 10, isActive: true },
  { id: 11, name: "Jarir Bookstore",         industry: "Retail",             logoUrl: null, website: null, sortOrder: 11, isActive: true },
  { id: 12, name: "NADEC",                  industry: "Food & Beverage",    logoUrl: null, website: null, sortOrder: 12, isActive: true },
];

interface TrackProps {
  clients: Client[];
  reverse?: boolean;
  speed?: number;
}

function MarqueeTrack({ clients, reverse = false, speed = 40 }: TrackProps) {
  const doubled = [...clients, ...clients, ...clients];
  const duration = (clients.length * speed);

  return (
    <div className="flex overflow-hidden py-2 mask-marquee">
      <div
        className="flex gap-4 shrink-0 will-change-transform"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {doubled.map((client, i) => (
          <ClientCard key={`${client.id}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
}

function ClientCard({ client }: { client: Client }) {
  return (
    <div
      className="flex-none flex flex-col justify-between rounded-xl px-6 py-4 border border-white/8 bg-white/[0.03] hover:border-secondary/30 hover:bg-white/[0.06] transition-all duration-300 cursor-default group"
      style={{ minWidth: 200, maxWidth: 240 }}
    >
      {/* Monogram / Initial */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
          <span className="text-secondary font-black text-sm">
            {client.name.charAt(0)}
          </span>
        </div>
        <span className="font-bold text-white text-sm leading-tight line-clamp-1">
          {client.name}
        </span>
      </div>
      {client.industry && (
        <span className="text-[10px] font-semibold text-white/35 uppercase tracking-widest">
          {client.industry}
        </span>
      )}
    </div>
  );
}

export function ClientMarquee() {
  const { t } = useLanguage();
  const { data: clients } = useListClients();

  const items: Client[] = (clients && clients.length > 0 ? clients : FALLBACK_CLIENTS).filter(
    (c: Client) => c.isActive !== false,
  );

  // Split into two rows
  const half = Math.ceil(items.length / 2);
  const row1 = items.slice(0, half);
  const row2 = items.slice(half);

  return (
    <section className="py-20 overflow-hidden bg-background relative">
      {/* Edge fades */}
      <div
        className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, hsl(var(--background)) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, hsl(var(--background)) 0%, transparent 100%)",
        }}
      />

      {/* Section header */}
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
      <div className="flex flex-col gap-4">
        <MarqueeTrack clients={row1} speed={38} />
        <MarqueeTrack clients={row2.length > 0 ? row2 : row1} reverse speed={42} />
      </div>

      {/* Inline keyframes */}
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
