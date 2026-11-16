// src/pages/BookMeeting/steps/StepMeeting.jsx
import React from 'react';
import { MEETING_TYPES, MEETING_MODES } from '../bookingConfig';

const StepMeeting = ({ booking, update }) => (
  <div className="bm-step-body">
    <h2 className="bm-step-title">What would you like to talk about?</h2>
    <p className="bm-step-sub">Pick the meeting that fits best. All calls are free, no obligation.</p>

    <div className="bm-type-grid">
      {MEETING_TYPES.map((t, i) => (
        <button
          type="button"
          key={t.id}
          className={`bm-type${booking.typeId === t.id ? ' is-selected' : ''}`}
          style={{ '--i': i }}
          onClick={() => update({ typeId: t.id, slotISO: null })}
        >
          <span className="bm-type-check" aria-hidden="true">✓</span>
          <span className="bm-type-meta">
            <span className="bm-chip">{t.duration} min</span>
            <span className="bm-chip bm-chip-accent">{t.price}</span>
          </span>
          <span className="bm-type-title">{t.title}</span>
          <span className="bm-type-desc">{t.desc}</span>
        </button>
      ))}
    </div>

    <h3 className="bm-label-lg">How should we meet?</h3>
    <div className="bm-mode-grid">
      {MEETING_MODES.map((m) => (
        <button
          type="button"
          key={m.id}
          className={`bm-mode${booking.mode === m.id ? ' is-selected' : ''}`}
          onClick={() => update({ mode: m.id })}
        >
          <span className="bm-mode-label">{m.label}</span>
          <span className="bm-mode-hint">{m.hint}</span>
        </button>
      ))}
    </div>
  </div>
);

export default StepMeeting;
