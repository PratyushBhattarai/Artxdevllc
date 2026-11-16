// src/pages/BookMeeting/bookingService.js
//
// ⚠️ IMPORTANT: this does NOT send the booking anywhere yet.
// Right now it only waits a moment and returns success so the page flow works.
// To actually receive bookings, connect it to one of:
//   - your own backend API   (fetch('/api/bookings', { method: 'POST', body: JSON.stringify(booking) }))
//   - EmailJS / Formspree     (sends the booking to the team's inbox)
//   - Google Calendar / Cal.com API
// and return { ok: true, reference } when it succeeds.

export async function submitBooking(booking) {
  await new Promise((r) => setTimeout(r, 1000));

  const reference =
    'ARTX-' + Math.random().toString(36).slice(2, 6).toUpperCase() + '-' + String(Date.now()).slice(-4);

  // eslint-disable-next-line no-console
  console.info('[BookMeeting] booking (not sent yet – connect bookingService.js):', booking);

  return { ok: true, reference };
}
