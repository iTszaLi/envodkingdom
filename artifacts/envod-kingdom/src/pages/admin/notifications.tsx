import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Bell, CheckCircle2, XCircle, Clock, RefreshCw, Send, Loader2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: number;
  shipmentId: number;
  trackingNumber: string;
  recipientPhone: string;
  recipientName: string | null;
  channel: string;
  status: string;
  message: string;
  shipmentStatus: string;
  errorMessage: string | null;
  sentAt: string | null;
  createdAt: string;
}

const STATUS_LABELS: Record<string, string> = {
  booking_confirmed: "Booking Confirmed",
  cargo_received: "Cargo Received",
  documentation_complete: "Documentation Complete",
  customs_clearance: "Customs Clearance",
  port_processing: "Port Processing",
  in_transit: "In Transit",
  warehouse_arrival: "Warehouse Arrival",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

function StatusBadge({ status }: { status: string }) {
  if (status === "sent") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/20">
        <CheckCircle2 className="w-3 h-3" /> Sent
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/15 text-red-400 border border-red-500/20">
        <XCircle className="w-3 h-3" /> Failed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">
      <Clock className="w-3 h-3" /> Pending
    </span>
  );
}

function useNotifications(page: number) {
  const [data, setData] = useState<{ notifications: Notification[]; total: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    setIsLoading(true);
    try {
      const res = await window.fetch(`/api/notifications?page=${page}`);
      if (!res.ok) throw new Error("Failed to load");
      setData(await res.json());
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, refetch: fetch };
}

export default function AdminNotifications() {
  const [page] = useState(1);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState<number | null>(null);
  const [testPhone, setTestPhone] = useState("");
  const [testTracking, setTestTracking] = useState("ENVOD-2024-001");
  const [sending, setSending] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const res = await window.fetch(`/api/notifications?page=${page}`);
      const json = await res.json();
      setNotifications(json.notifications ?? []);
      setTotal(json.total ?? 0);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  // Load on mount
  useEffect(() => { load(); }, []);

  const handleRetry = async (id: number) => {
    setRetrying(id);
    try {
      const res = await window.fetch(`/api/notifications/retry/${id}`, { method: "POST" });
      const json = await res.json();
      if (json.result?.success) {
        toast({ title: "Notification resent successfully" });
      } else {
        toast({ title: "Retry failed", description: json.result?.error ?? "Unknown error", variant: "destructive" });
      }
      await load();
    } catch {
      toast({ title: "Error", description: "Could not retry", variant: "destructive" });
    } finally {
      setRetrying(null);
    }
  };

  const handleTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPhone || !testTracking) return;
    setSending(true);
    try {
      const res = await window.fetch("/api/notifications/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: testPhone, trackingNumber: testTracking }),
      });
      const json = await res.json();
      if (json.result?.success) {
        toast({ title: "Test message sent!", description: `WhatsApp sent to ${testPhone}` });
      } else {
        toast({
          title: "Message not sent",
          description: json.result?.error ?? "Check Twilio credentials in admin settings",
          variant: "destructive",
        });
      }
      await load();
    } catch {
      toast({ title: "Error", description: "Request failed", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Bell className="w-7 h-7 text-secondary" />
              WhatsApp Notifications
            </h1>
            <p className="text-muted-foreground mt-1">
              Automatic WhatsApp updates sent to consignees on shipment status changes.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={load} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Twilio config notice */}
        <div className="bg-primary/30 border border-primary/50 rounded-lg p-5 flex items-start gap-4">
          <Phone className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-white">Twilio Credentials Required</p>
            <p className="text-sm text-muted-foreground mt-1">
              Set <code className="bg-white/10 px-1 rounded text-white">TWILIO_ACCOUNT_SID</code>,{" "}
              <code className="bg-white/10 px-1 rounded text-white">TWILIO_AUTH_TOKEN</code>, and{" "}
              <code className="bg-white/10 px-1 rounded text-white">TWILIO_WHATSAPP_FROM</code> as environment
              secrets to enable live sending. Notifications are logged regardless — failed ones can be retried once credentials are set.
            </p>
          </div>
        </div>

        {/* Test sender */}
        <div className="bg-card border border-white/5 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-secondary" />
            Send Test Message
          </h2>
          <form onSubmit={handleTest} className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Phone number (e.g. +966501234567)"
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Tracking number"
              value={testTracking}
              onChange={(e) => setTestTracking(e.target.value)}
              className="w-48"
            />
            <Button type="submit" disabled={sending || !testPhone || !testTracking} className="gap-2 whitespace-nowrap">
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Send Test
            </Button>
          </form>
        </div>

        {/* Notification log */}
        <div className="bg-card border border-white/5 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="font-semibold text-white">Notification Log</h2>
            <span className="text-sm text-muted-foreground">{total} total</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Bell className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No notifications yet</p>
              <p className="text-sm mt-1">They'll appear here when shipment statuses are updated.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {notifications.map((n) => (
                <div key={n.id} className="px-6 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-sm font-semibold text-white">{n.trackingNumber}</span>
                        <StatusBadge status={n.status} />
                        <span className="text-xs text-muted-foreground">
                          {STATUS_LABELS[n.shipmentStatus] ?? n.shipmentStatus}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{n.recipientName ?? "—"}</span>
                        <span className="font-mono">{n.recipientPhone}</span>
                        <span>{new Date(n.createdAt).toLocaleString()}</span>
                      </div>
                      {n.errorMessage && (
                        <p className="mt-1 text-xs text-red-400">{n.errorMessage}</p>
                      )}
                      {expandedId === n.id && (
                        <pre className="mt-3 text-xs bg-background/60 rounded p-3 text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
                          {n.message}
                        </pre>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={() => setExpandedId(expandedId === n.id ? null : n.id)}
                      >
                        {expandedId === n.id ? "Hide" : "Preview"}
                      </Button>
                      {n.status !== "sent" && (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={retrying === n.id}
                          onClick={() => handleRetry(n.id)}
                          className="gap-1.5 text-xs"
                        >
                          {retrying === n.id
                            ? <Loader2 className="w-3 h-3 animate-spin" />
                            : <RefreshCw className="w-3 h-3" />}
                          Retry
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
