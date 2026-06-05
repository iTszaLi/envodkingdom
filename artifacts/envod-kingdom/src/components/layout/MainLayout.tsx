import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/language-context";
import {
  Globe, Menu, X, Clock, Shield, Globe2,
  MapPin, Phone, Mail, ChevronRight, Award,
} from "lucide-react";
import logoIcon from "@assets/image_1780532431289.png";
import logoFull from "@assets/image_1780437854819.png";
import { Button } from "@/components/ui/button";

/* ─────────────────────────── Navbar ─────────────────────────── */
export function Navbar() {
  const { language, setLanguage, t, isRtl } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/services", en: "Services", ar: "خدماتنا" },
    { href: "/track", en: "Track", ar: "تتبع الشحنة" },
    { href: "/about", en: "About", ar: "عن الشركة" },
    { href: "/blog", en: "Blog", ar: "المدونة" },
    { href: "/contact", en: "Contact", ar: "اتصل بنا" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-primary/95 backdrop-blur-md shadow-md" : "bg-black/30 backdrop-blur-sm"}`}>
      <div className="bg-secondary/15 border-b border-secondary/20 py-2 px-4">
        <div className="max-w-7xl mx-auto">
          <div className={`flex items-center justify-center gap-6 text-xs font-semibold flex-wrap ${isRtl ? "flex-row-reverse" : ""}`}>
            <span className={`flex items-center gap-1.5 text-secondary ${isRtl ? "flex-row-reverse" : ""}`}>
              <Clock className="w-3.5 h-3.5 flex-shrink-0" />
              {t("CUSTOMS CLEARANCE UNDER 24 HOURS", "التخليص الجمركي خلال 24 ساعة")}
            </span>
            <span className="text-white/20 hidden sm:block">|</span>
            <span className={`flex items-center gap-1.5 text-white/60 ${isRtl ? "flex-row-reverse" : ""}`}>
              <Globe2 className="w-3.5 h-3.5 flex-shrink-0" />
              {t("Serving Saudi Arabia, GCC & Global Markets — 25+ Years", "نخدم المملكة والخليج والأسواق العالمية — 25+ عام")}
            </span>
            <span className="text-white/20 hidden md:block">|</span>
            <span className={`hidden md:flex items-center gap-1.5 text-white/60 ${isRtl ? "flex-row-reverse" : ""}`}>
              <Shield className="w-3.5 h-3.5 flex-shrink-0" />
              {t("Customs Clearance · Exhibition · Project Cargo Specialists", "التخليص الجمركي · معارض · بضائع مشاريع")}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="relative flex-shrink-0 w-11 h-11 rounded-full overflow-hidden ring-1 ring-white/10 group-hover:ring-secondary/50 transition-all duration-300"
            style={{ background: "radial-gradient(circle,rgba(255,255,255,.08) 0%,rgba(255,255,255,.02) 100%)", boxShadow: "0 0 12px rgba(214,40,40,.25),inset 0 0 8px rgba(0,0,0,.2)" }}
          >
            <img src={logoIcon} alt="إنفود كينغدوم" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%,transparent 60%,rgba(0,0,0,.25) 100%)" }} />
          </div>
          <div className={`hidden sm:flex flex-col leading-tight ${isRtl ? "items-end" : "items-start"}`} dir={isRtl ? "rtl" : "ltr"} style={{ fontFamily: isRtl ? "'Cairo',sans-serif" : "inherit" }}>
            <span className="text-white font-bold text-[15px] tracking-wide">{t("ENVOD KINGDOM", "إنفود كينغدوم")}</span>
            <span className="text-white/55 font-normal text-[11px] tracking-wide mt-px">{t("SHIPPING SERVICES LLC", "خدمات الشحن ذ.م.م")}</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-white/85 hover:text-secondary font-medium transition-colors text-sm">
              {t(link.en, link.ar)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setLanguage(language === "en" ? "ar" : "en")} className="text-white hover:bg-white/10 text-sm">
            <Globe className="w-4 h-4 mr-1.5" />{language === "en" ? "عربي" : "EN"}
          </Button>
          <Link href="/contact" className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm">
            {t("Get Quote", "احصل على تسعيرة")}
          </Link>
        </div>

        <button className="md:hidden text-white p-1" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-primary/97 backdrop-blur-md py-4 px-4 flex flex-col gap-4 shadow-lg border-t border-white/10">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-white text-base hover:text-secondary font-medium transition-colors py-1">
              {t(link.en, link.ar)}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <Button variant="outline" onClick={() => setLanguage(language === "en" ? "ar" : "en")} className="w-full justify-center">
              <Globe className="w-4 h-4 mr-2" />{language === "en" ? "عربي" : "EN"}
            </Button>
            <Link href="/contact" className="w-full text-center bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-md font-medium transition-colors">
              {t("Get Quote", "احصل على تسعيرة")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─────────────────────────── Animated Counter ─────────────────────────── */
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

/* Each stat item is its own component so hooks are called at top level */
function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} className="text-center group py-2">
      <div className="text-3xl md:text-4xl font-black text-white mb-1 group-hover:text-secondary transition-colors duration-300">
        {count.toLocaleString()}<span className="text-secondary">{suffix}</span>
      </div>
      <div className="text-xs font-semibold text-white/45 uppercase tracking-widest">{label}</div>
    </div>
  );
}

