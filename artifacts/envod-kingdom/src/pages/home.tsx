import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, Clock, Shield, Globe2, CheckCircle2, ArrowRight,
} from "lucide-react";
import { ScrollAnimSection, type AnimChapter } from "@/components/ScrollAnimSection";
import { StatsCounter } from "@/components/StatsCounter";
import { ClientMarquee } from "@/components/ClientMarquee";
import { ServicesSection } from "@/components/ServicesSection";
import { ExhibitionSection } from "@/components/ExhibitionSection";
import { CustomsClearanceSection } from "@/components/CustomsClearanceSection";

const craneChapters: AnimChapter[] = [
  {
    startProgress: 0,
    endProgress: 0.48,
    title: "25+ YEARS OF LOGISTICS EXCELLENCE.",
    titleAr: "أكثر من 25 عاماً من التميز اللوجستي.",
    subtitle: "Saudi Arabia's Trusted Partner For Exhibition Logistics, ATA Carnet Services, Customs Clearance and Global Freight Solutions.",
    subtitleAr: "الشريك الموثوق للمملكة العربية السعودية في لوجستيات المعارض وكارنيه ATA والتخليص الجمركي.",
  },
  {
    startProgress: 0.5,
    endProgress: 1,
    title: "Connecting Saudi Arabia. To The World.",
    titleAr: "ربط المملكة العربية السعودية. بالعالم.",
    subtitle: "Serving Saudi Arabia, GCC Countries and Global Markets for More Than 25 Years.",
    subtitleAr: "نخدم المملكة العربية السعودية ودول الخليج والأسواق العالمية منذ أكثر من 25 عاماً.",
  },
];

const airChapters: AnimChapter[] = [
  {
    startProgress: 0,
    endProgress: 0.48,
    title: "Fast. Reliable. Worldwide.",
    titleAr: "سريع. موثوق. عالمي.",
    subtitle: "Air and ocean freight solutions connecting Saudi Arabia to 50+ countries with guaranteed transit times.",
    subtitleAr: "حلول الشحن الجوي والبحري تربط المملكة بأكثر من 50 دولة بأوقات عبور مضمونة.",
  },
  {
    startProgress: 0.5,
    endProgress: 1,
    title: "Customs Clearance. Under 24 Hours.",
    titleAr: "التخليص الجمركي. خلال 24 ساعة.",
    subtitle: "SABER & SFDA certified. ATA Carnet specialists. Direct Saudi Customs Authority relationships.",
    subtitleAr: "معتمد سابر وهيئة الغذاء والدواء. متخصصون كارنيه ATA. علاقات مباشرة مع هيئة الجمارك السعودية.",
  },
];

const warehouseChapters: AnimChapter[] = [
  {
    startProgress: 0,
    endProgress: 0.48,
    title: "Exhibition. Project. Transit. Cargo.",
    titleAr: "معارض. مشاريع. عبور. بضائع.",
    subtitle: "Specialized logistics for temporary imports, re-exports, project cargo and transit shipments across the GCC.",
    subtitleAr: "خدمات لوجستية متخصصة للاستيراد المؤقت وإعادة التصدير وبضائع المشاريع.",
  },
  {
    startProgress: 0.5,
    endProgress: 1,
    title: "Technology Driven. Saudi Excellence.",
    titleAr: "تقنيات متقدمة. تميز سعودي.",
    subtitle: "State-of-the-art warehousing, fleet management and supply chain solutions across Saudi Arabia.",
    subtitleAr: "تخزين وإدارة أسطول وحلول سلسلة التوريد المتطورة في جميع أنحاء المملكة العربية السعودية.",
  },
];

