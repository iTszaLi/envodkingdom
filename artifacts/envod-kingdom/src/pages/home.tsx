import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Ship, Plane, Truck, Globe2, Clock, ShieldCheck, Award } from "lucide-react";
import { ScrollAnimSection, type AnimChapter } from "@/components/ScrollAnimSection";

const craneChapters: AnimChapter[] = [
  {
    startProgress: 0,
    endProgress: 0.48,
    title: "GLOBAL SHIPPING. LOCAL EXPERTISE.",
    titleAr: "شحن عالمي. خبرة محلية.",
    subtitle: "25 years of freight forwarding excellence across Saudi Arabia and the world.",
    subtitleAr: "25 عاماً من التميز في خدمات الشحن عبر المملكة العربية السعودية والعالم.",
  },
  {
    startProgress: 0.5,
    endProgress: 1,
    title: "Connecting Saudi Arabia. To The World.",
    titleAr: "ربط المملكة العربية السعودية. بالعالم.",
    subtitle: "Sea, air, and land freight solutions from Riyadh to every corner of the globe.",
    subtitleAr: "حلول الشحن البحري والجوي والبري من الرياض إلى كل زاوية في العالم.",
  },
];

const airChapters: AnimChapter[] = [
  {
    startProgress: 0,
    endProgress: 0.48,
    title: "Fast. Reliable. Worldwide.",
    titleAr: "سريع. موثوق. عالمي.",
    subtitle: "Air freight solutions connecting Saudi Arabia to 50+ countries with guaranteed transit times.",
    subtitleAr: "حلول الشحن الجوي التي تربط المملكة بأكثر من 50 دولة بأوقات عبور مضمونة.",
  },
  {
    startProgress: 0.5,
    endProgress: 1,
    title: "Customs Clearance. Under 24 Hours.",
    titleAr: "التخليص الجمركي. خلال 24 ساعة.",
    subtitle: "SABER-certified customs clearance with direct authority relationships — faster than any competitor.",
    subtitleAr: "تخليص جمركي معتمد سابر مع علاقات مباشرة مع الجهات الرسمية.",
  },
];

