// src/pages/BookMeeting/bookingService.js
//
// Sends every booking by email using EmailJS (https://www.emailjs.com).
// Keys are read from the .env file in the project root – see
// src/pages/BookMeeting/EMAILJS_SETUP.md for the step-by-step setup.
//
//   VITE_EMAILJS_PUBLIC_KEY            – Account → API keys → Public key
//   VITE_EMAILJS_SERVICE_ID            – Email Services → your service ID
//   VITE_EMAILJS_TEMPLATE_ID           – template that emails the TEAM
//   VITE_EMAILJS_CUSTOMER_TEMPLATE_ID  – (optional) confirmation to the CUSTOMER

import emailjs from '@emailjs/browser';
import { MEETING_TYPES, MEETING_MODES, TIME_ZONES, OFFICE_TIME_ZONE } from './bookingConfig';
import { formatLongDate, formatTime } from './timeUtils';

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEAM_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const CUSTOMER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID;

export const isEmailConfigured = Boolean(PUBLIC_KEY && SERVICE_ID && TEAM_TEMPLATE_ID);
export const sendsCustomerConfirmation = isEmailConfigured && Boolean(CUSTOMER_TEMPLATE_ID);

const makeReference = () =>
  'ARTX-' + Math.random().toString(36).slice(2, 6).toUpperCase() + '-' + String(Date.now()).slice(-4);

// Turns the booking into the {{variables}} used in the EmailJS templates
export const toTemplateParams = (booking, reference) => {
  const type = MEETING_TYPES.find((t) => t.id === booking.typeId);
  const mode = MEETING_MODES.find((m) => m.id === booking.mode);
  const start = new Date(booking.slotISO);
  const end = new Date(start.getTime() + type.duration * 60000);
  const tzLabel = TIME_ZONES.find((t) => t.id === booking.timeZone)?.label ?? booking.timeZone;

  return {
    reference,
    meeting_type: type.title,
    duration: `${type.duration} minutes`,
    meeting_mode: mode.label,
    date: formatLongDate(booking.dayKey),
    time_customer: `${formatTime(start, booking.timeZone)} – ${formatTime(end, booking.timeZone)}`,
    customer_timezone: tzLabel,
    time_nepal: `${formatTime(start, OFFICE_TIME_ZONE)} – ${formatTime(end, OFFICE_TIME_ZONE)} (Nepal)`,
    start_utc: start.toISOString(),
    name: booking.name.trim(),
    email: booking.email.trim(),
    reply_to: booking.email.trim(),
    phone: booking.phone.trim() || '—',
    company: booking.company.trim() || '—',
    service: booking.service,
    budget: booking.budget || '—',
    details: booking.details.trim() || '—',
    source: booking.source || '—',
  };
};

export async function submitBooking(booking) {
  const reference = makeReference();

  if (!isEmailConfigured) {
    // Keys missing: in development keep the flow testable, in production fail loudly.
    if (import.meta.env.DEV) {
      console.warn(
        '[BookMeeting] EmailJS keys are missing in .env – booking NOT emailed (dev mode only).',
        booking
      );
      return { ok: true, reference, emailed: false };
    }
    return { ok: false, error: 'Booking email is not configured' };
  }

  const params = toTemplateParams(booking, reference);

  try {
    // 1) Notify the team – this one must succeed
    await emailjs.send(SERVICE_ID, TEAM_TEMPLATE_ID, params, { publicKey: PUBLIC_KEY });
  } catch (err) {
    console.error('[BookMeeting] EmailJS failed to send the booking:', err);
    return { ok: false, error: err?.text || 'Email failed' };
  }

  // 2) Confirmation to the customer – optional, never blocks the booking
  if (CUSTOMER_TEMPLATE_ID) {
    try {
      await emailjs.send(SERVICE_ID, CUSTOMER_TEMPLATE_ID, params, { publicKey: PUBLIC_KEY });
    } catch (err) {
      console.warn('[BookMeeting] Customer confirmation email failed:', err);
    }
  }

  return { ok: true, reference, emailed: true };
}
