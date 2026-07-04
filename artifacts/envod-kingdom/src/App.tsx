import { Switch, Route, Router as WouterRouter, Redirect, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { LanguageProvider } from "@/lib/language-context";
import { MainLayout } from "@/components/layout/MainLayout";
import { SeoManager } from "@/components/SeoManager";

import Home from "@/pages/home";
import Track from "@/pages/track";
import Services from "@/pages/services";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import Gallery from "@/pages/gallery/index";
import ServiceDetail from "@/pages/service-detail";
import Industries from "@/pages/industries";
import IndustryDetail from "@/pages/industry-detail";
import Vision2030 from "@/pages/vision-2030";

import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminNotifications from "@/pages/admin/notifications";
import AdminHeroVideos from "@/pages/admin/hero-videos";
import AdminGallery from "@/pages/admin/gallery";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    let cancelled = false;
    void import("@/lib/scroll-engine").then((m) => {
      if (!cancelled) m.scrollToTop(true);
    });
    return () => {
      cancelled = true;
    };
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      
      {/* Mocking other admin routes to the dashboard for now to maintain full routing */}
      <Route path="/admin/shipments" component={AdminDashboard} />
      <Route path="/admin/services" component={AdminDashboard} />
      <Route path="/admin/testimonials" component={AdminDashboard} />
      <Route path="/admin/faqs" component={AdminDashboard} />
      <Route path="/admin/articles" component={AdminDashboard} />
      <Route path="/admin/clients" component={AdminDashboard} />
      <Route path="/admin/inquiries" component={AdminDashboard} />
      <Route path="/admin/settings" component={AdminDashboard} />
      <Route path="/admin/notifications" component={AdminNotifications} />
      <Route path="/admin/hero-videos" component={AdminHeroVideos} />
      <Route path="/admin/gallery" component={AdminGallery} />
      
      <Route path="/">
        <MainLayout><Home /></MainLayout>
      </Route>
      <Route path="/track">
        <MainLayout><Track /></MainLayout>
      </Route>
      <Route path="/services">
        <MainLayout><Services /></MainLayout>
      </Route>
      <Route path="/services/:slug">
        <MainLayout><ServiceDetail /></MainLayout>
      </Route>
      <Route path="/industries">
        <MainLayout><Industries /></MainLayout>
      </Route>
      <Route path="/industries/:slug">
        <MainLayout><IndustryDetail /></MainLayout>
      </Route>
      <Route path="/vision-2030">
        <MainLayout><Vision2030 /></MainLayout>
      </Route>
      <Route path="/about">
        <MainLayout><About /></MainLayout>
      </Route>
      <Route path="/gallery">
        <MainLayout><Gallery /></MainLayout>
      </Route>
      <Route path="/blog"><Redirect to="/gallery" /></Route>
      <Route path="/blog/:slug"><Redirect to="/gallery" /></Route>
      <Route path="/contact">
        <MainLayout><Contact /></MainLayout>
      </Route>
      <Route>
        <MainLayout><NotFound /></MainLayout>
      </Route>
    </Switch>
  );
}

function App({ ssrPath }: { ssrPath?: string }) {
  useEffect(() => {
    let destroy: (() => void) | undefined;
    void import("@/lib/scroll-engine").then((m) => {
      m.initScrollEngine();
      destroy = m.destroyScrollEngine;
    });
    return () => {
      destroy?.();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")} ssrPath={ssrPath}>
            <ScrollToTop />
            <SeoManager />
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
