import React, { useState } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/lib/language-context";
import { useTrackShipment, getTrackShipmentQueryKey } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package, MapPin, Calendar, Clock, CheckCircle2 } from "lucide-react";

export default function Track() {
  const { t, isRtl } = useLanguage();
  const searchParams = new URLSearchParams(window.location.search);
  const initialId = searchParams.get("id") || "";
  
  const [trackingNumber, setTrackingNumber] = useState(initialId);
  const [searchedId, setSearchedId] = useState(initialId);

  const { data, isLoading, error } = useTrackShipment(searchedId, {
    query: {
      enabled: !!searchedId,
      queryKey: getTrackShipmentQueryKey(searchedId)
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber) {
      setSearchedId(trackingNumber);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("Track Your Shipment", "تتبع شحنتك")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("Enter your tracking, reference, or invoice number to get real-time status updates.", "أدخل رقم التتبع أو المرجع للحصول على تحديثات الحالة في الوقت الفعلي.")}
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5`} />
              <Input 
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder={t("e.g., ENVOD-2024-001", "مثال: ENVOD-2024-001")}
                className={`bg-card border-white/10 text-white ${isRtl ? 'pr-12' : 'pl-12'} py-6 text-lg h-14`}
              />
            </div>
            <Button type="submit" className="bg-secondary hover:bg-secondary/90 text-white px-8 h-14 text-lg">
              {t("Track", "تتبع")}
            </Button>
          </form>
        </div>

        {isLoading && (
          <div className="text-center text-white py-12">
            <div className="animate-spin w-8 h-8 border-4 border-secondary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>{t("Searching...", "جاري البحث...")}</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="max-w-2xl mx-auto bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
            <p className="text-destructive font-medium">
              {t("Shipment not found. Please check the tracking number and try again.", "لم يتم العثور على الشحنة. يرجى التحقق من رقم التتبع والمحاولة مرة أخرى.")}
            </p>
          </div>
        )}

        {data && !isLoading && (
          <div className="max-w-4xl mx-auto bg-card border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-primary/50 p-6 border-b border-white/10 flex flex-wrap justify-between items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">{t("Tracking Number", "رقم التتبع")}</p>
                <h2 className="text-2xl font-bold text-white">{data.shipment.trackingNumber}</h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">{t("Status", "الحالة")}</p>
                <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-3 py-1 rounded-full font-medium">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  {data.shipment.status.replace(/_/g, ' ').toUpperCase()}
                </div>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/10">
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("Origin", "المصدر")}</p>
                    <p className="font-medium text-white">{data.shipment.origin}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("Destination", "الوجهة")}</p>
                    <p className="font-medium text-white">{data.shipment.destination}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("Details", "التفاصيل")}</p>
                    <p className="font-medium text-white">
                      {data.shipment.pieces} {t("pieces", "قطع")} • {data.shipment.weight} kg
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("Est. Delivery", "التوصيل المتوقع")}</p>
                    <p className="font-medium text-white">
                      {data.shipment.estimatedDelivery ? new Date(data.shipment.estimatedDelivery).toLocaleDateString() : 'TBD'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">{t("Tracking History", "سجل التتبع")}</h3>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
                {data.timeline.map((update, index) => (
                  <div key={update.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-card bg-secondary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${index === 0 ? 'bg-secondary' : 'bg-primary'}`}>
                      {index === 0 ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                    </div>
                    
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border border-white/5 bg-card/50 shadow">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-white">{update.status.replace(/_/g, ' ').toUpperCase()}</h4>
                        <time className="text-sm text-muted-foreground">{new Date(update.timestamp).toLocaleDateString()}</time>
                      </div>
                      <p className="text-sm text-muted-foreground">{update.location}</p>
                      {update.description && <p className="text-sm text-white/80 mt-2">{update.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
