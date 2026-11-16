// src/pages/BookMeeting/steps/SuccessView.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MEETING_TYPES, MEETING_MODES, CONTACT_EMAIL } from '../bookingConfig';
import { formatLongDate, formatTime, buildIcs, googleCalendarUrl } from '../timeUtils';
import { sendsCustomerConfirmation } from '../bookingService';

const SuccessView = ({ booking, reference, onReset }) => {
  const type = MEETING_TYPES.find((t) => t.id === booking.typeId);
  const mode = MEETING_MODES.find((m) => m.id === booking.mode);
  const start = new Date(booking.slotISO);
  const end = new Date(start.getTime() + type.duration * 60000);

  const event = {
    title: `${type.title} with ArtX Dev`,
    description: `${type.title} (${type.duration} min) via ${mode.label}. Booking ref: ${reference}. Questions: ${CONTACT_EMAIL}`,
    location: mode.id === 'office' ? 'ArtX Dev office, Imadol, Lalitpur, Nepal' : mode.label,
    start,
    end,
  };

  const downloadIcs = () => {
    const blob = new Blob([buildIcs(event)], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'artx-meeting.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bm-success">
      <div className="bm-success-icon" aria-hidden="true">
        <span className="bm-ring" />
        <span className="bm-ring r2" />
        <svg viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="24" />
          <path d="M15 27l7 7 15-15" />
        </svg>
      </div>

      <h2 className="bm-success-title">You're booked!</h2>
      <p className="bm-success-sub">
        Thanks {booking.name.split(' ')[0]}. Your {type.title.toLowerCase()} is scheduled for
      </p>
      <p className="bm-success-when">
        {formatLongDate(booking.dayKey)}
        <br />
        {formatTime(start, booking.timeZone)} – {formatTime(end, booking.timeZone)}
      </p>
      <p className="bm-success-ref">
        Booking reference <strong>{reference}</strong>
      </p>
      <p className="bm-success-note">
        {sendsCustomerConfirmation ? 'A confirmation has been sent to ' : 'Our team will email you at '}
        <strong>{booking.email}</strong>
        {sendsCustomerConfirmation ? '.' : ' to confirm.'} Need to change something? Email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <div className="bm-success-actions">
        <a className="bm-btn bm-btn-accent" href={googleCalendarUrl(event)} target="_blank" rel="noreferrer">
          Add to Google Calendar
        </a>
        <button type="button" className="bm-btn bm-btn-ghost" onClick={downloadIcs}>
          Download .ics
        </button>
      </div>

      <div className="bm-success-links">
        <button type="button" className="bm-link" onClick={onReset}>Book another meeting</button>
        <Link to="/" className="bm-link">Back to home</Link>
      </div>
    </div>
  );
};

export default SuccessView;
