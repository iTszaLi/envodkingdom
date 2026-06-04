import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { servicesTable } from "@workspace/db";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const services = [
  { name: "Ocean Freight",               nameAr: "الشحن البحري",                      description: "FCL and LCL sea freight solutions connecting Saudi Arabia to all major global ports.",                                                                  descriptionAr: "حلول الشحن البحري FCL وLCL تربط المملكة العربية السعودية بجميع الموانئ العالمية الرئيسية.",                                  icon: "Ship",           category: "core",        sortOrder: 1  },
  { name: "Air Freight",                 nameAr: "الشحن الجوي",                       description: "Expedited air cargo services connecting Saudi Arabia to 50+ countries with guaranteed transit times.",                                                  descriptionAr: "خدمات شحن جوي سريع تربط المملكة بأكثر من 50 دولة بأوقات عبور مضمونة.",                                                    icon: "Plane",          category: "core",        sortOrder: 2  },
  { name: "GCC Transportation",          nameAr: "النقل الخليجي",                     description: "Road freight across all GCC countries with FTL, LTL and dedicated fleet solutions.",                                                                   descriptionAr: "شحن بري عبر جميع دول الخليج بحمولات كاملة وجزئية وأساطيل مخصصة.",                                                         icon: "Truck",          category: "core",        sortOrder: 3  },
  { name: "Customs Clearance",           nameAr: "التخليص الجمركي",                   description: "Expert Saudi customs clearance with 24-hour guarantee, SABER, SFDA, and ATA Carnet support.",                                                          descriptionAr: "تخليص جمركي سعودي خبير بضمان 24 ساعة ودعم سابر وهيئة الغذاء والدواء وكارنيه ATA.",                                          icon: "ShieldCheck",    category: "core",        sortOrder: 4  },
  { name: "Warehousing & Distribution",  nameAr: "التخزين والتوزيع",                  description: "Bonded warehousing with inventory management, pick & pack, and temperature-controlled zones.",                                                           descriptionAr: "مستودعات جمركية مع إدارة المخزون والتجميع والتغليف ومناطق مبردة.",                                                          icon: "Warehouse",      category: "core",        sortOrder: 5  },
  { name: "Freight Forwarding",          nameAr: "الشحن المتكامل",                    description: "End-to-end freight forwarding with multi-modal solutions and full documentation handling.",                                                               descriptionAr: "شحن متكامل من البداية للنهاية بحلول متعددة الوسائط ومعالجة الوثائق الكاملة.",                                               icon: "FileCheck",      category: "core",        sortOrder: 6  },
  { name: "Supply Chain Management",     nameAr: "إدارة سلسلة التوريد",               description: "Comprehensive supply chain optimization with vendor management, last-mile delivery and ERP integration.",                                                 descriptionAr: "تحسين شامل لسلسلة التوريد مع إدارة الموردين والتوصيل الأخير وتكامل ERP.",                                                   icon: "GitBranch",      category: "core",        sortOrder: 7  },
  { name: "Project Cargo Logistics",     nameAr: "لوجستيات بضائع المشاريع",           description: "Handling oversized and complex cargo movements for oil & gas, industrial and infrastructure projects.",                                                  descriptionAr: "مناولة الشحنات الضخمة والمعقدة لمشاريع النفط والغاز والصناعة والبنية التحتية.",                                              icon: "Package",        category: "specialized", sortOrder: 8  },
  { name: "House Moving & Relocation",   nameAr: "نقل المنازل والانتقال",             description: "Residential and corporate relocation services with full packing, customs and door-to-door delivery.",                                                    descriptionAr: "خدمات النقل السكني والمؤسسي مع التغليف الكامل والتخليص الجمركي والتسليم من باب لباب.",                                       icon: "MapPin",         category: "specialized", sortOrder: 9  },
  { name: "E-commerce Logistics",        nameAr: "لوجستيات التجارة الإلكترونية",      description: "Last-mile delivery, fulfillment centers, returns management and e-commerce platform integration.",                                                       descriptionAr: "توصيل المرحلة الأخيرة ومراكز الوفاء وإدارة المرتجعات وتكامل منصات التجارة الإلكترونية.",                                    icon: "ShoppingCart",   category: "specialized", sortOrder: 10 },
  { name: "Exhibition & Event Logistics",nameAr: "لوجستيات المعارض والفعاليات",       description: "Specialized transportation for exhibitions, trade shows and major international events with ATA Carnet support.",                                          descriptionAr: "نقل متخصص للمعارض والمؤتمرات والفعاليات الدولية مع دعم كارنيه ATA.",                                                       icon: "Star",           category: "specialized", sortOrder: 11 },
  { name: "Medical & Pharma Logistics",  nameAr: "اللوجستيات الطبية والصيدلانية",     description: "Cold chain management for pharmaceuticals with SFDA-cleared shipments and hospital delivery.",                                                            descriptionAr: "إدارة سلسلة التبريد للأدوية مع شحنات مخلصة من هيئة الغذاء والدواء وتوصيل للمستشفيات.",                                      icon: "Heart",          category: "specialized", sortOrder: 12 },
  { name: "Food & FMCG Logistics",       nameAr: "لوجستيات الغذاء والسلع الاستهلاكية", description: "Temperature-controlled food logistics with SFDA clearance, halal certification and supermarket distribution.",                                           descriptionAr: "لوجستيات غذائية بدرجات حرارة مضبوطة مع تخليص هيئة الغذاء والدواء وشهادة الحلال والتوزيع.",                                 icon: "UtensilsCrossed",category: "specialized", sortOrder: 13 },
  { name: "Pet & Animal Import",         nameAr: "استيراد الحيوانات الأليفة",         description: "SFDA veterinary import, live animal transport with health certificates and quarantine coordination.",                                                       descriptionAr: "استيراد بيطري من هيئة الغذاء والدواء ونقل الحيوانات الحية مع شهادات صحة وتنسيق الحجر الصحي.",                              icon: "PawPrint",       category: "specialized", sortOrder: 14 },
];

async function main() {
  try {
    const existing = await db.select().from(servicesTable);
    if (existing.length > 0) {
      console.log(`⚠️  Services table already has ${existing.length} rows — skipping.`);
      return;
    }
    await db.insert(servicesTable).values(services);
    console.log(`✅  Seeded ${services.length} services successfully.`);
  } finally {
    await pool.end();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
