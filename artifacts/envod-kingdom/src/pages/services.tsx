import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useListServices } from "@workspace/api-client-react";
import type { Service } from "@workspace/api-client-react";
import {
  Ship, Plane, Truck, Package, ShieldCheck, Clock, FileCheck,
  Warehouse, GitBranch, MapPin, ShoppingCart, Star,
  Heart, UtensilsCrossed, PawPrint,
  CheckCircle2, ArrowRight, Globe2, Award,
} from "lucide-react";

// ─── Extended per-service config ────────────────────────────────────────────
interface ServiceExt {
  features: string[];
  featuresAr: string[];
  tag?: string;
  tagAr?: string;
  spotlight?: boolean;
}

const EXT: Record<number, ServiceExt> = {
  1:  { features: ["FCL & LCL options", "Global port coverage", "Ro-Ro & break bulk", "Port-to-door delivery", "Dangerous goods handling"], featuresAr: ["خيارات FCL وLCL", "تغطية الموانئ العالمية", "شحن رورو والبضائع السائبة", "توصيل من الميناء للباب", "مناولة البضائع الخطرة"] },
  2:  { features: ["Express & charter flights", "50+ country network", "Perishable & pharma", "Time-definite delivery", "Door-to-airport service"], featuresAr: ["رحلات سريعة ومستأجرة", "شبكة 50+ دولة", "البضائع القابلة للتلف والأدوية", "توصيل بموعد محدد", "خدمة من الباب للمطار"] },
  3:  { features: ["FTL & LTL options", "Saudi Arabia & GCC", "Cross-border customs", "Refrigerated transport", "Dedicated fleet"], featuresAr: ["حمولات كاملة وجزئية", "المملكة ودول الخليج", "تخليص جمركي عبر الحدود", "نقل مبرد", "أسطول مخصص"] },
  4:  { features: ["Saudi Customs expertise", "SABER & SFDA support", "ATA Carnet processing", "Temporary import clearance", "Re-export documentation", "24-hour guarantee"], featuresAr: ["خبرة جمارك سعودية", "دعم سابر وهيئة الغذاء والدواء", "معالجة كارنيه ATA", "تخليص الاستيراد المؤقت", "وثائق إعادة التصدير", "ضمان 24 ساعة"], tag: "24hr Guarantee", tagAr: "ضمان 24 ساعة" },
  5:  { features: ["Bonded warehousing", "Inventory management system", "Pick & pack services", "Temperature-controlled zones", "24/7 security & CCTV"], featuresAr: ["مستودعات جمركية", "نظام إدارة المخزون", "خدمات التجميع والتغليف", "مناطق مبردة", "أمن على مدار الساعة"] },
  6:  { features: ["End-to-end coordination", "Multi-modal solutions", "Documentation handling", "Insurance & cargo cover", "Real-time tracking"], featuresAr: ["تنسيق من البداية للنهاية", "حلول متعددة الوسائط", "معالجة الوثائق", "تأمين وتغطية الشحن", "تتبع في الوقت الفعلي"] },
  7:  { features: ["Supply chain optimization", "Vendor management", "Last-mile delivery", "KPI reporting & analytics", "ERP integration"], featuresAr: ["تحسين سلسلة التوريد", "إدارة الموردين", "توصيل المرحلة الأخيرة", "تقارير مؤشرات الأداء", "تكامل مع أنظمة ERP"] },
  8:  { features: ["Heavy & oversized cargo", "Oil & gas equipment", "Route & feasibility study", "Crane & rigging services", "Multi-modal execution"], featuresAr: ["الشحنات الثقيلة والضخمة", "معدات النفط والغاز", "دراسة المسار والجدوى", "خدمات الرافعات", "تنفيذ متعدد الوسائط"], tag: "Specialist", tagAr: "متخصص" },
  9:  { features: ["Residential & corporate", "Packing & unpacking", "International relocation", "Customs support", "Door-to-door guarantee"], featuresAr: ["سكني ومؤسسي", "تغليف وفك التغليف", "انتقال دولي", "دعم جمركي", "ضمان من باب لباب"] },
  10: { features: ["Last-mile delivery", "Returns management", "Fulfillment centers", "COD collection", "E-commerce platform integration"], featuresAr: ["توصيل المرحلة الأخيرة", "إدارة المرتجعات", "مراكز الوفاء", "تحصيل الدفع عند الاستلام", "تكامل منصات التجارة الإلكترونية"] },
  11: { features: ["ATA Carnet management", "Temporary import & re-export", "Venue delivery coordination", "Time-critical transport", "Exhibition crating & packing", "On-site support"], featuresAr: ["إدارة كارنيه ATA", "الاستيراد المؤقت وإعادة التصدير", "تنسيق توصيل قاعة المعرض", "نقل حساس للوقت", "تغليف وتعبئة معارض", "دعم في الموقع"], tag: "ENVOD Specialist", tagAr: "متخصص انفود", spotlight: true },
  12: { features: ["Cold chain management", "Pharmaceutical compliance", "SFDA-cleared shipments", "Hospital & clinic delivery", "Controlled temperature tracking"], featuresAr: ["إدارة سلسلة التبريد", "امتثال صيدلاني", "شحنات مخلصة من هيئة الغذاء والدواء", "توصيل للمستشفيات والعيادات", "تتبع درجات الحرارة المضبوطة"], tag: "Cold Chain", tagAr: "سلسلة تبريد" },
  13: { features: ["Temperature-controlled transport", "SFDA food clearance", "Halal certification support", "Perishable goods handling", "Supermarket distribution"], featuresAr: ["نقل بدرجات حرارة مضبوطة", "تخليص غذائي من هيئة الغذاء والدواء", "دعم شهادة الحلال", "مناولة البضائع القابلة للتلف", "توزيع للسوبرماركت"] },
  14: { features: ["SFDA veterinary import", "Live animal transport", "Animal health certificates", "Quarantine coordination", "GCC animal movement"], featuresAr: ["استيراد بيطري من هيئة الغذاء والدواء", "نقل الحيوانات الحية", "شهادات صحة الحيوانات", "تنسيق الحجر الصحي", "تنقل الحيوانات خليجياً"] },
};

