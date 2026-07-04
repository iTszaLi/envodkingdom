import type { Service } from "@workspace/api-client-react";
import { EXHIBITION_PILLAR } from "./pillar-data/exhibition";
import { ATA_CARNET_PILLAR } from "./pillar-data/ata-carnet";

export interface SubService {
  name: string;
  nameAr: string;
  desc: string;
  descAr: string;
}

export interface BiText {
  en: string;
  ar: string;
}

export interface PillarSectionData {
  id: string;
  heading: BiText;
  paragraphs: BiText[];
  bullets?: BiText[];
}

export interface PillarVenue {
  name: string;
  nameAr: string;
  city: string;
  cityAr: string;
}

export interface PillarEvent {
  name: string;
  sector: string;
  sectorAr: string;
  city: string;
  cityAr: string;
}

export interface PillarRelatedLink {
  label: string;
  labelAr: string;
  href: string;
}

/** Optional long-form, crawler-friendly content that promotes a service page to
 *  an SEO "pillar" page. Rendered as plain semantic HTML by PillarSections. */
export interface ServicePillar {
  seoTitle?: string;
  seoDescription?: string;
  intro: BiText[];
  sections: PillarSectionData[];
  venues: PillarVenue[];
  majorEvents: PillarEvent[];
  relatedLinks: PillarRelatedLink[];
}

export interface ServiceMeta {
  id: number;
  slug: string;
  gradient: string;
  accentHex: string;
  industries: string[];
  industriesAr: string[];
  process: { en: string; ar: string }[];
  subServices: SubService[];
  whyEnvod: { en: string; ar: string }[];
  faq: { q: string; a: string; qAr: string; aAr: string }[];
  pillar?: ServicePillar;
}

