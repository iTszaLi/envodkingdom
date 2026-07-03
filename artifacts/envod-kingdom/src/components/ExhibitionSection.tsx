import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { CheckCircle2, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const SERVICES_GROUP = [
  { en: "ATA Carnet",         ar: "كارنيه ATA" },
  { en: "Exhibition Cargo",   ar: "بضائع المعارض" },
  { en: "Temporary Imports",  ar: "الاستيراد المؤقت" },
  { en: "Temporary Exports",  ar: "التصدير المؤقت" },
];
const CAPABILITIES_GROUP = [
  { en: "Customs Clearance",       ar: "التخليص الجمركي" },
  { en: "Event Equipment",         ar: "معدات الفعاليات" },
  { en: "Trade Show Logistics",    ar: "لوجستيات المعارض" },
  { en: "Re-Exports",              ar: "إعادة التصدير" },
];

const EVENTS = [
  { name: "LEAP", sub: "Riyadh" },
  { name: "Saudi Build", sub: "Riyadh" },
  { name: "Cityscape", sub: "Global" },
  { name: "Big 5", sub: "Construct Saudi" },
  { name: "Saudi Food Show", sub: "Riyadh" },
  { name: "INDEX Saudi", sub: "Jeddah" },
];

const TIMELINE = [
  { en: "Consultation",     ar: "الاستشارة",       num: "01" },
  { en: "Planning",         ar: "التخطيط",         num: "02" },
  { en: "Documentation",    ar: "التوثيق",         num: "03" },
  { en: "Transportation",   ar: "النقل",           num: "04" },
  { en: "Venue Delivery",   ar: "التسليم للموقع", num: "05" },
  { en: "On-site Support",  ar: "الدعم الميداني", num: "06" },
  { en: "Return Logistics", ar: "اللوجستيات العكسية", num: "07" },
];

const STATS = [
  { v: "25+",  en: "Years Serving\nSaudi Exhibitions",     ar: "عاماً في\nالمعارض السعودية" },
  { v: "500+", en: "Events\nCoordinated",                  ar: "فعالية\nمنسقة" },
  { v: "24hr", en: "ATA Carnet\nProcessing",               ar: "معالجة\nكارنيه ATA" },
];

function CategoryList({ items, label, labelAr, isRtl }: { items: typeof SERVICES_GROUP; label: string; labelAr: string; isRtl: boolean }) {
  return (
    <div>
      <p className={`text-[10px] font-bold tracking-[0.3em] uppercase text-secondary/80 mb-3 ${isRtl ? "text-right" : ""}`}>
        {isRtl ? labelAr : label}
      </p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: isRtl ? 16 : -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i, duration: 0.4 }}
            className={`flex items-center gap-2.5 ${isRtl ? "flex-row-reverse" : ""}`}
          >
            <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
            <span className="text-white/75 text-sm font-medium">{isRtl ? item.ar : item.en}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function ExhibitionSection() {
  const { t, isRtl } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.3 });

  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #020d1c 0%, #030f22 60%, #020b18 100%)" }}>

      {/* ── Top accent ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-secondary/35 to-transparent" />

      {/* ── Ambient glow ── */}
      <div className="absolute pointer-events-none" style={{ top: "10%", left: "30%", width: 600, height: 600, background: "radial-gradient(ellipse, rgba(214,40,40,0.06) 0%, transparent 70%)", transform: "translate(-50%,0)" }} />

      {/* ══════════════════════════════════════════════════════════
          MAIN TWO-COLUMN SECTION
      ══════════════════════════════════════════════════════════ */}
      <div className="container mx-auto px-6 md:px-8 xl:px-12 py-28">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start ${isRtl ? "direction-rtl" : ""}`}>

          {/* ── LEFT: Text Content ── */}
          <div className={isRtl ? "lg:order-2 text-right" : ""}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-secondary text-[10px] font-bold tracking-[0.4em] uppercase mb-6"
            >
              {t("EXHIBITION LOGISTICS SPECIALISTS", "متخصصو لوجستيات المعارض")}
            </motion.p>

            {/* Heading — large, bold, keyword highlighted */}
            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.7, ease: [0.22,1,0.36,1] as [number,number,number,number] }}
              className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-[1.04] tracking-tight mb-8"
            >
              {isRtl ? (
                <>
                  متخصصو لوجستيات
                  <br />
                  <span className="text-secondary">المعارض والفعاليات</span>
                  <br />
                  في المملكة العربية السعودية
                </>
              ) : (
                <>
                  Saudi Arabia's
                  <br />
                  <span className="text-secondary">Exhibition & Event</span>
                  <br />
                  Logistics Experts
                </>
              )}
            </motion.h2>

            {/* Body — narrow for readability */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18 }}
              className="text-white/58 text-base leading-[1.9] mb-10 max-w-lg"
            >
              {t(
                "ENVOD KINGDOM has more than 25 years of experience supporting exhibitions, trade shows, sporting events, and international conferences across Saudi Arabia and the GCC — with ATA Carnet processing recognised as the fastest in the Kingdom.",
                "تمتلك انفود كينجدم أكثر من 25 عاماً من الخبرة في دعم المعارض والمؤتمرات والفعاليات الرياضية والأحداث الدولية عبر المملكة والخليج، مع معالجة كارنيه ATA المعترف بها كالأسرع في المملكة.",
              )}
            </motion.p>

            {/* Two-column specialisation groups */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.26 }}
              className={`grid grid-cols-2 gap-8 mb-10 ${isRtl ? "text-right" : ""}`}
            >
              <CategoryList items={SERVICES_GROUP}     label="Services"      labelAr="الخدمات"    isRtl={isRtl} />
              <CategoryList items={CAPABILITIES_GROUP} label="Capabilities"  labelAr="القدرات"    isRtl={isRtl} />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/contact"
                className={`inline-flex items-center gap-2.5 bg-secondary hover:bg-secondary/85 text-white px-8 py-4 rounded-xl font-black text-[13px] uppercase tracking-wider transition-all shadow-lg shadow-secondary/20 hover:shadow-secondary/35 hover:-translate-y-px ${isRtl ? "flex-row-reverse" : ""}`}
              >
                {t("Request Exhibition Quote", "اطلب عرض سعر للمعرض")}
                <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT: Cinematic Visual Panel ── */}
          <div className={`relative ${isRtl ? "lg:order-1" : ""}`}>
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.22,1,0.36,1] as [number,number,number,number] }}
              className="relative rounded-3xl overflow-hidden"
              style={{ height: 480 }}
            >
              {/* Cinematic background */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${import.meta.env.BASE_URL}E1_exhibition.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                }}
              />
              {/* Strong overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(2,13,28,0.72) 0%, rgba(10,35,66,0.50) 50%, rgba(2,13,28,0.80) 100%)" }} />
              {/* Red glow */}
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 20% 70%, rgba(214,40,40,0.18) 0%, transparent 60%)" }} />
              {/* Border */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10" />

              {/* Stats overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className={`flex items-end justify-between gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                  {STATS.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className={`flex-1 ${isRtl ? "text-right" : "text-left"}`}
                    >
                      <div className="text-3xl xl:text-4xl font-black text-secondary leading-none mb-1">{s.v}</div>
                      <div className="text-white/50 text-[10px] uppercase tracking-wider leading-tight whitespace-pre-line">{isRtl ? s.ar : s.en}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Top badge */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-4 py-1.5">
                  <span className="text-white text-[11px] font-bold tracking-wider">EXHIBITION SPECIALISTS</span>
                </div>
                <div className="bg-secondary/20 backdrop-blur-md border border-secondary/30 rounded-full px-3 py-1.5">
                  <span className="text-secondary text-[11px] font-black tracking-wider">ATA CARNET</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          TRUSTED AT — Events marquee
      ══════════════════════════════════════════════════════════ */}
      <div className="border-t border-white/6 py-12">
        <div className="container mx-auto px-6 md:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-white/30 text-[10px] font-bold tracking-[0.4em] uppercase mb-8 ${isRtl ? "text-right" : "text-center"}`}
          >
            {t("TRUSTED AT MAJOR SAUDI & GCC EVENTS", "موثوق به في كبرى الفعاليات السعودية والخليجية")}
          </motion.p>
          <div className={`flex flex-wrap items-center justify-center gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
            {EVENTS.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -2, borderColor: "rgba(214,40,40,0.35)" }}
                className="flex flex-col items-center px-6 py-3.5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 cursor-default min-w-[110px]"
              >
                <span className="text-white font-black text-base tracking-tight">{event.name}</span>
                <span className="text-white/35 text-[10px] tracking-wider mt-0.5">{event.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          PROCESS TIMELINE
      ══════════════════════════════════════════════════════════ */}
      <div className="border-t border-white/6 py-20 overflow-hidden" ref={timelineRef}>
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mb-14 ${isRtl ? "text-right" : "text-center"}`}
          >
            <p className="text-secondary text-[10px] font-bold tracking-[0.4em] uppercase mb-3">
              {t("OUR PROCESS", "عمليتنا")}
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              {t("End-to-End Exhibition Logistics Workflow", "سير عمل لوجستيات المعارض من البداية للنهاية")}
            </h3>
          </motion.div>

          {/* Timeline track */}
          <div className="relative">
            {/* Animated horizontal line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-white/8">
              <motion.div
                className="h-full bg-gradient-to-r from-secondary/60 to-secondary/20"
                initial={{ scaleX: 0, originX: 0 }}
                animate={timelineInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.4, ease: [0.22,1,0.36,1] as [number,number,number,number] }}
              />
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-7 gap-6 md:gap-2 ${isRtl ? "direction-rtl" : ""}`}>
              {TIMELINE.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
                  className={`flex flex-col items-center text-center gap-3 ${isRtl ? "direction-ltr" : ""}`}
                >
                  {/* Circle node */}
                  <div className="relative z-10 w-16 h-16 rounded-full border border-secondary/40 bg-[#030f22] flex flex-col items-center justify-center shadow-lg shadow-secondary/10">
                    <span className="text-secondary text-[10px] font-black tracking-widest">{step.num}</span>
                  </div>

                  {/* Arrow connector (not on last) */}
                  {i < TIMELINE.length - 1 && (
                    <ChevronRight className="hidden md:block absolute -right-3 top-5 w-4 h-4 text-secondary/30 translate-x-1/2 z-10" />
                  )}

                  <div>
                    <p className="text-white font-bold text-xs leading-tight">{isRtl ? step.ar : step.en}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
