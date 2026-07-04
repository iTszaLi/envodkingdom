import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { Link } from "wouter";
import { ShieldCheck, Clock, FileCheck, Repeat2, Globe2, ArrowRight, CheckCircle2 } from "lucide-react";

const FEATURES = [
  { icon: ShieldCheck, en: "Saudi Customs Expertise",          ar: "خبرة في الجمارك السعودية"             },
  { icon: CheckCircle2, en: "SABER Certification Support",    ar: "دعم شهادة سابر"                        },
  { icon: CheckCircle2, en: "SFDA Regulatory Support",        ar: "دعم هيئة الغذاء والدواء (SFDA)"        },
  { icon: FileCheck,    en: "Temporary Import Clearance",     ar: "تخليص الاستيراد المؤقت"                },
  { icon: FileCheck,    en: "ATA Carnet Processing",          ar: "معالجة كارنيه ATA"                     },
  { icon: Repeat2,      en: "Re-Export Documentation",        ar: "وثائق إعادة التصدير"                   },
  { icon: Globe2,       en: "Import / Export Compliance",     ar: "امتثال الاستيراد والتصدير"             },
];

const STEPS = [
  { step: "01", en: "Submit Documents", ar: "تقديم المستندات" },
  { step: "02", en: "Customs Review",   ar: "مراجعة الجمارك"  },
  { step: "03", en: "Approval Issued",  ar: "إصدار الموافقة"  },
  { step: "04", en: "Cargo Released",   ar: "الإفراج عن البضاعة" },
];

export function CustomsClearanceSection() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: "linear-gradient(160deg, #020c1b 0%, #041525 40%, #070e1f 100%)" }}>
      {/* Top separator */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      {/* Navy sidebar accent */}
      <div
        className={`absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-secondary to-transparent ${isRtl ? "right-0" : "left-0"}`}
      />
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 20% 50%, rgba(10,35,66,0.4) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 ${isRtl ? "rtl" : ""}`}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary text-[10px] font-bold tracking-[0.4em] uppercase mb-4"
          >
            {t("CUSTOMS EXPERTISE", "خبرة جمركية")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-4 mb-6"
          >
            <Clock className="w-10 h-10 text-secondary hidden md:block" />
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              {t("Customs Clearance", "التخليص الجمركي")}
              <br />
              <span className="text-secondary">{t("Often Within 24 Hours", "غالباً خلال 24 ساعة")}</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/55 max-w-xl mx-auto text-sm leading-relaxed"
          >
            {t(
              "Direct relationships with the Saudi Customs Authority enable us to deliver fast, reliable customs clearance across the Kingdom.",
              "علاقاتنا المباشرة مع هيئة الجمارك السعودية تمكّننا من تقديم تخليص جمركي سريع وموثوق في المملكة.",
            )}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Feature list */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`text-xs font-bold tracking-widest uppercase text-white/40 mb-6 ${isRtl ? "text-right" : ""}`}
            >
              {t("SERVICES INCLUDED", "الخدمات المشمولة")}
            </motion.p>

            <div className="space-y-3">
              {FEATURES.map(({ icon: Icon, en, ar }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isRtl ? 24 : -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ x: isRtl ? -4 : 4 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-secondary/30 hover:bg-secondary/[0.03] transition-all group cursor-default ${isRtl ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                    <Icon className="w-4.5 h-4.5 text-secondary" />
                  </div>
                  <span className="text-white/70 font-medium text-sm group-hover:text-white/90 transition-colors">
                    {isRtl ? ar : en}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 text-secondary/0 group-hover:text-secondary/70 transition-all ml-auto ${isRtl ? "rotate-180 ml-0 mr-auto" : ""}`} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className={`mt-8 ${isRtl ? "text-right" : ""}`}
            >
              <Link
                href="/contact"
                className={`inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-secondary/20 ${isRtl ? "flex-row-reverse" : ""}`}
              >
                {t("Start Customs Clearance", "ابدأ التخليص الجمركي")}
                <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              </Link>
            </motion.div>
          </div>

          {/* Right: Workflow animation */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`text-xs font-bold tracking-widest uppercase text-white/40 mb-6 ${isRtl ? "text-right" : ""}`}
            >
              {t("OUR PROCESS", "عمليتنا")}
            </motion.p>

            <div className="space-y-4">
              {STEPS.map(({ step, en, ar }, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className={`relative flex items-center gap-4 ${isRtl ? "flex-row-reverse" : ""}`}
                >
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div
                      className={`absolute top-full mt-0 w-0.5 h-4 bg-gradient-to-b from-secondary/40 to-transparent ${isRtl ? "right-6" : "left-6"}`}
                    />
                  )}

                  {/* Step bubble */}
                  <motion.div
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.1, duration: 0.4 }}
                    className="w-12 h-12 rounded-full border-2 border-secondary/40 bg-secondary/10 flex items-center justify-center shrink-0 relative z-10"
                  >
                    <span className="text-secondary font-black text-xs">{step}</span>
                  </motion.div>

                  {/* Content */}
                  <div
                    className={`flex-1 p-4 rounded-xl border border-white/8 bg-white/[0.03] backdrop-blur-sm ${isRtl ? "text-right" : ""}`}
                  >
                    <p className="text-white font-semibold text-sm">{isRtl ? ar : en}</p>
                    <div className="mt-2 h-0.5 bg-gradient-to-r from-secondary/0 via-secondary/30 to-secondary/0 rounded-full" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 24hr commitment badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className={`mt-8 p-5 rounded-2xl border border-secondary/30 bg-secondary/5 backdrop-blur-sm ${isRtl ? "text-right" : ""}`}
            >
              <div className={`flex items-center gap-3 mb-2 ${isRtl ? "flex-row-reverse" : ""}`}>
                <Clock className="w-5 h-5 text-secondary" />
                <span className="text-secondary font-bold text-sm tracking-wider uppercase">
                  {t("ENVOD COMMITMENT", "التزام انفود")}
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                {t(
                  "We work to clear customs as quickly as possible — many shipments clear within 24 hours — and we personally follow up with the Saudi Customs Authority on your behalf.",
                  "نعمل على إنجاز التخليص الجمركي بأسرع وقت ممكن — وتُخلَّص العديد من الشحنات خلال 24 ساعة — ونتابع شخصياً مع هيئة الجمارك السعودية نيابةً عنك.",
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
