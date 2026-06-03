import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { Star, FileCheck, Repeat2, Package, Truck, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const SPECIALIZATIONS = [
  { en: "ATA Carnet", ar: "كارنيه ATA" },
  { en: "Temporary Imports", ar: "الاستيراد المؤقت" },
  { en: "Temporary Exports", ar: "التصدير المؤقت" },
  { en: "Re-Exports", ar: "إعادة التصدير" },
  { en: "Exhibition Cargo", ar: "بضائع المعارض" },
  { en: "Event Equipment", ar: "معدات الفعاليات" },
  { en: "Trade Show Logistics", ar: "لوجستيات المعارض التجارية" },
  { en: "Customs Clearance", ar: "التخليص الجمركي" },
];

const FEATURES = [
  {
    icon: Star,
    en: "25+ years supporting Saudi Arabia's largest exhibitions and trade shows",
    ar: "أكثر من 25 عاماً في دعم أكبر المعارض والمؤتمرات في المملكة",
  },
  {
    icon: FileCheck,
    en: "ATA Carnet specialist — fastest processing in the Kingdom",
    ar: "متخصص كارنيه ATA — أسرع معالجة في المملكة",
  },
  {
    icon: Repeat2,
    en: "Seamless temporary import and re-export documentation",
    ar: "توثيق سلس للاستيراد المؤقت وإعادة التصدير",
  },
  {
    icon: Truck,
    en: "Time-critical delivery to all Saudi exhibition venues",
    ar: "توصيل حساس للوقت إلى جميع مواقع المعارض السعودية",
  },
];

export function ExhibitionSection() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: "linear-gradient(135deg, #020d1c 0%, #030f22 50%, #04111f 100%)" }}>
      {/* Animated route lines (SVG) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="line1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#D62828" stopOpacity="0" />
              <stop offset="50%" stopColor="#D62828" stopOpacity="1" />
              <stop offset="100%" stopColor="#D62828" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[20, 40, 60, 80].map((y, i) => (
            <motion.line
              key={i}
              x1="-10%"
              y1={`${y}%`}
              x2="110%"
              y2={`${y + (i % 2 === 0 ? 5 : -5)}%`}
              stroke="url(#line1)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: i * 0.3, ease: "easeInOut" }}
            />
          ))}
        </svg>
      </div>

      {/* Top accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isRtl ? "direction-rtl" : ""}`}>

          {/* Left: Content */}
          <div className={isRtl ? "lg:order-2 text-right" : ""}>
            <motion.p
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-secondary text-[10px] font-bold tracking-[0.4em] uppercase mb-5"
            >
              {t("EXHIBITION LOGISTICS SPECIALISTS", "متخصصو لوجستيات المعارض")}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black text-white leading-tight mb-6"
            >
              {t("Saudi Arabia's", "متخصصو لوجستيات")}
              <br />
              <span className="text-secondary">
                {t("Exhibition & Event", "المعارض والفعاليات")}
              </span>
              <br />
              {t("Logistics Specialists", "في المملكة العربية السعودية")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 leading-relaxed mb-8 text-sm md:text-base"
            >
              {t(
                "ENVOD KINGDOM SHIPPING SERVICES LLC has more than 25 years of experience supporting exhibitions, trade shows, sporting events, conferences and international events across Saudi Arabia and the GCC.",
                "تمتلك انفود كينجدم لخدمات الشحن ذ.م.م. أكثر من 25 عاماً من الخبرة في دعم المعارض والمؤتمرات والفعاليات الرياضية والأحداث الدولية عبر المملكة العربية السعودية ودول الخليج.",
              )}
            </motion.p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {FEATURES.map(({ icon: Icon, en, ar }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className={`flex items-start gap-3 ${isRtl ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-secondary" />
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {isRtl ? ar : en}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/contact"
                className={`inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-secondary/20 ${isRtl ? "flex-row-reverse" : ""}`}
              >
                {t("Get Exhibition Quote", "احصل على عرض سعر")}
                <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              </Link>
            </motion.div>
          </div>

          {/* Right: Specialization grid */}
          <div className={isRtl ? "lg:order-1" : ""}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(214,40,40,0.12) 0%, transparent 70%)",
                }}
              />

              <div className="relative rounded-3xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-8">
                <p className={`text-xs font-bold tracking-[0.3em] uppercase text-secondary mb-6 ${isRtl ? "text-right" : ""}`}>
                  {t("SPECIALIZATIONS", "التخصصات")}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {SPECIALIZATIONS.map((spec, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.06 }}
                      whileHover={{ scale: 1.03, borderColor: "rgba(214,40,40,0.5)" }}
                      className={`flex items-center gap-2.5 p-3.5 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-secondary/5 transition-all cursor-default ${isRtl ? "flex-row-reverse text-right" : ""}`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                      <span className="text-white/80 text-sm font-medium">
                        {isRtl ? spec.ar : spec.en}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Stats bar */}
                <div className="mt-8 pt-6 border-t border-white/8 grid grid-cols-3 gap-4 text-center">
                  {[
                    { value: "25+", label: t("Years", "سنة"), labelLine2: t("Experience", "خبرة") },
                    { value: "500+", label: t("Events", "فعالية"), labelLine2: t("Supported", "مدعومة") },
                    { value: "24hr", label: t("ATA Carnet", "كارنيه ATA"), labelLine2: t("Processing", "معالجة") },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="text-2xl font-black text-secondary">{s.value}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
                        {s.label}<br />{s.labelLine2}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
