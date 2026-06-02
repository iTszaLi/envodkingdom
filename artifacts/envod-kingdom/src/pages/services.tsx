import React from "react";
import { useLanguage } from "@/lib/language-context";
import { useListServices, getListServicesQueryKey } from "@workspace/api-client-react";
import { Ship, Plane, Truck, Package, ShieldCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
  const { t, isRtl } = useLanguage();
  const { data: servicesData } = useListServices();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ship': return <Ship className="w-10 h-10" />;
      case 'Plane': return <Plane className="w-10 h-10" />;
      case 'Truck': return <Truck className="w-10 h-10" />;
      case 'Package': return <Package className="w-10 h-10" />;
      case 'ShieldCheck': return <ShieldCheck className="w-10 h-10" />;
      default: return <Package className="w-10 h-10" />;
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase">
            {t("Our Services", "خدماتنا")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("Comprehensive logistics solutions designed to keep your business moving. From international freight to local delivery, we handle it all with precision.", "حلول لوجستية شاملة مصممة للحفاظ على حركة عملك. من الشحن الدولي إلى التوصيل المحلي، نتعامل مع كل شيء بدقة.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData?.map((service, i) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-white/5 rounded-xl p-8 hover:border-secondary/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-secondary mb-6 group-hover:scale-110 transition-transform origin-left">
                {getIcon(service.icon)}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {isRtl ? service.nameAr : service.name}
              </h3>
              <p className="text-muted-foreground">
                {isRtl ? service.descriptionAr : service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
