import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { servicesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const NEW_SERVICES = [
  {
    name:          "Breakbulk Shipping",
    nameAr:        "الشحن المنفصل (بريك بالك)",
    description:   "Non-containerized cargo solutions for heavy machinery, steel structures, industrial equipment and construction materials. Port-to-port breakbulk logistics with full documentation.",
    descriptionAr: "حلول شحن البضائع غير الحاوية للآلات الثقيلة والهياكل الفولاذية والمعدات الصناعية ومواد البناء. لوجستيات بريك بالك من ميناء إلى ميناء مع توثيق كامل.",
    icon:          "Anchor",
    category:      "specialized",
    sortOrder:     15,
  },
  {
    name:          "Dangerous Goods (DG Cargo)",
    nameAr:        "البضائع الخطرة (شحن DG)",
    description:   "IMO & IATA compliant transportation of hazardous chemicals, flammable goods and temperature-sensitive dangerous goods. Certified DG handling with safe packaging and documentation.",
    descriptionAr: "نقل متوافق مع IMO وIATA للمواد الكيميائية الخطرة والسلع القابلة للاشتعال والبضائع الخطرة الحساسة للحرارة. مناولة DG معتمدة مع التغليف الآمن والتوثيق.",
    icon:          "AlertTriangle",
    category:      "specialized",
    sortOrder:     16,
  },
  {
    name:          "Oversized / Out-of-Gauge (OOG) Cargo",
    nameAr:        "البضائع الضخمة وخارج القياس (OOG)",
    description:   "Heavy lift and oversized cargo specialists — wind turbine components, transformers, industrial project cargo. Route planning, crane & rigging services and specialized trailers.",
    descriptionAr: "متخصصون في رفع وشحن البضائع الضخمة — مكونات توربينات الرياح والمحولات وبضائع المشاريع الصناعية. تخطيط المسارات وخدمات الرافعات والمقطورات المتخصصة.",
    icon:          "Maximize2",
    category:      "specialized",
    sortOrder:     17,
  },
];

async function main() {
  try {
    for (const svc of NEW_SERVICES) {
      const existing = await db.select().from(servicesTable).where(eq(servicesTable.name, svc.name));
      if (existing.length > 0) {
        console.log(`⚠️  "${svc.name}" already exists — skipping.`);
        continue;
      }
      await db.insert(servicesTable).values(svc);
      console.log(`✅  Inserted: ${svc.name}`);
    }
    console.log("Done.");
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