const warehouseChapters: AnimChapter[] = [
  {
    startProgress: 0,
    endProgress: 0.48,
    title: "Technology Driven. Logistics Solutions.",
    titleAr: "حلول لوجستية. مدفوعة بالتكنولوجيا.",
    subtitle: "State-of-the-art warehousing and supply chain management for Saudi Arabia's leading brands.",
    subtitleAr: "تخزين وإدارة سلسلة التوريد بأحدث التقنيات لأبرز العلامات التجارية في المملكة.",
  },
  {
    startProgress: 0.5,
    endProgress: 1,
    title: "25+ Years. Delivering Excellence.",
    titleAr: "+25 عاماً. من التميز.",
    subtitle: "10,000+ shipments delivered. 500+ corporate clients. 99.8% on-time delivery rate.",
    subtitleAr: "أكثر من 10,000 شحنة مسلّمة. 500+ عميل مؤسسي. نسبة تسليم في الوقت المحدد 99.8%.",
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
      {/* ── Scroll-Driven Animation Sections ── */}
      <ScrollAnimSection
        frameFolder="crane"
        frameCount={100}
        chapters={craneChapters}
        isRtl={isRtl}
        scrollHeight="320vh"
      />

      <ScrollAnimSection
        frameFolder="air"
        frameCount={120}
        chapters={airChapters}
        isRtl={isRtl}
        scrollHeight="320vh"
      />

      <ScrollAnimSection
        frameFolder="warehouse"
        frameCount={110}
        chapters={warehouseChapters}
        isRtl={isRtl}
        scrollHeight="320vh"
      />

      {/* ── Track Shipment CTA ── */}
      <section className="relative z-20 py-0">
        <div className="bg-card/95 backdrop-blur-xl border-y border-white/5 py-12 px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              {t("Track Your Cargo", "تتبع شحنتك")}
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              {t("Enter your tracking, reference, or invoice number below.", "أدخل رقم التتبع أو المرجع أو الفاتورة أدناه.")}
            </p>
            <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search
                  className={`absolute ${isRtl ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5`}
                />
                <Input
                  value={tracking}
                  onChange={(e) => setTracking(e.target.value)}
                  placeholder={t(
                    "e.g. ENVOD-2024-001",
                    "مثال: ENVOD-2024-001",
                  )}
                  className={`bg-background border-white/10 text-white ${isRtl ? "pr-10" : "pl-10"} py-6 text-base`}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white py-6 px-8 text-base shrink-0"
              >
                {t("Track Now", "تتبع الآن")}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Why ENVOD ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-secondary text-xs font-bold tracking-[0.3em] uppercase mb-3">
              {t("Why Choose Us", "لماذا تختارنا")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              {t("Built For Saudi Arabia's", "مصمم لاحتياجات")}
              <span className="text-secondary">
                {" "}{t("Most Demanding Shippers", "أكبر الشاحنين في المملكة")}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: t("24-Hour Clearance", "تخليص خلال 24 ساعة"),
                desc: t("Fastest customs processing in the Kingdom, guaranteed.", "أسرع معالجة جمركية في المملكة، مضمونة."),
              },
              {
                icon: Globe2,
                title: t("50+ Countries", "أكثر من 50 دولة"),
                desc: t("Direct shipping routes to all major global trade hubs.", "مسارات شحن مباشرة إلى جميع المراكز التجارية العالمية الكبرى."),
              },
              {
                icon: ShieldCheck,
                title: t("SABER & SFDA Certified", "معتمد سابر وهيئة الغذاء والدواء"),
                desc: t("Full compliance with Saudi import certification requirements.", "امتثال كامل لمتطلبات شهادات الاستيراد السعودية."),
              },
              {
                icon: Award,
                title: t("25+ Years Experience", "أكثر من 25 عاماً من الخبرة"),
                desc: t("Deep-rooted expertise in Saudi logistics regulations.", "خبرة راسخة في اللوائح اللوجستية السعودية."),
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card rounded-xl p-6 border border-white/5 hover:border-secondary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="font-bold text-white mb-2">{title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Services ── */}
      <section className="py-24 bg-card/50 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-secondary text-xs font-bold tracking-[0.3em] uppercase mb-3">
              {t("Our Expertise", "خبراتنا")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              {t("Comprehensive", "خدمات لوجستية")}
              <span className="text-secondary"> {t("Logistics Services", "شاملة")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Ship,
                title: t("Ocean Freight", "الشحن البحري"),
                desc: t("FCL and LCL shipping solutions tailored to your timeline and budget.", "حلول شحن بحري مخصصة وفقاً لجدولك الزمني وميزانيتك."),
              },
              {
                icon: Plane,
                title: t("Air Freight", "الشحن الجوي"),
                desc: t("Expedited air cargo services for your time-critical shipments.", "خدمات شحن جوي سريع للشحنات الحساسة للوقت."),
              },
              {
                icon: Truck,
                title: t("Land Transportation", "النقل البري"),
                desc: t("Reliable domestic and cross-border road freight operations.", "خدمات نقل بري موثوقة محلياً وعبر الحدود."),
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="bg-card rounded-xl p-8 border border-white/5 hover:border-secondary/50 transition-all group cursor-default"
              >
                <Icon className="w-12 h-12 text-secondary mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
                <p className="text-muted-foreground mb-6 leading-relaxed">{desc}</p>
                <Link
                  href="/services"
                  className="text-secondary font-semibold hover:underline inline-flex items-center gap-1 text-sm"
                >
                  {t("Explore services", "استكشف الخدمات")} {isRtl ? "←" : "→"}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-block border border-white/15 hover:border-secondary/50 text-white hover:text-secondary py-3 px-8 rounded-lg font-medium transition-all text-sm"
            >
              {t("View All 14 Services", "عرض جميع الخدمات الـ 14")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-28 bg-background relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, #D62828 0%, transparent 60%), radial-gradient(circle at 70% 50%, #0A2342 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-secondary text-xs font-bold tracking-[0.3em] uppercase mb-6">
              {t("Get Started", "ابدأ الآن")}
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
              {t("Ready To Ship With", "مستعد للشحن")}
              <span className="text-secondary"> {t("Confidence?", "بثقة؟")}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-base leading-relaxed">
              {t(
                "Join 500+ Saudi companies who trust ENVOD KINGDOM for their logistics needs.",
                "انضم إلى أكثر من 500 شركة سعودية تثق في انفود كينجدم لتلبية احتياجاتها اللوجستية.",
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-secondary hover:bg-secondary/90 text-white py-4 px-10 rounded-lg font-bold text-base uppercase tracking-wider transition-colors shadow-lg shadow-secondary/20"
              >
                {t("Get a Free Quote", "احصل على عرض سعر مجاني")}
              </Link>
              <a
                href="https://wa.me/966502260256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 px-10 rounded-lg font-bold text-base uppercase tracking-wider transition-colors"
              >
                {t("WhatsApp Us", "تواصل عبر واتساب")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
