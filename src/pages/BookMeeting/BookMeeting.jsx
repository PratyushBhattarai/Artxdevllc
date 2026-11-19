// src/pages/BookMeeting/BookMeeting.jsx
import React, { useRef, useState } from 'react';
import './BookMeeting.css';
import { MEETING_TYPES, MEETING_MODES, CONTACT_EMAIL } from './bookingConfig';
import { detectTimeZone, formatLongDate, formatTime } from './timeUtils';
import { submitBooking } from './bookingService';
import StepMeeting from './steps/StepMeeting';
import StepDateTime from './steps/StepDateTime';
import StepDetails from './steps/StepDetails';
import { detailsErrors } from './validation';
import StepReview from './steps/StepReview';
import SuccessView from './steps/SuccessView';
import Arrow from '../../components/Arrow';

const STEPS = ['Meeting', 'Date & time', 'Your details', 'Confirm'];

const EXPECT = [
  { title: 'We listen', desc: 'You tell us about your business, goals and what you have in mind.' },
  { title: 'We advise', desc: 'Honest suggestions on the right approach, features and tech.' },
  { title: 'Next steps', desc: 'A rough timeline and price range – no pressure, no obligation.' },
];

const initialBooking = () => ({
  typeId: 'discovery',
  mode: 'meet',
  timeZone: detectTimeZone(),
  dayKey: null,
  slotISO: null,
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  details: '',
  source: '',
  consent: false,
});

const BookMeeting = () => {
  const [booking, setBooking] = useState(initialBooking);
  const [step, setStep] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [reference, setReference] = useState('');
  const cardRef = useRef(null);

  const update = (patch) => setBooking((b) => ({ ...b, ...patch }));

  const valid = [
    Boolean(booking.typeId && booking.mode),
    Boolean(booking.slotISO),
    Object.keys(detailsErrors(booking)).length === 0,
    booking.consent,
  ];

  const goTo = (n) => {
    setStep(n);
    setShowErrors(false);
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const next = async () => {
    if (!valid[step]) {
      setShowErrors(true);
      return;
    }
    if (step < STEPS.length - 1) return goTo(step + 1);

    setStatus('sending');
    try {
      const res = await submitBooking(booking);
      if (!res.ok) throw new Error('failed');
      setReference(res.reference);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setBooking(initialBooking());
    setStep(0);
    setStatus('idle');
    setReference('');
  };

  const type = MEETING_TYPES.find((t) => t.id === booking.typeId);
  const mode = MEETING_MODES.find((m) => m.id === booking.mode);
  const hint = [
    'Choose a meeting type and how to meet',
    'Pick a date and a time slot',
    'Fill in the required fields',
    'Please tick the box to confirm',
  ][step];

  return (
    <main className="bm-page">
      {/* ---------- HERO ---------- */}
      <section className="bm-hero">
        <div className="bm-grid-bg" aria-hidden="true" />
        <div className="bm-glow" aria-hidden="true" />
        <div className="bm-container">
          <p className="bm-pill">
            <span className="bm-dot" /> Free · No obligation
          </p>
          <h1 className="bm-hero-title">
            <span className="bm-line"><span>Book a</span></span>
            <span className="bm-line"><span className="bm-outline">Meeting.</span></span>
          </h1>
          <p className="bm-hero-sub">
            Pick a time that works for you and talk directly with our team about your
            website, app or AI project. Takes less than a minute.
          </p>
        </div>
      </section>

      {/* ---------- BOOKING ---------- */}
      <section className="bm-main">
        <div className="bm-container bm-layout">
          <div className="bm-card" ref={cardRef}>
            {status === 'done' ? (
              <SuccessView booking={booking} reference={reference} onReset={reset} />
            ) : (
              <>
                {/* Stepper */}
                <ol className="bm-stepper" style={{ '--progress': step / (STEPS.length - 1) }}>
                  {STEPS.map((s, i) => (
                    <li
                      key={s}
                      className={`${i === step ? 'is-current' : ''}${i < step ? ' is-done' : ''}`}
                    >
                      <button
                        type="button"
                        onClick={() => i < step && goTo(i)}
                        disabled={i > step}
                        aria-current={i === step ? 'step' : undefined}
                      >
                        <span className="bm-step-num">{i < step ? '✓' : i + 1}</span>
                        <span className="bm-step-name">{s}</span>
                      </button>
                    </li>
                  ))}
                </ol>

                <div className="bm-step-anim" key={step}>
                  {step === 0 && <StepMeeting booking={booking} update={update} />}
                  {step === 1 && <StepDateTime booking={booking} update={update} />}
                  {step === 2 && <StepDetails booking={booking} update={update} showAllErrors={showErrors} />}
                  {step === 3 && <StepReview booking={booking} update={update} goTo={goTo} />}
                </div>

                {status === 'error' && (
                  <p className="bm-error bm-error-box">
                    Something went wrong sending your booking. Please try again or email{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                  </p>
                )}

                <div className="bm-actions">
                  {step > 0 ? (
                    <button type="button" className="bm-btn bm-btn-ghost" onClick={() => goTo(step - 1)}>
                      <Arrow dir="left" /> Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <div className="bm-actions-right">
                    {!valid[step] && <span className="bm-hint">{hint}</span>}
                    <button
                      type="button"
                      className={`bm-btn bm-btn-accent${!valid[step] ? ' is-disabled' : ''}`}
                      onClick={next}
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? (
                        <><span className="bm-spinner" /> Booking…</>
                      ) : step === STEPS.length - 1 ? (
                        <>Confirm booking <span className="bm-arrow"><Arrow /></span></>
                      ) : (
                        <>Continue <span className="bm-arrow"><Arrow /></span></>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ---------- SIDEBAR ---------- */}
          <aside className="bm-side">
            <div className="bm-side-card bm-summary">
              <p className="bm-eyebrow">[ YOUR MEETING ]</p>
              <ul>
                <li>
                  <span>Type</span>
                  <strong>{type?.title}</strong>
                </li>
                <li>
                  <span>Length</span>
                  <strong>{type?.duration} minutes</strong>
                </li>
                <li>
                  <span>Where</span>
                  <strong>{mode?.label}</strong>
                </li>
                <li className={booking.slotISO ? 'is-set' : ''}>
                  <span>When</span>
                  <strong>
                    {booking.slotISO
                      ? `${formatLongDate(booking.dayKey).replace(/, \d{4}$/, '')} · ${formatTime(new Date(booking.slotISO), booking.timeZone)}`
                      : 'Not picked yet'}
                  </strong>
                </li>
              </ul>
            </div>

            <div className="bm-side-card">
              <p className="bm-eyebrow">[ WHAT TO EXPECT ]</p>
              <ol className="bm-expect">
                {EXPECT.map((e, i) => (
                  <li key={e.title} style={{ '--i': i }}>
                    <span className="bm-expect-num">0{i + 1}</span>
                    <div>
                      <strong>{e.title}</strong>
                      <p>{e.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bm-side-card bm-side-contact">
              <p>Prefer email?</p>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default BookMeeting;
