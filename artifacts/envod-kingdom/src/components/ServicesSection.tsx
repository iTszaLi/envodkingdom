import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/lib/language-context";
import {
  Star, FileCheck, Repeat2, Package, Route, Map,
  Layers, Home, Car, Anchor, Ship, Plane, Truck,
  CheckCircle2, ChevronDown,
} from "lucide-react";

interface Service {
  icon: React.ElementType;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
  features: string[];
  featuresAr: string[];
  accent?: boolean;
}

const SERVICES: Service[] = [
  {
    icon: Star,
    title: "Exhibition & Event Logistics",
    titleAr: "لوجستيات المعارض والفعاليات",
    desc: "Specialized transportation for exhibitions, trade shows, conferences, sporting events and major international events.",
    descAr: "نقل متخصص للمعارض والمؤتمرات والفعاليات الرياضية والأحداث الدولية الكبرى.",
    features: ["Exhibition cargo handling", "Temporary imports", "Event logistics planning", "Venue delivery coordination", "Time-critical shipments"],
    featuresAr: ["مناولة بضائع المعارض", "الاستيراد المؤقت", "تخطيط لوجستيات الفعاليات", "التسليم إلى المكان المناسب", "الشحنات الحساسة للوقت"],
    accent: true,
  },
  {
    icon: FileCheck,
    title: "ATA Carnet Services",
    titleAr: "خدمات كارنيه ATA",
    desc: "Professional ATA Carnet processing for temporary imports and exports across international borders.",
    descAr: "معالجة احترافية لكارنيه ATA للاستيراد والتصدير المؤقت عبر الحدود الدولية.",
    features: ["Customs documentation", "Temporary admission", "Exhibition shipments", "Event cargo movement", "International compliance"],
    featuresAr: ["الوثائق الجمركية", "القبول المؤقت", "شحنات المعارض", "تحريك بضائع الفعاليات", "الامتثال الدولي"],
    accent: true,
  },
  {
    icon: Repeat2,
    title: "Temporary Import & Re-Export",
    titleAr: "الاستيراد المؤقت وإعادة التصدير",
    desc: "Fast customs processing for temporary shipments with full re-export documentation support.",
    descAr: "معالجة جمركية سريعة للشحنات المؤقتة مع دعم كامل لوثائق إعادة التصدير.",
    features: ["Temporary clearance", "Re-export documentation", "Exhibition cargo", "Event equipment", "Expert customs management"],
    featuresAr: ["التخليص المؤقت", "وثائق إعادة التصدير", "بضائع المعارض", "معدات الفعاليات", "إدارة جمركية خبيرة"],
  },
  {
    icon: Package,
    title: "Project Cargo Logistics",
    titleAr: "لوجستيات بضائع المشاريع",
    desc: "Handling oversized and complex cargo movements for oil & gas, industrial and infrastructure projects.",
    descAr: "مناولة الشحنات الضخمة والمعقدة لمشاريع النفط والغاز والصناعة والبنية التحتية.",
    features: ["Heavy equipment", "Industrial machinery", "Oil & gas projects", "Infrastructure projects", "Route planning"],
    featuresAr: ["المعدات الثقيلة", "الآلات الصناعية", "مشاريع النفط والغاز", "مشاريع البنية التحتية", "تخطيط المسار"],
  },
  {
    icon: Route,
    title: "Transit Shipments",
    titleAr: "الشحنات العابرة",
    desc: "Efficient transit cargo movement through Saudi Arabia and GCC with full customs management.",
    descAr: "تنقل فعّال للبضائع العابرة عبر المملكة العربية السعودية ودول الخليج مع إدارة جمركية كاملة.",
    features: ["Cross-border processing", "Customs transit management", "Fast documentation", "Secure cargo handling", "GCC routes"],
    featuresAr: ["المعالجة عبر الحدود", "إدارة العبور الجمركي", "توثيق سريع", "مناولة آمنة للبضائع", "مسارات الخليج"],
  },
  {
    icon: Map,
    title: "GCC Transportation",
    titleAr: "النقل في منطقة الخليج",
    desc: "Road freight across all GCC countries with FTL, LTL and dedicated fleet solutions.",
    descAr: "شحن بري عبر جميع دول الخليج بحمولات كاملة وجزئية وأساطيل مخصصة.",
    features: ["Saudi Arabia · UAE", "Kuwait · Bahrain", "Qatar · Oman", "Full Truck Load", "Less Than Truck Load"],
    featuresAr: ["المملكة العربية السعودية · الإمارات", "الكويت · البحرين", "قطر · عُمان", "شاحنة كاملة", "شحن جزئي"],
  },
  {
    icon: Layers,
    title: "Bulk Container Logistics",
    titleAr: "لوجستيات الحاويات بالجملة",
    desc: "Professional FCL and LCL container movement with port coordination and consolidation.",
    descAr: "تنقل احترافي للحاويات FCL وLCL مع تنسيق الميناء والتوحيد.",
    features: ["FCL & LCL", "Bulk cargo", "Container consolidation", "Port coordination", "Global reach"],
    featuresAr: ["حاويات كاملة وجزئية", "البضائع السائبة", "توحيد الحاويات", "تنسيق الميناء", "وصول عالمي"],
  },
  {
    icon: Ship,
    title: "Ocean Freight",
    titleAr: "الشحن البحري",
    desc: "FCL and LCL sea freight solutions connecting Saudi Arabia to all major global ports.",
    descAr: "حلول الشحن البحري FCL وLCL تربط المملكة العربية السعودية بجميع الموانئ العالمية الرئيسية.",
    features: ["Full Container Load", "Less Container Load", "Ro-Ro shipping", "Break bulk cargo", "Port-to-door delivery"],
    featuresAr: ["حاوية كاملة", "حاوية جزئية", "شحن رورو", "بضائع سائبة", "من الميناء إلى الباب"],
  },
  {
    icon: Plane,
    title: "Air Freight",
    titleAr: "الشحن الجوي",
    desc: "Expedited air cargo services connecting Saudi Arabia to 50+ countries with guaranteed transit times.",
    descAr: "خدمات شحن جوي سريع تربط المملكة بأكثر من 50 دولة بأوقات عبور مضمونة.",
    features: ["Express air cargo", "50+ country network", "Charter flights", "Perishable goods", "Dangerous goods"],
    featuresAr: ["شحن جوي سريع", "شبكة 50+ دولة", "رحلات الشحن", "البضائع القابلة للتلف", "البضائع الخطرة"],
  },
  {
    icon: Home,
    title: "House Moving & Relocation",
    titleAr: "نقل المنازل والانتقال",
    desc: "Residential and corporate relocation services with full packing, customs and door-to-door delivery.",
    descAr: "خدمات النقل السكني والمؤسسي مع التغليف الكامل والتخليص الجمركي والتسليم من باب لباب.",
    features: ["Professional packing", "International relocation", "Customs support", "Door-to-door delivery", "Insurance coverage"],
    featuresAr: ["تغليف احترافي", "نقل دولي", "دعم جمركي", "توصيل من باب لباب", "تغطية تأمينية"],
  },
  {
    icon: Car,
    title: "Vehicle Shipping",
    titleAr: "شحن السيارات",
    desc: "Professional vehicle transportation including luxury cars and GCC and international vehicle export.",
    descAr: "نقل السيارات الاحترافي بما في ذلك السيارات الفاخرة والتصدير داخل الخليج ودولياً.",
    features: ["Car shipping", "Luxury vehicle transport", "GCC vehicle movement", "International export", "Enclosed transport"],
    featuresAr: ["شحن السيارات", "نقل السيارات الفاخرة", "تنقل المركبات خليجياً", "التصدير الدولي", "نقل مغلق"],
  },
  {
    icon: Anchor,
    title: "Boats & Marine Shipping",
    titleAr: "شحن القوارب والبحريات",
    desc: "Specialized marine transportation for yachts, boats and marine cargo with customs coordination.",
    descAr: "نقل بحري متخصص لليخوت والقوارب والبضائع البحرية مع التنسيق الجمركي.",
    features: ["Yacht transportation", "Marine cargo handling", "International yacht shipping", "Customs coordination", "Port logistics"],
    featuresAr: ["نقل اليخوت", "مناولة البضائع البحرية", "شحن اليخوت دولياً", "التنسيق الجمركي", "لوجستيات الميناء"],
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { isRtl } = useLanguage();
  const [open, setOpen] = useState(false);
  const Icon = service.icon;

  const title = isRtl ? service.titleAr : service.title;
  const desc = isRtl ? service.descAr : service.desc;
  const features = isRtl ? service.featuresAr : service.features;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        onClick={() => setOpen((o) => !o)}
        className={`
          relative rounded-2xl p-6 cursor-pointer h-full border transition-all duration-300 overflow-hidden
          bg-white/[0.03] backdrop-blur-sm
          ${service.accent
            ? "border-secondary/30 hover:border-secondary/60 bg-secondary/[0.04]"
            : "border-white/8 hover:border-white/20"
          }
        `}
      >
        {/* Hover glow */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl ${
            service.accent ? "bg-secondary/5" : "bg-white/[0.02]"
          }`}
        />

        {/* Accent badge */}
        {service.accent && (
          <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
            <span className="text-[9px] font-bold tracking-widest uppercase bg-secondary/20 text-secondary px-2 py-0.5 rounded-full border border-secondary/30">
              Specialist
            </span>
          </div>
        )}

        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 8, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
            service.accent ? "bg-secondary/15" : "bg-white/5"
          } group-hover:bg-secondary/10 transition-colors`}
        >
          <Icon
            className={`w-6 h-6 ${service.accent ? "text-secondary" : "text-white/60 group-hover:text-secondary"} transition-colors`}
          />
        </motion.div>

        <h3 className={`font-bold text-white mb-2 text-base leading-tight ${isRtl ? "text-right" : "text-left"}`}>
          {title}
        </h3>
        <p className={`text-sm text-white/50 leading-relaxed mb-4 ${isRtl ? "text-right" : "text-left"}`}>
          {desc}
        </p>

        {/* Expand toggle */}
        <div className={`flex items-center gap-1.5 text-xs font-semibold ${service.accent ? "text-secondary" : "text-white/40 group-hover:text-secondary"} transition-colors ${isRtl ? "flex-row-reverse" : ""}`}>
          <span>{open ? (isRtl ? "أقل" : "Less") : (isRtl ? "المزيد" : "Details")}</span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
        </div>

        {/* Expandable features */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden mt-4 space-y-1.5"
            >
              {features.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: isRtl ? 8 : -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-2 text-xs text-white/60 ${isRtl ? "flex-row-reverse text-right" : ""}`}
                >
                  <CheckCircle2 className="w-3 h-3 text-secondary shrink-0" />
                  {f}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function ServicesSection() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="py-28 bg-background relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(214,40,40,0.04) 0%, transparent 70%)",
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
            {t("OUR SPECIALIZATIONS", "تخصصاتنا")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            {t("Comprehensive", "خدمات لوجستية")}
            <span className="text-secondary"> {t("Logistics Solutions", "شاملة ومتخصصة")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed"
          >
            {t(
              "From ATA Carnet and exhibition logistics to project cargo and GCC transportation — 12 specialized services backed by 25+ years of Saudi expertise.",
              "من كارنيه ATA ولوجستيات المعارض إلى بضائع المشاريع والنقل الخليجي — 12 خدمة متخصصة مدعومة بأكثر من 25 عاماً من الخبرة السعودية.",
            )}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-block border border-white/15 hover:border-secondary/50 text-white hover:text-secondary py-3 px-10 rounded-xl font-semibold transition-all text-sm tracking-wide"
          >
            {t("View All Services", "عرض جميع الخدمات")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
