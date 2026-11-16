// src/pages/BookMeeting/steps/StepDetails.jsx
import React, { useState } from 'react';
import { SERVICES, BUDGETS, SOURCES } from '../bookingConfig';
import { detailsErrors } from '../validation';

const StepDetails = ({ booking, update, showAllErrors }) => {
  const [touched, setTouched] = useState({});
  const errors = detailsErrors(booking);
  const err = (f) => (touched[f] || showAllErrors) && errors[f];
  const blur = (f) => () => setTouched((t) => ({ ...t, [f]: true }));

  const field = (name, label, props = {}, required) => (
    <label className={`bm-field${err(name) ? ' has-error' : ''}`}>
      <span className="bm-label">
        {label} {required && <em>*</em>}
      </span>
      <input
        className="bm-input"
        value={booking[name]}
        onChange={(e) => update({ [name]: e.target.value })}
        onBlur={blur(name)}
        {...props}
      />
      {err(name) && <span className="bm-error">{errors[name]}</span>}
    </label>
  );

  return (
    <div className="bm-step-body">
      <h2 className="bm-step-title">Tell us about you</h2>
      <p className="bm-step-sub">So we can come prepared and make the call worth your time.</p>

      <div className="bm-form-grid">
        {field('name', 'Full name', { placeholder: 'John Doe', autoComplete: 'name' }, true)}
        {field('email', 'Email', { type: 'email', placeholder: 'john@company.com', autoComplete: 'email' }, true)}
        {field(
          'phone',
          booking.mode === 'phone' ? 'Phone / WhatsApp' : 'Phone / WhatsApp (optional)',
          { type: 'tel', placeholder: '+1 555 000 0000', autoComplete: 'tel' },
          booking.mode === 'phone'
        )}
        {field('company', 'Company / website (optional)', { placeholder: 'yourcompany.com', autoComplete: 'organization' })}

        <label className={`bm-field bm-span-2${err('service') ? ' has-error' : ''}`}>
          <span className="bm-label">What do you need help with? <em>*</em></span>
          <div className="bm-chip-row">
            {SERVICES.map((s) => (
              <button
                type="button"
                key={s}
                className={`bm-pick${booking.service === s ? ' is-selected' : ''}`}
                onClick={() => { update({ service: s }); setTouched((t) => ({ ...t, service: true })); }}
              >
                {s}
              </button>
            ))}
          </div>
          {err('service') && <span className="bm-error">{errors.service}</span>}
        </label>

        <div className="bm-field bm-span-2">
          <span className="bm-label">Estimated budget (optional)</span>
          <div className="bm-chip-row">
            {BUDGETS.map((b) => (
              <button
                type="button"
                key={b}
                className={`bm-pick${booking.budget === b ? ' is-selected' : ''}`}
                onClick={() => update({ budget: booking.budget === b ? '' : b })}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <label className="bm-field bm-span-2">
          <span className="bm-label">Project details (optional)</span>
          <textarea
            className="bm-input bm-textarea"
            rows={4}
            maxLength={1000}
            placeholder="A few lines about your business, goals, deadline or any links we should look at…"
            value={booking.details}
            onChange={(e) => update({ details: e.target.value })}
          />
          <span className="bm-counter">{booking.details.length}/1000</span>
        </label>

        <label className="bm-field">
          <span className="bm-label">How did you hear about us? (optional)</span>
          <select className="bm-input" value={booking.source} onChange={(e) => update({ source: e.target.value })}>
            <option value="">Select…</option>
            {SOURCES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default StepDetails;
