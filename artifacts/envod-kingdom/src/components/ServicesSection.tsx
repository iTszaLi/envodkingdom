import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/lib/language-context";
import {
  Star, FileCheck, ShieldCheck, Package, Layers, Container,
  GitMerge, Settings2, Ship, Plane, Map, CheckCircle2, ChevronDown,
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
  tag?: string;
  tagAr?: string;
}

const SERVICES: Service[] = [
  {
    icon: Star,
    title: "Exhibition & Event Logistics",
    titleAr: "لوجستيات المعارض والفعاليات",
    desc: "Saudi Arabia's leading specialist for exhibitions, trade shows, conferences and major international events — end-to-end with ATA Carnet, temporary import and re-export handling.",
    descAr: "الخبير الأول في المملكة لمعارض التجارة والمؤتمرات والفعاليات الدولية — من التخليص الجمركي إلى التسليم داخل المعرض.",
    features: ["ATA Carnet", "Temporary Imports", "Temporary Exports", "Re-Exports", "Exhibition Cargo", "Event Equipment", "Trade Show Logistics", "Customs Clearance"],
    featuresAr: ["كارنيه ATA", "الاستيراد المؤقت", "التصدير المؤقت", "إعادة التصدير", "بضائع المعارض", "معدات الفعاليات", "لوجستيات المعارض التجارية", "التخليص الجمركي"],
    accent: true,
    tag: "ENVOD Specialist",
    tagAr: "متخصص انفود",
  },
  {
    icon: ShieldCheck,
    title: "Customs Clearance",
    titleAr: "التخليص الجمركي",
    desc: "Expert Saudi customs clearance under 24 hours — SFDA, SABER, CITC-approved. Full compliance for all commodity types including food, electronics, medical and hazardous goods.",
    descAr: "تخليص جمركي سعودي خلال 24 ساعة — معتمد SFDA وسابر وهيئة الاتصالات. امتثال كامل لجميع أنواع البضائع.",
    features: ["24-hour clearance guarantee", "SABER & SFDA compliance", "CITC approvals", "Food & pharma clearance", "Hazardous goods", "Import & export documentation"],
    featuresAr: ["ضمان التخليص خلال 24 ساعة", "امتثال سابر وهيئة الغذاء والدواء", "موافقات هيئة الاتصالات", "تخليص الغذاء والأدوية", "البضائع الخطرة", "وثائق الاستيراد والتصدير"],
    tag: "24hr Guarantee",
    tagAr: "ضمان 24 ساعة",
  },
  {
    icon: FileCheck,
    title: "ATA Carnet Services",
    titleAr: "خدمات كارنيه ATA",
    desc: "Professional ATA Carnet processing for temporary imports and exports across 87 countries — the fastest carnet service in Saudi Arabia for exhibitions, professional equipment and commercial samples.",
    descAr: "معالجة احترافية لكارنيه ATA في 87 دولة — أسرع خدمة كارنيه في المملكة للمعارض والمعدات المهنية والعينات التجارية.",
    features: ["87+ countries coverage", "Exhibition shipments", "Professional equipment", "Commercial samples", "Temporary admission", "International compliance"],
    featuresAr: ["تغطية 87+ دولة", "شحنات المعارض", "المعدات المهنية", "العينات التجارية", "القبول المؤقت", "الامتثال الدولي"],
    accent: true,
  },
  {
    icon: Package,
    title: "Project Cargo Logistics",
    titleAr: "لوجستيات بضائع المشاريع",
    desc: "Heavy-lift and oversized cargo movement for Saudi Vision 2030 mega-projects, NEOM, oil & gas and infrastructure — including route surveys, crane operations and multi-modal execution.",
    descAr: "نقل الشحنات الثقيلة والضخمة لمشاريع رؤية 2030 العملاقة ونيوم والنفط والغاز — تشمل دراسات المسار والرافعات والتنفيذ متعدد الوسائط.",
    features: ["Heavy lift & oversized cargo", "Oil & gas equipment", "Route & feasibility study", "Crane & rigging services", "Multi-modal execution", "NEOM project experience"],
    featuresAr: ["الشحنات الثقيلة والضخمة", "معدات النفط والغاز", "دراسة المسار والجدوى", "خدمات الرافعات", "تنفيذ متعدد الوسائط", "خبرة مشاريع نيوم"],
  },
  {
    icon: Layers,
    title: "LCL Consolidation Services",
    titleAr: "خدمات تجميع الشحنات LCL",
    desc: "Less-than-container-load consolidation from all major global origins directly into Saudi Arabia and GCC ports — cost-effective, fast and fully tracked.",
    descAr: "تجميع الشحنات الجزئية من جميع مصادر الشحن العالمية الرئيسية إلى موانئ المملكة ودول الخليج — اقتصادية وسريعة وقابلة للتتبع.",
    features: ["Global LCL consolidation", "Jeddah & Dammam ports", "Weekly sailings", "Full customs support", "Cargo tracking", "Competitive rates"],
    featuresAr: ["تجميع LCL عالمي", "موانئ جدة والدمام", "إبحار أسبوعي", "دعم جمركي كامل", "تتبع الشحن", "أسعار تنافسية"],
  },
  {
    icon: Ship,
    title: "Full Container Load Solutions",
    titleAr: "حلول الحاوية الكاملة FCL",
    desc: "FCL ocean freight from all major global ports to Saudi Arabia and GCC — 20ft, 40ft, 40ft HC, open-top, flat-rack and refrigerated containers with competitive transit times.",
    descAr: "شحن بحري FCL من جميع الموانئ العالمية إلى المملكة ودول الخليج — حاويات 20 و40 قدم ومبردة وسقف مفتوح بأوقات عبور تنافسية.",
    features: ["20ft, 40ft, 40HC containers", "Reefer & open-top", "Flat-rack for OOG cargo", "Global port coverage", "Port-to-door delivery", "Online cargo tracking"],
    featuresAr: ["حاويات 20 و40 قدم", "مبردة وسقف مفتوح", "فلات راك للشحنات الضخمة", "تغطية موانئ عالمية", "توصيل من الميناء للباب", "تتبع إلكتروني"],
  },
  {
    icon: GitMerge,
    title: "Multimodal Freight Solutions",
    titleAr: "حلول الشحن متعدد الوسائط",
    desc: "Seamlessly combining sea, air, road and rail freight to deliver optimal speed, cost and reliability — ideal for complex supply chains into and out of Saudi Arabia.",
    descAr: "الجمع السلس بين الشحن البحري والجوي والبري والسككي لتحقيق السرعة والتكلفة المثلى — مثالي لسلاسل التوريد المعقدة.",
    features: ["Sea + Air combinations", "Road + Rail options", "GCC cross-border", "Single point of contact", "Optimised cost & time", "Full cargo insurance"],
    featuresAr: ["مزج بحري + جوي", "خيارات برية + سككية", "عبور خليجي", "نقطة اتصال واحدة", "تكلفة ووقت مثلى", "تأمين شامل للشحن"],
  },
  {
    icon: Settings2,
    title: "Specialized Cargo Handling",
    titleAr: "مناولة البضائع المتخصصة",
    desc: "Expert handling for cargo requiring special care — dangerous goods (IATA/IMDG), perishables, pharmaceuticals, fine art, antiques, high-value and temperature-sensitive shipments.",
    descAr: "مناولة متخصصة للبضائع التي تتطلب عناية خاصة — بضائع خطرة وقابلة للتلف وأدوية وفنون جميلة وشحنات عالية القيمة وحساسة للحرارة.",
    features: ["Dangerous goods IATA/IMDG", "Temperature-sensitive cargo", "Pharmaceutical cold chain", "Fine art & antiques", "High-value cargo", "Perishable goods"],
    featuresAr: ["بضائع خطرة IATA/IMDG", "شحنات حساسة للحرارة", "سلسلة باردة صيدلانية", "الفنون والتحف", "البضائع عالية القيمة", "البضائع القابلة للتلف"],
  },
  {
    icon: Map,
    title: "GCC Road Transport",
    titleAr: "النقل البري الخليجي",
    desc: "Full and part-load road freight across all 6 GCC countries with dedicated fleet, cross-border customs handling and real-time tracking.",
    descAr: "شحن بري بحمولات كاملة وجزئية عبر جميع دول الخليج الست مع أسطول مخصص وتخليص جمركي.",
    features: ["Saudi Arabia · UAE · Kuwait", "Bahrain · Qatar · Oman", "Full Truck Load (FTL)", "Less-than-Truck Load (LTL)", "Cross-border customs", "Refrigerated transport"],
    featuresAr: ["المملكة · الإمارات · الكويت", "البحرين · قطر · عُمان", "شاحنة كاملة", "شحن جزئي", "تخليص جمركي عبر الحدود", "نقل مبرد"],
  },
  {
    icon: Plane,
    title: "Air Freight",
    titleAr: "الشحن الجوي",
    desc: "Expedited air cargo services connecting Saudi Arabia to 50+ countries with guaranteed transit times, charter options and perishable & pharma compliance.",
    descAr: "خدمات شحن جوي سريع تربط المملكة بأكثر من 50 دولة بأوقات عبور مضمونة وخيارات الشحن المستأجر.",
    features: ["50+ country network", "Express & charter flights", "Perishable goods", "Pharmaceutical cargo", "Dangerous goods (IATA)", "Door-to-airport service"],
    featuresAr: ["شبكة 50+ دولة", "رحلات سريعة ومستأجرة", "البضائع القابلة للتلف", "شحنات الأدوية", "بضائع خطرة IATA", "خدمة من الباب للمطار"],
  },
  {
    icon: Container,
    title: "Bulk & Break-Bulk Cargo",
    titleAr: "الشحن السائب والمفكك",
    desc: "Handling bulk commodities and break-bulk cargo for Saudi ports — grain, chemicals, steel, machinery and over-dimensional cargo with port coordination.",
    descAr: "مناولة البضائع السائبة والمفككة في موانئ المملكة — حبوب وكيماويات وصلب وآلات وبضائع ضخمة مع تنسيق الميناء.",
    features: ["Grain & agricultural bulk", "Chemicals & liquids", "Steel & construction materials", "Industrial machinery", "Port coordination", "Stevedoring support"],
    featuresAr: ["الحبوب والبضائع الزراعية", "الكيماويات والسوائل", "الصلب ومواد البناء", "الآلات الصناعية", "تنسيق الميناء", "دعم الشحن والتفريغ"],
  },
  {
    icon: FileCheck,
    title: "Freight Forwarding & 3PL",
    titleAr: "الشحن المتكامل والخدمات اللوجستية",
    desc: "Comprehensive freight forwarding and third-party logistics — warehousing, pick & pack, customs, last-mile delivery and supply chain management under one roof.",
    descAr: "شحن متكامل ولوجستيات من طرف ثالث — تخزين وتجميع وتغليف وتخليص جمركي وتوصيل أخير وإدارة سلسلة توريد.",
    features: ["Bonded warehousing", "Pick & pack services", "Customs clearance", "Last-mile delivery", "Supply chain consulting", "ERP/WMS integration"],
    featuresAr: ["مستودعات جمركية", "تجميع وتغليف", "تخليص جمركي", "توصيل المرحلة الأخيرة", "استشارات سلسلة التوريد", "تكامل ERP/WMS"],
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
      transition={{ delay: (index % 3) * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -5 }}
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
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl ${service.accent ? "bg-secondary/5" : "bg-white/[0.02]"}`} />

        {/* Tag badge */}
        {service.tag && (
          <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
            <span className="text-[9px] font-bold tracking-widest uppercase bg-secondary/20 text-secondary px-2 py-0.5 rounded-full border border-secondary/30">
              {isRtl ? service.tagAr : service.tag}
            </span>
          </div>
        )}

        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 8, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${service.accent ? "bg-secondary/15" : "bg-white/5"} group-hover:bg-secondary/10 transition-colors`}
        >
          <Icon className={`w-6 h-6 ${service.accent ? "text-secondary" : "text-white/60 group-hover:text-secondary"} transition-colors`} />
        </motion.div>

        <h3 className={`font-bold text-white mb-2 text-base leading-tight ${isRtl ? "text-right" : "text-left"}`}>{title}</h3>
        <p className={`text-sm text-white/50 leading-relaxed mb-4 ${isRtl ? "text-right" : "text-left"}`}>{desc}</p>

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
              className="overflow-hidden mt-4 grid grid-cols-2 gap-x-3 gap-y-2"
            >
              {features.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: isRtl ? 8 : -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`flex items-center gap-1.5 text-xs text-white/60 ${isRtl ? "flex-row-reverse text-right" : ""}`}
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
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(214,40,40,0.04) 0%, transparent 70%)" }}
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
              "From Exhibition & Event Logistics to Customs Clearance, ATA Carnet and Project Cargo — 12 specialised services backed by 25+ years of Saudi expertise.",
              "من لوجستيات المعارض والتخليص الجمركي وكارنيه ATA إلى بضائع المشاريع — 12 خدمة متخصصة مدعومة بأكثر من 25 عاماً من الخبرة السعودية.",
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
