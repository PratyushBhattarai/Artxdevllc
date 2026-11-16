// src/pages/BookMeeting/steps/StepReview.jsx
import React from 'react';
import { MEETING_TYPES, MEETING_MODES, TIME_ZONES, OFFICE_TIME_ZONE } from '../bookingConfig';
import { formatLongDate, formatTime } from '../timeUtils';

const StepReview = ({ booking, update, goTo }) => {
  const type = MEETING_TYPES.find((t) => t.id === booking.typeId);
  const mode = MEETING_MODES.find((m) => m.id === booking.mode);
  const start = new Date(booking.slotISO);
  const end = new Date(start.getTime() + type.duration * 60000);
  const tzLabel = TIME_ZONES.find((t) => t.id === booking.timeZone)?.label ?? booking.timeZone;

  const rows = [
    { label: 'Meeting', value: `${type.title} · ${type.duration} min`, step: 0 },
    { label: 'Where', value: mode.label, step: 0 },
    {
      label: 'When',
      value: `${formatLongDate(booking.dayKey)}, ${formatTime(start, booking.timeZone)} – ${formatTime(end, booking.timeZone)}`,
      note:
        booking.timeZone !== OFFICE_TIME_ZONE
          ? `${tzLabel} · ${formatTime(start, OFFICE_TIME_ZONE)} Nepal time`
          : tzLabel,
      step: 1,
    },
    { label: 'Name', value: booking.name, step: 2 },
    { label: 'Email', value: booking.email, step: 2 },
    booking.phone && { label: 'Phone', value: booking.phone, step: 2 },
    booking.company && { label: 'Company', value: booking.company, step: 2 },
    { label: 'Service', value: booking.service, step: 2 },
    booking.budget && { label: 'Budget', value: booking.budget, step: 2 },
    booking.details && { label: 'Details', value: booking.details, step: 2 },
  ].filter(Boolean);

  return (
    <div className="bm-step-body">
      <h2 className="bm-step-title">Review & confirm</h2>
      <p className="bm-step-sub">Check everything looks right. You can edit any part.</p>

      <dl className="bm-review">
        {rows.map((r, i) => (
          <div key={r.label} className="bm-review-row" style={{ '--i': i }}>
            <dt>{r.label}</dt>
            <dd>
              <span className="bm-review-value">{r.value}</span>
              {r.note && <span className="bm-review-note">{r.note}</span>}
            </dd>
            <button type="button" className="bm-edit" onClick={() => goTo(r.step)}>Edit</button>
          </div>
        ))}
      </dl>

      <label className="bm-consent">
        <input
          type="checkbox"
          checked={booking.consent}
          onChange={(e) => update({ consent: e.target.checked })}
        />
        <span className="bm-checkbox" aria-hidden="true">✓</span>
        <span>I agree that ArtX Dev may contact me by email or phone about this meeting.</span>
      </label>
    </div>
  );
};

export default StepReview;
