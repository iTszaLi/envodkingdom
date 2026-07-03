import React from "react";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitInquiry } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Printer, Mail } from "lucide-react";

export default function Contact() {
  const { t, isRtl } = useLanguage();
  const { toast } = useToast();
  const submitInquiry = useSubmitInquiry();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    submitInquiry.mutate({
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        company: formData.get("company") as string,
        serviceType: formData.get("service") as string,
        message: formData.get("message") as string,
      }
    }, {
      onSuccess: () => {
        toast({
          title: t("Message sent!", "تم إرسال الرسالة!"),
          description: t("We will get back to you shortly.", "سنتواصل معك قريباً."),
        });
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase">
            {t("Contact Us", "اتصل بنا")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("Get a quote, ask a question, or let us know how we can help your business.", "احصل على تسعيرة، اطرح سؤالاً، أو أخبرنا كيف يمكننا مساعدة عملك.")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">{t("Get in Touch", "تواصل معنا")}</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shrink-0 border border-white/10">
                  <MapPin className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">{t("Our Office", "مكتبنا")}</h3>
                  <p className="text-muted-foreground">Prince Mansour Bin Abdulaziz Street, Al Malaz District, Riyadh 12831, P.O. Box 2383, Saudi Arabia</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shrink-0 border border-white/10">
                  <Phone className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">{t("Phone & WhatsApp", "الهاتف والواتساب")}</h3>
                  <p className="text-muted-foreground">+966 50 226 0256</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shrink-0 border border-white/10">
                  <Printer className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">{t("Fax", "فاكس")}</h3>
                  <p className="text-muted-foreground">+966 11 238 0517</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shrink-0 border border-white/10">
                  <Mail className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">{t("Email", "البريد الإلكتروني")}</h3>
                  <p className="text-muted-foreground">info@envodkingdom.net</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl border border-white/5 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">{t("Send a Message", "إرسال رسالة")}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/80">{t("Name", "الاسم")} *</label>
                  <Input name="name" required className="bg-background border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/80">{t("Company", "الشركة")}</label>
                  <Input name="company" className="bg-background border-white/10 text-white" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/80">{t("Email", "البريد الإلكتروني")} *</label>
                  <Input type="email" name="email" required className="bg-background border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/80">{t("Phone", "رقم الهاتف")} *</label>
                  <Input name="phone" required className="bg-background border-white/10 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/80">{t("Service Interested In", "الخدمة المطلوبة")} *</label>
                <select name="service" required className="w-full h-10 px-3 rounded-md bg-background border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">{t("Select a service", "اختر خدمة")}</option>
                  <option value="ocean_freight">Ocean Freight</option>
                  <option value="air_freight">Air Freight</option>
                  <option value="customs">Customs Clearance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/80">{t("Message", "الرسالة")} *</label>
                <Textarea name="message" required rows={4} className="bg-background border-white/10 text-white resize-none" />
              </div>

              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white py-6 text-lg mt-4" disabled={submitInquiry.isPending}>
                {submitInquiry.isPending ? t("Sending...", "جاري الإرسال...") : t("Send Message", "إرسال الرسالة")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
