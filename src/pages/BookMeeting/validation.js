// src/pages/BookMeeting/validation.js
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns { field: 'message' } for every invalid field in the details step
export const detailsErrors = (b) => {
  const e = {};
  if (!b.name.trim()) e.name = 'Please enter your name';
  if (!EMAIL_RE.test(b.email.trim())) e.email = 'Please enter a valid email';
  if (b.mode === 'phone' && b.phone.trim().length < 7) e.phone = 'We need a phone number for a phone call';
  if (!b.service) e.service = 'Please choose a service';
  return e;
};
