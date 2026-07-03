export interface SubService {
  name: string;
  nameAr: string;
  desc: string;
  descAr: string;
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
      { name: "Ro-Ro Shipping", nameAr: "الشحن الدحرجي (رورو)", desc: "Roll-on/roll-off for vehicles and wheeled cargo.", descAr: "خدمة الدحرجة للسيارات والبضائع ذات العجلات." },
      { name: "Bulk Cargo", nameAr: "الشحن السائب", desc: "Non-packaged commodity shipping — grains, liquids, minerals.", descAr: "شحن البضائع غير المعبأة — حبوب وسوائل ومعادن." },
      { name: "Reefer Containers", nameAr: "حاويات مبردة", desc: "Temperature-controlled containers for perishables.", descAr: "حاويات بدرجات حرارة مضبوطة للبضائع القابلة للتلف." },
      { name: "Port-to-Door Delivery", nameAr: "توصيل من الميناء للباب", desc: "Complete handling from port of origin to final destination.", descAr: "معالجة كاملة من ميناء المنشأ إلى الوجهة النهائية." },
      { name: "Dangerous Goods Sea Freight", nameAr: "الشحن البحري للبضائع الخطرة", desc: "IMO-compliant sea shipment for hazardous materials.", descAr: "شحن بحري متوافق مع IMO للمواد الخطرة." },
      { name: "Break Bulk Sea Freight", nameAr: "الشحن البحري السائب", desc: "Oversized or non-containerized cargo via sea.", descAr: "شحن البضائع الكبيرة أو غير الحاوية عبر البحر." },
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
      { name: "Express Air Freight", nameAr: "الشحن الجوي السريع", desc: "Time-critical door-to-door in 24–72 hours.", descAr: "شحن حساس للوقت من الباب للباب في 24-72 ساعة." },
      { name: "Charter Aircraft", nameAr: "طائرة مستأجرة", desc: "Dedicated aircraft for urgent or oversized air cargo.", descAr: "طائرة مخصصة للشحن الجوي العاجل أو الضخم." },
      { name: "Airport-to-Airport", nameAr: "من مطار لمطار", desc: "Standard cargo handled terminal-to-terminal.", descAr: "الشحن القياسي من صالة إلى صالة." },
      { name: "Door-to-Door Air", nameAr: "من الباب للباب جواً", desc: "Complete pickup and delivery service.", descAr: "خدمة استلام وتسليم كاملة." },
      { name: "Pharmaceutical Air Freight", nameAr: "الشحن الجوي الدوائي", desc: "GDP-compliant temperature-controlled air cargo.", descAr: "شحن جوي دوائي متوافق مع GDP بدرجات حرارة مضبوطة." },
      { name: "DG Air Freight", nameAr: "شحن جوي للبضائع الخطرة", desc: "IATA-certified dangerous goods air transport.", descAr: "نقل جوي للبضائع الخطرة معتمد من IATA." },
      { name: "Priority & On-Board Courier", nameAr: "بريد سريع على متن الطائرة", desc: "Highest priority handling for critical documents and small cargo.", descAr: "معالجة أولوية قصوى للمستندات الحرجة والشحن الصغير." },
      { name: "Consolidated Air Freight", nameAr: "الشحن الجوي المجمع", desc: "Cost-effective groupage airfreight solutions.", descAr: "حلول شحن جوي مجمع فعالة من حيث التكلفة." },
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
      { name: "GCC Full Truck Load (FTL)", nameAr: "حمولة شاحنة كاملة خليجية", desc: "Dedicated truck across all GCC countries.", descAr: "شاحنة مخصصة عبر جميع دول الخليج." },
      { name: "GCC Less-than-Truckload (LTL)", nameAr: "حمولة جزئية خليجية", desc: "Cost-effective partial loads sharing transport.", descAr: "شحنات جزئية فعالة من حيث التكلفة." },
      { name: "Cross-Border Transport", nameAr: "النقل العابر للحدود", desc: "Managed customs and transport across Saudi-GCC borders.", descAr: "تخليص جمركي ونقل عبر الحدود السعودية الخليجية." },
      { name: "Refrigerated Road Transport", nameAr: "نقل بري مبرد", desc: "Temperature-controlled trucks for food and pharma.", descAr: "شاحنات بدرجات حرارة مضبوطة للغذاء والدواء." },
      { name: "Heavy Equipment Transport", nameAr: "نقل المعدات الثقيلة", desc: "Specialist flatbed and lowbed trailers.", descAr: "مقطورات مسطحة ومنخفضة متخصصة." },
      { name: "Last-Mile Delivery", nameAr: "توصيل المرحلة الأخيرة", desc: "Door-to-door final delivery within Saudi Arabia.", descAr: "توصيل نهائي من الباب للباب داخل المملكة." },
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
      { name: "ATA Carnet Processing", nameAr: "معالجة كارنيه ATA", desc: "Temporary import/export clearance — 24-hour processing.", descAr: "تخليص الاستيراد/التصدير المؤقت — معالجة خلال 24 ساعة." },
      { name: "SABER Certification", nameAr: "شهادة سابر", desc: "Saudi product conformity certification (SABER/SALEEM).", descAr: "شهادة مطابقة المنتجات السعودية (سابر/سليم)." },
      { name: "SFDA Clearance", nameAr: "تخليص هيئة الغذاء والدواء", desc: "Food, pharmaceutical, and medical device import clearance.", descAr: "تخليص استيراد الغذاء والدواء والأجهزة الطبية." },
      { name: "Temporary Import", nameAr: "الاستيراد المؤقت", desc: "Clearance for goods entering temporarily (exhibitions, equipment).", descAr: "تخليص البضائع الداخلة مؤقتاً (معارض، معدات)." },
      { name: "Pharmaceutical Clearance", nameAr: "تخليص دوائي", desc: "Specialized clearance for medicines and medical supplies.", descAr: "تخليص متخصص للأدوية والمستلزمات الطبية." },
      { name: "Food Import Clearance", nameAr: "تخليص استيراد غذائي", desc: "SFDA-compliant food import process management.", descAr: "إدارة استيراد الغذاء المتوافق مع هيئة الغذاء والدواء." },
      { name: "Electronics Clearance", nameAr: "تخليص الإلكترونيات", desc: "CITC and SASO compliant electronics import clearance.", descAr: "تخليص استيراد الإلكترونيات المتوافق مع CITC وSASO." },
      { name: "DG Customs Clearance", nameAr: "تخليص البضائع الخطرة", desc: "Specialist clearance for IMDG/IATA dangerous goods.", descAr: "تخليص متخصص للبضائع الخطرة وفق IMDG/IATA." },
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
      { name: "Bonded Warehousing", nameAr: "مستودع جمركي", desc: "Customs-bonded storage for imported goods pending clearance.", descAr: "تخزين جمركي للبضائع المستوردة في انتظار التخليص." },
      { name: "Temperature-Controlled Storage", nameAr: "تخزين بدرجات حرارة مضبوطة", desc: "Cold storage zones for food, pharma, and chemicals.", descAr: "مناطق تخزين بارد للغذاء والدواء والمواد الكيميائية." },
      { name: "Pick & Pack Services", nameAr: "خدمات التجميع والتغليف", desc: "Order-level picking, packing, and labeling.", descAr: "تجميع وتغليف وتسمية على مستوى الطلب." },
      { name: "Inventory Management", nameAr: "إدارة المخزون", desc: "Real-time WMS with full visibility into stock levels.", descAr: "نظام إدارة مستودعات في الوقت الفعلي." },
      { name: "Cross-Docking", nameAr: "الشحن المباشر", desc: "Fast transfer between inbound and outbound without storage.", descAr: "نقل سريع بين الوارد والصادر دون تخزين." },
      { name: "E-Commerce Fulfillment", nameAr: "الوفاء بطلبات التجارة الإلكترونية", desc: "Fulfillment center services for online retailers.", descAr: "خدمات مركز الوفاء لتجار التجزئة الإلكترونيين." },
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
      { name: "Heavy Lift Cargo", nameAr: "شحن الرفع الثقيل", desc: "Crane-assisted heavy lift for oversized equipment.", descAr: "رفع ثقيل بمساعدة الرافعات للمعدات الضخمة." },
      { name: "OOG (Out-of-Gauge) Transport", nameAr: "نقل خارج القياس (OOG)", desc: "Specialized transport for cargo exceeding standard dimensions.", descAr: "نقل متخصص للبضائع التي تتجاوز الأبعاد القياسية." },
      { name: "Oil & Gas Equipment Logistics", nameAr: "لوجستيات معدات النفط والغاز", desc: "Secure transport of drilling and processing equipment.", descAr: "نقل آمن لمعدات الحفر والمعالجة." },
      { name: "Route Survey & Planning", nameAr: "مسح المسار والتخطيط", desc: "Pre-movement route assessment for oversized cargo.", descAr: "تقييم المسار قبل الحركة للبضائع الكبيرة." },
      { name: "Crane & Rigging Services", nameAr: "خدمات الرافعات والتعليق", desc: "Complete lift planning and execution on site.", descAr: "تخطيط وتنفيذ الرفع الكامل في الموقع." },
      { name: "Industrial Equipment Relocation", nameAr: "نقل المعدات الصناعية", desc: "Safe relocation of industrial plant and machinery.", descAr: "نقل آمن للمصانع والآلات الصناعية." },
      { name: "Renewable Energy Logistics", nameAr: "لوجستيات الطاقة المتجددة", desc: "Wind turbines, solar panels, and energy infrastructure.", descAr: "توربينات الرياح والألواح الشمسية وبنية الطاقة التحتية." },
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
      { name: "Packing & Crating", nameAr: "التغليف والتعبئة", desc: "Professional packing of all household and office items.", descAr: "تغليف احترافي لجميع المنزل والمكتب." },
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
      { name: "Fulfillment Center Services", nameAr: "خدمات مركز الوفاء", desc: "Pick, pack, and ship for online orders.", descAr: "تجميع وتغليف وشحن الطلبات الإلكترونية." },
      { name: "Last-Mile Delivery", nameAr: "توصيل المرحلة الأخيرة", desc: "Saudi-wide home delivery with tracking.", descAr: "توصيل منزلي في جميع أنحاء المملكة مع التتبع." },
      { name: "Returns Management", nameAr: "إدارة المرتجعات", desc: "Streamlined reverse logistics and returns processing.", descAr: "لوجستيات عكسية مبسطة ومعالجة المرتجعات." },
      { name: "COD (Cash on Delivery)", nameAr: "الدفع عند الاستلام", desc: "COD collection and reconciliation.", descAr: "تحصيل وتسوية الدفع عند الاستلام." },
      { name: "Cross-Border E-commerce", nameAr: "التجارة الإلكترونية العابرة للحدود", desc: "International e-commerce shipping to/from Saudi Arabia.", descAr: "شحن التجارة الإلكترونية الدولية من/إلى المملكة." },
      { name: "Platform Integration", nameAr: "تكامل المنصات", desc: "API integration with Salla, Zid, Amazon, Noon, and Shopify.", descAr: "تكامل API مع سلة وZid وAmazon وNoon وShopify." },
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
      { name: "ATA Carnet Processing", nameAr: "معالجة كارنيه ATA", desc: "24-hour ATA Carnet — fastest in Saudi Arabia.", descAr: "كارنيه ATA خلال 24 ساعة — الأسرع في المملكة." },
      { name: "Exhibition Cargo Transport", nameAr: "نقل شحن المعارض", desc: "Door-to-venue delivery for exhibition materials.", descAr: "توصيل من الباب للموقع لمواد المعارض." },
      { name: "Temporary Import Clearance", nameAr: "تخليص الاستيراد المؤقت", desc: "Customs clearance for temporarily imported exhibition goods.", descAr: "تخليص جمركي للبضائع المستوردة مؤقتاً." },
      { name: "Temporary Export & Re-Export", nameAr: "التصدير المؤقت وإعادة التصدير", desc: "Smooth export and return of exhibition cargo.", descAr: "تصدير وإعادة شحن بضائع المعارض بسلاسة." },
      { name: "On-site Logistics Coordination", nameAr: "تنسيق اللوجستيات في الموقع", desc: "Dedicated on-site team during the event.", descAr: "فريق مخصص في الموقع خلال الفعالية." },
      { name: "Exhibition Crating & Packing", nameAr: "تعبئة وتغليف المعارض", desc: "Professional crating for fragile or high-value exhibits.", descAr: "تعبئة احترافية للمعروضات الهشة أو عالية القيمة." },
      { name: "Event Equipment Logistics", nameAr: "لوجستيات معدات الفعاليات", desc: "AV equipment, staging, furniture and tech setup transport.", descAr: "نقل معدات الصوت والصورة والأثاث والتقنيات." },
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
      { name: "SFDA Import Clearance", nameAr: "تخليص استيراد SFDA", desc: "Full SFDA registration and clearance for pharma imports.", descAr: "تسجيل وتخليص SFDA الكامل لواردات الأدوية." },
      { name: "Hospital & Clinic Delivery", nameAr: "توصيل المستشفيات والعيادات", desc: "Direct delivery to healthcare facilities across Saudi Arabia.", descAr: "توصيل مباشر إلى المرافق الصحية عبر المملكة." },
      { name: "Clinical Trial Logistics", nameAr: "لوجستيات التجارب السريرية", desc: "Compliant logistics for clinical investigation products.", descAr: "لوجستيات متوافقة لمنتجات التجارب السريرية." },
      { name: "Medical Device Import", nameAr: "استيراد الأجهزة الطبية", desc: "SFDA medical device registration and customs clearance.", descAr: "تسجيل الأجهزة الطبية لدى SFDA والتخليص الجمركي." },
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
      { name: "SFDA Food Clearance", nameAr: "تخليص غذاء SFDA", desc: "Saudi food authority clearance for all food imports.", descAr: "تخليص هيئة الغذاء والدواء لجميع واردات الغذاء." },
      { name: "Halal Certification Support", nameAr: "دعم شهادة الحلال", desc: "Documentation and verification for halal imports.", descAr: "التوثيق والتحقق من واردات المنتجات الحلال." },
      { name: "Refrigerated Transport", nameAr: "نقل مبرد", desc: "Temperature-controlled trucks for perishables.", descAr: "شاحنات بدرجات حرارة مضبوطة للمنتجات القابلة للتلف." },
      { name: "Supermarket Distribution", nameAr: "توزيع للسوبرماركت", desc: "Scheduled direct delivery to retail outlets.", descAr: "توصيل مجدول مباشر إلى منافذ البيع." },
      { name: "Frozen Food Logistics", nameAr: "لوجستيات الأغذية المجمدة", desc: "Deep freeze transport and storage management.", descAr: "إدارة النقل والتخزين العميق للأغذية المجمدة." },
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
    industries: ["Oil & Gas","Chemicals","Mining","Construction","Manufacturing"],
    industriesAr: ["النفط والغاز","الكيماويات","التعدين","البناء","التصنيع"],
    process: [
      { en: "DG Classification", ar: "تصنيف البضائع الخطرة" },
      { en: "Safe Packaging", ar: "التغليف الآمن" },
      { en: "Documentation", ar: "التوثيق" },
      { en: "Regulatory Approval", ar: "الموافقة التنظيمية" },
      { en: "Certified Transport", ar: "النقل المعتمد" },
      { en: "Customs Clearance", ar: "التخليص الجمركي" },
      { en: "Safe Delivery", ar: "التسليم الآمن" },
    ],
    subServices: [
      { name: "Hazardous Chemicals Transport", nameAr: "نقل المواد الكيميائية الخطرة", desc: "IMDG/IATA-compliant transport of hazardous chemicals.", descAr: "نقل متوافق مع IMDG/IATA للمواد الكيميائية الخطرة." },
      { name: "Flammable Goods Shipping", nameAr: "شحن البضائع القابلة للاشتعال", desc: "Certified handling for Class 3 flammable cargo.", descAr: "مناولة معتمدة للبضائع القابلة للاشتعال من الفئة 3." },
      { name: "Corrosive Materials Transport", nameAr: "نقل المواد الآكلة", desc: "Specialist packaging and transport for corrosive goods.", descAr: "تغليف ونقل متخصص للمواد الآكلة." },
      { name: "DG Air Freight", nameAr: "شحن جوي للبضائع الخطرة", desc: "IATA Section 7 compliant DG air cargo.", descAr: "شحن جوي للبضائع الخطرة متوافق مع القسم 7 من IATA." },
      { name: "DG Sea Freight", nameAr: "شحن بحري للبضائع الخطرة", desc: "IMDG-compliant ocean freight for dangerous goods.", descAr: "شحن بحري للبضائع الخطرة متوافق مع IMDG." },
      { name: "DG Documentation & Compliance", nameAr: "توثيق وامتثال البضائع الخطرة", desc: "Full MSDS, DG declarations, and regulatory filings.", descAr: "MSDS كاملة وإقرارات البضائع الخطرة والملفات التنظيمية." },
    ],
    whyEnvod: [
      { en: "IMO and IATA certified DG handling team", ar: "فريق مناولة بضائع خطرة معتمد من IMO وIATA" },
      { en: "Full compliance with Saudi customs DG regulations", ar: "امتثال كامل للوائح البضائع الخطرة بالجمارك السعودية" },
      { en: "Safe packaging and certified labeling", ar: "تغليف آمن وتسمية معتمدة" },
    ],
    faq: [
      { q: "What are dangerous goods classes?", a: "The UN classifies dangerous goods into 9 classes: explosives, gases, flammables, oxidizers, toxic substances, infectious substances, radioactives, corrosives, and misc. We handle all 9 classes.", qAr: "ما هي فئات البضائع الخطرة؟", aAr: "صنّف الأمم المتحدة البضائع الخطرة في 9 فئات: المتفجرات والغازات والمشتعلات والمؤكسدات والسامة والمعدية والمشعة والآكلة والمتنوعة. نتولى جميع الفئات التسع." },
    ],
  },
  17: {
    id: 17, slug: "oog-cargo",
    gradient: "linear-gradient(135deg,#101520 0%,#182030 50%,#080c10 100%)",
    accentHex: "#475569",
    industries: ["Renewable Energy","Oil & Gas","Infrastructure","Mining","Power"],
    industriesAr: ["الطاقة المتجددة","النفط والغاز","البنية التحتية","التعدين","الكهرباء"],
    process: [
      { en: "Dimension Survey", ar: "مسح الأبعاد" },
      { en: "Route Planning", ar: "تخطيط المسار" },
      { en: "Permits", ar: "التصاريح" },
      { en: "Specialized Loading", ar: "التحميل المتخصص" },
      { en: "Escorted Transit", ar: "العبور المرافَق" },
      { en: "Site Delivery", ar: "التسليم للموقع" },
    ],
    subServices: [
      { name: "Wind Turbine Component Transport", nameAr: "نقل مكونات توربينات الرياح", desc: "Blades, nacelles, and tower sections transport.", descAr: "نقل الريشات والمحطات وأجزاء الأبراج." },
      { name: "Transformer Transport", nameAr: "نقل المحولات", desc: "Heavy transformer transport with route engineering.", descAr: "نقل محولات ثقيلة مع هندسة المسارات." },
      { name: "Industrial Machine Transport", nameAr: "نقل الآلات الصناعية", desc: "Oversized industrial equipment transport.", descAr: "نقل المعدات الصناعية الضخمة." },
      { name: "Specialized Trailer Hire", nameAr: "تأجير مقطورات متخصصة", desc: "Multi-axle, lowbed, and extendable trailer options.", descAr: "خيارات مقطورات متعددة المحاور ومنخفضة وقابلة للتمديد." },
      { name: "Crane & Rigging Services", nameAr: "خدمات الرافعات والتعليق", desc: "On-site heavy lift and rigging coordination.", descAr: "تنسيق الرفع الثقيل والتعليق في الموقع." },
      { name: "Oversize Permit Management", nameAr: "إدارة تصاريح الأحمال الزائدة", desc: "Police escort and permit coordination for oversized loads.", descAr: "مرافقة الشرطة وتنسيق التصاريح للأحمال الزائدة الحجم." },
    ],
    whyEnvod: [
      { en: "Specialist OOG engineering and route survey team", ar: "فريق هندسة OOG متخصص ومسح المسارات" },
      { en: "Saudi traffic authority permit management", ar: "إدارة تصاريح الجهات المرورية السعودية" },
      { en: "Multi-axle and lowbed trailer fleet", ar: "أسطول مقطورات متعددة المحاور ومنخفضة" },
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
      { name: "Private Vehicle Shipping", nameAr: "شحن السيارات الخاصة", desc: "Door-to-port or port-to-port shipping for personal vehicles.", descAr: "شحن السيارات الخاصة من الباب للميناء أو بين الموانئ." },
      { name: "Commercial Fleet Transport", nameAr: "نقل الأساطيل التجارية", desc: "Bulk RoRo for dealer, rental, and government fleets.", descAr: "رورو للأساطيل التجارية والوكلاء والجهات الحكومية." },
      { name: "Heavy Equipment RoRo", nameAr: "رورو للمعدات الثقيلة", desc: "Self-propelled heavy machinery via RoRo vessels.", descAr: "الآلات الثقيلة ذاتية الحركة عبر سفن رورو." },
      { name: "Agricultural Machinery", nameAr: "الآلات الزراعية", desc: "Tractors, harvesters, and agricultural equipment shipping.", descAr: "شحن الجرارات والحصادات والمعدات الزراعية." },
      { name: "Bus & Truck Transport", nameAr: "نقل الحافلات والشاحنات", desc: "New and used bus and commercial truck RoRo.", descAr: "شحن رورو للحافلات والشاحنات التجارية الجديدة والمستعملة." },
      { name: "RoRo Import Clearance", nameAr: "تخليص استيراد رورو", desc: "Full Saudi customs clearance for RoRo vehicles.", descAr: "تخليص جمركي سعودي كامل لمركبات رورو." },
    ],
    whyEnvod: [
      { en: "Direct access to Jeddah Islamic Port and King Abdulaziz Port", ar: "وصول مباشر لميناء جدة الإسلامي وميناء الملك عبدالعزيز" },
      { en: "Full customs clearance for imported vehicles", ar: "تخليص جمركي كامل للمركبات المستوردة" },
      { en: "All vehicle types — cars, trucks, heavy equipment", ar: "جميع أنواع المركبات — سيارات وشاحنات ومعدات ثقيلة" },
      { en: "Competitive rates on major RoRo shipping lanes", ar: "أسعار تنافسية على خطوط الشحن الرورو الرئيسية" },
    ],
    faq: [
      { q: "What is RoRo shipping?", a: "RoRo (Roll-on/Roll-off) is a method of shipping wheeled cargo — vehicles, trucks, machinery — that can be driven or towed onto the vessel, making it ideal for cars and heavy equipment.", qAr: "ما هو الشحن الدحرجي رورو؟", aAr: "رورو (Roll-on/Roll-off) هو شحن البضائع ذات العجلات كالسيارات والشاحنات والمعدات يتم تحميلها بالقيادة أو السحب على متن السفينة." },
    ],
  },
};

export const SLUG_TO_ID: Record<string, number> = Object.fromEntries(
  Object.values(SERVICE_META).map((m) => [m.slug, m.id]),
);

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildMailto(mainService: string, subService: string): string {
  const subject = encodeURIComponent(`Inquiry - ${subService}`);
  const body = encodeURIComponent(
`Hello ENVOD Kingdom Shipping Services,

I would like to inquire about the following service:

Service: ${mainService}
Sub-Service: ${subService}

Company Name:
Contact Person:
Phone Number:
Country:
Shipment Details:

Additional Requirements:

Please contact me with more information and a quotation.

Thank you.`
  );
  return `mailto:info@envodkingdom.net?subject=${subject}&body=${body}`;
}