/* ─────────────────────────── Stats Strip ─────────────────────────── */
function StatsStrip() {
  const { t } = useLanguage();
  const stats = [
    { value: 25,    suffix: "+", label: t("Years Experience",      "سنة خبرة") },
    { value: 10000, suffix: "+", label: t("Shipments Delivered",   "شحنة مسلّمة") },
    { value: 500,   suffix: "+", label: t("Corporate Clients",     "عميل مؤسسي") },
    { value: 50,    suffix: "+", label: t("Countries Served",      "دولة نخدمها") },
  ];
  return (
    <div className="bg-[#070f1e] border-y border-white/8">
      <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatItem key={i} {...s} />)}
      </div>
    </div>
  );
}

/* ─────────────────────────── Network Map ─────────────────────────── */
function NetworkMap() {
  const offices = [
    { name: "Riyadh HQ", x: 54, y: 50, primary: true },
    { name: "Jeddah",    x: 49, y: 57 },
    { name: "Dammam",    x: 57, y: 47 },
    { name: "Dubai",     x: 62, y: 52 },
    { name: "Manama",    x: 60, y: 48 },
    { name: "Bengaluru", x: 72, y: 60 },
  ];
  const connections: [number, number][] = [[0,1],[0,2],[0,3],[0,4],[0,5],[3,5]];
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-white/[0.02] border border-white/8 mt-5" style={{ height: 160 }}>
      <svg viewBox="0 0 100 72" className="w-full h-full">
        <rect width="100" height="72" fill="#060f1f" />
        <path d="M8 32Q14 22 22 24Q28 18 38 20Q46 17 54 19Q62 16 70 20Q78 18 84 22Q90 20 95 26Q97 32 95 38Q93 42 88 44Q82 42 78 46Q72 44 66 50Q60 46 54 52Q48 48 42 52Q36 50 28 48Q20 50 14 46Q8 42 7 36Z" fill="#0d1f35" stroke="#1a3a5c" strokeWidth="0.3" />
        {connections.map(([a, b], i) => (
          <line key={i} x1={offices[a].x} y1={offices[a].y} x2={offices[b].x} y2={offices[b].y}
            stroke="#D62828" strokeWidth="0.5" strokeDasharray="1.5 1" opacity="0.55"
            style={{ animation: `map-dash ${1.8 + i * 0.3}s linear infinite` }} />
        ))}
        {offices.map((o, i) => (
          <g key={i}>
            <circle cx={o.x} cy={o.y} r={o.primary ? 2 : 1.3} fill={o.primary ? "#D62828" : "#4a90d9"} />
            {o.primary && (
              <circle cx={o.x} cy={o.y} r={4} fill="none" stroke="#D62828" strokeWidth="0.5" opacity="0.4"
                style={{ animation: "map-ping 2s ease-out infinite" }} />
            )}
            <text x={o.x + 2.5} y={o.y + 1} fontSize="3" fill="white" opacity="0.75" fontFamily="Arial,sans-serif">{o.name}</text>
          </g>
        ))}
      </svg>
      <style>{`
        @keyframes map-dash { from { stroke-dashoffset: 0 } to { stroke-dashoffset: -10 } }
        @keyframes map-ping { 0%,100% { r:2; opacity:.6 } 70% { r:5; opacity:0 } }
      `}</style>
    </div>
  );
}