export const SERVICE_META: Record<number, ServiceMeta> = {
  1: {
    id: 1, slug: "ocean-freight",
    gradient: "linear-gradient(135deg,#0a1f3c 0%,#0d2d4a 50%,#071828 100%)",
    accentHex: "#0ea5e9",
    industries: ["Oil & Gas","Construction","Automotive","Retail & FMCG","Industrial Manufacturing"],
    industriesAr: ["النفط والغاز","البناء والتشييد","السيارات","التجزئة والسلع الاستهلاكية","التصنيع الصناعي"],
    process: [
      { en: "Booking & Planning", ar: "الحجز والتخطيط" },
      { en: "Documentation", ar: "التوثيق" },
      { en: "Port Departure", ar: "مغادرة الميناء" },
      { en: "Sea Transit", ar: "العبور البحري" },
      { en: "Customs Clearance", ar: "التخليص الجمركي" },
      { en: "Port Arrival", ar: "وصول الميناء" },
      { en: "Final Delivery", ar: "التسليم النهائي" },
    ],
    subServices: [
      { name: "Full Container Load (FCL)", nameAr: "حاوية كاملة (FCL)", desc: "Exclusive use of a full container for your shipment.", descAr: "استخدام حاوية كاملة حصرياً لشحنتك." },
      { name: "Less-than-Container Load (LCL)", nameAr: "حاوية جزئية (LCL)", desc: "Share container space — ideal for smaller shipments.", descAr: "مشاركة مساحة الحاوية — مثالي للشحنات الصغيرة." },
      { name: "Break Bulk Shipment", nameAr: "شحن بريك بالك", desc: "Non-containerized cargo for oversized or irregular items.", descAr: "بضائع غير حاوية للعناصر الضخمة أو غير المنتظمة." },
      { name: "RoRo Shipping", nameAr: "الشحن الدحرجي (رورو)", desc: "Roll-on/roll-off service for vehicles and wheeled cargo.", descAr: "خدمة الدحرجة للسيارات والبضائع ذات العجلات." },
      { name: "Project Cargo Shipping", nameAr: "شحن بضائع المشاريع", desc: "Heavy and oversized industrial project cargo via sea.", descAr: "شحن بحري لبضائع المشاريع الصناعية الثقيلة والضخمة." },
      { name: "Heavy Lift Shipping", nameAr: "شحن الرفع الثقيل", desc: "Crane-assisted heavy lift sea freight for industrial loads.", descAr: "شحن بحري برافعة للأحمال الصناعية الثقيلة." },
      { name: "Container Consolidation", nameAr: "تجميع الحاويات", desc: "Groupage services combining multiple smaller shipments.", descAr: "خدمات تجميع تضم شحنات أصغر متعددة معاً." },
      { name: "Reefer Containers", nameAr: "حاويات مبردة", desc: "Temperature-controlled containers for perishables.", descAr: "حاويات بدرجات حرارة مضبوطة للبضائع القابلة للتلف." },
      { name: "Door-to-Port", nameAr: "من الباب إلى الميناء", desc: "Pickup from shipper's door to destination port.", descAr: "استلام من باب المُرسِل وتسليم في الميناء المقصود." },
      { name: "Door-to-Door Sea Freight", nameAr: "من الباب للباب بحراً", desc: "Full sea freight service from origin to final destination.", descAr: "خدمة شحن بحري كاملة من المنشأ إلى الوجهة النهائية." },
      { name: "Dangerous Goods Sea Freight", nameAr: "الشحن البحري للبضائع الخطرة", desc: "IMO-compliant sea shipment for hazardous materials.", descAr: "شحن بحري متوافق مع IMO للمواد الخطرة." },
      { name: "Customs Coordination", nameAr: "تنسيق التخليص الجمركي", desc: "End-to-end customs handling at port of origin and destination.", descAr: "تخليص جمركي متكامل في ميناء المنشأ والوجهة." },
      { name: "Port Handling", nameAr: "مناولة الميناء", desc: "Stevedoring, loading, and unloading at Saudi ports.", descAr: "شحن وتفريغ وتحميل في موانئ المملكة." },
      { name: "Import & Export Management", nameAr: "إدارة الاستيراد والتصدير", desc: "Complete import and export coordination for sea shipments.", descAr: "تنسيق شامل للاستيراد والتصدير للشحنات البحرية." },
    ],
    whyEnvod: [
      { en: "Direct port access at all major Saudi and GCC ports", ar: "وصول مباشر لجميع الموانئ السعودية والخليجية الرئيسية" },
      { en: "Global shipping network across 50+ countries", ar: "شبكة شحن عالمية في أكثر من 50 دولة" },
      { en: "Full customs clearance integrated with freight", ar: "تخليص جمركي متكامل مع الشحن" },
      { en: "Real-time cargo tracking and updates", ar: "تتبع الشحن في الوقت الفعلي" },
      { en: "Competitive FCL & LCL rates", ar: "أسعار تنافسية لـ FCL وLCL" },
    ],
    faq: [
      { q: "What is the difference between FCL and LCL?", a: "FCL (Full Container Load) means you rent an entire container exclusively. LCL (Less-than-Container Load) means your cargo shares space with others — ideal when your cargo doesn't fill a full container.", qAr: "ما الفرق بين FCL وLCL؟", aAr: "FCL تعني استئجار حاوية كاملة حصرياً. LCL تعني مشاركة الحاوية مع شحنات أخرى — مثالية عندما لا تملأ شحنتك حاوية كاملة." },
      { q: "How long does ocean freight from China take?", a: "Transit times from China to Saudi Arabian ports typically range from 18–28 days depending on the origin port and sailing schedule.", qAr: "كم تستغرق الشحنة البحرية من الصين؟", aAr: "تتراوح أوقات العبور من الصين إلى الموانئ السعودية عادةً بين 18-28 يوماً." },
      { q: "Do you handle customs clearance at Saudi ports?", a: "Yes. We offer fully integrated customs clearance at all major Saudi ports including Jeddah Islamic Port, King Abdulaziz Port (Dammam), and King Fahad Industrial Port.", qAr: "هل تتولون التخليص الجمركي في الموانئ السعودية؟", aAr: "نعم. نقدم تخليصاً جمركياً متكاملاً في جميع الموانئ السعودية الرئيسية." },
    ],
  },
  2: {
    id: 2, slug: "air-freight",
    gradient: "linear-gradient(135deg,#0c1a3a 0%,#1a0a3a 50%,#070a28 100%)",
    accentHex: "#8b5cf6",
    industries: ["Pharmaceuticals","Electronics","E-commerce","Perishables","Fashion & Luxury"],
    industriesAr: ["الأدوية","الإلكترونيات","التجارة الإلكترونية","البضائع سريعة التلف","الأزياء والفاخرة"],
    process: [
      { en: "Booking", ar: "الحجز" },
      { en: "Pickup", ar: "الاستلام" },
      { en: "Export Docs", ar: "وثائق التصدير" },
      { en: "Airport Departure", ar: "المغادرة" },
      { en: "Air Transit", ar: "العبور الجوي" },
      { en: "Airport Arrival", ar: "الوصول" },
      { en: "Customs & Delivery", ar: "تخليص وتسليم" },
    ],
    subServices: [
      { name: "Express Air Freight", nameAr: "الشحن الجوي السريع", desc: "Time-critical door-to-door delivery in 24–72 hours.", descAr: "شحن حساس للوقت من الباب للباب في 24-72 ساعة." },
      { name: "Standard Air Freight", nameAr: "الشحن الجوي القياسي", desc: "Reliable air cargo at competitive rates, 3–5 business days.", descAr: "شحن جوي موثوق بأسعار تنافسية خلال 3-5 أيام عمل." },
      { name: "Airport-to-Airport", nameAr: "من مطار لمطار", desc: "Standard cargo handled terminal-to-terminal.", descAr: "الشحن القياسي من صالة إلى صالة." },
      { name: "Door-to-Door Air", nameAr: "من الباب للباب جواً", desc: "Complete pickup, customs, and delivery service.", descAr: "خدمة استلام وتخليص وتسليم كاملة." },
      { name: "Airport Customs Clearance", nameAr: "تخليص جمركي مطاري", desc: "Fast customs handling at all Saudi international airports.", descAr: "تخليص جمركي سريع في جميع مطارات المملكة الدولية." },
      { name: "Charter Aircraft", nameAr: "طائرة مستأجرة", desc: "Dedicated aircraft for urgent or oversized air cargo.", descAr: "طائرة مخصصة للشحن الجوي العاجل أو الضخم." },
      { name: "Dangerous Goods Air Freight", nameAr: "شحن جوي للبضائع الخطرة", desc: "IATA-certified dangerous goods air transport.", descAr: "نقل جوي للبضائع الخطرة معتمد من IATA." },
      { name: "Pharmaceutical Air Freight", nameAr: "الشحن الجوي الدوائي", desc: "GDP-compliant temperature-controlled air cargo.", descAr: "شحن جوي دوائي متوافق مع GDP بدرجات حرارة مضبوطة." },
      { name: "Temperature-Controlled Cargo", nameAr: "شحن جوي بدرجات حرارة مضبوطة", desc: "Cold chain air freight for pharma, food, and biologics.", descAr: "شحن جوي بسلسلة باردة للأدوية والغذاء والمستحضرات البيولوجية." },
      { name: "Priority Cargo", nameAr: "شحن أولوية", desc: "Highest-priority handling for critical time-sensitive cargo.", descAr: "معالجة أولوية قصوى للشحن الحساس للوقت." },
      { name: "Consolidated Air Freight", nameAr: "الشحن الجوي المجمع", desc: "Cost-effective groupage airfreight solutions.", descAr: "حلول شحن جوي مجمع فعالة من حيث التكلفة." },
      { name: "Priority & On-Board Courier", nameAr: "بريد سريع على متن الطائرة", desc: "Hand-carried courier for critical documents and small cargo.", descAr: "بريد محمول باليد للمستندات الحرجة والشحن الصغير." },
    ],
    whyEnvod: [
      { en: "Network spanning 50+ countries and 200+ airlines", ar: "شبكة تمتد لأكثر من 50 دولة و200 شركة طيران" },
      { en: "24-hour shipment readiness from Riyadh", ar: "جاهزية الشحن خلال 24 ساعة من الرياض" },
      { en: "Temperature-controlled options for pharma & perishables", ar: "خيارات بدرجات حرارة مضبوطة للأدوية والقابلة للتلف" },
      { en: "Real-time flight tracking and proactive notifications", ar: "تتبع الرحلات في الوقت الفعلي وإشعارات استباقية" },
      { en: "IATA-certified dangerous goods handling", ar: "مناولة بضائع خطرة معتمدة من IATA" },
    ],
    faq: [
      { q: "How fast is express air freight to Saudi Arabia?", a: "Express services from major hubs typically arrive in 24–48 hours. Standard air freight takes 3–5 business days.", qAr: "ما مدى سرعة الشحن الجوي السريع إلى السعودية؟", aAr: "تصل الخدمات السريعة من المحاور الرئيسية في 24-48 ساعة. يستغرق الشحن الجوي القياسي 3-5 أيام عمل." },
      { q: "Can you ship pharmaceuticals by air?", a: "Yes. We are fully equipped to handle temperature-sensitive pharmaceutical cargo with GDP-compliant procedures and validated cool containers.", qAr: "هل يمكنكم شحن الأدوية جواً؟", aAr: "نعم. نحن مجهزون تماماً للتعامل مع الشحن الدوائي الحساس للحرارة." },
    ],
  },
  3: {
    id: 3, slug: "gcc-transportation",
    gradient: "linear-gradient(135deg,#1a1208 0%,#2a1c08 50%,#100c04 100%)",
    accentHex: "#f59e0b",
    industries: ["Construction","Retail","Manufacturing","Agriculture","Government"],
    industriesAr: ["البناء","التجزئة","التصنيع","الزراعة","القطاع الحكومي"],
    process: [
      { en: "Route Planning", ar: "تخطيط المسار" },
      { en: "Loading", ar: "التحميل" },
      { en: "Border Crossing", ar: "عبور الحدود" },
      { en: "Customs Clearance", ar: "التخليص" },
      { en: "Transit", ar: "العبور" },
      { en: "Final Delivery", ar: "التسليم" },
    ],
    subServices: [
      { name: "Flatbed Trailers", nameAr: "مقطورات مسطحة", desc: "Open flatbed transport for machinery, steel, and oversized loads.", descAr: "نقل على مقطورة مسطحة مفتوحة للآلات والحديد والأحمال الضخمة." },
      { name: "Curtain Side Trailers", nameAr: "مقطورات ستائر جانبية", desc: "Flexible side-loading trailers for palletized goods.", descAr: "مقطورات تحميل جانبي مرنة للبضائع المُرصوصة." },
      { name: "Refrigerated (Reefer) Trucks", nameAr: "شاحنات مبردة (ريفر)", desc: "Temperature-controlled refrigerated trucks for food and pharma.", descAr: "شاحنات مبردة بدرجات حرارة مضبوطة للغذاء والدواء." },
      { name: "Dry Van Trucks", nameAr: "شاحنات مغلقة جافة", desc: "Enclosed dry van transport for general cargo protection.", descAr: "نقل في صندوق مغلق جاف لحماية البضائع العامة." },
      { name: "Low Bed Trailers", nameAr: "مقطورات منخفضة", desc: "Low-profile trailers for heavy equipment and tall machinery.", descAr: "مقطورات منخفضة للمعدات الثقيلة والآلات الطويلة." },
      { name: "Extendable Trailers", nameAr: "مقطورات قابلة للتمديد", desc: "Telescopic extendable trailers for extra-long cargo.", descAr: "مقطورات تلسكوبية قابلة للتمديد للبضائع الطويلة جداً." },
      { name: "Skeletal Trailers", nameAr: "مقطورات هيكلية", desc: "Container-ready skeletal trailers for 20ft and 40ft containers.", descAr: "مقطورات هيكلية جاهزة للحاويات 20 و40 قدماً." },
      { name: "Container Transport (20ft / 40ft)", nameAr: "نقل حاويات (20 / 40 قدم)", desc: "Door-to-door container transport across Saudi Arabia and GCC.", descAr: "نقل حاويات من الباب للباب عبر المملكة والخليج." },
      { name: "Side Loader Trucks", nameAr: "شاحنات تحميل جانبي", desc: "Self-loading side lift trucks for container handling.", descAr: "شاحنات رفع ذاتية جانبية لمناولة الحاويات." },
      { name: "Hydraulic Trailer Transport", nameAr: "نقل بمقطورات هيدروليكية", desc: "Multi-axle hydraulic trailers for the heaviest loads.", descAr: "مقطورات هيدروليكية متعددة المحاور للأحمال الأثقل." },
      { name: "Heavy Equipment Transport", nameAr: "نقل المعدات الثقيلة", desc: "Specialist transport for construction and industrial equipment.", descAr: "نقل متخصص للمعدات الإنشائية والصناعية." },
      { name: "Oversized Cargo Transport", nameAr: "نقل البضائع الضخمة", desc: "Permit-managed oversized load transportation.", descAr: "نقل الأحمال الضخمة بإدارة التصاريح اللازمة." },
      { name: "Heavy Lift Transportation", nameAr: "نقل الرفع الثقيل", desc: "Crane and SPMT-assisted heavy lift transport solutions.", descAr: "حلول نقل رفع ثقيل بالرافعات ومركبات SPMT." },
      { name: "Cross-Border GCC Transportation", nameAr: "نقل عابر للحدود الخليجية", desc: "Managed customs and transport across all Saudi-GCC borders.", descAr: "تخليص جمركي ونقل عبر جميع الحدود السعودية الخليجية." },
      { name: "Local Saudi Transportation", nameAr: "نقل محلي سعودي", desc: "City-to-city and within-city freight across Saudi Arabia.", descAr: "شحن بين المدن وداخلها في جميع أنحاء المملكة." },
      { name: "Dayana Trucks", nameAr: "شاحنات ديانا", desc: "Large-capacity Dayana trucks for bulk regional distribution.", descAr: "شاحنات ديانا كبيرة السعة للتوزيع الإقليمي بالجملة." },
      { name: "Pickup Trucks", nameAr: "شاحنات بيك أب", desc: "Light pickup trucks for small loads and urgent deliveries.", descAr: "شاحنات بيك أب خفيفة للأحمال الصغيرة والتوصيل العاجل." },
      { name: "Dedicated Express Delivery", nameAr: "توصيل سريع مخصص", desc: "Exclusive same-day or next-day dedicated transport.", descAr: "نقل مخصص حصري في اليوم ذاته أو اليوم التالي." },
      { name: "Last-Mile Delivery", nameAr: "توصيل المرحلة الأخيرة", desc: "Final doorstep delivery within Saudi Arabia.", descAr: "التوصيل النهائي للباب داخل المملكة." },
      { name: "Door-to-Door Transportation", nameAr: "نقل من الباب للباب", desc: "Complete pickup and delivery from origin to destination.", descAr: "استلام وتسليم كامل من المنشأ إلى الوجهة." },
    ],
    whyEnvod: [
      { en: "Dedicated fleet covering all 6 GCC countries", ar: "أسطول مخصص يغطي جميع دول الخليج الست" },
      { en: "Cross-border customs expertise", ar: "خبرة في التخليص الجمركي العابر للحدود" },
      { en: "GPS-tracked fleet with 24/7 monitoring", ar: "أسطول مجهز بـ GPS ومراقبة على مدار الساعة" },
      { en: "Refrigerated options for temperature-sensitive cargo", ar: "خيارات مبردة للبضائع الحساسة للحرارة" },
    ],
    faq: [
      { q: "Which GCC countries do you cover?", a: "We cover all six GCC countries: Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, and Oman.", qAr: "ما دول الخليج التي تغطونها؟", aAr: "نغطي جميع دول الخليج الست: المملكة العربية السعودية والإمارات وقطر والكويت والبحرين وعُمان." },
      { q: "Do you handle cross-border customs documentation?", a: "Yes. We manage all import, export, and transit customs documentation for cross-border GCC road freight.", qAr: "هل تتولون وثائق الجمارك العابرة للحدود؟", aAr: "نعم. نتولى جميع وثائق جمارك الاستيراد والتصدير والعبور." },
    ],
  },
  4: {
    id: 4, slug: "customs-clearance",
    gradient: "linear-gradient(135deg,#052a1a 0%,#0a3d28 50%,#031510 100%)",
    accentHex: "#10b981",
    industries: ["All Industries","Pharmaceuticals","Food & Beverage","Electronics","Industrial"],
    industriesAr: ["جميع القطاعات","الأدوية","الغذاء والمشروبات","الإلكترونيات","الصناعية"],
    process: [
      { en: "Document Review", ar: "مراجعة المستندات" },
      { en: "HS Code Classification", ar: "تصنيف HS" },
      { en: "Duty Assessment", ar: "تقييم الرسوم" },
      { en: "Declaration Filing", ar: "تقديم الإقرار" },
      { en: "Customs Inspection", ar: "الفحص الجمركي" },
      { en: "Duty Payment", ar: "سداد الرسوم" },
      { en: "Release & Delivery", ar: "الإفراج والتسليم" },
    ],
    subServices: [
      { name: "Import Customs Clearance", nameAr: "تخليص استيراد", desc: "Full Saudi customs import clearance with duty management.", descAr: "تخليص استيراد سعودي كامل مع إدارة الرسوم الجمركية." },
      { name: "Export Customs Clearance", nameAr: "تخليص تصدير", desc: "Fast Saudi export declarations and document processing.", descAr: "إقرارات تصدير سعودية سريعة ومعالجة المستندات." },
      { name: "Air Customs Clearance", nameAr: "تخليص جمركي جوي", desc: "Fast-track customs at all Saudi international airports.", descAr: "تخليص جمركي سريع في جميع مطارات المملكة الدولية." },
      { name: "Sea Customs Clearance", nameAr: "تخليص جمركي بحري", desc: "Port customs at Jeddah, Dammam, and all Saudi seaports.", descAr: "تخليص جمركي بحري في جدة والدمام وجميع موانئ المملكة." },
      { name: "Land Border Customs", nameAr: "جمارك الحدود البرية", desc: "Cross-border land customs clearance for GCC road freight.", descAr: "تخليص جمركي برري للشحن البري الخليجي العابر للحدود." },
      { name: "Temporary Import", nameAr: "الاستيراد المؤقت", desc: "Clearance for goods entering temporarily (exhibitions, equipment).", descAr: "تخليص البضائع الداخلة مؤقتاً (معارض، معدات)." },
      { name: "Temporary Export", nameAr: "التصدير المؤقت", desc: "Documentation and clearance for temporarily exported goods.", descAr: "توثيق وتخليص البضائع المُصدَّرة مؤقتاً." },
      { name: "ATA Carnet Processing", nameAr: "معالجة كارنيه ATA", desc: "Temporary import/export clearance — 24-hour processing.", descAr: "تخليص الاستيراد/التصدير المؤقت — معالجة خلال 24 ساعة." },
      { name: "SFDA Clearance", nameAr: "تخليص هيئة الغذاء والدواء", desc: "Food, pharmaceutical, and medical device import clearance.", descAr: "تخليص استيراد الغذاء والدواء والأجهزة الطبية." },
      { name: "SABER Registration", nameAr: "تسجيل سابر", desc: "Saudi product conformity certification via SABER.", descAr: "شهادة مطابقة المنتجات السعودية عبر سابر." },
      { name: "SASO Certification", nameAr: "شهادة هيئة المواصفات والمقاييس", desc: "SASO product compliance and standards certification.", descAr: "شهادة امتثال المنتج ومعايير هيئة المواصفات والمقاييس." },
      { name: "Dangerous Goods Clearance", nameAr: "تخليص البضائع الخطرة", desc: "Specialist IMDG/IATA-compliant hazardous goods clearance.", descAr: "تخليص متخصص للبضائع الخطرة المتوافق مع IMDG/IATA." },
      { name: "Exhibition Customs", nameAr: "جمارك المعارض", desc: "Dedicated customs coordination for exhibition cargo.", descAr: "تنسيق جمركي مخصص لشحن المعارض." },
      { name: "Food Import Clearance", nameAr: "تخليص استيراد غذائي", desc: "SFDA-compliant food import process management.", descAr: "إدارة استيراد الغذاء المتوافق مع هيئة الغذاء والدواء." },
      { name: "Medical Equipment Clearance", nameAr: "تخليص الأجهزة الطبية", desc: "SFDA medical device registration and clearance.", descAr: "تسجيل الأجهزة الطبية لدى SFDA وتخليصها." },
      { name: "Electronics Clearance", nameAr: "تخليص الإلكترونيات", desc: "CITC and SASO compliant electronics import clearance.", descAr: "تخليص استيراد الإلكترونيات المتوافق مع CITC وSASO." },
      { name: "Personal Effects Clearance", nameAr: "تخليص المقتنيات الشخصية", desc: "Customs clearance for household goods and personal belongings.", descAr: "تخليص جمركي للأغراض المنزلية والمقتنيات الشخصية." },
    ],
    whyEnvod: [
      { en: "Saudi Customs authority registered broker", ar: "وسيط معتمد لدى الجمارك السعودية" },
      { en: "24-hour clearance guarantee at major ports", ar: "ضمان تخليص خلال 24 ساعة في الموانئ الرئيسية" },
      { en: "SABER, SFDA, CITC, and SASO specialists", ar: "متخصصون في سابر وهيئة الغذاء والدواء وCITC وSASO" },
      { en: "ATA Carnet — fastest processing in the Kingdom", ar: "كارنيه ATA — أسرع معالجة في المملكة" },
      { en: "Dedicated team at Riyadh, Jeddah, and Dammam ports", ar: "فريق مخصص في موانئ الرياض وجدة والدمام" },
    ],
    faq: [
      { q: "How long does customs clearance take in Saudi Arabia?", a: "Standard clearance takes 2–5 business days. With our 24-hour guarantee for routine shipments, most imports clear within one business day.", qAr: "كم يستغرق التخليص الجمركي في المملكة؟", aAr: "يستغرق التخليص القياسي 2-5 أيام عمل. مع ضمان 24 ساعة للشحنات الروتينية، تُخلَّص معظم الواردات في يوم عمل واحد." },
      { q: "What documents are required for import clearance?", a: "Typically: commercial invoice, packing list, bill of lading/airway bill, certificate of origin, and any regulatory certificates (SABER, SFDA, etc.).", qAr: "ما المستندات المطلوبة للتخليص؟", aAr: "عادةً: الفاتورة التجارية وقائمة التعبئة وبوليصة الشحن وشهادة المنشأ وأي شهادات تنظيمية." },
      { q: "Do you offer ATA Carnet services?", a: "Yes — we are ATA Carnet specialists and process applications in 24 hours, the fastest in the Kingdom.", qAr: "هل تقدمون خدمات كارنيه ATA؟", aAr: "نعم — نحن متخصصون في كارنيه ATA ونعالج الطلبات في 24 ساعة، الأسرع في المملكة." },
    ],
  },
  5: {
    id: 5, slug: "warehousing",
    gradient: "linear-gradient(135deg,#0d1520 0%,#162030 50%,#070e18 100%)",
    accentHex: "#64748b",
    industries: ["E-commerce","Retail","FMCG","Pharmaceuticals","Electronics"],
    industriesAr: ["التجارة الإلكترونية","التجزئة","السلع الاستهلاكية","الأدوية","الإلكترونيات"],
    process: [
      { en: "Receiving", ar: "الاستلام" },
      { en: "Inspection", ar: "الفحص" },
      { en: "Storage", ar: "التخزين" },
      { en: "Order Processing", ar: "معالجة الطلبات" },
      { en: "Pick & Pack", ar: "تجميع وتغليف" },
      { en: "Dispatch", ar: "الإرسال" },
      { en: "Delivery", ar: "التسليم" },
    ],
    subServices: [
      { name: "General Warehousing", nameAr: "التخزين العام", desc: "Secure general-purpose storage for all types of cargo.", descAr: "تخزين آمن متعدد الأغراض لجميع أنواع البضائع." },
      { name: "Bonded Warehousing", nameAr: "مستودع جمركي", desc: "Customs-bonded storage for imported goods pending clearance.", descAr: "تخزين جمركي للبضائع المستوردة في انتظار التخليص." },
      { name: "Temperature-Controlled Storage", nameAr: "تخزين بدرجات حرارة مضبوطة", desc: "Climate-controlled zones for food, pharma, and chemicals.", descAr: "مناطق بدرجات حرارة مضبوطة للغذاء والدواء والمواد الكيميائية." },
      { name: "Cold Storage", nameAr: "مستودع بارد", desc: "Deep cold storage for frozen goods and perishables.", descAr: "تخزين بارد عميق للبضائع المجمدة والقابلة للتلف." },
      { name: "Inventory Management", nameAr: "إدارة المخزون", desc: "Real-time WMS with full visibility into stock levels.", descAr: "نظام إدارة مستودعات في الوقت الفعلي مع رؤية كاملة للمخزون." },
      { name: "Pick & Pack", nameAr: "تجميع وتغليف", desc: "Order-level picking, packing, and labeling.", descAr: "تجميع وتغليف وتسمية على مستوى الطلب." },
      { name: "Packing Services", nameAr: "خدمات التغليف", desc: "Professional packing for all cargo types.", descAr: "تغليف احترافي لجميع أنواع البضائع." },
      { name: "Repacking", nameAr: "إعادة التغليف", desc: "Repackaging cargo to meet destination or retail requirements.", descAr: "إعادة تغليف البضائع لتلبية متطلبات الوجهة أو التجزئة." },
      { name: "Labeling & Barcoding", nameAr: "التسمية والترميز الشريطي", desc: "Product labeling, barcode application, and compliance.", descAr: "تسمية المنتجات وتطبيق الباركود والامتثال." },
      { name: "Order Fulfilment", nameAr: "تنفيذ الطلبات", desc: "End-to-end order processing and dispatch.", descAr: "معالجة الطلبات الكاملة من الاستلام إلى الإرسال." },
      { name: "Distribution", nameAr: "التوزيع", desc: "Nationwide distribution from our Riyadh warehouse.", descAr: "توزيع على مستوى المملكة من مستودعنا بالرياض." },
      { name: "Cross Docking", nameAr: "الشحن المباشر", desc: "Fast transfer between inbound and outbound without long-term storage.", descAr: "نقل سريع بين الوارد والصادر دون تخزين طويل الأمد." },
      { name: "Container Stuffing", nameAr: "تعبئة الحاويات", desc: "Professional cargo packing and stuffing into containers.", descAr: "تعبئة احترافية للبضائع داخل الحاويات." },
      { name: "Container Destuffing", nameAr: "تفريغ الحاويات", desc: "Safe unloading and sorting of containerized cargo.", descAr: "تفريغ وفرز آمن للبضائع المحملة في الحاويات." },
      { name: "Cargo Inspection", nameAr: "فحص البضائع", desc: "Quality checks and condition reports on receipt.", descAr: "فحص الجودة وتقارير الحالة عند الاستلام." },
      { name: "Short-Term Storage", nameAr: "تخزين قصير الأمد", desc: "Flexible short-term storage from daily to monthly.", descAr: "تخزين مرن قصير الأمد من يومي إلى شهري." },
      { name: "Long-Term Storage", nameAr: "تخزين طويل الأمد", desc: "Cost-effective long-term warehouse space with full management.", descAr: "مساحة مستودع طويلة الأمد فعالة بالتكلفة مع الإدارة الكاملة." },
      { name: "Value Added Logistics (VAL)", nameAr: "الخدمات اللوجستية ذات القيمة المضافة", desc: "Kitting, assembly, quality checks, and product customization.", descAr: "تجميع وتركيب وفحوصات جودة وتخصيص المنتج." },
      { name: "E-Commerce Fulfillment", nameAr: "الوفاء بطلبات التجارة الإلكترونية", desc: "Fulfillment center services for online retailers.", descAr: "خدمات مركز الوفاء لتجار التجزئة الإلكترونيين." },
      { name: "Warehouse Handling", nameAr: "مناولة المستودعات", desc: "Full materials handling — forklifts, racking, loading bays.", descAr: "مناولة مواد كاملة — رافعات شوكية ورفوف ومحطات تحميل." },
    ],
    whyEnvod: [
      { en: "Strategically located in Riyadh with GCC-wide reach", ar: "موقع استراتيجي في الرياض مع امتداد خليجي" },
      { en: "24/7 security and CCTV monitoring", ar: "أمن وكاميرات مراقبة على مدار الساعة" },
      { en: "ISO-certified warehouse management", ar: "إدارة مستودعات معتمدة بـ ISO" },
      { en: "Full WMS integration with client ERP systems", ar: "تكامل كامل لنظام WMS مع أنظمة ERP للعملاء" },
    ],
    faq: [
      { q: "Do you offer bonded warehousing?", a: "Yes. We operate customs-bonded warehouses where imported goods can be stored pending customs clearance or re-export.", qAr: "هل تقدمون مستودعات جمركية؟", aAr: "نعم. نشغّل مستودعات جمركية لتخزين البضائع المستوردة في انتظار التخليص أو إعادة التصدير." },
    ],
  },
  6: {
    id: 6, slug: "freight-forwarding",
    gradient: "linear-gradient(135deg,#150a2a 0%,#220f3a 50%,#0c0515 100%)",
    accentHex: "#a855f7",
    industries: ["All Sectors","Manufacturing","Oil & Gas","Construction","Technology"],
    industriesAr: ["جميع القطاعات","التصنيع","النفط والغاز","البناء","التكنولوجيا"],
    process: [
      { en: "Consultation", ar: "الاستشارة" },
      { en: "Routing", ar: "تحديد المسار" },
      { en: "Documentation", ar: "التوثيق" },
      { en: "Pickup", ar: "الاستلام" },
      { en: "Transit Management", ar: "إدارة العبور" },
      { en: "Customs Clearance", ar: "التخليص" },
      { en: "Final Delivery", ar: "التسليم" },
    ],
    subServices: [
      { name: "Multimodal Freight Forwarding", nameAr: "الشحن متعدد الوسائط", desc: "Combined sea/air/road routing for cost and time optimization.", descAr: "توجيه مدمج جوياً وبحرياً وبرياً." },
      { name: "Door-to-Door Forwarding", nameAr: "من الباب للباب", desc: "Complete origin-to-destination management.", descAr: "إدارة كاملة من المنشأ إلى الوجهة." },
      { name: "Import Freight Forwarding", nameAr: "شحن الاستيراد", desc: "Managed imports into Saudi Arabia from worldwide origins.", descAr: "واردات مُدارة إلى المملكة من مصادر عالمية." },
      { name: "Export Freight Forwarding", nameAr: "شحن التصدير", desc: "Saudi export coordination to all global markets.", descAr: "تنسيق التصدير السعودي إلى جميع الأسواق العالمية." },
      { name: "Cargo Insurance", nameAr: "تأمين الشحن", desc: "Full cargo cover for door-to-door shipments.", descAr: "تغطية شحن كاملة للشحنات من الباب للباب." },
      { name: "3PL Solutions", nameAr: "حلول الطرف الثالث اللوجستية", desc: "Outsourced logistics management (3PL).", descAr: "إدارة لوجستية مُستعان بها من طرف ثالث." },
      { name: "Project Forwarding", nameAr: "شحن المشاريع", desc: "Specialist forwarding for industrial project cargo.", descAr: "شحن متخصص لبضائع المشاريع الصناعية." },
      { name: "Customs Brokerage", nameAr: "وكالة جمركية", desc: "Licensed customs brokerage and documentation.", descAr: "وكالة جمركية مرخصة وتوثيق." },
    ],
    whyEnvod: [
      { en: "25+ years of Saudi logistics expertise", ar: "أكثر من 25 عاماً من الخبرة اللوجستية السعودية" },
      { en: "Global agent network in 50+ countries", ar: "شبكة وكلاء عالمية في أكثر من 50 دولة" },
      { en: "Multimodal solutions tailored to your supply chain", ar: "حلول متعددة الوسائط مصممة لسلسلة التوريد الخاصة بك" },
    ],
    faq: [
      { q: "What does a freight forwarder do?", a: "A freight forwarder organizes shipments on behalf of shippers — arranging transport, handling documentation, managing customs, and coordinating the complete logistics chain.", qAr: "ما دور وكيل الشحن؟", aAr: "يُنظّم وكيل الشحن الشحنات نيابةً عن المرسلين — ترتيب النقل ومعالجة المستندات وإدارة الجمارك وتنسيق سلسلة اللوجستيات الكاملة." },
    ],
  },
  7: {
    id: 7, slug: "supply-chain",
    gradient: "linear-gradient(135deg,#0d0520 0%,#190830 50%,#07030f 100%)",
    accentHex: "#6366f1",
    industries: ["Manufacturing","Retail","FMCG","Automotive","Healthcare"],
    industriesAr: ["التصنيع","التجزئة","السلع الاستهلاكية","السيارات","الرعاية الصحية"],
    process: [
      { en: "Analysis", ar: "التحليل" },
      { en: "Strategy", ar: "الاستراتيجية" },
      { en: "Vendor Setup", ar: "إعداد الموردين" },
      { en: "Implementation", ar: "التنفيذ" },
      { en: "Monitoring", ar: "المراقبة" },
      { en: "Optimization", ar: "التحسين" },
    ],
    subServices: [
      { name: "Supply Chain Consulting", nameAr: "استشارات سلسلة التوريد", desc: "Expert analysis and optimization of your logistics network.", descAr: "تحليل وتحسين متخصص لشبكتك اللوجستية." },
      { name: "Vendor Management", nameAr: "إدارة الموردين", desc: "Supplier selection, onboarding, and performance management.", descAr: "اختيار الموردين وتأهيلهم وإدارة أدائهم." },
      { name: "Demand Planning", nameAr: "تخطيط الطلب", desc: "Data-driven demand forecasting to optimize inventory.", descAr: "توقع الطلب بالبيانات لتحسين المخزون." },
      { name: "Last-Mile Solutions", nameAr: "حلول المرحلة الأخيرة", desc: "Efficient final delivery with route optimization.", descAr: "توصيل نهائي فعّال مع تحسين المسارات." },
      { name: "ERP Integration", nameAr: "تكامل ERP", desc: "Seamless integration with SAP, Oracle, and other ERP systems.", descAr: "تكامل سلس مع SAP وOracle وأنظمة ERP الأخرى." },
      { name: "KPI Reporting & Analytics", nameAr: "تقارير مؤشرات الأداء والتحليلات", desc: "Real-time dashboards and performance analytics.", descAr: "لوحات معلومات في الوقت الفعلي وتحليلات الأداء." },
      { name: "Warehouse Management", nameAr: "إدارة المستودعات", desc: "Integrated WMS solutions for efficient warehouse operations.", descAr: "حلول WMS متكاملة لعمليات مستودعات فعّالة." },
      { name: "Transportation Management", nameAr: "إدارة النقل", desc: "TMS solutions to optimize fleet routing and carrier selection.", descAr: "حلول TMS لتحسين توجيه الأسطول واختيار الناقل." },
    ],
    whyEnvod: [
      { en: "End-to-end visibility across your entire supply chain", ar: "رؤية شاملة عبر سلسلة التوريد بأكملها" },
      { en: "ERP integration with SAP, Oracle, and Odoo", ar: "تكامل ERP مع SAP وOracle وOdoo" },
      { en: "Dedicated KAM assigned to your account", ar: "مدير حسابات مخصص لحسابك" },
    ],
    faq: [
      { q: "Can you integrate with our ERP system?", a: "Yes. We integrate with all major ERP systems including SAP, Oracle, Microsoft Dynamics, and Odoo for real-time visibility.", qAr: "هل يمكنكم التكامل مع نظام ERP لدينا؟", aAr: "نعم. نتكامل مع جميع أنظمة ERP الرئيسية بما فيها SAP وOracle وMicrosoft Dynamics وOdoo." },
    ],
  },
  8: {
    id: 8, slug: "project-cargo",
    gradient: "linear-gradient(135deg,#1a0a04 0%,#2d1508 50%,#0e0604 100%)",
    accentHex: "#f97316",
    industries: ["Oil & Gas","Renewable Energy","Construction","Mining","Power Generation"],
    industriesAr: ["النفط والغاز","الطاقة المتجددة","البناء","التعدين","توليد الطاقة"],
    process: [
      { en: "Feasibility Study", ar: "دراسة الجدوى" },
      { en: "Route Survey", ar: "مسح المسار" },
      { en: "Engineering Plan", ar: "الخطة الهندسية" },
      { en: "Permits & Approvals", ar: "التصاريح والموافقات" },
      { en: "Transport Execution", ar: "تنفيذ النقل" },
      { en: "Crane & Rigging", ar: "الرافعة والتعليق" },
      { en: "Site Delivery", ar: "التسليم للموقع" },
    ],
    subServices: [
      { name: "Heavy Lift Cargo", nameAr: "شحن الرفع الثقيل", desc: "Crane-assisted heavy lift for oversized industrial equipment.", descAr: "رفع ثقيل بمساعدة الرافعات للمعدات الصناعية الضخمة." },
      { name: "Oversized Cargo Transport", nameAr: "نقل البضائع الضخمة", desc: "Permit-managed oversized load transport by road and sea.", descAr: "نقل الأحمال الضخمة برياً وبحرياً بإدارة التصاريح اللازمة." },
      { name: "Break Bulk Cargo", nameAr: "بضائع بريك بالك", desc: "Non-containerized break bulk transport for large project items.", descAr: "نقل بريك بالك غير حاوية للعناصر الكبيرة للمشاريع." },
      { name: "Industrial Machinery", nameAr: "الآلات الصناعية", desc: "Specialist transport and installation of industrial machinery.", descAr: "نقل وتركيب متخصص للآلات الصناعية." },
      { name: "Power Plant Equipment", nameAr: "معدات محطات الطاقة", desc: "Transformers, generators, and power infrastructure logistics.", descAr: "لوجستيات المحولات والمولدات وبنية الطاقة التحتية." },
      { name: "Oil & Gas Equipment Logistics", nameAr: "لوجستيات معدات النفط والغاز", desc: "Secure transport of drilling, refining, and processing equipment.", descAr: "نقل آمن لمعدات الحفر والتكرير والمعالجة." },
      { name: "Renewable Energy Projects", nameAr: "مشاريع الطاقة المتجددة", desc: "Wind turbines, solar panels, and energy infrastructure logistics.", descAr: "لوجستيات توربينات الرياح والألواح الشمسية وبنية الطاقة." },
      { name: "Construction Equipment", nameAr: "معدات البناء", desc: "Cranes, excavators, and construction plant transport.", descAr: "نقل الرافعات والحفارات ومعدات البناء." },
      { name: "Route Survey", nameAr: "مسح المسار", desc: "Pre-movement route assessment for oversized cargo.", descAr: "تقييم المسار قبل الحركة للبضائع الكبيرة." },
      { name: "Escort Vehicles", nameAr: "مركبات المرافقة", desc: "Police and pilot escort coordination for abnormal loads.", descAr: "تنسيق مرافقة شرطية وطليعية للأحمال غير الاعتيادية." },
      { name: "Crane Coordination", nameAr: "تنسيق الرافعات", desc: "Full lift planning and crane operations on site.", descAr: "تخطيط وتنفيذ الرفع الكامل وعمليات الرافعات في الموقع." },
      { name: "Port Handling", nameAr: "مناولة الميناء", desc: "Specialist stevedoring and port handling for project cargo.", descAr: "مناولة ميناء متخصصة لبضائع المشاريع." },
      { name: "Site Delivery", nameAr: "التسليم للموقع", desc: "Final delivery and unloading directly to the project site.", descAr: "التسليم والتفريغ النهائي مباشرة في موقع المشروع." },
      { name: "Multi-Modal Project Logistics", nameAr: "لوجستيات المشاريع متعددة الوسائط", desc: "Combined sea, air, and road project cargo solutions.", descAr: "حلول بضائع مشاريع مدمجة بحراً وجواً وبراً." },
    ],
    whyEnvod: [
      { en: "Specialist project cargo team in Saudi Arabia", ar: "فريق متخصص في بضائع المشاريع في المملكة" },
      { en: "Full route survey and engineering support", ar: "مسح مسار كامل ودعم هندسي" },
      { en: "Crane and rigging services on-site", ar: "خدمات رافعات وتعليق في الموقع" },
      { en: "Saudi Aramco and SABIC supply chain experience", ar: "خبرة في سلاسل توريد أرامكو وسابك" },
    ],
    faq: [
      { q: "What qualifies as project cargo?", a: "Project cargo includes oversized, heavy, or high-value shipments that require specialized handling — typically industrial equipment, power plant components, oil & gas hardware, or infrastructure materials.", qAr: "ما الذي يُصنّف ضمن بضائع المشاريع؟", aAr: "تشمل بضائع المشاريع الشحنات الضخمة أو الثقيلة أو عالية القيمة التي تتطلب مناولة متخصصة." },
    ],
  },
  9: {
    id: 9, slug: "relocation",
    gradient: "linear-gradient(135deg,#180c04 0%,#281408 50%,#0c0604 100%)",
    accentHex: "#fb923c",
    industries: ["Corporate","Government","Diplomatic","Individual","Expat Communities"],
    industriesAr: ["الشركات","الحكومة","الدبلوماسية","الأفراد","المغتربون"],
    process: [
      { en: "Survey", ar: "المسح" },
      { en: "Packing", ar: "التغليف" },
      { en: "Loading", ar: "التحميل" },
      { en: "Transport", ar: "النقل" },
      { en: "Customs", ar: "الجمارك" },
      { en: "Delivery", ar: "التسليم" },
      { en: "Unpacking", ar: "فك التغليف" },
    ],
    subServices: [
      { name: "Residential Relocation", nameAr: "الانتقال السكني", desc: "Professional household moving within KSA or internationally.", descAr: "نقل منزلي احترافي داخل المملكة أو دولياً." },
      { name: "Corporate Relocation", nameAr: "الانتقال المؤسسي", desc: "Employee and office relocation management.", descAr: "إدارة انتقال الموظفين والمكاتب." },
      { name: "International Relocation", nameAr: "الانتقال الدولي", desc: "Door-to-door global relocation with customs support.", descAr: "انتقال دولي شامل من الباب للباب مع دعم جمركي." },
      { name: "Export Packing", nameAr: "تغليف للتصدير", desc: "ISPM-compliant export packing for international shipments.", descAr: "تغليف للتصدير متوافق مع ISPM للشحنات الدولية." },
      { name: "Industrial Packing", nameAr: "تغليف صناعي", desc: "Heavy-duty packing for machinery and industrial equipment.", descAr: "تغليف للمعدات الثقيلة والمعدات الصناعية." },
      { name: "Wooden Crating", nameAr: "التغليف الخشبي", desc: "Custom wooden crates for fragile or high-value items.", descAr: "أقفاص خشبية مخصصة للعناصر الهشة أو عالية القيمة." },
      { name: "Vacuum Packing", nameAr: "التغليف الفراغي", desc: "Vacuum seal packing for moisture-sensitive cargo.", descAr: "تغليف بالتفريغ للبضائع الحساسة للرطوبة." },
      { name: "Shrink Wrapping", nameAr: "التغليف بالشرينك", desc: "Shrink wrap protection for palletized goods.", descAr: "حماية بالشرينك للبضائع المرصوصة على منصات." },
      { name: "Palletizing", nameAr: "وضع البضائع على منصات", desc: "Efficient palletizing for warehouse and freight handling.", descAr: "ترتيب فعّال على منصات للمستودعات والشحن." },
      { name: "Cargo Securing", nameAr: "تأمين البضائع", desc: "Professional lashing, bracing, and securing of cargo.", descAr: "ربط وتدعيم وتأمين احترافي للبضائع." },
      { name: "Loading & Unloading", nameAr: "التحميل والتفريغ", desc: "Professional cargo loading and unloading at any site.", descAr: "تحميل وتفريغ احترافي للبضائع في أي موقع." },
      { name: "On-site Cargo Handling", nameAr: "مناولة البضائع في الموقع", desc: "Full on-site cargo management during moves.", descAr: "إدارة بضائع كاملة في الموقع خلال عمليات النقل." },
      { name: "Pet Relocation", nameAr: "انتقال الحيوانات الأليفة", desc: "Specialist animal transport with veterinary documentation.", descAr: "نقل متخصص للحيوانات مع الوثائق البيطرية." },
      { name: "Vehicle Shipping", nameAr: "شحن السيارات", desc: "Safe international vehicle transport and clearance.", descAr: "نقل دولي آمن للسيارات وتخليصها." },
    ],
    whyEnvod: [
      { en: "Professional packing teams with specialized materials", ar: "فرق تغليف احترافية بمواد متخصصة" },
      { en: "Full customs support for personal effects", ar: "دعم جمركي كامل للمقتنيات الشخصية" },
      { en: "Serving diplomatic and corporate communities in KSA", ar: "خدمة المجتمعات الدبلوماسية والمؤسسية في المملكة" },
    ],
    faq: [
      { q: "Do you ship personal belongings internationally?", a: "Yes. We handle full international relocation including professional packing, door-to-door shipping, customs clearance at both origin and destination.", qAr: "هل تشحنون المقتنيات الشخصية دولياً؟", aAr: "نعم. نتولى الانتقال الدولي الكامل بما في ذلك التغليف الاحترافي والشحن من الباب للباب." },
    ],
  },
  10: {
    id: 10, slug: "ecommerce-logistics",
    gradient: "linear-gradient(135deg,#0a0a28 0%,#12103a 50%,#060615 100%)",
    accentHex: "#3b82f6",
    industries: ["Online Retail","Fashion","Electronics","FMCG","Marketplace Sellers"],
    industriesAr: ["التجزئة الإلكترونية","الأزياء","الإلكترونيات","السلع الاستهلاكية","بائعو المنصات"],
    process: [
      { en: "Order Received", ar: "استلام الطلب" },
      { en: "Pick & Pack", ar: "تجميع وتغليف" },
      { en: "Dispatch", ar: "الإرسال" },
      { en: "Transit", ar: "العبور" },
      { en: "Last Mile", ar: "المرحلة الأخيرة" },
      { en: "Delivery", ar: "التسليم" },
    ],
    subServices: [
      { name: "Fulfillment Center Services", nameAr: "خدمات مركز الوفاء", desc: "Pick, pack, and ship for all online orders.", descAr: "تجميع وتغليف وشحن لجميع الطلبات الإلكترونية." },
      { name: "Last-Mile Delivery", nameAr: "توصيل المرحلة الأخيرة", desc: "Saudi-wide home delivery with live tracking.", descAr: "توصيل منزلي في جميع أنحاء المملكة مع التتبع المباشر." },
      { name: "Same-Day Delivery", nameAr: "التوصيل في اليوم ذاته", desc: "Same-day delivery within major Saudi cities.", descAr: "توصيل في اليوم ذاته داخل المدن السعودية الكبرى." },
      { name: "Returns Management", nameAr: "إدارة المرتجعات", desc: "Streamlined reverse logistics and returns processing.", descAr: "لوجستيات عكسية مبسطة ومعالجة المرتجعات." },
      { name: "COD (Cash on Delivery)", nameAr: "الدفع عند الاستلام", desc: "COD collection and reconciliation.", descAr: "تحصيل وتسوية الدفع عند الاستلام." },
      { name: "Cross-Border E-commerce", nameAr: "التجارة الإلكترونية العابرة للحدود", desc: "International e-commerce shipping to/from Saudi Arabia.", descAr: "شحن التجارة الإلكترونية الدولية من/إلى المملكة." },
      { name: "Platform Integration", nameAr: "تكامل المنصات", desc: "API integration with Salla, Zid, Amazon, Noon, and Shopify.", descAr: "تكامل API مع سلة وZid وAmazon وNoon وShopify." },
      { name: "Inventory Management", nameAr: "إدارة المخزون", desc: "Real-time stock management for e-commerce sellers.", descAr: "إدارة مخزون في الوقت الفعلي لبائعي التجارة الإلكترونية." },
    ],
    whyEnvod: [
      { en: "Same-day dispatch for orders received before 12pm", ar: "إرسال في اليوم ذاته للطلبات الواردة قبل 12 ظهراً" },
      { en: "API integration with major Saudi e-commerce platforms", ar: "تكامل API مع أبرز منصات التجارة الإلكترونية السعودية" },
      { en: "COD support and reconciliation", ar: "دعم وتسوية الدفع عند الاستلام" },
    ],
    faq: [
      { q: "Do you integrate with Salla and Zid?", a: "Yes. We offer API integration with Salla, Zid, Amazon.sa, Noon, and Shopify for automated order management.", qAr: "هل تتكاملون مع سلة وZid؟", aAr: "نعم. نقدم تكامل API مع سلة وZid وAmazon.sa وNoon وShopify." },
    ],
  },
  11: {
    id: 11, slug: "exhibition-logistics",
    pillar: EXHIBITION_PILLAR,
    gradient: "linear-gradient(135deg,#1a0508 0%,#2d080e 50%,#0e0304 100%)",
    accentHex: "#ef4444",
    industries: ["Technology","Construction","Healthcare","Energy","Defense","Food & Agriculture"],
    industriesAr: ["التكنولوجيا","البناء","الرعاية الصحية","الطاقة","الدفاع","الغذاء والزراعة"],
    process: [
      { en: "Consultation", ar: "الاستشارة" },
      { en: "Planning", ar: "التخطيط" },
      { en: "Documentation", ar: "التوثيق" },
      { en: "Transportation", ar: "النقل" },
      { en: "Venue Delivery", ar: "التسليم للموقع" },
      { en: "On-site Support", ar: "الدعم الميداني" },
      { en: "Return Logistics", ar: "اللوجستيات العكسية" },
    ],
    subServices: [
      { name: "ATA Carnet Processing", nameAr: "معالجة كارنيه ATA", desc: "24-hour ATA Carnet — fastest processing in Saudi Arabia.", descAr: "كارنيه ATA خلال 24 ساعة — الأسرع في المملكة." },
      { name: "ATA Carnet Application", nameAr: "طلب كارنيه ATA", desc: "Full ATA Carnet application and documentation service.", descAr: "خدمة طلب ووثائق كارنيه ATA الكاملة." },
      { name: "Exhibition Cargo Handling", nameAr: "مناولة شحن المعارض", desc: "Specialist handling of all exhibition materials and displays.", descAr: "مناولة متخصصة لجميع مواد ومعروضات المعارض." },
      { name: "Exhibition Booth Logistics", nameAr: "لوجستيات أجنحة المعارض", desc: "Complete logistics for exhibition booths and stand structures.", descAr: "لوجستيات كاملة للأجنحة والهياكل في المعارض." },
      { name: "Trade Show Logistics", nameAr: "لوجستيات معارض التجارة", desc: "End-to-end logistics management for trade show participation.", descAr: "إدارة لوجستيات شاملة للمشاركة في معارض التجارة." },
      { name: "Event Equipment Transport", nameAr: "نقل معدات الفعاليات", desc: "AV equipment, staging, furniture, and tech setup transport.", descAr: "نقل معدات الصوت والصورة والأثاث والتقنيات." },
      { name: "Temporary Import Documentation", nameAr: "وثائق الاستيراد المؤقت", desc: "Complete documentation for temporarily imported goods.", descAr: "توثيق كامل للبضائع المستوردة مؤقتاً." },
      { name: "Temporary Export Documentation", nameAr: "وثائق التصدير المؤقت", desc: "All paperwork for temporarily exported exhibition goods.", descAr: "جميع الوثائق للبضائع المعروضة المُصدَّرة مؤقتاً." },
      { name: "On-site Delivery", nameAr: "التسليم في الموقع", desc: "Timed on-site delivery directly to your stand.", descAr: "توصيل في الوقت المحدد مباشرة إلى جناحك." },
      { name: "On-site Cargo Handling", nameAr: "مناولة البضائع في الموقع", desc: "Dedicated on-site team during setup and dismantling.", descAr: "فريق مخصص في الموقع أثناء الإعداد والتفكيك." },
      { name: "Installation Support", nameAr: "دعم التركيب", desc: "Assistance with assembly and installation at the venue.", descAr: "مساعدة في التجميع والتركيب في مكان الفعالية." },
      { name: "Dismantling Support", nameAr: "دعم التفكيك", desc: "Post-event dismantling and cargo preparation for return.", descAr: "تفكيك ما بعد الفعالية وإعداد البضائع للإعادة." },
      { name: "Customs Coordination", nameAr: "تنسيق الجمارك", desc: "Dedicated customs coordination for all exhibition cargo.", descAr: "تنسيق جمركي مخصص لجميع شحنات المعارض." },
      { name: "Return Shipment", nameAr: "شحن العودة", desc: "Smooth collection and return of all exhibition materials.", descAr: "جمع وإعادة سلسة لجميع مواد المعارض." },
      { name: "VIP Event Logistics", nameAr: "لوجستيات الفعاليات الخاصة", desc: "White-glove logistics for government and VIP events.", descAr: "لوجستيات فاخرة للفعاليات الحكومية وكبار الشخصيات." },
    ],
    whyEnvod: [
      { en: "25+ years supporting Saudi Arabia's biggest exhibitions", ar: "أكثر من 25 عاماً في دعم أكبر معارض المملكة" },
      { en: "ATA Carnet — 24-hour processing, the fastest in KSA", ar: "كارنيه ATA — معالجة في 24 ساعة، الأسرع في المملكة" },
      { en: "Trusted at LEAP, Saudi Build, Cityscape, Big 5, INDEX", ar: "موثوق به في LEAP وSaudi Build وCityscape وBig 5" },
      { en: "Dedicated on-site logistics coordinator during events", ar: "منسق لوجستيات مخصص في الموقع خلال الفعاليات" },
    ],
    faq: [
      { q: "What is an ATA Carnet?", a: "An ATA Carnet is an international customs document that allows temporary import and export of goods without paying customs duties. It's ideal for exhibition materials, professional equipment, and trade samples.", qAr: "ما هو كارنيه ATA؟", aAr: "كارنيه ATA هو مستند جمركي دولي يتيح الاستيراد والتصدير المؤقت للبضائع دون دفع رسوم جمركية." },
      { q: "How far in advance should I book exhibition logistics?", a: "We recommend booking 4–6 weeks before your event. For major exhibitions like LEAP or Cityscape, 8 weeks is ideal to secure the best rates and availability.", qAr: "كم قبل حجز لوجستيات المعارض؟", aAr: "نوصي بالحجز قبل 4-6 أسابيع. للمعارض الكبرى كـ LEAP وCityscape، 8 أسابيع هي المثالية." },
      { q: "Which Saudi exhibition venues do you deliver to?", a: "We deliver nationwide to every major venue, including the Riyadh International Convention & Exhibition Center (RICEC), Riyadh Front, Jeddah Superdome, the Jeddah Center for Forums & Events, and Dhahran Expo — plus hotel and conference venues across the Kingdom.", qAr: "إلى أي أماكن معارض في المملكة تُسلّمون؟", aAr: "نُسلّم على مستوى المملكة إلى كل مكان رئيسي، بما في ذلك مركز الرياض الدولي للمؤتمرات والمعارض، وواجهة الرياض، وقبة جدة، ومركز جدة للمنتديات والفعاليات، وظهران إكسبو — إضافة إلى فنادق ومراكز مؤتمرات في مختلف أنحاء المملكة." },
      { q: "Do you handle on-site setup and dismantling at the stand?", a: "Yes. Our on-site team takes delivery at the venue, moves cargo to your stand, and assists with unpacking, positioning, empty-crate storage, and post-event dismantling and repacking.", qAr: "هل تتولّون التركيب والتفكيك في الجناح؟", aAr: "نعم. يستلم فريقنا الميداني الشحنة في المكان، وينقلها إلى جناحك، ويساعد في فك التغليف والتموضع وتخزين الصناديق الفارغة والتفكيك وإعادة التغليف بعد الفعالية." },
      { q: "Can you arrange temporary import without an ATA Carnet?", a: "Yes. When an ATA Carnet is not available in the country of origin, we arrange temporary-import clearance directly through Saudi Customs, including the required guarantees and re-export documentation.", qAr: "هل يمكنكم ترتيب الاستيراد المؤقت دون كارنيه ATA؟", aAr: "نعم. عندما لا يتوفّر كارنيه ATA في بلد المنشأ، نُرتّب التخليص للاستيراد المؤقت مباشرة عبر الجمارك السعودية، بما في ذلك الضمانات المطلوبة ووثائق إعادة التصدير." },
      { q: "Which major exhibitions has ENVOD supported?", a: "We have handled logistics for exhibitors at leading Saudi events including LEAP, Cityscape Global, Big 5 Construct Saudi, Saudi Build, INDEX and the Global Health Exhibition, among many others.", qAr: "ما أبرز المعارض التي دعمتها إنفود؟", aAr: "تولّينا لوجستيات العارضين في أبرز الفعاليات السعودية، ومنها LEAP وCityscape Global وBig 5 وSaudi Build وINDEX ومعرض الصحة العالمي، وغيرها الكثير." },
      { q: "Do you manage the return shipment of exhibition materials after the event?", a: "Yes. Return and re-export are part of our standard exhibition service — we collect from your stand, repack, complete the customs re-export, and ship your materials back to origin or on to your next show.", qAr: "هل تديرون شحن إعادة مواد المعرض بعد الحدث؟", aAr: "نعم. الإعادة وإعادة التصدير جزء من خدمتنا القياسية للمعارض — نجمع من جناحك، ونعيد التغليف، ونُنجز إعادة التصدير الجمركية، ونشحن موادك إلى المنشأ أو إلى معرضك التالي." },
      { q: "How much does exhibition logistics cost?", a: "Cost depends on the volume and weight of your cargo, the transport mode, the origin, and how much on-site support you need. Share your equipment list and event dates and we'll send a detailed, no-obligation quote — usually within a few hours.", qAr: "كم تكلفة لوجستيات المعارض؟", aAr: "تعتمد التكلفة على حجم شحنتك ووزنها، ووسيلة النقل، وبلد المنشأ، وحجم الدعم الميداني المطلوب. أرسل لنا قائمة معداتك وتواريخ فعاليتك وسنرسل عرض سعر مفصلاً دون التزام — عادةً خلال ساعات." },
      { q: "Can you ship urgent exhibition cargo by air?", a: "Yes. For last-minute or time-critical shipments we arrange express air freight with prioritised customs clearance so your materials reach the stand before build-up closes.", qAr: "هل يمكنكم شحن بضائع المعارض العاجلة جواً؟", aAr: "نعم. للشحنات اللحظية أو الحسّاسة للوقت نُرتّب شحناً جوياً سريعاً مع تخليص جمركي ذي أولوية حتى تصل موادك إلى الجناح قبل انتهاء فترة التجهيز." },
    ],
  },
  12: {
    id: 12, slug: "medical-pharma",
    gradient: "linear-gradient(135deg,#042020 0%,#063030 50%,#021010 100%)",
    accentHex: "#14b8a6",
    industries: ["Hospitals","Pharmacies","Biotech","Medical Devices","Clinical Trials"],
    industriesAr: ["المستشفيات","الصيدليات","التقنية الحيوية","الأجهزة الطبية","التجارب السريرية"],
    process: [
      { en: "Order Processing", ar: "معالجة الطلب" },
      { en: "GDP Compliance Check", ar: "فحص امتثال GDP" },
      { en: "Temperature Setup", ar: "إعداد درجة الحرارة" },
      { en: "SFDA Clearance", ar: "تخليص SFDA" },
      { en: "Cold Chain Transit", ar: "عبور السلسلة الباردة" },
      { en: "Delivery & Verification", ar: "التسليم والتحقق" },
    ],
    subServices: [
      { name: "Cold Chain Logistics", nameAr: "لوجستيات السلسلة الباردة", desc: "GDP-compliant temperature-controlled pharmaceutical logistics.", descAr: "لوجستيات دوائية بدرجات حرارة مضبوطة متوافقة مع GDP." },
      { name: "Refrigerated Transportation", nameAr: "النقل المبرد الدوائي", desc: "Validated refrigerated trucks for pharma and biologics.", descAr: "شاحنات مبردة معتمدة للأدوية والمستحضرات البيولوجية." },
      { name: "Temperature Monitoring", nameAr: "مراقبة درجات الحرارة", desc: "24/7 IoT-based temperature monitoring and deviation alerts.", descAr: "مراقبة حرارة على مدار الساعة بالإنترنت مع تنبيهات الانحراف." },
      { name: "SFDA Import Clearance", nameAr: "تخليص استيراد SFDA", desc: "Full SFDA registration and clearance for pharma imports.", descAr: "تسجيل وتخليص SFDA الكامل لواردات الأدوية." },
      { name: "Pharmaceutical Cold Chain", nameAr: "سلسلة التبريد الدوائية", desc: "End-to-end GDP cold chain from origin to Saudi hospital.", descAr: "سلسلة تبريد GDP متكاملة من المنشأ إلى المستشفى السعودي." },
      { name: "Climate-Controlled Warehousing", nameAr: "تخزين بدرجات حرارة مضبوطة", desc: "GDP-validated pharma warehousing with humidity control.", descAr: "تخزين دوائي معتمد GDP مع التحكم بالرطوبة." },
      { name: "Hospital & Clinic Delivery", nameAr: "توصيل المستشفيات والعيادات", desc: "Direct delivery to healthcare facilities across Saudi Arabia.", descAr: "توصيل مباشر إلى المرافق الصحية عبر المملكة." },
      { name: "Clinical Trial Logistics", nameAr: "لوجستيات التجارب السريرية", desc: "Compliant logistics for investigational medicinal products.", descAr: "لوجستيات متوافقة لمنتجات الأدوية التحقيقية." },
      { name: "Medical Device Import", nameAr: "استيراد الأجهزة الطبية", desc: "SFDA medical device registration and customs clearance.", descAr: "تسجيل الأجهزة الطبية لدى SFDA والتخليص الجمركي." },
      { name: "Time-Critical Deliveries", nameAr: "توصيلات حرجة بالوقت", desc: "Emergency and time-sensitive pharmaceutical deliveries.", descAr: "توصيلات دوائية طارئة وحساسة للوقت." },
    ],
    whyEnvod: [
      { en: "GDP-certified cold chain management", ar: "إدارة سلسلة باردة معتمدة بـ GDP" },
      { en: "SFDA-approved import procedures", ar: "إجراءات استيراد معتمدة من هيئة الغذاء والدواء" },
      { en: "24/7 temperature monitoring and alerts", ar: "مراقبة درجات الحرارة وتنبيهات على مدار الساعة" },
    ],
    faq: [
      { q: "Do you handle temperature-sensitive pharmaceutical cargo?", a: "Yes. We operate full GDP-compliant cold chain logistics with validated temperature-controlled vehicles, packaging, and monitoring.", qAr: "هل تتولون الشحن الدوائي الحساس للحرارة؟", aAr: "نعم. نشغّل لوجستيات السلسلة الباردة المتوافقة مع GDP بالكامل." },
    ],
  },
  13: {
    id: 13, slug: "food-fmcg",
    gradient: "linear-gradient(135deg,#041a04 0%,#072807 50%,#020e02 100%)",
    accentHex: "#22c55e",
    industries: ["Food Retail","Supermarkets","Restaurants","FMCG Brands","Agriculture"],
    industriesAr: ["تجزئة الغذاء","السوبرماركت","المطاعم","العلامات الاستهلاكية","الزراعة"],
    process: [
      { en: "Order", ar: "الطلب" },
      { en: "SFDA Clearance", ar: "تخليص SFDA" },
      { en: "Cold Chain Setup", ar: "إعداد السلسلة الباردة" },
      { en: "Transport", ar: "النقل" },
      { en: "Distribution", ar: "التوزيع" },
    ],
    subServices: [
      { name: "Cold Chain Logistics", nameAr: "لوجستيات السلسلة الباردة", desc: "End-to-end cold chain for all perishable food products.", descAr: "سلسلة تبريد متكاملة لجميع المنتجات الغذائية القابلة للتلف." },
      { name: "Refrigerated Transportation", nameAr: "النقل المبرد", desc: "Temperature-controlled trucks for fresh and chilled food.", descAr: "شاحنات بدرجات حرارة مضبوطة للأغذية الطازجة والمبردة." },
      { name: "Temperature Monitoring", nameAr: "مراقبة درجات الحرارة", desc: "Real-time temperature logging throughout the cold chain.", descAr: "تسجيل حرارة في الوقت الفعلي عبر سلسلة التبريد بالكامل." },
      { name: "Fresh Food Logistics", nameAr: "لوجستيات الأغذية الطازجة", desc: "Time-critical fresh produce delivery across Saudi Arabia.", descAr: "توصيل حساس للوقت للمنتجات الطازجة عبر المملكة." },
      { name: "Frozen Cargo", nameAr: "الشحن المجمد", desc: "Deep freeze transport and storage for frozen food products.", descAr: "نقل وتخزين عميق للمنتجات الغذائية المجمدة." },
      { name: "Pharmaceutical Cold Chain", nameAr: "التبريد الدوائي الغذائي", desc: "GDP-style cold chain for nutraceuticals and supplements.", descAr: "سلسلة تبريد على غرار GDP للمكملات الغذائية والصحية." },
      { name: "Climate-Controlled Warehousing", nameAr: "تخزين بالتحكم المناخي", desc: "Temperature and humidity-controlled food storage.", descAr: "تخزين غذائي بالتحكم في درجة الحرارة والرطوبة." },
      { name: "SFDA Food Clearance", nameAr: "تخليص غذاء SFDA", desc: "Saudi food authority clearance for all food imports.", descAr: "تخليص هيئة الغذاء والدواء لجميع واردات الغذاء." },
      { name: "Halal Certification Support", nameAr: "دعم شهادة الحلال", desc: "Documentation and verification for halal imports.", descAr: "التوثيق والتحقق من واردات المنتجات الحلال." },
      { name: "Supermarket Distribution", nameAr: "توزيع للسوبرماركت", desc: "Scheduled direct delivery to retail outlets.", descAr: "توصيل مجدول مباشر إلى منافذ البيع." },
      { name: "Time-Critical Deliveries", nameAr: "توصيلات حرجة بالوقت", desc: "Same-day and express delivery for time-sensitive food cargo.", descAr: "توصيل في اليوم ذاته وسريع للشحن الغذائي الحساس للوقت." },
    ],
    whyEnvod: [
      { en: "SFDA-certified import and clearance procedures", ar: "إجراءات استيراد وتخليص معتمدة من هيئة الغذاء والدواء" },
      { en: "Full halal import compliance and documentation", ar: "امتثال واثق للاستيراد الحلال والتوثيق الكامل" },
    ],
    faq: [
      { q: "Do you handle halal food import documentation?", a: "Yes. We manage all halal certification verification and SFDA food import clearance procedures.", qAr: "هل تتولون توثيق استيراد الغذاء الحلال؟", aAr: "نعم. نتولى التحقق من شهادات الحلال وإجراءات تخليص واردات الغذاء لدى SFDA." },
    ],
  },
  14: {
    id: 14, slug: "pet-animal-import",
    gradient: "linear-gradient(135deg,#041520 0%,#082030 50%,#020c10 100%)",
    accentHex: "#06b6d4",
    industries: ["Pet Owners","Veterinary Clinics","Breeders","Zoos & Wildlife","Agriculture"],
    industriesAr: ["أصحاب الحيوانات الأليفة","العيادات البيطرية","المربون","حدائق الحيوان","الزراعة"],
    process: [
      { en: "Vet Documentation", ar: "الوثائق البيطرية" },
      { en: "Health Certification", ar: "شهادة الصحة" },
      { en: "Export Clearance", ar: "تخليص التصدير" },
      { en: "Transport", ar: "النقل" },
      { en: "SFDA Clearance", ar: "تخليص SFDA" },
      { en: "Quarantine", ar: "الحجر الصحي" },
      { en: "Delivery", ar: "التسليم" },
    ],
    subServices: [
      { name: "Pet Import (Dogs & Cats)", nameAr: "استيراد الحيوانات الأليفة (كلاب وقطط)", desc: "SFDA-compliant import of dogs, cats, and other pets.", descAr: "استيراد كلاب وقطط وحيوانات أليفة أخرى متوافق مع SFDA." },
      { name: "Live Animal Transport", nameAr: "نقل الحيوانات الحية", desc: "IATA-compliant transport for livestock and animals.", descAr: "نقل متوافق مع IATA للماشية والحيوانات." },
      { name: "Quarantine Coordination", nameAr: "تنسيق الحجر الصحي", desc: "Full coordination with SFDA quarantine stations.", descAr: "تنسيق كامل مع محطات الحجر الصحي لدى SFDA." },
      { name: "Veterinary Import Documentation", nameAr: "وثائق الاستيراد البيطري", desc: "Health certificates, microchip records, vaccination proofs.", descAr: "شهادات صحة وسجلات الرقاقة الإلكترونية وإثباتات التطعيم." },
      { name: "GCC Animal Movement", nameAr: "تنقل الحيوانات الخليجية", desc: "Cross-border transport of animals within the GCC.", descAr: "نقل عابر للحدود للحيوانات داخل منطقة الخليج." },
      { name: "Zoo & Wildlife Import", nameAr: "استيراد حيوانات حدائق الحيوان والبرية", desc: "CITES-compliant import of zoo animals and wildlife.", descAr: "استيراد حيوانات حدائق الحيوان والبرية متوافق مع CITES." },
      { name: "Export of Livestock", nameAr: "تصدير الماشية", desc: "Managed export of livestock with all veterinary paperwork.", descAr: "تصدير مُدار للماشية مع جميع الوثائق البيطرية." },
    ],
    whyEnvod: [
      { en: "SFDA-registered animal import procedures", ar: "إجراءات استيراد حيوانات مسجلة لدى SFDA" },
      { en: "IATA-compliant live animal transport containers", ar: "حاويات نقل حيوانات حية متوافقة مع IATA" },
      { en: "Quarantine station coordination across KSA", ar: "تنسيق محطات الحجر الصحي عبر المملكة" },
    ],
    faq: [
      { q: "Can I import my dog or cat into Saudi Arabia?", a: "Yes. We manage the full process including health certificates, microchip verification, rabies vaccination records, SFDA import permits, and quarantine coordination.", qAr: "هل يمكنني استيراد كلبي أو قطتي إلى المملكة؟", aAr: "نعم. ندير العملية الكاملة بما في ذلك شهادات الصحة والرقاقة الإلكترونية وتصاريح الاستيراد." },
    ],
  },
  15: {
    id: 15, slug: "breakbulk-shipping",
    gradient: "linear-gradient(135deg,#1a0c04 0%,#2a1608 50%,#0e0804 100%)",
    accentHex: "#b45309",
    industries: ["Construction","Steel & Metals","Energy","Shipping","Ports"],
    industriesAr: ["البناء","الحديد والمعادن","الطاقة","الشحن","الموانئ"],
    process: [
      { en: "Cargo Assessment", ar: "تقييم البضائع" },
      { en: "Port Selection", ar: "اختيار الميناء" },
      { en: "Stowage Planning", ar: "تخطيط الرص" },
      { en: "Loading", ar: "التحميل" },
      { en: "Sea Transit", ar: "العبور البحري" },
      { en: "Port Discharge", ar: "التفريغ" },
      { en: "Delivery", ar: "التسليم" },
    ],
    subServices: [
      { name: "Heavy Machinery Shipping", nameAr: "شحن الآلات الثقيلة", desc: "Non-containerized transport for industrial machinery.", descAr: "نقل آلات صناعية غير حاوية." },
      { name: "Steel Structures Transport", nameAr: "نقل الهياكل الفولاذية", desc: "Port-to-port breakbulk for steel beams and frames.", descAr: "بريك بالك من ميناء لميناء للعوارض والأطر الفولاذية." },
      { name: "Construction Materials", nameAr: "مواد البناء", desc: "Bulk and breakbulk for large construction material shipments.", descAr: "سائبة وبريك بالك لشحنات مواد البناء الكبيرة." },
      { name: "Industrial Equipment", nameAr: "المعدات الصناعية", desc: "Specialist handling for heavy industrial cargo.", descAr: "مناولة متخصصة للشحن الصناعي الثقيل." },
      { name: "Port-to-Port Breakbulk", nameAr: "بريك بالك من ميناء لميناء", desc: "Complete origin-to-destination port handling.", descAr: "معالجة ميناء كاملة من المنشأ إلى الوجهة." },
      { name: "Cargo Lashing & Securing", nameAr: "ربط وتأمين البضائع", desc: "Professional cargo securing for breakbulk sea transport.", descAr: "تأمين احترافي للبضائع للشحن البحري بريك بالك." },
      { name: "Stevedoring Services", nameAr: "خدمات الشحن والتفريغ", desc: "Professional loading and discharging at Saudi ports.", descAr: "تحميل وتفريغ احترافي في موانئ المملكة." },
      { name: "Port Agency Services", nameAr: "خدمات وكالة الميناء", desc: "Full port agency representation for vessel calls.", descAr: "تمثيل وكالة ميناء كامل لرسو السفن." },
      { name: "Timber & Lumber Shipping", nameAr: "شحن الأخشاب", desc: "Specialized breakbulk for timber and lumber cargoes.", descAr: "بريك بالك متخصص لشحنات الأخشاب والمواد الخشبية." },
      { name: "Abnormal Load Transport", nameAr: "نقل الأحمال غير الاعتيادية", desc: "Permit-managed road transport for abnormal breakbulk loads.", descAr: "نقل بري بتصاريح للأحمال غير الاعتيادية في بريك بالك." },
    ],
    whyEnvod: [
      { en: "Direct access to all major Saudi and GCC ports", ar: "وصول مباشر لجميع الموانئ السعودية والخليجية الرئيسية" },
      { en: "Specialist breakbulk stowage and cargo planning", ar: "تخطيط متخصص لرص وبضائع بريك بالك" },
      { en: "Full documentation including bill of lading and customs", ar: "توثيق كامل يشمل بوليصة الشحن والجمارك" },
    ],
    faq: [
      { q: "What is breakbulk shipping?", a: "Breakbulk shipping refers to cargo that must be loaded individually — not in containers. It includes machinery, steel, timber, and other non-standard items too large for standard containers.", qAr: "ما هو الشحن المنفصل (بريك بالك)؟", aAr: "يشير إلى البضائع التي يجب تحميلها بشكل فردي — غير حاوية. يشمل الآلات والحديد والخشب والعناصر غير القياسية." },
    ],
  },
  16: {
    id: 16, slug: "dangerous-goods",
    gradient: "linear-gradient(135deg,#1a1004 0%,#2a1a04 50%,#100c02 100%)",
    accentHex: "#eab308",
    industries: ["Oil & Gas","Chemicals","Mining","Pharmaceuticals","Military"],
    industriesAr: ["النفط والغاز","المواد الكيميائية","التعدين","الأدوية","الجيش"],
    process: [
      { en: "DG Classification", ar: "تصنيف البضائع الخطرة" },
      { en: "Packaging", ar: "التغليف" },
      { en: "Documentation", ar: "التوثيق" },
      { en: "Carrier Approval", ar: "موافقة الناقل" },
      { en: "Transport", ar: "النقل" },
      { en: "Customs", ar: "الجمارك" },
      { en: "Safe Delivery", ar: "التسليم الآمن" },
    ],
    subServices: [
      { name: "DG Air Freight (IATA)", nameAr: "شحن جوي للبضائع الخطرة (IATA)", desc: "IATA-DGR compliant dangerous goods air transport.", descAr: "نقل جوي للبضائع الخطرة متوافق مع IATA-DGR." },
      { name: "DG Sea Freight (IMDG)", nameAr: "شحن بحري للبضائع الخطرة (IMDG)", desc: "IMDG-compliant sea freight for hazardous materials.", descAr: "شحن بحري للمواد الخطرة متوافق مع IMDG." },
      { name: "DG Road Transport (ADR)", nameAr: "نقل بري للبضائع الخطرة (ADR)", desc: "ADR-compliant road transport of hazardous goods.", descAr: "نقل بري للبضائع الخطرة متوافق مع ADR." },
      { name: "Chemical Cargo", nameAr: "شحن المواد الكيميائية", desc: "Safe transport and storage of industrial chemicals.", descAr: "نقل وتخزين آمن للمواد الكيميائية الصناعية." },
      { name: "DG Packaging & Labeling", nameAr: "تغليف وتسمية البضائع الخطرة", desc: "UN-certified DG packaging and regulatory labeling.", descAr: "تغليف معتمد من الأمم المتحدة وتسمية تنظيمية للبضائع الخطرة." },
      { name: "Explosives Transport", nameAr: "نقل المتفجرات", desc: "Licensed transport of Class 1 explosives with permits.", descAr: "نقل مرخص للمتفجرات من الفئة 1 بالتصاريح اللازمة." },
      { name: "Radioactive Materials", nameAr: "المواد المشعة", desc: "IAEA-compliant handling and transport of radioactive cargo.", descAr: "مناولة ونقل البضائع المشعة متوافق مع IAEA." },
      { name: "DG Customs Clearance", nameAr: "تخليص جمركي للبضائع الخطرة", desc: "Specialist customs clearance for all dangerous goods classes.", descAr: "تخليص جمركي متخصص لجميع فئات البضائع الخطرة." },
    ],
    whyEnvod: [
      { en: "Certified DG handlers for all UN hazard classes", ar: "معالجو بضائع خطرة معتمدون لجميع فئات الأمم المتحدة" },
      { en: "IATA, IMDG, and ADR compliance expertise", ar: "خبرة في امتثال IATA وIMDG وADR" },
      { en: "Dedicated DG documentation and labeling team", ar: "فريق مخصص لوثائق وتسمية البضائع الخطرة" },
    ],
    faq: [
      { q: "Can you ship all classes of dangerous goods?", a: "Yes. We are licensed to handle all 9 UN dangerous goods classes including flammables, explosives, corrosives, toxics, and radioactive materials, subject to carrier and regulatory approval.", qAr: "هل يمكنكم شحن جميع فئات البضائع الخطرة؟", aAr: "نعم. نحن مرخصون للتعامل مع جميع فئات البضائع الخطرة التسع بما فيها القابلة للاشتعال والمتفجرات والمواد الكيميائية والمواد المشعة." },
    ],
  },
  17: {
    id: 17, slug: "oog-cargo",
    gradient: "linear-gradient(135deg,#0a0a20 0%,#141430 50%,#050510 100%)",
    accentHex: "#818cf8",
    industries: ["Oil & Gas","Power","Construction","Mining","Wind Energy"],
    industriesAr: ["النفط والغاز","الطاقة","البناء","التعدين","طاقة الرياح"],
    process: [
      { en: "Cargo Measurement", ar: "قياس البضائع" },
      { en: "Feasibility Study", ar: "دراسة الجدوى" },
      { en: "Permits", ar: "التصاريح" },
      { en: "Route Planning", ar: "تخطيط المسار" },
      { en: "Specialized Transport", ar: "النقل المتخصص" },
      { en: "Crane Ops", ar: "عمليات الرافعة" },
      { en: "Site Delivery", ar: "التسليم للموقع" },
    ],
    subServices: [
      { name: "OOG Sea Freight", nameAr: "الشحن البحري خارج القياس", desc: "Out-of-gauge sea transport on flat-rack or open-top containers.", descAr: "شحن بحري خارج القياس على رفوف مسطحة أو حاويات مفتوحة." },
      { name: "OOG Road Transport", nameAr: "النقل البري خارج القياس", desc: "Permit-managed road movement for oversized cargo.", descAr: "حركة برية بتصاريح للبضائع الضخمة." },
      { name: "Flat-Rack Container Shipping", nameAr: "شحن على حاوية ذات رفوف مسطحة", desc: "Flat-rack sea shipping for machinery and structures.", descAr: "شحن بحري على رفوف مسطحة للآلات والهياكل." },
      { name: "Open-Top Container Shipping", nameAr: "شحن في حاوية مفتوحة الأعلى", desc: "Open-top containers for tall or crane-loaded cargo.", descAr: "حاويات مفتوحة الأعلى للبضائع الطويلة المُحمَّلة برافعة." },
      { name: "Wind Blade Transport", nameAr: "نقل شفرات الرياح", desc: "Specialist transport for wind turbine blades.", descAr: "نقل متخصص لشفرات توربينات الرياح." },
      { name: "Transformer Transport", nameAr: "نقل المحولات الكهربائية", desc: "Heavy transformer and substation equipment transport.", descAr: "نقل المحولات الثقيلة ومعدات محطات الكهرباء." },
      { name: "SPMT Transport", nameAr: "نقل بمركبات SPMT", desc: "Self-propelled modular transporter operations for extreme loads.", descAr: "عمليات المقطورات النمطية الذاتية الدفع للأحمال الكبرى." },
      { name: "Crane Coordination", nameAr: "تنسيق الرافعات", desc: "Full crane planning, mobilization, and execution.", descAr: "تخطيط الرافعة الكامل وتعبئتها وتشغيلها." },
    ],
    whyEnvod: [
      { en: "Specialist OOG fleet for Saudi and GCC projects", ar: "أسطول متخصص OOG للمشاريع السعودية والخليجية" },
      { en: "Full permit acquisition and route escort coordination", ar: "استحصال التصاريح الكاملة وتنسيق مرافقة المسار" },
      { en: "Engineering-led lift and transport planning", ar: "تخطيط رفع ونقل بقيادة هندسية" },
    ],
    faq: [
      { q: "What is OOG (Out-of-Gauge) cargo?", a: "OOG refers to cargo that exceeds the standard dimensions of a 20ft or 40ft shipping container. This includes large machinery, turbines, transformers, and other industrial equipment requiring specialized handling.", qAr: "ما هي البضائع خارج القياس (OOG)؟", aAr: "OOG تشير إلى البضائع التي تتجاوز الأبعاد القياسية لحاوية 20 أو 40 قدماً." },
    ],
  },
  18: {
    id: 18, slug: "roro-shipping",
    gradient: "linear-gradient(135deg,#0a1420 0%,#0e1e30 50%,#060e18 100%)",
    accentHex: "#38bdf8",
    industries: ["Automotive","Heavy Equipment","Construction","Agriculture","Government Fleet"],
    industriesAr: ["السيارات","المعدات الثقيلة","البناء","الزراعة","أساطيل حكومية"],
    process: [
      { en: "Booking", ar: "الحجز" },
      { en: "Vehicle Inspection", ar: "فحص المركبة" },
      { en: "Port Loading", ar: "التحميل بالميناء" },
      { en: "Sea Transit", ar: "العبور البحري" },
      { en: "Port Discharge", ar: "التفريغ" },
      { en: "Customs Clearance", ar: "التخليص الجمركي" },
      { en: "Final Delivery", ar: "التسليم النهائي" },
    ],
    subServices: [
      { name: "Private Vehicle RoRo", nameAr: "رورو للسيارات الخاصة", desc: "Safe roll-on/roll-off shipping for private cars.", descAr: "شحن رورو آمن للسيارات الخاصة." },
      { name: "Commercial Fleet RoRo", nameAr: "رورو للأسطول التجاري", desc: "Bulk RoRo shipping for commercial vehicle fleets.", descAr: "شحن رورو بالجملة للأساطيل التجارية." },
      { name: "Heavy Equipment RoRo", nameAr: "رورو للمعدات الثقيلة", desc: "RoRo transport for construction and industrial equipment.", descAr: "نقل رورو لمعدات البناء والصناعة." },
      { name: "Agricultural Machinery RoRo", nameAr: "رورو للآلات الزراعية", desc: "Roll-on/roll-off for tractors and agricultural equipment.", descAr: "رورو للجرارات والمعدات الزراعية." },
      { name: "Bus & Truck RoRo", nameAr: "رورو للحافلات والشاحنات", desc: "High-and-heavy RoRo for buses, trucks, and HGVs.", descAr: "رورو ارتفاع وثقل للحافلات والشاحنات والمركبات الثقيلة." },
      { name: "Motorcycle RoRo", nameAr: "رورو للدراجات النارية", desc: "Specialist RoRo shipping for motorcycles.", descAr: "شحن رورو متخصص للدراجات النارية." },
      { name: "RoRo Import Clearance", nameAr: "تخليص جمركي رورو للاستيراد", desc: "Full customs clearance for imported RoRo vehicles.", descAr: "تخليص جمركي كامل للمركبات المستوردة بالرورو." },
      { name: "RoRo Export Management", nameAr: "إدارة تصدير الرورو", desc: "Complete export documentation and port handling for RoRo.", descAr: "توثيق تصدير كامل ومناولة ميناء للرورو." },
      { name: "Port-to-Door Vehicle Delivery", nameAr: "توصيل المركبات من الميناء للباب", desc: "Full delivery from port of arrival to final destination.", descAr: "توصيل كامل من ميناء الوصول إلى الوجهة النهائية." },
    ],
    whyEnvod: [
      { en: "Direct RoRo port access across the GCC", ar: "وصول مباشر لموانئ الرورو عبر الخليج" },
      { en: "Competitive rates for single units and bulk fleets", ar: "أسعار تنافسية للوحدات الفردية والأساطيل الكبيرة" },
      { en: "Full customs clearance integrated with RoRo shipping", ar: "تخليص جمركي متكامل مع شحن الرورو" },
    ],
    faq: [
      { q: "What types of vehicles can be shipped via RoRo?", a: "Any wheeled or tracked vehicle — cars, SUVs, buses, trucks, motorcycles, construction equipment, and agricultural machinery. If it rolls or drives, we can RoRo it.", qAr: "ما أنواع المركبات التي يمكن شحنها بالرورو؟", aAr: "أي مركبة ذات عجلات أو مجزرة — سيارات وحافلات وشاحنات ودراجات نارية ومعدات بناء وزراعية." },
    ],
  },
  19: {
    id: 19, slug: "ata-carnet",
    pillar: ATA_CARNET_PILLAR,
    gradient: "linear-gradient(135deg,#0a2342 0%,#3a1206 52%,#07101f 100%)",
    accentHex: "#f59e0b",
    industries: ["Exhibitions & Events","Broadcast & Media","Oil & Gas","Industrial Manufacturing","Professional Services"],
    industriesAr: ["المعارض والفعاليات","البث والإعلام","النفط والغاز","التصنيع الصناعي","الخدمات المهنية"],
    process: [
      { en: "Eligibility Review", ar: "مراجعة الأهلية" },
      { en: "General List & Values", ar: "القائمة العامة والقيم" },
      { en: "Carnet Issuance", ar: "إصدار الكارنيه" },
      { en: "Export Endorsement", ar: "التصديق عند التصدير" },
      { en: "Temporary Import", ar: "الاستيراد المؤقت" },
      { en: "Re-Export & Re-Import", ar: "إعادة التصدير والاستيراد" },
      { en: "Carnet Discharge", ar: "إبراء الكارنيه" },
    ],
    subServices: [
      { name: "ATA Carnet Issuance", nameAr: "إصدار كارنيه ATA", desc: "Fast issuance of new ATA Carnets — typically within 24 hours.", descAr: "إصدار سريع لكارنيهات ATA الجديدة — عادةً خلال 24 ساعة." },
      { name: "Exhibition Goods Carnet", nameAr: "كارنيه بضائع المعارض", desc: "Carnets for stands, displays, samples and demo units at trade shows.", descAr: "كارنيهات للأجنحة والمعروضات والعينات ووحدات العرض في المعارض." },
      { name: "Professional Equipment Carnet", nameAr: "كارنيه المعدات المهنية", desc: "Temporary admission of broadcast, film, survey, medical and test gear.", descAr: "قبول مؤقت لمعدات البث والتصوير والمساحة والطب والاختبار." },
      { name: "Commercial Samples Carnet", nameAr: "كارنيه العينات التجارية", desc: "Duty-free movement of product samples shown to buyers before an order.", descAr: "نقل معفى من الرسوم لعينات المنتجات المعروضة على المشترين قبل الطلب." },
      { name: "Customs Endorsement Handling", nameAr: "معالجة التصديق الجمركي", desc: "In-person endorsement at export, import, re-export and re-import.", descAr: "تصديق شخصي عند التصدير والاستيراد وإعادة التصدير وإعادة الاستيراد." },
      { name: "Carnet Discharge & Closure", nameAr: "إبراء وإغلاق الكارنيه", desc: "Discharge tracking so the Carnet is closed cleanly with no claims.", descAr: "متابعة الإبراء لإغلاق الكارنيه بشكل سليم دون أي مطالبات." },
      { name: "Replacement & Extension Support", nameAr: "دعم الاستبدال والتمديد", desc: "Replacement Carnets and validity guidance when plans change.", descAr: "كارنيهات بديلة وإرشاد بشأن الصلاحية عند تغيّر الخطط." },
      { name: "Integrated Freight & Clearance", nameAr: "شحن وتخليص متكامل", desc: "Air, sea and road freight bundled with the Carnet and customs handling.", descAr: "شحن جوي وبحري وبري مدمج مع الكارنيه والمناولة الجمركية." },
    ],
    whyEnvod: [
      { en: "24-hour ATA Carnet processing for time-critical cargo", ar: "معالجة كارنيه ATA خلال 24 ساعة للبضائع الحسّاسة للوقت" },
      { en: "One team for the document, the freight and customs endorsements", ar: "فريق واحد للمستند والشحن والتصديقات الجمركية" },
      { en: "Accepted across 80+ countries in the ATA Carnet system", ar: "مقبول في أكثر من 80 دولة ضمن نظام كارنيه ATA" },
      { en: "Deep Saudi Customs relationships and temporary-import know-how", ar: "علاقات عميقة مع الجمارك السعودية وخبرة في الاستيراد المؤقت" },
      { en: "Discharge tracking to close every Carnet with zero claims", ar: "متابعة الإبراء لإغلاق كل كارنيه دون أي مطالبات" },
    ],
    faq: [
      { q: "What is an ATA Carnet?", a: "An ATA Carnet is an international customs document — often called the \"passport for goods\" — that lets you import goods temporarily into a country duty-free and tax-free for up to one year, as long as the same goods are re-exported unchanged. It replaces separate temporary-import bonds at each border.", qAr: "ما هو كارنيه ATA؟", aAr: "كارنيه ATA مستند جمركي دولي — يُسمى غالباً «جواز سفر البضائع» — يتيح استيراد البضائع مؤقتاً إلى بلدٍ معفاة من الرسوم والضرائب لمدة تصل إلى عام، طالما أُعيد تصدير البضائع نفسها دون تغيير. ويحل محل كفالات الاستيراد المؤقت المنفصلة عند كل حدود." },
      { q: "How quickly can ENVOD process an ATA Carnet?", a: "For eligible goods with a complete general list, we typically process ATA Carnets within 24 hours so your shipment stays on schedule.", qAr: "ما مدى سرعة إنفود في معالجة كارنيه ATA؟", aAr: "للبضائع المؤهلة مع قائمة عامة كاملة، نعالج كارنيهات ATA عادةً خلال 24 ساعة لتبقى شحنتك في موعدها." },
      { q: "What goods can travel on an ATA Carnet?", a: "Three broad categories: exhibition and event goods, professional equipment, and commercial samples. It does not cover consumables, giveaways, or anything that will be sold or left behind — those follow standard import clearance.", qAr: "ما البضائع التي يمكن نقلها بكارنيه ATA؟", aAr: "ثلاث فئات عامة: بضائع المعارض والفعاليات، والمعدات المهنية، والعينات التجارية. ولا يغطي المواد الاستهلاكية أو الهدايا أو ما سيُباع أو يُترك — فتلك تخضع للتخليص المعتاد." },
    ],
  },
};

