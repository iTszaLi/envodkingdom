import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/language-context";
import { Globe, Menu, X, Clock, Shield, Globe2 } from "lucide-react";
import logoIcon from "@assets/image_1780532431289.png";
import logoFull from "@assets/image_1780437854819.png";
import { Button } from "@/components/ui/button";

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
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-primary/95 backdrop-blur-md shadow-md" : "bg-black/30 backdrop-blur-sm"
      }`}
    >
      {/* ── Announcement bar ── */}
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
              {t("ATA Carnet · Exhibition · Project Cargo Specialists", "كارنيه ATA · معارض · بضائع مشاريع")}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        {/* Logo — blended, no white box */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src={logoIcon}
            alt="ENVOD KINGDOM"
            className="h-10 w-10 object-contain rounded-full transition-opacity group-hover:opacity-90"
            style={{ filter: "drop-shadow(0 0 6px rgba(214,40,40,0.4))" }}
          />
          <span className="hidden sm:block text-white font-bold text-sm leading-tight tracking-wide uppercase">
            ENVOD KINGDOM<br />
            <span className="text-white/60 font-normal text-[10px] tracking-widest">SHIPPING SERVICES LLC</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/85 hover:text-secondary font-medium transition-colors text-sm"
            >
              {t(link.en, link.ar)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="text-white hover:bg-white/10 text-sm"
          >
            <Globe className="w-4 h-4 mr-1.5" />
            {language === "en" ? "عربي" : "EN"}
          </Button>
          <Link
            href="/contact"
            className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm"
          >
            {t("Get Quote", "احصل على تسعيرة")}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-1" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-primary/97 backdrop-blur-md py-4 px-4 flex flex-col gap-4 shadow-lg border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white text-base hover:text-secondary font-medium transition-colors py-1"
            >
              {t(link.en, link.ar)}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <Button
              variant="outline"
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="w-full justify-center"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === "en" ? "عربي" : "EN"}
            </Button>
            <Link
              href="/contact"
              className="w-full text-center bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              {t("Get Quote", "احصل على تسعيرة")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { t, isRtl } = useLanguage();
  return (
    <footer className="bg-primary pt-16 pb-8 border-t border-white/10 text-white/80">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="bg-white/90 p-1 inline-block rounded-sm mb-4">
            <img src={logoFull} alt="ENVOD KINGDOM" className="h-10 object-contain" />
          </div>
          <p className="mb-4 max-w-sm">
            {t(
              "GLOBAL SHIPPING. LOCAL EXPERTISE. Premium logistics services for the Middle East and beyond.",
              "شحن عالمي. خبرة محلية. خدمات لوجستية متميزة للشرق الأوسط وما بعده.",
            )}
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg mb-4">{t("Services", "خدماتنا")}</h4>
          <ul className="space-y-2">
            <li><Link href="/services" className="hover:text-secondary transition-colors">{t("Ocean Freight", "الشحن البحري")}</Link></li>
            <li><Link href="/services" className="hover:text-secondary transition-colors">{t("Air Freight", "الشحن الجوي")}</Link></li>
            <li><Link href="/services" className="hover:text-secondary transition-colors">{t("Customs Clearance", "التخليص الجمركي")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg mb-4">{t("Company", "الشركة")}</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-secondary transition-colors">{t("About Us", "عن الشركة")}</Link></li>
            <li><Link href="/blog" className="hover:text-secondary transition-colors">{t("News & Blog", "الأخبار والمدونة")}</Link></li>
            <li><Link href="/contact" className="hover:text-secondary transition-colors">{t("Contact", "اتصل بنا")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg mb-4">{t("Contact Info", "معلومات الاتصال")}</h4>
          <ul className="space-y-2">
            <li>Prince Mansour Bin Abdulaziz Street, Al Malaz District, Riyadh 12831, Saudi Arabia</li>
            <li>WhatsApp: +966 50 226 0256</li>
            <li>Phone: +966 58 367 1739</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 text-center border-t border-white/10 pt-8 text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          {t("ENVOD KINGDOM SHIPPING SERVICES LLC", "انفود كينجدم لخدمات الشحن ذ.م.م")}.{" "}
          {t("All rights reserved.", "جميع الحقوق محفوظة.")}
        </p>
      </div>
    </footer>
  );
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <a
        href="https://wa.me/966502260256"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#1EBE5D] transition-colors z-50 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </div>
  );
}