/* ─────────────────────────── Social Icons ─────────────────────────── */
function SocialIcons() {
  const socials: { label: string; href: string; path: string }[] = [
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      path: "M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm4.5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0z",
    },
    {
      label: "Facebook",
      href: "https://facebook.com",
      path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    },
    {
      label: "X (Twitter)",
      href: "https://x.com",
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/966502260256",
      path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
    },
  ];
  return (
    <div className="flex items-center gap-3 mt-5">
      {socials.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
          className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-secondary hover:bg-secondary/10 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={s.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}

/* ─────────────────────────── Cert Badge ─────────────────────────── */
function CertBadge({ name, sub }: { name: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:border-secondary/30 hover:bg-secondary/5 transition-all duration-300 cursor-default group min-w-[84px]">
      <Award className="w-5 h-5 text-secondary/70 group-hover:text-secondary transition-colors" />
      <span className="text-white font-bold text-[11px] tracking-wide text-center">{name}</span>
      {sub && <span className="text-white/35 text-[9px] tracking-widest uppercase">{sub}</span>}
    </div>
  );
}

/* ─────────────────────────── CTA Strip ─────────────────────────── */
function CTAStrip() {
  const { t } = useLanguage();
  return (
    <div className="bg-gradient-to-r from-[#b51f1f] via-secondary to-[#b51f1f] py-10">
      <div className="container mx-auto px-4">
        <p className="text-center text-white/80 text-sm font-semibold uppercase tracking-widest mb-6">
          {t("Ready to Ship? Get Started Today", "هل أنت مستعد للشحن؟ ابدأ اليوم")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact"
            className="w-full sm:w-auto text-center bg-white text-secondary font-black text-sm tracking-widest uppercase px-8 py-4 rounded-xl hover:bg-white/95 hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
          >
            {t("🚀 GET A FREE QUOTE", "🚀 احصل على تسعيرة مجانية")}
          </Link>
          <Link href="/track"
            className="w-full sm:w-auto text-center bg-white/10 backdrop-blur-sm border-2 border-white text-white font-black text-sm tracking-widest uppercase px-8 py-4 rounded-xl hover:bg-white hover:text-secondary transition-all duration-300 hover:-translate-y-0.5"
          >
            {t("📦 TRACK SHIPMENT", "📦 تتبع شحنتك")}
          </Link>
          <a href="https://wa.me/966502260256" target="_blank" rel="noopener noreferrer"
            className="w-full sm:w-auto text-center bg-[#25D366] text-white font-black text-sm tracking-widest uppercase px-8 py-4 rounded-xl hover:bg-[#1EBE5D] hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
          >
            {t("💬 WHATSAPP US", "💬 راسلنا على واتساب")}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Enterprise Footer ─────────────────────────── */
export function Footer() {
  const { t, isRtl } = useLanguage();
  const year = new Date().getFullYear();

  const services: [string, string][] = [
    [t("Ocean Freight", "الشحن البحري"), "/services"],
    [t("Air Freight", "الشحن الجوي"), "/services"],
    [t("Customs Clearance", "التخليص الجمركي"), "/services"],
    [t("Exhibition & Event Logistics", "لوجستيات المعارض والفعاليات"), "/services"],
    [t("ATA Carnet Services", "خدمات كارنيه ATA"), "/services"],
    [t("Project Cargo Logistics", "لوجستيات بضائع المشاريع"), "/services"],
    [t("GCC Transportation", "النقل الخليجي"), "/services"],
    [t("Warehousing & Distribution", "التخزين والتوزيع"), "/services"],
    [t("Vehicle Shipping", "شحن المركبات"), "/services"],
    [t("Marine Logistics", "اللوجستيات البحرية"), "/services"],
    [t("Temporary Imports & Re-Exports", "الاستيراد المؤقت وإعادة التصدير"), "/services"],
  ];

  const quickLinks: [string, string][] = [
    [t("Home", "الرئيسية"), "/"],
    [t("About Us", "عن الشركة"), "/about"],
    [t("Services", "خدماتنا"), "/services"],
    [t("Shipment Tracking", "تتبع الشحنة"), "/track"],
    [t("News & Blog", "أخبار ومدونة"), "/blog"],
    [t("Contact Us", "اتصل بنا"), "/contact"],
    [t("Get a Quote", "احصل على تسعيرة"), "/contact"],
  ];

  const offices = [
    { city: t("Riyadh", "الرياض"),    sub: t("Head Office", "المقر الرئيسي"),    flag: "🇸🇦", primary: true },
    { city: t("Jeddah", "جدة"),        sub: t("Western Region", "المنطقة الغربية"), flag: "🇸🇦" },
    { city: t("Dammam", "الدمام"),     sub: t("Eastern Province", "المنطقة الشرقية"), flag: "🇸🇦" },
    { city: t("Dubai", "دبي"),         sub: t("UAE Operations", "عمليات الإمارات"), flag: "🇦🇪" },
    { city: t("Manama", "المنامة"),    sub: t("Bahrain Office", "مكتب البحرين"), flag: "🇧🇭" },
    { city: t("Bengaluru", "بنغالور"), sub: t("India Operations", "عمليات الهند"), flag: "🇮🇳" },
  ];

  const certs = [
    { name: "SABER",     sub: "Saudi" },
    { name: "SFDA",      sub: "Certified" },
    { name: "ATA Carnet",sub: "Member" },
    { name: "IEC",       sub: "Certified" },
    { name: "ISO 9001",  sub: "Quality" },
    { name: "ISO 14001", sub: "Environment" },
    { name: "ISO 45001", sub: "Safety" },
  ];

  return (
    <>
      <footer className="bg-primary text-white/70" dir={isRtl ? "rtl" : "ltr"}>

        {/* ── Main footer grid ── */}
        <div className="container mx-auto px-4 pt-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

            {/* Brand column — spans 2 */}
            <div className="lg:col-span-2">
              <Link
                href="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-block mb-6 group"
              >
                <div
                  className="bg-white px-5 py-3 rounded-xl inline-flex items-center justify-center transition-all duration-400 group-hover:shadow-[0_0_40px_rgba(214,40,40,0.35)]"
                >
                  <img src={logoFull} alt="ENVOD KINGDOM" className="h-16 object-contain" />
                </div>
              </Link>

              <p className="text-sm leading-relaxed mb-5 max-w-xs text-white/55">
                {t(
                  "Saudi Arabia's trusted partner for Exhibition & Event Logistics, ATA Carnet, Customs Clearance, Project Cargo and Global Freight — backed by 25+ years of regional expertise.",
                  "الشريك الموثوق في المملكة للمعارض والتخليص الجمركي وكارنيه ATA وبضائع المشاريع والشحن العالمي — أكثر من 25 عاماً من الخبرة."
                )}
              </p>

              <div className="flex flex-wrap gap-2 mb-1">
                {["SABER", "ISO 9001", "ATA Carnet", "SFDA"].map((b) => (
                  <span key={b} className="text-[10px] font-bold uppercase tracking-widest bg-secondary/15 text-secondary px-2.5 py-1 rounded-full border border-secondary/25">{b}</span>
                ))}
              </div>

              <SocialIcons />
              <NetworkMap />
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-5 pb-3 border-b border-white/10">
                {t("Our Services", "خدماتنا")}
              </h4>
              <ul className="space-y-2.5">
                {services.map(([label, href], i) => (
                  <li key={i}>
                    <Link href={href} className="flex items-center gap-1.5 text-xs text-white/50 hover:text-secondary transition-colors duration-200 group">
                      <ChevronRight className="w-3 h-3 text-secondary/40 group-hover:text-secondary shrink-0 transition-colors" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links + Network */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-5 pb-3 border-b border-white/10">
                {t("Quick Links", "روابط سريعة")}
              </h4>
              <ul className="space-y-2.5 mb-8">
                {quickLinks.map(([label, href], i) => (
                  <li key={i}>
                    <Link href={href} className="flex items-center gap-1.5 text-xs text-white/50 hover:text-secondary transition-colors duration-200 group">
                      <ChevronRight className="w-3 h-3 text-secondary/40 group-hover:text-secondary shrink-0 transition-colors" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-5 pb-3 border-b border-white/10">
                {t("Our Global Network", "شبكتنا العالمية")}
              </h4>
              <ul className="space-y-2.5">
                {offices.map((o, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    <span className="text-base leading-none">{o.flag}</span>
                    <span className={o.primary ? "text-white font-semibold" : "text-white/50"}>
                      {o.city}
                      {o.primary && (
                        <span className="ml-1.5 text-[9px] bg-secondary/20 text-secondary px-1.5 py-0.5 rounded-full">{t("HQ", "المقر")}</span>
                      )}
                    </span>
                    <span className="text-white/30 text-[10px]">— {o.sub}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-5 pb-3 border-b border-white/10">
                {t("Contact Us", "اتصل بنا")}
              </h4>
              <ul className="space-y-4 text-xs">
                <li className="flex gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                  <div className="text-white/50">
                    <p className="text-white font-semibold text-[11px] mb-1">{t("Riyadh Head Office", "المقر الرئيسي — الرياض")}</p>
                    <p>{t("Prince Mansour Bin Abdulaziz Street,", "شارع الأمير منصور بن عبدالعزيز،")}</p>
                    <p>{t("Al Malaz District, Riyadh 12831,", "حي الملز، الرياض 12831،")}</p>
                    <p>{t("Saudi Arabia", "المملكة العربية السعودية")}</p>
                  </div>
                </li>
                <li className="flex gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                  <div className="text-white/50">
                    <p className="text-white font-semibold text-[11px] mb-0.5">{t("Phone", "هاتف")}</p>
                    <a href="tel:+966583671739" className="hover:text-secondary transition-colors">+966 58 367 1739</a>
                  </div>
                </li>
                <li className="flex gap-2.5">
                  <svg className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <div className="text-white/50">
                    <p className="text-white font-semibold text-[11px] mb-0.5">WhatsApp</p>
                    <a href="https://wa.me/966502260256" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">+966 50 226 0256</a>
                  </div>
                </li>
                <li className="flex gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                  <div className="text-white/50">
                    <p className="text-white font-semibold text-[11px] mb-0.5">{t("Email", "بريد إلكتروني")}</p>
                    <a href="mailto:info@envodkingdom.com" className="hover:text-secondary transition-colors">info@envodkingdom.com</a>
                  </div>
                </li>
                <li className="flex gap-2.5">
                  <Clock className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                  <div className="text-white/50">
                    <p className="text-white font-semibold text-[11px] mb-0.5">{t("Working Hours", "ساعات العمل")}</p>
                    <p>{t("Sun – Thu: 8:00 AM – 6:00 PM", "الأحد – الخميس: 8ص – 6م")}</p>
                    <p>{t("Sat: 9:00 AM – 2:00 PM", "السبت: 9ص – 2م")}</p>
                    <p className="text-secondary font-semibold mt-1">{t("24/7 Tracking & Support", "دعم وتتبع على مدار الساعة")}</p>
                  </div>
                </li>
              </ul>

              <a
                href="https://maps.google.com/?q=Prince+Mansour+Bin+Abdulaziz+Street,Al+Malaz,Riyadh+12831,Saudi+Arabia"
                target="_blank" rel="noopener noreferrer"
                className="mt-4 flex items-center gap-1.5 text-[11px] text-secondary hover:text-secondary/70 font-semibold transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                {t("View on Google Maps →", "عرض على خرائط جوجل ←")}
              </a>
            </div>
          </div>
        </div>

        {/* ── Certifications Bar ── */}
        <div className="border-t border-white/8 bg-white/[0.02]">
          <div className="container mx-auto px-4 py-7">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.35em] text-white/30 mb-5">
              {t("Certifications & Compliance", "الشهادات والامتثال")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {certs.map((c) => <CertBadge key={c.name} {...c} />)}
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-white/8 bg-[#050c18]">
          <div className="container mx-auto px-4 py-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-white/30">
              <p>
                © {year} {t("ENVOD KINGDOM SHIPPING SERVICES LLC", "انفود كينغدوم لخدمات الشحن ذ.م.م")}.{" "}
                {t("All rights reserved.", "جميع الحقوق محفوظة.")}
              </p>
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <a href="#" className="hover:text-secondary transition-colors">{t("Privacy Policy", "سياسة الخصوصية")}</a>
                <span className="text-white/15">·</span>
                <a href="#" className="hover:text-secondary transition-colors">{t("Terms & Conditions", "الشروط والأحكام")}</a>
                <span className="text-white/15">·</span>
                <a href="#" className="hover:text-secondary transition-colors">{t("Cookie Policy", "سياسة الكوكيز")}</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ─────────────────────────── Main Layout ─────────────────────────── */
export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Premium branded WhatsApp floating button */}
      <a
        href="https://wa.me/966502260256"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_36px_rgba(37,211,102,0.6)] hover:bg-[#1EBE5D] transition-all duration-300 hover:-translate-y-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="text-sm font-bold hidden sm:block">WhatsApp</span>
      </a>
    </div>
  );
}
