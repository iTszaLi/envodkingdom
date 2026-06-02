import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { LanguageProvider } from "@/lib/language-context";
import { MainLayout } from "@/components/layout/MainLayout";
import { initScrollEngine, destroyScrollEngine } from "@/lib/scroll-engine";

import Home from "@/pages/home";
import Track from "@/pages/track";
import Services from "@/pages/services";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import Blog from "@/pages/blog/index";
import BlogPost from "@/pages/blog/[slug]";

import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminNotifications from "@/pages/admin/notifications";

const queryClient = new QueryClient();

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
      
      <Route path="/">
        <MainLayout><Home /></MainLayout>
      </Route>
      <Route path="/track">
        <MainLayout><Track /></MainLayout>
      </Route>
      <Route path="/services">
        <MainLayout><Services /></MainLayout>
      </Route>
      <Route path="/about">
        <MainLayout><About /></MainLayout>
      </Route>
      <Route path="/blog">
        <MainLayout><Blog /></MainLayout>
      </Route>
      <Route path="/blog/:slug">
        <MainLayout><BlogPost /></MainLayout>
      </Route>
      <Route path="/contact">
        <MainLayout><Contact /></MainLayout>
      </Route>
      <Route>
        <MainLayout><NotFound /></MainLayout>
      </Route>
    </Switch>
  );
}

function App() {
  useEffect(() => {
    const lenis = initScrollEngine();
    return () => {
      destroyScrollEngine();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