// ─── Icon resolver ───────────────────────────────────────────────────────────
function ServiceIcon({ name, className = "w-7 h-7" }: { name: string; className?: string }) {
  const map: Record<string, React.ElementType> = {
    Ship, Plane, Truck, Package, Warehouse, FileCheck, GitBranch,
    Container: Package, MapPin, ShoppingCart, Calendar: Star,
    Heart, UtensilsCrossed, PawPrint, ShieldCheck, Clock,
  };
  const Icon = map[name] ?? Package;
  return <Icon className={className} />;
}

// ─── Spotlight card ──────────────────────────────────────────────────────────
function SpotlightCard({ service, isRtl }: { service: Service; isRtl: boolean }) {
  const { t } = useLanguage();
  const ext = EXT[service.id] ?? { features: [], featuresAr: [] };
  const features = isRtl ? ext.featuresAr : ext.features;
  const name = isRtl ? service.nameAr : service.name;
  const desc = isRtl ? service.descriptionAr : service.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl overflow-hidden border border-secondary/25"
      style={{ background: "linear-gradient(135deg, rgba(214,40,40,0.07) 0%, rgba(10,35,66,0.55) 100%)" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 55% at 25% 40%, rgba(214,40,40,0.09) 0%, transparent 70%)" }} />

      <div className={`grid grid-cols-1 md:grid-cols-2 ${isRtl ? "md:flex-row-reverse" : ""}`}>
        {/* Content */}
        <div className={`p-8 md:p-12 ${isRtl ? "text-right" : ""}`}>
          <div className={`flex items-center gap-3 mb-6 ${isRtl ? "flex-row-reverse" : ""}`}>
            <div className="w-14 h-14 rounded-2xl bg-secondary/15 border border-secondary/30 flex items-center justify-center shrink-0">
              <ServiceIcon name={service.icon} className="w-7 h-7 text-secondary" />
            </div>
            {ext.tag && (
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase bg-secondary/20 text-secondary border border-secondary/30 px-3 py-1 rounded-full">
                {isRtl ? ext.tagAr : ext.tag}
              </span>
            )}
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">{name}</h3>
          <p className="text-white/55 text-sm leading-relaxed mb-8">{desc}</p>

          <ul className="space-y-2.5 mb-8">
            {features.map((f, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: isRtl ? 12 : -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.055 }}
                className={`flex items-center gap-2.5 text-sm text-white/70 ${isRtl ? "flex-row-reverse" : ""}`}
              >
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                {f}
              </motion.li>
            ))}
          </ul>

          <Link
            href="/contact"
            className={`inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-7 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-secondary/20 ${isRtl ? "flex-row-reverse" : ""}`}
          >
            {t("Get a Quote", "احصل على عرض سعر")}
            <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
          </Link>
        </div>

        {/* Stats panel */}
        <div className={`border-t md:border-t-0 md:border-l border-white/8 p-8 md:p-12 flex flex-col justify-center gap-8 ${isRtl ? "text-right" : ""}`}>
          {[
            { v: "25+",  l: t("Years Supporting Exhibitions", "عاماً في دعم المعارض") },
            { v: "500+", l: t("Events Coordinated", "فعالية منسقة") },
            { v: "24hr", l: t("ATA Carnet Processing", "معالجة كارنيه ATA") },
            { v: "GCC",  l: t("Wide Event Coverage", "تغطية فعاليات خليجية") },
          ].map(({ v, l }) => (
            <div key={v}>
              <div className="text-3xl font-black text-secondary">{v}</div>
              <div className="text-xs text-white/40 uppercase tracking-wider mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Standard service card ────────────────────────────────────────────────
function ServiceCard({ service, index, isRtl }: { service: Service; index: number; isRtl: boolean }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const ext = EXT[service.id] ?? { features: [], featuresAr: [] };
  const features = isRtl ? ext.featuresAr : ext.features;
  const name = isRtl ? service.nameAr : service.name;
  const desc = isRtl ? service.descriptionAr : service.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: (index % 3) * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        onClick={() => setExpanded((e) => !e)}
        className={`group rounded-2xl border border-white/8 bg-white/[0.03] hover:border-secondary/35 hover:bg-secondary/[0.03] transition-all duration-300 cursor-pointer overflow-hidden h-full ${isRtl ? "text-right" : ""}`}
      >
        {/* Hover top bar */}
        <div className="h-0.5 bg-gradient-to-r from-secondary/0 via-secondary/60 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="p-6">
          {/* Header */}
          <div className={`flex items-start gap-3 mb-4 ${isRtl ? "flex-row-reverse" : ""}`}>
            <div className="w-11 h-11 rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-colors flex items-center justify-center shrink-0">
              <ServiceIcon name={service.icon} className="w-5 h-5 text-secondary" />
            </div>
            {ext.tag && (
              <span className="text-[9px] font-bold tracking-widest uppercase bg-secondary/12 text-secondary border border-secondary/20 px-2 py-0.5 rounded-full mt-1 whitespace-nowrap">
                {isRtl ? ext.tagAr : ext.tag}
              </span>
            )}
          </div>

          <h3 className="font-bold text-white text-base mb-2 leading-snug">{name}</h3>
          <p className="text-white/48 text-sm leading-relaxed mb-5">{desc}</p>

          {/* Expand toggle */}
          <button className={`flex items-center gap-1.5 text-xs font-semibold text-secondary/60 group-hover:text-secondary transition-colors ${isRtl ? "flex-row-reverse" : ""}`}>
            <span>{expanded ? t("Hide details", "إخفاء التفاصيل") : t("View details", "عرض التفاصيل")}</span>
            <motion.svg
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </button>

          {/* Expandable */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <ul className="mt-4 space-y-2 pt-4 border-t border-white/8">
                  {features.map((f, i) => (
                    <li
                      key={i}
                      className={`flex items-center gap-2 text-xs text-white/60 ${isRtl ? "flex-row-reverse" : ""}`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  onClick={(e) => e.stopPropagation()}
                  className={`inline-flex items-center gap-1.5 mt-5 text-xs font-semibold text-secondary hover:underline underline-offset-2 transition-all ${isRtl ? "flex-row-reverse" : ""}`}
                >
                  {t("Request this service", "اطلب هذه الخدمة")}
                  <ArrowRight className={`w-3 h-3 ${isRtl ? "rotate-180" : ""}`} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
type Tab = "all" | "core" | "specialized";

export default function Services() {
  const { t, isRtl } = useLanguage();
  const { data: servicesData } = useListServices();
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const services = servicesData ?? [];
  const spotlight = services.filter((s) => EXT[s.id]?.spotlight);
  const nonSpotlight = services.filter((s) => !EXT[s.id]?.spotlight);

  const filtered =
    activeTab === "all"
      ? nonSpotlight
      : activeTab === "core"
        ? services.filter((s) => s.category === "core")
        : services.filter((s) => s.category === "specialized" && !EXT[s.id]?.spotlight);

  const tabs: { id: Tab; label: string; labelAr: string; count: number }[] = [
    { id: "all",         label: "All Services",  labelAr: "جميع الخدمات", count: nonSpotlight.length },
    { id: "core",        label: "Core Services", labelAr: "الأساسية",      count: services.filter((s) => s.category === "core").length },
    { id: "specialized", label: "Specialized",   labelAr: "المتخصصة",      count: services.filter((s) => s.category === "specialized" && !EXT[s.id]?.spotlight).length },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ── Cinematic Hero ─────────────────────────────────────────── */}
      <div
        className="relative pt-32 pb-24 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #020d1c 0%, #030f22 60%, hsl(var(--background)) 100%)" }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Red glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(214,40,40,0.1) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className={`container mx-auto px-4 text-center ${isRtl ? "rtl" : ""}`}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-secondary text-[10px] font-bold tracking-[0.4em] uppercase mb-5"
          >
            {t("14 SPECIALIZED SERVICES", "14 خدمة متخصصة")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[1.05] mb-6 max-w-5xl mx-auto"
          >
            {t("Comprehensive", "خدمات لوجستية")}
            <span className="text-secondary"> {t("Logistics", "شاملة")}</span>
            <br />
            {t("Solutions", "ومتخصصة")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/55 max-w-2xl mx-auto text-base leading-relaxed mb-10"
          >
            {t(
              "From ATA Carnet and exhibition logistics to project cargo, medical cold-chain and GCC transportation — backed by 25+ years of Saudi expertise.",
              "من كارنيه ATA ولوجستيات المعارض إلى بضائع المشاريع والسلسلة الباردة الطبية والنقل الخليجي — مدعومة بأكثر من 25 عاماً من الخبرة السعودية.",
            )}
          </motion.p>

          {/* Inline stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`flex flex-wrap justify-center gap-8 text-sm ${isRtl ? "flex-row-reverse" : ""}`}
          >
            {[
              { icon: Award,       v: "25+",  l: t("Years",     "سنة")    },
              { icon: Globe2,      v: "50+",  l: t("Countries", "دولة")   },
              { icon: Clock,       v: "24hr", l: t("Clearance", "تخليص")  },
              { icon: ShieldCheck, v: "14",   l: t("Services",  "خدمة")   },
            ].map(({ icon: Icon, v, l }) => (
              <div key={v} className={`flex items-center gap-2 text-white/60 ${isRtl ? "flex-row-reverse" : ""}`}>
                <Icon className="w-4 h-4 text-secondary" />
                <span className="font-bold text-white">{v}</span>
                <span>{l}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Spotlight: Exhibition & Event Logistics ─────────────────── */}
      {spotlight.length > 0 && (
        <section className="py-16 container mx-auto px-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-secondary text-[10px] font-bold tracking-[0.4em] uppercase mb-6 ${isRtl ? "text-right" : ""}`}
          >
            {t("ENVOD SPECIALTY", "تخصص انفود")}
          </motion.p>
          <div className="space-y-5">
            {spotlight.map((s) => (
              <SpotlightCard key={s.id} service={s} isRtl={isRtl} />
            ))}
          </div>
        </section>
      )}

      {/* ── All Services Grid ───────────────────────────────────────── */}
      <section className="py-6 pb-28 container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`text-secondary text-[10px] font-bold tracking-[0.4em] uppercase mb-6 ${isRtl ? "text-right" : ""}`}
        >
          {t("ALL SERVICES", "جميع الخدمات")}
        </motion.p>

        {/* Tab strip */}
        <div className={`flex flex-wrap items-center gap-2 mb-8 ${isRtl ? "flex-row-reverse" : ""}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-secondary text-white shadow-lg shadow-secondary/20"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/8"
              }`}
            >
              {isRtl ? tab.labelAr : tab.label}
              <span className={`ml-2 rtl:ml-0 rtl:mr-2 text-xs font-bold tabular-nums ${activeTab === tab.id ? "text-white/70" : "text-white/25"}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Animated grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} isRtl={isRtl} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #020d1c 0%, #030f22 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(214,40,40,0.07) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/25 to-transparent" />

        <div className={`container mx-auto px-4 text-center relative z-10 ${isRtl ? "rtl" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-secondary text-[10px] font-bold tracking-[0.4em] uppercase mb-6">
              {t("GET STARTED TODAY", "ابدأ اليوم")}
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 max-w-3xl mx-auto leading-tight">
              {t("Need a Custom Logistics", "تحتاج إلى حل لوجستي")}
              <span className="text-secondary"> {t("Solution?", "مخصص؟")}</span>
            </h2>
            <p className="text-white/48 max-w-xl mx-auto mb-10 text-sm leading-relaxed">
              {t(
                "Our specialists will design a bespoke logistics plan for your exact requirements — exhibition, project cargo, or standard freight.",
                "سيصمم فريق المتخصصين لدينا خطة لوجستية مخصصة لمتطلباتك الدقيقة — معارض أو بضائع مشاريع أو شحن قياسي.",
              )}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRtl ? "sm:flex-row-reverse" : ""}`}>
              <Link
                href="/contact"
                className={`inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white py-4 px-10 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-secondary/20 ${isRtl ? "flex-row-reverse" : ""}`}
              >
                {t("Request a Quote", "اطلب عرض سعر")}
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
