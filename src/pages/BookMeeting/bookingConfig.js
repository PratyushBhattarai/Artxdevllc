// src/pages/BookMeeting/bookingConfig.js
// All the booking settings live here – edit freely.

// ---- Meeting types ----
export const MEETING_TYPES = [
  {
    id: 'discovery',
    title: 'Discovery Call',
    duration: 30,
    price: 'Free',
    desc: 'Tell us about your idea. We will suggest the right approach and next steps.',
  },
  {
    id: 'consultation',
    title: 'Project Consultation',
    duration: 45,
    price: 'Free',
    desc: 'Go deeper on scope, features, timeline and a rough budget for your project.',
  },
  {
    id: 'technical',
    title: 'Technical / AI Review',
    duration: 60,
    price: 'Free',
    desc: 'Review an existing website or app, or explore where AI automation can help.',
  },
];

// ---- How the meeting happens ----
export const MEETING_MODES = [
  { id: 'meet', label: 'Google Meet', hint: 'Video link sent by email' },
  { id: 'zoom', label: 'Zoom', hint: 'Video link sent by email' },
  { id: 'phone', label: 'Phone call', hint: 'We call your number' },
  { id: 'office', label: 'In person', hint: 'Lalitpur office, Nepal' },
];

// ---- Availability ----
// Working hours are defined in the office time zone (Nepal) and are
// automatically converted to the customer's time zone on the page.
export const OFFICE_TIME_ZONE = 'Asia/Kathmandu';
export const OFFICE_UTC_OFFSET_MIN = 345; // Nepal = UTC+5:45 (no daylight saving)
export const WORK_DAYS = [1, 2, 3, 4, 5]; // 0 = Sun … 6 = Sat (in Nepal time)
export const OPEN_HOUR = 9; // 9:00 AM Nepal
export const CLOSE_HOUR = 21; // 9:00 PM Nepal (gives morning slots for US clients)
export const SLOT_STEP_MIN = 30; // a new slot every 30 minutes
export const MIN_NOTICE_HOURS = 3; // can't book less than 3h ahead
export const MAX_DAYS_AHEAD = 60; // how far ahead people can book
// Only show slots that are at a reasonable hour for the CUSTOMER (their own time zone)
export const CUSTOMER_EARLIEST_HOUR = 7; // 7:00 AM
export const CUSTOMER_LATEST_HOUR = 22; // last slot must start before 10:00 PM

// ---- Time zones shown in the dropdown ----
export const TIME_ZONES = [
  { id: 'Asia/Kathmandu', label: 'Nepal (Kathmandu)' },
  { id: 'America/New_York', label: 'US Eastern (New York)' },
  { id: 'America/Chicago', label: 'US Central (Chicago)' },
  { id: 'America/Denver', label: 'US Mountain (Wyoming, Denver)' },
  { id: 'America/Los_Angeles', label: 'US Pacific (Los Angeles)' },
  { id: 'Europe/London', label: 'UK (London)' },
  { id: 'Asia/Kolkata', label: 'India (Kolkata)' },
  { id: 'Asia/Dubai', label: 'UAE (Dubai)' },
  { id: 'Australia/Sydney', label: 'Australia (Sydney)' },
];

// ---- Details form options ----
export const SERVICES = [
  'Website Design',
  'Website Development',
  'E-Commerce Store',
  'Web App',
  'Mobile App',
  'Marketing & SEO',
  'AI Automation',
  'Maintenance / Support',
  'Not sure yet',
];

export const BUDGETS = ['Under $500', '$500 – $1,000', '$1,000 – $1,500', '$1,500 – $5,000', '$5,000+', 'Not sure'];

export const SOURCES = ['Google search', 'Social media', 'Referral / friend', 'Existing client', 'Other'];

export const CONTACT_EMAIL = 'Artxdevllc@gmail.com';
