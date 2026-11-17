// src/components/PayNowModal.jsx
//
// "Pay Now" dialog opened from the navbar (showcase only).
// 1) asks for an amount  2) "Proceed" → shows a "coming soon" screen.
// When Stripe is added later, only startCheckout() in payments.js changes.

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CURRENCIES, formatMoney, startCheckout } from './payments';

// 3D tilt of the payment card following the mouse
const tilt = (e) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty('--rx', `${-y * 14}deg`);
  el.style.setProperty('--ry', `${x * 18}deg`);
  el.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
  el.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
};
const untilt = (e) => {
  e.currentTarget.style.setProperty('--rx', '0deg');
  e.currentTarget.style.setProperty('--ry', '0deg');
};

// Payments are in US dollars only
const currency = 'USD';

const PayNowModal = ({ open, onClose }) => {
  const [amount, setAmount] = useState('');
  const [stage, setStage] = useState('form'); // form | processing | soon
  const [touched, setTouched] = useState(false);
  const amountRef = useRef(null);

  const cfg = CURRENCIES[currency];
  const value = Number(amount);
  const amountError =
    !amount ? 'Please enter an amount'
      : !(value >= cfg.min) ? `Minimum is ${formatMoney(cfg.min, currency)}`
        : value > cfg.max ? `Maximum is ${formatMoney(cfg.max, currency)}`
          : '';

  // Focus the amount field when it opens.
  // (The navbar gives this component a new `key` after each close, so the form starts fresh.)
  useEffect(() => {
    if (!open) return undefined;
    const t = setTimeout(() => amountRef.current?.focus(), 300);
    return () => clearTimeout(t);
  }, [open]);

  // Escape closes + page can't scroll behind the dialog
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const proceed = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (amountError) return;
    setStage('processing');
    await startCheckout({ amount: value, currency });
    setStage('soon');
  };

  const pretty = formatMoney(value, currency);
  const isSoon = stage === 'soon';

  return createPortal(
    <div
      className={`pn-overlay${open ? ' is-open' : ''}`}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      aria-hidden={!open}
    >
      <div className={`pn-dialog${isSoon ? ' is-soon' : ''}`} role="dialog" aria-modal="true" aria-labelledby="pn-title">
        <div className="pn-glow" aria-hidden="true" />

        <div className="pn-top">
          <span className="pn-eyebrow">
            <span className="pn-dot" /> {isSoon ? 'Payments' : 'Secure payment'}
          </span>
          <button type="button" className="pn-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        {/* ---- Live payment card ---- */}
        <div className="pn-card-wrap" onMouseMove={tilt} onMouseLeave={untilt}>
          <div className={`pn-card${stage === 'processing' ? ' is-processing' : ''}`}>
            <div className="pn-card-shine" aria-hidden="true" />
            <div className="pn-card-row">
              <span className="pn-brand">ARTX<small>DEV</small></span>
              <svg className="pn-contactless" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 8.5a5 5 0 0 1 0 7M11.5 6a8.5 8.5 0 0 1 0 12M15 3.5a12 12 0 0 1 0 17" />
              </svg>
            </div>
            <svg className="pn-chip" viewBox="0 0 40 30" aria-hidden="true">
              <rect x="1" y="1" width="38" height="28" rx="6" />
              <path d="M1 10h12M1 20h12M27 10h12M27 20h12M13 1v28M27 1v28" />
            </svg>
            <div className="pn-card-amount">
              <span className="pn-card-label">{isSoon ? 'Amount ready' : 'Amount'}</span>
              <span key={pretty} className="pn-card-value">{value > 0 ? pretty : formatMoney(0, currency)}</span>
            </div>
            <div className="pn-card-row pn-card-foot">
              <span>{isSoon ? 'Checkout · coming soon' : 'ArtX Dev · Invoice payment'}</span>
              <span className="pn-card-cur">{currency}</span>
            </div>
          </div>
        </div>

        {!isSoon ? (
          <form onSubmit={proceed} noValidate className="pn-form">
            <h2 id="pn-title" className="pn-title">How much would you like to pay?</h2>

            <label className={`pn-amount${touched && amountError ? ' has-error' : ''}`}>
              <span className="pn-symbol">{cfg.symbol.trim()}</span>
              <input
                ref={amountRef}
                type="number"
                inputMode="decimal"
                min={cfg.min}
                max={cfg.max}
                step="0.01"
                placeholder="0.00"
                aria-label={`Amount in ${currency}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onBlur={() => setTouched(true)}
                disabled={stage === 'processing'}
              />
            </label>
            <span className={`pn-error${touched && amountError ? ' is-shown' : ''}`} role="alert">
              {touched && amountError}
            </span>

            <div className="pn-quick">
              {cfg.quick.map((q, i) => (
                <button
                  type="button"
                  key={q}
                  style={{ '--i': i }}
                  className={value === q ? 'is-active' : ''}
                  onClick={() => { setAmount(String(q)); setTouched(true); }}
                  disabled={stage === 'processing'}
                >
                  {formatMoney(q, currency).replace(/\.00$/, '')}
                </button>
              ))}
            </div>

            <button type="submit" className="pn-submit" disabled={stage === 'processing'}>
              <span className="pn-submit-shine" aria-hidden="true" />
              {stage === 'processing' ? (
                <><span className="pn-spinner" /> Processing…</>
              ) : (
                <>Proceed to pay {value > 0 && !amountError ? pretty : ''} <span className="pn-arrow" aria-hidden="true">→</span></>
              )}
            </button>

            <p className="pn-secure">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
              Secure online checkout is launching soon
            </p>
          </form>
        ) : (
          <div className="pn-soon">
            <span className="pn-soon-tag">✦ Coming soon</span>
            <h2 id="pn-title" className="pn-title">Online payments are almost here</h2>
            <p className="pn-soon-text">
              We're putting the finishing touches on our secure checkout. Paying{' '}
              <strong>{pretty}</strong> online will be available very soon.
            </p>
            <div className="pn-progress" aria-hidden="true"><span /></div>
            <button type="button" className="pn-submit" onClick={onClose}>
              <span className="pn-submit-shine" aria-hidden="true" />
              Got it
            </button>
            <button type="button" className="pn-back" onClick={() => setStage('form')}>← Change amount</button>
          </div>
        )}
      </div>

      <style>{`
        .pn-overlay {
          --pn-blue: #00A3FF;
          --pn-blue-rgb: 0, 163, 255;
          position: fixed; inset: 0; z-index: 1000;
          display: grid; place-items: center; padding: 16px;
          background: rgba(0, 0, 0, 0.6);
          -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
          opacity: 0; visibility: hidden;
          transition: opacity 0.35s ease, visibility 0s linear 0.35s;
          font-family: 'Inter', sans-serif; color: #FFFFFF;
        }
        .pn-overlay.is-open { opacity: 1; visibility: visible; transition: opacity 0.35s ease, visibility 0s; }

        .pn-dialog {
          position: relative; isolation: isolate; box-sizing: border-box;
          width: 100%; max-width: 440px; max-height: calc(100vh - 32px); overflow-y: auto; overflow-x: hidden;
          padding: 22px 26px 24px; border-radius: 26px;
          background: #0A0A0A; border: 1px solid #222;
          box-shadow: 0 50px 100px -30px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.03),
                      0 0 80px -20px rgba(var(--pn-blue-rgb), 0.35);
          transform: translateY(30px) scale(0.95);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          scrollbar-width: none;
        }
        .pn-overlay.is-open .pn-dialog { transform: none; }

        .pn-glow {
          position: absolute; z-index: -1; top: -140px; left: 50%; width: 420px; height: 320px; margin-left: -210px;
          background: radial-gradient(ellipse, rgba(var(--pn-blue-rgb), 0.28), transparent 65%);
          animation: pnBreathe 5s ease-in-out infinite; pointer-events: none;
        }

        .pn-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .pn-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: monospace; font-size: 0.72rem; letter-spacing: 2px; text-transform: uppercase; color: #9a9a9a;
        }
        .pn-dot { position: relative; width: 7px; height: 7px; border-radius: 50%; background: var(--pn-blue); }
        .pn-dot::after {
          content: ''; position: absolute; inset: 0; border-radius: 50%; background: var(--pn-blue);
          animation: pnPing 1.8s ease-out infinite;
        }
        .pn-close {
          display: grid; place-items: center; width: 34px; height: 34px; padding: 0;
          border-radius: 50%; border: 1px solid #2a2a2a; background: #141414; color: #FFF; cursor: pointer;
          transition: transform 0.35s ease, background 0.3s ease, border-color 0.3s ease;
        }
        .pn-close svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
        .pn-close:hover { transform: rotate(90deg); background: var(--pn-blue); border-color: var(--pn-blue); }

        /* ---- Payment card ---- */
        /* tilt values are set on the wrapper by JS and inherited by the card */
        .pn-card-wrap { --rx: 0deg; --ry: 0deg; --gx: 50%; --gy: 0%; perspective: 900px; margin-bottom: 22px; }
        .pn-card {
          position: relative; overflow: hidden; isolation: isolate;
          aspect-ratio: 1.75; padding: 18px 20px; box-sizing: border-box; border-radius: 18px;
          display: flex; flex-direction: column; justify-content: space-between;
          background:
            radial-gradient(120% 140% at 100% 0%, rgba(var(--pn-blue-rgb), 0.95) 0%, rgba(var(--pn-blue-rgb), 0.25) 40%, transparent 70%),
            radial-gradient(80% 90% at 0% 100%, #1d2a3a 0%, transparent 70%),
            linear-gradient(135deg, #111 0%, #050505 100%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 25px 50px -20px rgba(var(--pn-blue-rgb), 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          transform: rotateX(var(--rx)) rotateY(var(--ry));
          transform-style: preserve-3d;
          transition: transform 0.25s ease-out;
          animation: pnCardIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s backwards;
        }
        /* subtle grid texture */
        .pn-card::before {
          content: ''; position: absolute; inset: 0; z-index: -1; opacity: 0.18;
          background-image: radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px);
          background-size: 14px 14px;
          -webkit-mask-image: linear-gradient(120deg, transparent 20%, #000 90%);
                  mask-image: linear-gradient(120deg, transparent 20%, #000 90%);
        }
        /* light that follows the mouse */
        .pn-card::after {
          content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none;
          background: radial-gradient(260px circle at var(--gx) var(--gy), rgba(255, 255, 255, 0.18), transparent 60%);
        }
        /* glossy sweep */
        .pn-card-shine {
          position: absolute; top: -50%; left: -60%; width: 40%; height: 200%; z-index: 0; pointer-events: none;
          background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.22), transparent);
          transform: rotate(18deg);
          animation: pnSweep 4.5s ease-in-out 1s infinite;
        }
        .pn-card.is-processing .pn-card-shine { animation-duration: 1.1s; animation-delay: 0s; }
        .pn-card > *:not(.pn-card-shine) { position: relative; z-index: 1; }

        .pn-card-row { display: flex; justify-content: space-between; align-items: center; }
        .pn-brand { font-weight: 900; font-size: 1.15rem; letter-spacing: 1px; }
        .pn-brand small { margin-left: 5px; font-size: 0.55rem; font-weight: 600; letter-spacing: 3px; opacity: 0.7; }
        .pn-contactless { width: 22px; height: 22px; fill: none; stroke: #FFF; stroke-width: 1.8; stroke-linecap: round; opacity: 0.85; }
        .pn-chip {
          width: 40px; height: 30px; fill: rgba(255, 215, 140, 0.28); stroke: rgba(255, 225, 170, 0.75); stroke-width: 1.3;
          margin-top: -6px;
        }
        .pn-card-amount { display: flex; flex-direction: column; gap: 2px; }
        .pn-card-label { font-family: monospace; font-size: 0.66rem; letter-spacing: 2px; text-transform: uppercase; opacity: 0.7; }
        .pn-card-value {
          font-family: monospace; font-size: 1.9rem; font-weight: 700; letter-spacing: 1px; line-height: 1.1;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
          animation: pnTick 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .pn-card-foot { font-size: 0.72rem; letter-spacing: 0.5px; opacity: 0.85; }
        .pn-card-cur {
          padding: 3px 9px; border-radius: 20px; font-family: monospace; font-weight: 700; font-size: 0.7rem;
          background: rgba(255, 255, 255, 0.14); border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* ---- Form ---- */
        .pn-form, .pn-soon { animation: pnIn 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
        .pn-title {
          margin: 0 0 14px; font-family: 'Inter', sans-serif !important;
          font-size: 1.25rem; font-weight: 800; letter-spacing: -0.3px; color: #FFF;
        }

        .pn-currency {
          position: relative; display: grid; grid-template-columns: 1fr 1fr;
          padding: 4px; margin-bottom: 12px; border-radius: 14px; background: #151515; border: 1px solid #222;
        }
        .pn-currency button {
          position: relative; z-index: 1; padding: 10px; border: none; background: none;
          font-family: inherit; font-weight: 700; font-size: 0.88rem; color: #8a8a8a; cursor: pointer;
          transition: color 0.3s ease;
        }
        .pn-currency button.is-active { color: #FFF; }
        .pn-currency-thumb {
          position: absolute; top: 4px; bottom: 4px; left: 4px; width: calc(50% - 4px); border-radius: 10px;
          background: linear-gradient(135deg, #1b1b1b, #262626); border: 1px solid #333;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
          transition: transform 0.45s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .pn-currency-thumb.is-right { transform: translateX(100%); }

        .pn-amount {
          display: flex; align-items: center; gap: 10px; padding: 8px 18px;
          border-radius: 16px; background: #111; border: 1.5px solid #262626;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .pn-amount:focus-within { border-color: var(--pn-blue); box-shadow: 0 0 0 4px rgba(var(--pn-blue-rgb), 0.18); }
        .pn-amount.has-error { border-color: #ff5a5f; }
        .pn-symbol { font-size: 1.6rem; font-weight: 700; color: var(--pn-blue); }
        .pn-amount input {
          flex: 1; min-width: 0; border: none; outline: none; background: none; color: #FFF;
          font-family: inherit; font-size: 2rem; font-weight: 800; padding: 4px 0; -moz-appearance: textfield;
        }
        .pn-amount input::placeholder { color: #3a3a3a; }
        .pn-amount input::-webkit-outer-spin-button,
        .pn-amount input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        .pn-error { display: block; min-height: 18px; margin: 6px 2px 4px; font-size: 0.8rem; color: #ff7a7e; }
        .pn-error.is-shown { animation: pnShake 0.35s ease; }

        .pn-quick { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 18px; }
        .pn-quick button {
          padding: 10px 4px; border-radius: 12px; border: 1px solid #262626; background: #111; color: #d4d4d4;
          font-family: inherit; font-size: 0.82rem; font-weight: 600; cursor: pointer;
          animation: pnIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) backwards; animation-delay: calc(0.15s + var(--i) * 0.05s);
          transition: border-color 0.25s ease, background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .pn-quick button:hover { border-color: #444; color: #FFF; transform: translateY(-2px); }
        .pn-quick button.is-active {
          background: rgba(var(--pn-blue-rgb), 0.14); border-color: var(--pn-blue); color: #FFF;
          box-shadow: 0 0 18px -4px rgba(var(--pn-blue-rgb), 0.6);
        }

        .pn-submit {
          position: relative; overflow: hidden; isolation: isolate; box-sizing: border-box;
          display: flex; width: 100%; align-items: center; justify-content: center; gap: 8px;
          padding: 16px 20px; border: none; border-radius: 16px; cursor: pointer;
          background: linear-gradient(135deg, #00A3FF 0%, #0066FF 100%); color: #FFF;
          font-family: inherit; font-size: 1rem; font-weight: 700;
          box-shadow: 0 14px 30px -12px rgba(var(--pn-blue-rgb), 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.25);
          transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
        }
        .pn-submit:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(1.08); box-shadow: 0 18px 36px -12px rgba(var(--pn-blue-rgb), 1); }
        .pn-submit:active:not(:disabled) { transform: translateY(0); }
        .pn-submit:disabled { cursor: progress; }
        .pn-submit-shine {
          position: absolute; top: 0; left: -40%; width: 30%; height: 100%; z-index: -1;
          background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.35), transparent);
          transform: skewX(-20deg); animation: pnSweepBtn 3s ease-in-out infinite;
        }
        .pn-arrow { transition: transform 0.3s ease; }
        .pn-submit:hover .pn-arrow { transform: translateX(4px); }

        .pn-spinner {
          width: 16px; height: 16px; border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.35); border-top-color: #FFF; animation: pnSpin 0.7s linear infinite;
        }

        .pn-secure {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          margin: 14px 0 0; font-size: 0.76rem; color: #777;
        }
        .pn-secure svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }

        /* ---- Coming soon ---- */
        .pn-soon { text-align: center; }
        .pn-soon-tag {
          display: inline-block; margin-bottom: 12px; padding: 6px 14px; border-radius: 30px;
          background: rgba(var(--pn-blue-rgb), 0.14); border: 1px solid rgba(var(--pn-blue-rgb), 0.4);
          color: var(--pn-blue); font-family: monospace; font-size: 0.74rem; letter-spacing: 2px; text-transform: uppercase;
          animation: pnGlowTag 2.4s ease-in-out infinite;
        }
        .pn-soon .pn-title { font-size: 1.45rem; margin-bottom: 8px; }
        .pn-soon-text { margin: 0 auto 18px; max-width: 340px; color: #a1a1aa; font-size: 0.93rem; line-height: 1.6; }
        .pn-soon-text strong { color: #FFF; }
        .pn-progress {
          position: relative; height: 4px; margin: 0 auto 22px; max-width: 260px;
          border-radius: 4px; background: #1c1c1c; overflow: hidden;
        }
        .pn-progress span {
          position: absolute; top: 0; bottom: 0; width: 40%; border-radius: 4px;
          background: linear-gradient(90deg, transparent, var(--pn-blue), transparent);
          animation: pnLoad 1.6s ease-in-out infinite;
        }
        .pn-back {
          margin-top: 12px; border: none; background: none; font-family: inherit;
          color: #888; font-size: 0.88rem; cursor: pointer; transition: color 0.25s ease;
        }
        .pn-back:hover { color: #FFF; }

        /* ---- Keyframes ---- */
        @keyframes pnSpin { to { transform: rotate(360deg); } }
        @keyframes pnPing { 75%, 100% { transform: scale(3); opacity: 0; } }
        @keyframes pnBreathe { 0%, 100% { opacity: 0.7; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1.08); } }
        @keyframes pnIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @keyframes pnCardIn { from { opacity: 0; transform: translateY(20px) rotateX(25deg) scale(0.92); } to { opacity: 1; } }
        @keyframes pnTick { from { opacity: 0.3; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes pnSweep { 0% { left: -60%; } 45%, 100% { left: 130%; } }
        @keyframes pnSweepBtn { 0% { left: -40%; } 50%, 100% { left: 130%; } }
        @keyframes pnLoad { 0% { left: -40%; } 100% { left: 100%; } }
        @keyframes pnGlowTag { 0%, 100% { box-shadow: 0 0 0 0 rgba(0, 163, 255, 0); } 50% { box-shadow: 0 0 18px 0 rgba(0, 163, 255, 0.35); } }
        @keyframes pnShake { 0%, 100% { transform: none; } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }

        /* Phones: slides up from the bottom like a sheet */
        @media (max-width: 480px) {
          .pn-overlay { place-items: end center; padding: 0; }
          .pn-dialog {
            max-width: none; max-height: 94vh; border-radius: 26px 26px 0 0; border-bottom: none;
            padding: 18px 18px 26px; transform: translateY(100%);
          }
          .pn-card { aspect-ratio: 1.9; padding: 14px 16px; }
          .pn-card-value { font-size: 1.6rem; }
          .pn-quick { grid-template-columns: repeat(2, 1fr); }
          .pn-amount input { font-size: 1.7rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pn-overlay, .pn-overlay * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default PayNowModal;
