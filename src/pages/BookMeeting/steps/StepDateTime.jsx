// src/pages/BookMeeting/steps/StepDateTime.jsx
import React, { useMemo, useState } from 'react';
import { MEETING_TYPES, TIME_ZONES, MAX_DAYS_AHEAD, OFFICE_TIME_ZONE } from '../bookingConfig';
import Arrow from '../../../components/Arrow';
import {
  dayKeyIn,
  toDayKey,
  slotsForDay,
  formatTime,
  formatLongDate,
  hourIn,
} from '../timeUtils';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const StepDateTime = ({ booking, update }) => {
  const { timeZone, dayKey, slotISO } = booking;
  const duration = MEETING_TYPES.find((t) => t.id === booking.typeId)?.duration ?? 30;

  const [now] = useState(() => new Date()); // fixed "now" while this step is open
  const todayKey = dayKeyIn(now, timeZone);
  const lastKey = dayKeyIn(new Date(now.getTime() + MAX_DAYS_AHEAD * 86400000), timeZone);

  const [ty, tm] = todayKey.split('-').map(Number);
  const [view, setView] = useState(() => {
    if (dayKey) {
      const [y, m] = dayKey.split('-').map(Number);
      return { y, m: m - 1 };
    }
    return { y: ty, m: tm - 1 };
  });

  // Build the month grid + which days have free slots
  const days = useMemo(() => {
    const first = new Date(Date.UTC(view.y, view.m, 1)).getUTCDay();
    const count = new Date(Date.UTC(view.y, view.m + 1, 0)).getUTCDate();
    const cells = Array.from({ length: first }, () => null);
    for (let d = 1; d <= count; d++) {
      const key = toDayKey(view.y, view.m, d);
      const inRange = key >= todayKey && key <= lastKey;
      const available = inRange && slotsForDay(key, duration, timeZone, now).length > 0;
      cells.push({ d, key, available });
    }
    return cells;
  }, [view, todayKey, lastKey, duration, timeZone, now]);

  const slots = useMemo(
    () => (dayKey ? slotsForDay(dayKey, duration, timeZone, now) : []),
    [dayKey, duration, timeZone, now]
  );

  const groups = useMemo(() => {
    const g = { Morning: [], Afternoon: [], Evening: [] };
    slots.forEach((s) => {
      const h = hourIn(s, timeZone);
      (h < 12 ? g.Morning : h < 17 ? g.Afternoon : g.Evening).push(s);
    });
    return Object.entries(g).filter(([, list]) => list.length);
  }, [slots, timeZone]);

  const canPrev = view.y > ty || (view.y === ty && view.m > tm - 1);
  const [ly, lm] = lastKey.split('-').map(Number);
  const canNext = view.y < ly || (view.y === ly && view.m < lm - 1);
  const shift = (n) => {
    const d = new Date(Date.UTC(view.y, view.m + n, 1));
    setView({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
  };

  const monthLabel = new Date(Date.UTC(view.y, view.m, 1)).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'long',
    year: 'numeric',
  });

  const tzOptions = TIME_ZONES.some((t) => t.id === timeZone)
    ? TIME_ZONES
    : [{ id: timeZone, label: `${timeZone} (your time)` }, ...TIME_ZONES];

  return (
    <div className="bm-step-body">
      <h2 className="bm-step-title">Pick a date & time</h2>
      <p className="bm-step-sub">
        Times are shown in your time zone. {duration}-minute meeting.
      </p>

      <label className="bm-tz">
        <span className="bm-label">Your time zone</span>
        <select
          className="bm-input"
          value={timeZone}
          onChange={(e) => update({ timeZone: e.target.value, dayKey: null, slotISO: null })}
        >
          {tzOptions.map((t) => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
      </label>

      <div className="bm-dt-grid">
        {/* Calendar */}
        <div className="bm-cal">
          <div className="bm-cal-head">
            <button type="button" className="bm-cal-nav" onClick={() => shift(-1)} disabled={!canPrev} aria-label="Previous month"><Arrow dir="left" /></button>
            <span key={monthLabel} className="bm-cal-month">{monthLabel}</span>
            <button type="button" className="bm-cal-nav" onClick={() => shift(1)} disabled={!canNext} aria-label="Next month"><Arrow /></button>
          </div>

          <div className="bm-cal-grid">
            {WEEKDAYS.map((w) => (
              <span key={w} className="bm-cal-wd">{w}</span>
            ))}
            {days.map((c, i) =>
              c ? (
                <button
                  type="button"
                  key={c.key}
                  className={`bm-cal-day${c.available ? ' is-available' : ''}${c.key === dayKey ? ' is-selected' : ''}${c.key === todayKey ? ' is-today' : ''}`}
                  disabled={!c.available}
                  style={{ '--i': i }}
                  onClick={() => update({ dayKey: c.key, slotISO: null })}
                >
                  {c.d}
                </button>
              ) : (
                <span key={`e${i}`} />
              )
            )}
          </div>
          <p className="bm-cal-legend">
            <span className="bm-legend-dot" /> Available days
          </p>
        </div>

        {/* Time slots */}
        <div className="bm-slots">
          {!dayKey && (
            <div className="bm-slots-empty">
              <span className="bm-pulse-dot" />
              Select a date to see available times
            </div>
          )}

          {dayKey && (
            <>
              <p className="bm-slots-date">{formatLongDate(dayKey)}</p>
              <div className="bm-slots-scroll" key={dayKey + timeZone}>
                {groups.map(([label, list]) => (
                  <div key={label} className="bm-slot-group">
                    <span className="bm-label">{label}</span>
                    <div className="bm-slot-list">
                      {list.map((s, i) => {
                        const iso = s.toISOString();
                        return (
                          <button
                            type="button"
                            key={iso}
                            className={`bm-slot${slotISO === iso ? ' is-selected' : ''}`}
                            style={{ '--i': i }}
                            onClick={() => update({ slotISO: iso })}
                          >
                            {formatTime(s, timeZone)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {slotISO && timeZone !== OFFICE_TIME_ZONE && (
                <p className="bm-office-time">
                  = {formatTime(new Date(slotISO), OFFICE_TIME_ZONE)} in Nepal (our office)
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepDateTime;
