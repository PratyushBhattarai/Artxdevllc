// src/pages/BookMeeting/timeUtils.js
import {
  OFFICE_UTC_OFFSET_MIN,
  WORK_DAYS,
  OPEN_HOUR,
  CLOSE_HOUR,
  SLOT_STEP_MIN,
  MIN_NOTICE_HOURS,
  CUSTOMER_EARLIEST_HOUR,
  CUSTOMER_LATEST_HOUR,
} from './bookingConfig';

const fmtCache = new Map();
const formatter = (key, opts) => {
  if (!fmtCache.has(key)) fmtCache.set(key, new Intl.DateTimeFormat(opts.locale || 'en-US', opts));
  return fmtCache.get(key);
};

// "YYYY-MM-DD" for a moment in time, as seen in `timeZone`
export const dayKeyIn = (date, timeZone) =>
  formatter(`key|${timeZone}`, {
    locale: 'en-CA',
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);

export const toDayKey = (y, m, d) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

export const formatTime = (date, timeZone) =>
  formatter(`time|${timeZone}`, { timeZone, hour: 'numeric', minute: '2-digit' }).format(date);

export const hourIn = (date, timeZone) =>
  Number(formatter(`hour|${timeZone}`, { timeZone, hour: 'numeric', hourCycle: 'h23' }).format(date));

export const formatLongDate = (dayKey) => {
  const [y, m, d] = dayKey.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

// Some systems report old spellings of time zone names – normalise them
const TZ_ALIASES = {
  'Asia/Katmandu': 'Asia/Kathmandu',
  'Asia/Calcutta': 'Asia/Kolkata',
  'US/Eastern': 'America/New_York',
  'US/Central': 'America/Chicago',
  'US/Mountain': 'America/Denver',
  'US/Pacific': 'America/Los_Angeles',
};

export const detectTimeZone = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kathmandu';
    return TZ_ALIASES[tz] || tz;
  } catch {
    return 'Asia/Kathmandu';
  }
};

/**
 * All bookable start times (as Date objects) that fall on `dayKey`
 * in the customer's `timeZone`. Office hours are defined in Nepal time,
 * so we look at the Nepal days around it and convert.
 */
export const slotsForDay = (dayKey, durationMin, timeZone, now = new Date()) => {
  const [y, m, d] = dayKey.split('-').map(Number);
  const slots = [];

  for (let k = -1; k <= 1; k++) {
    const officeDay = new Date(Date.UTC(y, m - 1, d + k));
    if (!WORK_DAYS.includes(officeDay.getUTCDay())) continue;

    const Y = officeDay.getUTCFullYear();
    const M = officeDay.getUTCMonth();
    const D = officeDay.getUTCDate();

    for (let t = OPEN_HOUR * 60; t + durationMin <= CLOSE_HOUR * 60; t += SLOT_STEP_MIN) {
      const start = new Date(Date.UTC(Y, M, D, 0, t) - OFFICE_UTC_OFFSET_MIN * 60000);
      if (start - now < MIN_NOTICE_HOURS * 3600000) continue;
      if (dayKeyIn(start, timeZone) !== dayKey) continue;
      const h = hourIn(start, timeZone);
      if (h < CUSTOMER_EARLIEST_HOUR || h >= CUSTOMER_LATEST_HOUR) continue;
      slots.push(start);
    }
  }
  return slots.sort((a, b) => a - b);
};

// ---- Calendar helpers ----
const icsDate = (date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

export const buildIcs = ({ title, description, location, start, end }) => {
  const esc = (s) => String(s).replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ArtX Dev//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${start.getTime()}-${Math.random().toString(36).slice(2)}@artxdev`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(description)}`,
    `LOCATION:${esc(location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
};

export const googleCalendarUrl = ({ title, description, location, start, end }) => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${icsDate(start)}/${icsDate(end)}`,
    details: description,
    location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