export const SLUG_TO_ID: Record<string, number> = Object.fromEntries(
  Object.values(SERVICE_META).map((m) => [m.slug, m.id])
);

export const ID_TO_SLUG: Record<number, string> = Object.fromEntries(
  Object.values(SERVICE_META).map((m) => [m.id, m.slug])
);

/**
 * Local snapshot of the service catalog (mirrors the DB `services` table).
 * Used as the SSR/prerender source and as the first-render fallback before the
 * API resolves, so content pages render full text for crawlers. The live API
 * (`useListServices`) overrides this after hydration when available.
 */
export const SERVICE_CATALOG: Service[] = [
  { id: 1, name: "Ocean Freight", nameAr: "الشحن البحري", description: "FCL and LCL sea freight solutions connecting Saudi Arabia to all major global ports.", descriptionAr: "حلول الشحن البحري FCL وLCL تربط المملكة العربية السعودية بجميع الموانئ العالمية الرئيسية.", icon: "Ship", category: "core", sortOrder: 1, isActive: true },
  { id: 2, name: "Air Freight", nameAr: "الشحن الجوي", description: "Expedited air cargo services connecting Saudi Arabia to 50+ countries with guaranteed transit times.", descriptionAr: "خدمات شحن جوي سريع تربط المملكة بأكثر من 50 دولة بأوقات عبور مضمونة.", icon: "Plane", category: "core", sortOrder: 2, isActive: true },
  { id: 3, name: "GCC Transportation", nameAr: "النقل الخليجي", description: "Road freight across all GCC countries with FTL, LTL and dedicated fleet solutions.", descriptionAr: "شحن بري عبر جميع دول الخليج بحمولات كاملة وجزئية وأساطيل مخصصة.", icon: "Truck", category: "core", sortOrder: 3, isActive: true },
  { id: 4, name: "Customs Clearance", nameAr: "التخليص الجمركي", description: "Expert Saudi customs clearance with 24-hour guarantee, SABER, SFDA, and ATA Carnet support.", descriptionAr: "تخليص جمركي سعودي خبير بضمان 24 ساعة ودعم سابر وهيئة الغذاء والدواء وكارنيه ATA.", icon: "ShieldCheck", category: "core", sortOrder: 4, isActive: true },
  { id: 5, name: "Warehousing & Distribution", nameAr: "التخزين والتوزيع", description: "Bonded warehousing with inventory management, pick & pack, and temperature-controlled zones.", descriptionAr: "مستودعات جمركية مع إدارة المخزون والتجميع والتغليف ومناطق مبردة.", icon: "Warehouse", category: "core", sortOrder: 5, isActive: true },
  { id: 6, name: "Freight Forwarding", nameAr: "الشحن المتكامل", description: "End-to-end freight forwarding with multi-modal solutions and full documentation handling.", descriptionAr: "شحن متكامل من البداية للنهاية بحلول متعددة الوسائط ومعالجة الوثائق الكاملة.", icon: "FileCheck", category: "core", sortOrder: 6, isActive: true },
  { id: 7, name: "Supply Chain Management", nameAr: "إدارة سلسلة التوريد", description: "Comprehensive supply chain optimization with vendor management, last-mile delivery and ERP integration.", descriptionAr: "تحسين شامل لسلسلة التوريد مع إدارة الموردين والتوصيل الأخير وتكامل ERP.", icon: "GitBranch", category: "core", sortOrder: 7, isActive: true },
  { id: 8, name: "Project Cargo Logistics", nameAr: "لوجستيات بضائع المشاريع", description: "Handling oversized and complex cargo movements for oil & gas, industrial and infrastructure projects.", descriptionAr: "مناولة الشحنات الضخمة والمعقدة لمشاريع النفط والغاز والصناعة والبنية التحتية.", icon: "Package", category: "specialized", sortOrder: 8, isActive: true },
  { id: 9, name: "House Moving & Relocation", nameAr: "نقل المنازل والانتقال", description: "Residential and corporate relocation services with full packing, customs and door-to-door delivery.", descriptionAr: "خدمات النقل السكني والمؤسسي مع التغليف الكامل والتخليص الجمركي والتسليم من باب لباب.", icon: "MapPin", category: "specialized", sortOrder: 9, isActive: true },
  { id: 10, name: "E-commerce Logistics", nameAr: "لوجستيات التجارة الإلكترونية", description: "Last-mile delivery, fulfillment centers, returns management and e-commerce platform integration.", descriptionAr: "توصيل المرحلة الأخيرة ومراكز الوفاء وإدارة المرتجعات وتكامل منصات التجارة الإلكترونية.", icon: "ShoppingCart", category: "specialized", sortOrder: 10, isActive: true },
  { id: 11, name: "Exhibition & Event Logistics", nameAr: "لوجستيات المعارض والفعاليات", description: "Specialized transportation for exhibitions, trade shows and major international events with ATA Carnet support.", descriptionAr: "نقل متخصص للمعارض والمؤتمرات والفعاليات الدولية مع دعم كارنيه ATA.", icon: "Star", category: "specialized", sortOrder: 11, isActive: true },
  { id: 12, name: "Medical & Pharma Logistics", nameAr: "اللوجستيات الطبية والصيدلانية", description: "Cold chain management for pharmaceuticals with SFDA-cleared shipments and hospital delivery.", descriptionAr: "إدارة سلسلة التبريد للأدوية مع شحنات مخلصة من هيئة الغذاء والدواء وتوصيل للمستشفيات.", icon: "Heart", category: "specialized", sortOrder: 12, isActive: true },
  { id: 13, name: "Food & FMCG Logistics", nameAr: "لوجستيات الغذاء والسلع الاستهلاكية", description: "Temperature-controlled food logistics with SFDA clearance, halal certification and supermarket distribution.", descriptionAr: "لوجستيات غذائية بدرجات حرارة مضبوطة مع تخليص هيئة الغذاء والدواء وشهادة الحلال والتوزيع.", icon: "UtensilsCrossed", category: "specialized", sortOrder: 13, isActive: true },
  { id: 14, name: "Pet & Animal Import", nameAr: "استيراد الحيوانات الأليفة", description: "SFDA veterinary import, live animal transport with health certificates and quarantine coordination.", descriptionAr: "استيراد بيطري من هيئة الغذاء والدواء ونقل الحيوانات الحية مع شهادات صحة وتنسيق الحجر الصحي.", icon: "PawPrint", category: "specialized", sortOrder: 14, isActive: true },
  { id: 15, name: "Breakbulk Shipping", nameAr: "الشحن المنفصل (بريك بالك)", description: "Non-containerized cargo solutions for heavy machinery, steel structures, industrial equipment and construction materials. Port-to-port breakbulk logistics with full documentation.", descriptionAr: "حلول شحن البضائع غير الحاوية للآلات الثقيلة والهياكل الفولاذية والمعدات الصناعية ومواد البناء. لوجستيات بريك بالك من ميناء إلى ميناء مع توثيق كامل.", icon: "Anchor", category: "specialized", sortOrder: 15, isActive: true },
  { id: 16, name: "Dangerous Goods (DG Cargo)", nameAr: "البضائع الخطرة (شحن DG)", description: "IMO & IATA compliant transportation of hazardous chemicals, flammable goods and temperature-sensitive dangerous goods. Certified DG handling with safe packaging and documentation.", descriptionAr: "نقل متوافق مع IMO وIATA للمواد الكيميائية الخطرة والسلع القابلة للاشتعال والبضائع الخطرة الحساسة للحرارة. مناولة DG معتمدة مع التغليف الآمن والتوثيق.", icon: "AlertTriangle", category: "specialized", sortOrder: 16, isActive: true },
  { id: 17, name: "Oversized / Out-of-Gauge (OOG) Cargo", nameAr: "البضائع الضخمة وخارج القياس (OOG)", description: "Heavy lift and oversized cargo specialists — wind turbine components, transformers, industrial project cargo. Route planning, crane & rigging services and specialized trailers.", descriptionAr: "متخصصون في رفع وشحن البضائع الضخمة — مكونات توربينات الرياح والمحولات وبضائع المشاريع الصناعية. تخطيط المسارات وخدمات الرافعات والمقطورات المتخصصة.", icon: "Maximize2", category: "specialized", sortOrder: 17, isActive: true },
  { id: 18, name: "RoRo Shipping", nameAr: "الشحن الدحرجي (رورو)", description: "Roll-on/roll-off shipping for vehicles, machinery, and wheeled cargo — direct port access at major Saudi ports.", descriptionAr: "خدمة الشحن الدحرجي للسيارات والآلات والبضائع ذات العجلات — وصول مباشر للموانئ السعودية الرئيسية.", icon: "Car", category: "specialized", sortOrder: 18, isActive: true },
  { id: 19, name: "ATA Carnet Processing", nameAr: "معالجة كارنيه ATA", description: "The international customs passport for temporary duty-free admission of exhibition goods, professional equipment and commercial samples — processed in 24 hours across 80+ countries.", descriptionAr: "جواز السفر الجمركي الدولي للقبول المؤقت المعفى من الرسوم لبضائع المعارض والمعدات المهنية والعينات التجارية — يُعالج خلال 24 ساعة في أكثر من 80 دولة.", icon: "Stamp", category: "specialized", sortOrder: 19, isActive: true },
];

export function buildMailto(serviceName: string, subServiceName: string): string {
  const subject = encodeURIComponent(`Inquiry: ${serviceName} — ${subServiceName}`);
  const body = encodeURIComponent(
    `Dear ENVOD KINGDOM Team,\n\nI am interested in the following service:\n\nService: ${serviceName}\nSub-Service: ${subServiceName}\n\nPlease provide me with more information and a quote.\n\nBest regards,`
  );
  return `mailto:info@envodkingdom.net?subject=${subject}&body=${body}`;
}
