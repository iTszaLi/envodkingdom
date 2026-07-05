import Twilio from "twilio";
import { logger } from "./logger";

const STATUS_LABELS: Record<string, { en: string; ar: string }> = {
  booking_confirmed:       { en: "Booking Confirmed",        ar: "تم تأكيد الحجز" },
  cargo_received:          { en: "Cargo Received",           ar: "تم استلام البضاعة" },
  documentation_complete:  { en: "Documentation Complete",   ar: "اكتملت المستندات" },
  customs_clearance:       { en: "Customs Clearance",        ar: "التخليص الجمركي" },
  port_processing:         { en: "Port Processing",          ar: "المعالجة في الميناء" },
  in_transit:              { en: "In Transit",               ar: "في الطريق" },
  warehouse_arrival:       { en: "Arrived at Warehouse",     ar: "وصل إلى المستودع" },
  out_for_delivery:        { en: "Out for Delivery",         ar: "خارج للتسليم" },
  delivered:               { en: "Delivered",                ar: "تم التسليم" },
};

export interface NotificationPayload {
  trackingNumber: string;
  consigneeName: string | null | undefined;
  consigneePhone: string;
  newStatus: string;
  location?: string | null;
  description?: string | null;
}

export function buildWhatsAppMessage(payload: NotificationPayload): string {
  const label = STATUS_LABELS[payload.newStatus] ?? { en: payload.newStatus, ar: payload.newStatus };
  const name = payload.consigneeName ?? "Valued Customer";
  const trackingUrl = `https://www.envodkingdom.net/track?id=${payload.trackingNumber}`;

  return (
    `*ENVOD KINGDOM* — Shipment Update\n\n` +
    `Dear ${name},\n\n` +
    `Your shipment *${payload.trackingNumber}* status has been updated:\n\n` +
    `📦 Status: *${label.en}*\n` +
    (payload.location ? `📍 Location: ${payload.location}\n` : "") +
    (payload.description ? `ℹ️ ${payload.description}\n` : "") +
    `\nTrack your shipment:\n${trackingUrl}\n\n` +
    `For assistance call: +966 50 226 0256\n` +
    `WhatsApp: +966 50 226 0256`
  );
}

export interface SendResult {
  success: boolean;
  sid?: string;
  error?: string;
}

export async function sendWhatsAppNotification(payload: NotificationPayload): Promise<SendResult> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_FROM ?? "whatsapp:+14155238886";

  if (!accountSid || !authToken) {
    logger.warn("Twilio credentials not set — notification queued but not sent");
    return { success: false, error: "Twilio credentials not configured" };
  }

  const client = Twilio(accountSid, authToken);
  const message = buildWhatsAppMessage(payload);

  const to = payload.consigneePhone.startsWith("whatsapp:")
    ? payload.consigneePhone
    : `whatsapp:${payload.consigneePhone}`;

  try {
    const msg = await client.messages.create({
      from: fromNumber,
      to,
      body: message,
    });
    logger.info({ sid: msg.sid, to: payload.consigneePhone }, "WhatsApp notification sent");
    return { success: true, sid: msg.sid };
  } catch (err: any) {
    logger.error({ err }, "WhatsApp notification failed");
    return { success: false, error: err?.message ?? "Unknown error" };
  }
}
