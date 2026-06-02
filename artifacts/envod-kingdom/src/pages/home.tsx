import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Globe2, Clock, ShieldCheck, Ship, Plane, Truck } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

export default function Home() {
  const { t, isRtl } = useLanguage();
  const [, setLocation] = useLocation();
  const [tracking, setTracking] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (tracking) {
      setLocation(`/track?id=${tracking}`);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Cargo Ship" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-background"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
          >
            {t("GLOBAL SHIPPING.", "شحن عالمي.")} <br/>
            <span className="text-secondary">{t("LOCAL EXPERTISE.", "خبرة محلية.")}</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mb-10"
          >
            {t("Premium logistics, customs clearance, and freight forwarding for Saudi Arabia and the world.", "خدمات لوجستية متميزة، وتخليص جمركي، وشحن للمملكة العربية السعودية والعالم.")}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
          >
            <Link href="/contact" className="flex-1 bg-secondary hover:bg-secondary/90 text-white py-3 px-6 rounded-md font-medium text-center transition-colors">
              {t("Get Quote", "احصل على تسعيرة")}
            </Link>
            <Link href="/track" className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white py-3 px-6 rounded-md font-medium text-center transition-colors">
              {t("Track Shipment", "تتبع شحنتك")}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Track Inline */}
      <section className="py-12 bg-card relative z-20 -mt-16 mx-4 md:mx-auto max-w-4xl rounded-lg shadow-2xl border border-white/5 backdrop-blur-xl">
        <div className="px-6 md:px-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">{t("Track Your Cargo", "تتبع شحنتك")}</h3>
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5`} />
              <Input 
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
                placeholder={t("Enter tracking, reference, or invoice number", "أدخل رقم التتبع، أو المرجع، أو الفاتورة")}
                className={`bg-background border-white/10 text-white ${isRtl ? 'pr-10' : 'pl-10'} py-6 text-lg`}
              />
            </div>
            <Button type="submit" size="lg" className="bg-secondary hover:bg-secondary/90 text-white py-6 px-8 text-lg shrink-0">
              {t("Track", "تتبع")}
            </Button>
          </form>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">{t("Our Expertise", "خبراتنا")}</h2>
            <h3 className="text-4xl font-bold text-white">{t("Comprehensive Logistics", "خدمات لوجستية شاملة")}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-white/5 hover:border-secondary/50 transition-colors group">
              <Ship className="w-12 h-12 text-secondary mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-white mb-3">{t("Ocean Freight", "الشحن البحري")}</h4>
              <p className="text-muted-foreground mb-6">{t("FCL and LCL shipping solutions tailored to your timeline and budget.", "حلول شحن بحري مخصصة وفقاً لجدولك الزمني وميزانيتك.")}</p>
              <Link href="/services" className="text-secondary font-medium hover:underline inline-flex items-center gap-1">
                {t("Learn more", "المزيد")} {isRtl ? "←" : "→"}
              </Link>
            </div>
            <div className="bg-card p-8 rounded-lg border border-white/5 hover:border-secondary/50 transition-colors group">
              <Plane className="w-12 h-12 text-secondary mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-white mb-3">{t("Air Freight", "الشحن الجوي")}</h4>
              <p className="text-muted-foreground mb-6">{t("Expedited air cargo services for your time-critical shipments.", "خدمات شحن جوي سريع للشحنات الحساسة للوقت.")}</p>
              <Link href="/services" className="text-secondary font-medium hover:underline inline-flex items-center gap-1">
                {t("Learn more", "المزيد")} {isRtl ? "←" : "→"}
              </Link>
            </div>
            <div className="bg-card p-8 rounded-lg border border-white/5 hover:border-secondary/50 transition-colors group">
              <Truck className="w-12 h-12 text-secondary mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-white mb-3">{t("Land Transportation", "النقل البري")}</h4>
              <p className="text-muted-foreground mb-6">{t("Reliable domestic and cross-border road freight operations.", "خدمات نقل بري موثوقة محلياً وعبر الحدود.")}</p>
              <Link href="/services" className="text-secondary font-medium hover:underline inline-flex items-center gap-1">
                {t("Learn more", "المزيد")} {isRtl ? "←" : "→"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why ENVOD */}
      <section className="py-24 bg-card border-y border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">{t("READY TO SHIP WITH CONFIDENCE?", "هل أنت مستعد للشحن بثقة؟")}</h2>
          <Link href="/contact" className="inline-block bg-secondary hover:bg-secondary/90 text-white py-4 px-10 rounded-md font-bold text-lg uppercase tracking-wider transition-colors shadow-lg shadow-secondary/20">
            {t("Contact Our Team", "تواصل مع فريقنا")}
          </Link>
        </div>
      </section>
    </div>
  );
}