export default function Home() {
  const { t, isRtl } = useLanguage();
  const [, setLocation] = useLocation();
  const [tracking, setTracking] = useState("");

  const handleTrack = (e: FormEvent) => {
    e.preventDefault();
    if (tracking) setLocation(`/track?id=${tracking}`);
  };

  return (
    <div className="w-full">

      {/* ── Scroll-Driven Animation Sections (Autoplay) ── */}
      <ScrollAnimSection
        frameFolder="crane"
        frameCount={120}
        chapters={craneChapters}
        isRtl={isRtl}
      />

      <ScrollAnimSection
        frameFolder="air"
        frameCount={120}
        chapters={airChapters}
        isRtl={isRtl}
      />

      <ScrollAnimSection
        frameFolder="warehouse"
        frameCount={120}
        chapters={warehouseChapters}
        isRtl={isRtl}
      />

      {/* ── Stats Counter ── */}
      <StatsCounter />

      {/* ── Exhibition Logistics Highlight ── */}
      <ExhibitionSection />

      {/* ── Comprehensive Services ── */}
      <ServicesSection />

      {/* ── Customs Clearance ── */}
      <CustomsClearanceSection />

      {/* ── Client Logo Marquee ── */}
      <ClientMarquee />

      {/* ── Track Shipment ── */}
      <section className="py-16 bg-card/60 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-secondary text-[10px] font-bold tracking-[0.4em] uppercase mb-3">
              {t("REAL-TIME TRACKING", "التتبع الفوري")}
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t("Track Your Cargo", "تتبع شحنتك")}
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              {t("Enter your tracking, reference, or invoice number.", "أدخل رقم التتبع أو المرجع أو الفاتورة.")}
            </p>
            <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-2 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className={`absolute ${isRtl ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4`} />
                <Input
                  value={tracking}
                  onChange={(e) => setTracking(e.target.value)}
                  placeholder={t("e.g. ENVOD-2024-001", "مثال: ENVOD-2024-001")}
                  className={`bg-background border-white/10 text-white ${isRtl ? "pr-10" : "pl-10"} py-5`}
                />
              </div>
              <Button type="submit" className="bg-secondary hover:bg-secondary/90 text-white py-5 px-7 shrink-0">
                {t("Track", "تتبع")}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── Why ENVOD — 8 Pillars ── */}
      <section className="py-28 bg-background relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-16 ${isRtl ? "rtl" : ""}`}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-secondary text-[10px] font-bold tracking-[0.4em] uppercase mb-3"
            >
              {t("WHY ENVOD KINGDOM", "لماذا انفود كينجدم")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black text-white"
            >
              {t("Saudi Arabia's", "الشريك")}
              <span className="text-secondary"> {t("Premium Logistics Partner", "اللوجستي الأول في المملكة")}</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Clock,        stat: "24hr",  en: "Customs Clearance",          ar: "تخليص جمركي" },
              { icon: Globe2,       stat: "50+",   en: "Countries Served",            ar: "دولة نخدمها" },
              { icon: Shield,       stat: "SABER", en: "SFDA Certified",              ar: "معتمد سابر وهيئة الغذاء" },
              { icon: CheckCircle2, stat: "25+",   en: "Years Experience",            ar: "عاماً من الخبرة" },
              { icon: CheckCircle2, stat: "99.8%", en: "On-Time Delivery",            ar: "نسبة التسليم في الموعد" },
              { icon: Globe2,       stat: "GCC",   en: "Wide Coverage",              ar: "تغطية خليجية شاملة" },
              { icon: Shield,       stat: "ATA",   en: "Carnet Specialists",          ar: "متخصصو كارنيه" },
              { icon: CheckCircle2, stat: "EXH",   en: "Exhibition Logistics Experts", ar: "خبراء لوجستيات المعارض" },
            ].map(({ icon: Icon, stat, en, ar }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className={`bg-card rounded-xl p-6 border border-white/5 hover:border-secondary/30 transition-all group cursor-default ${isRtl ? "text-right" : ""}`}
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Icon className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-2xl font-black text-secondary mb-1">{stat}</div>
                <div className="text-sm font-semibold text-white">{isRtl ? ar : en}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #020d1c 0%, #030f22 100%)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(214,40,40,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-secondary text-[10px] font-bold tracking-[0.4em] uppercase mb-6">
              {t("GET STARTED TODAY", "ابدأ اليوم")}
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4 max-w-4xl mx-auto leading-tight">
              {t("Ready To Ship With", "مستعد للشحن")}
              <span className="text-secondary"> {t("Confidence?", "بثقة؟")}</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto mb-10 text-sm leading-relaxed">
              {t(
                "Join 500+ Saudi companies who trust ENVOD KINGDOM for exhibition logistics, customs clearance, project cargo and global freight.",
                "انضم إلى أكثر من 500 شركة سعودية تثق في انفود كينجدم للوجستيات المعارض والتخليص الجمركي وبضائع المشاريع.",
              )}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRtl ? "sm:flex-row-reverse" : ""}`}>
              <Link
                href="/contact"
                className={`inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white py-4 px-10 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-secondary/20 ${isRtl ? "flex-row-reverse" : ""}`}
              >
                {t("Get a Free Quote", "احصل على عرض سعر مجاني")}
                <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              </Link>
              <a
                href="https://wa.me/966502260256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 px-10 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {t("WhatsApp Us", "تواصل عبر واتساب")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
