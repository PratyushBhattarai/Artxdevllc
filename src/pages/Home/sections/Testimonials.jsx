// src/pages/Home/sections/Testimonials.jsx

import { useEffect, useState } from 'react';

// Make a div behave like a button for keyboard users
const keyOpen = (fn) => (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); }
};

// Small animated sound-wave bars next to the duration
const Equalizer = () => (
  <span className="ts-eq" aria-hidden="true">
    {[0, 1, 2, 3].map((i) => (
      <span key={i} style={{ animationDelay: `${i * 0.18}s` }} />
    ))}
  </span>
);

const VideoTile = ({ duration, onOpen }) => (
  <div className="ts-tile ts-video" role="button" tabIndex={0} onClick={onOpen} onKeyDown={keyOpen(onOpen)}>
    <span className="ts-video-bg" aria-hidden="true" />
    <span className="ts-pill" aria-hidden="true" />
    <span className="ts-duration"><Equalizer />{duration}</span>
    <span className="ax-play ax-play--sm"><span className="ax-play-tri" /></span>
    <p className="ts-cover-label">[CLIENT VIDEO COVER - 16:9 - 1080]</p>
  </div>
);

const ReviewTile = ({ quote, name, company, onOpen }) => (
  <div className="ts-tile ts-review" role="button" tabIndex={0} onClick={onOpen} onKeyDown={keyOpen(onOpen)}>
    <span className="ts-quote-mark" aria-hidden="true">“</span>
    <div className="ts-review-body">
      <p className="ts-quote">{quote}</p>
    </div>
    <div className="ts-review-foot">
      <div className="ts-author">
        <div className="ts-avatar"><span>👤</span></div>
        <div>
          <p className="ts-name">{name}</p>
          <p className="ts-company">{company}</p>
        </div>
      </div>
      <p className="ts-stars" aria-label="5 stars">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} style={{ '--i': i }}>★</span>
        ))}
      </p>
    </div>
  </div>
);

const VerticalVideoTile = ({ duration, onOpen }) => (
  <div className="ts-tile ts-vertical" role="button" tabIndex={0} onClick={onOpen} onKeyDown={keyOpen(onOpen)}>
    <span className="ts-video-bg" aria-hidden="true" />
    <span className="ts-sweep" aria-hidden="true" />
    <span className="ts-duration ts-duration--light"><Equalizer />{duration}</span>
    <div className="ts-vertical-main">
      <div className="ts-vertical-avatar"><span>👤</span></div>
      <p className="ts-cover-text">[VIDEO COVER - 9:16]</p>
      <span className="ax-play ax-play--sm"><span className="ax-play-tri" /></span>
    </div>
    <div className="ts-vertical-foot">
      <p className="ts-vertical-name">[Client name]</p>
      <p className="ts-vertical-company">[Company, Service]</p>
    </div>
  </div>
);

const Testimonials = () => {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  // Escape closes the modal, page behind doesn't scroll
  useEffect(() => {
    if (!activeModal) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setActiveModal(null); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [activeModal]);

  return (
    <div className="ts-outer">
      <section className="ts-section">
        <div className="ts-glow" aria-hidden="true" />

        {/* Section Title */}
        <div className="ts-header">
          <p className="ax-eyebrow" data-reveal="left">Testimonials</p>
          <h2 className="ts-title" data-reveal="up" style={{ '--d': '0.1s' }}>
            What clients say
          </h2>
        </div>

        {/* Grid Layout - 3 Columns */}
        <div className="ts-grid">

          {/* 1. TOP LEFT VIDEO */}
          <div className="ts-cell" data-reveal="up">
            <VideoTile duration="0:45" onOpen={() => setActiveModal({ type: 'video', title: 'Video 1' })} />
          </div>

          {/* 2. TOP MIDDLE TEXT REVIEW */}
          <div className="ts-cell" data-reveal="up" style={{ '--d': '0.1s' }}>
            <ReviewTile
              quote={'"Working with ARTX DEV was an absolute game changer. They built our web app exactly as we envisioned..."'}
              name="Client Name"
              company="Company"
              onOpen={() => setActiveModal({ type: 'review', title: 'Review 1' })}
            />
          </div>

          {/* 3. RIGHT SIDE VERTICAL VIDEO */}
          <div className="ts-cell ts-cell--tall" data-reveal="up" style={{ '--d': '0.2s' }}>
            <VerticalVideoTile duration="0:32" onOpen={() => setActiveModal({ type: 'video', title: 'Vertical Video' })} />
          </div>

          {/* 4. BOTTOM LEFT TEXT REVIEW */}
          <div className="ts-cell" data-reveal="up" style={{ '--d': '0.15s' }}>
            <ReviewTile
              quote={'"The AI automation setup saves our team hours..."'}
              name="Client Name"
              company="Company"
              onOpen={() => setActiveModal({ type: 'review', title: 'Review 2' })}
            />
          </div>

          {/* 5. BOTTOM MIDDLE VIDEO */}
          <div className="ts-cell" data-reveal="up" style={{ '--d': '0.25s' }}>
            <VideoTile duration="0:45" onOpen={() => setActiveModal({ type: 'video', title: 'Video 3' })} />
          </div>

        </div>
      </section>

      {/* ================= FULL SCREEN OVERLAY MODAL ================= */}
      {activeModal && (
        <div className="ts-modal" role="dialog" aria-modal="true" aria-label={activeModal.title}>

          {/* CLOSE BUTTON - Top Right */}
          <button className="ts-close" onClick={closeModal} aria-label="Close">✕</button>

          {/* FULL SCREEN CONTENT AREA */}
          <div className="ts-modal-content">
            {/* REPLACE THIS SECTION WITH YOUR FULL VIDEO OR REVIEW */}
            <span className="ts-modal-tag">{activeModal.type === 'video' ? 'Client video' : 'Client review'}</span>
            <h2 className="ts-modal-title">{activeModal.title}</h2>
            <p className="ts-modal-text">
              [This area is now the entire screen. Place your full video player or long review text here.]
            </p>
          </div>

        </div>
      )}

      <style>{`
        .ts-outer { background: #FFFFFF; padding: 0 0.15rem; }
        .ts-section {
          position: relative; background: #000000; padding: 5rem 5%;
          display: flex; flex-direction: column; overflow: hidden;
        }
        .ts-glow {
          position: absolute; bottom: -250px; left: -150px; width: 650px; height: 650px;
          border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(0,163,255,0.12), transparent 65%);
          animation: tsGlow 12s ease-in-out infinite alternate;
        }

        .ts-header { position: relative; margin-bottom: 3rem; }
        .ts-title {
          color: #FFFFFF; font-family: 'Inknut Antiqua', serif;
          font-size: 3.5rem; font-weight: 400; line-height: 1.2; margin: 0;
        }

        /* Grid */
        .ts-grid {
          position: relative; display: grid;
          grid-template-columns: 1.2fr 1.2fr 1fr;
          grid-auto-rows: minmax(260px, auto);
          gap: 2rem; width: 100%;
        }
        .ts-cell { min-height: 260px; }
        .ts-cell--tall { grid-row: span 2; }

        /* Shared tile */
        .ts-tile {
          position: relative; isolation: isolate; overflow: hidden;
          width: 100%; height: 100%; min-height: 260px; box-sizing: border-box;
          display: flex; background: #1A1A1A; border-radius: 16px;
          border: 1px solid transparent; cursor: pointer; outline: none;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s ease, box-shadow 0.5s ease;
        }
        .ts-tile:hover, .ts-tile:focus-visible {
          transform: translateY(-6px);
          border-color: rgba(0,163,255,0.5);
          box-shadow: 0 28px 60px -28px rgba(0,163,255,0.55);
        }
        .ts-tile:hover .ax-play, .ts-tile:focus-visible .ax-play {
          transform: scale(1.14);
          box-shadow: 0 0 0 6px rgba(0,163,255,0.15), 0 0 36px rgba(0,163,255,0.6);
        }

        /* Video tile */
        .ts-video { align-items: center; justify-content: center; }
        .ts-video-bg {
          position: absolute; inset: 0; z-index: -1;
          background: linear-gradient(120deg, #1A1A1A 0%, #222222 40%, #0d1b26 55%, #1A1A1A 100%);
          background-size: 300% 300%;
          animation: tsGradient 12s ease infinite;
        }
        .ts-pill {
          position: absolute; top: 1rem; left: 1rem; width: 44px; height: 4px;
          background: rgba(255,255,255,0.9); border-radius: 10px; overflow: hidden;
        }
        .ts-pill::after {
          content: ''; position: absolute; inset: 0; background: #00A3FF;
          transform: scaleX(0); transform-origin: left;
          animation: tsProgress 4s ease-in-out infinite;
        }
        .ts-duration {
          position: absolute; top: 1rem; right: 1rem;
          display: flex; align-items: center; gap: 8px;
          color: #888888; font-size: 0.7rem; font-family: 'Hind', sans-serif;
        }
        .ts-duration--light { color: #FFFFFF; font-size: 0.8rem; }
        .ts-eq { display: flex; align-items: flex-end; gap: 2px; height: 12px; }
        .ts-eq span {
          width: 2px; height: 100%; border-radius: 1px; background: #666666;
          transform-origin: bottom; animation: tsEq 1s ease-in-out infinite;
          transition: background 0.3s ease;
        }
        .ts-tile:hover .ts-eq span { background: #00A3FF; }
        .ts-cover-label {
          position: absolute; bottom: 1rem; left: 0; right: 0; margin: 0; text-align: center;
          color: #555555; font-size: 0.7rem; font-family: 'Hind', sans-serif;
        }

        /* Review tile */
        .ts-review { flex-direction: column; justify-content: space-between; }
        .ts-quote-mark {
          position: absolute; top: -0.3rem; right: 1.4rem; pointer-events: none;
          font-family: 'Inknut Antiqua', serif; font-size: 5rem; line-height: 1;
          color: rgba(0,163,255,0.22);
          transition: color 0.4s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), text-shadow 0.4s;
        }
        .ts-tile:hover .ts-quote-mark {
          color: rgba(0,163,255,0.9); transform: translateY(6px) scale(1.08);
          text-shadow: 0 0 24px rgba(0,163,255,0.5);
        }
        .ts-review-body { padding: 2rem; }
        .ts-quote {
          margin: 0; padding-right: 2rem;
          color: #888888; font-family: 'Hind', sans-serif; font-style: italic;
          font-size: 1rem; line-height: 1.6; transition: color 0.4s ease;
        }
        .ts-tile:hover .ts-quote { color: #D0D0D0; }
        .ts-review-foot {
          padding: 1rem 2rem; border-top: 1px solid #333333;
          display: flex; justify-content: space-between; align-items: center; gap: 1rem;
        }
        .ts-author { display: flex; align-items: center; gap: 10px; }
        .ts-avatar {
          width: 35px; height: 35px; border-radius: 50%; background: #333333;
          display: flex; align-items: center; justify-content: center; font-size: 1rem;
          transition: box-shadow 0.4s ease;
        }
        .ts-tile:hover .ts-avatar { box-shadow: 0 0 0 2px #1A1A1A, 0 0 0 3px #00A3FF; }
        .ts-name { color: #FFFFFF; margin: 0; font-size: 0.9rem; font-family: 'Hind', sans-serif; }
        .ts-company { color: #888888; margin: 0; font-size: 0.8rem; font-family: 'Hind', sans-serif; }
        .ts-stars {
          display: flex; gap: 3px; margin: 0;
          color: #00A3FF; text-shadow: 0 0 10px rgba(0,163,255,0.6);
        }
        .ts-stars span { display: inline-block; }
        [data-visible="true"] .ts-stars span {
          animation: tsStar 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--i) * 0.09s + 0.45s) both;
        }

        /* Vertical video tile */
        .ts-vertical { flex-direction: column; align-items: center; }
        .ts-sweep {
          position: absolute; inset: 0; z-index: -1; pointer-events: none;
          background: linear-gradient(180deg, transparent 0%, rgba(0,163,255,0.08) 50%, transparent 100%);
          background-size: 100% 200%;
          animation: tsSweep 5s linear infinite;
        }
        .ts-vertical-main {
          flex: 1; width: 100%;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem;
        }
        .ts-vertical-avatar {
          position: relative; width: 50px; height: 50px; border-radius: 50%;
          border: 2px solid #555555; box-sizing: border-box;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; color: #555555;
        }
        .ts-vertical-avatar::after {
          content: ''; position: absolute; inset: -8px; border-radius: 50%;
          border: 1px dashed rgba(0,163,255,0.7);
          opacity: 0; transition: opacity 0.4s ease;
          animation: tsSpin 8s linear infinite;
        }
        .ts-tile:hover .ts-vertical-avatar::after { opacity: 1; }
        .ts-cover-text { color: #555555; font-size: 0.7rem; font-family: 'Hind', sans-serif; margin: 0; }
        .ts-vertical-foot { width: 100%; padding: 1.5rem; border-top: 1px solid #333333; box-sizing: border-box; }
        .ts-vertical-name { color: #FFFFFF; margin: 0; font-size: 1rem; font-family: 'Hind', sans-serif; }
        .ts-vertical-company { color: #888888; margin: 0; font-size: 0.85rem; font-family: 'Hind', sans-serif; }

        /* ===== Modal ===== */
        .ts-modal {
          position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 9999;
          background: #000000; overflow: hidden;
          display: flex; align-items: center; justify-content: center; flex-direction: column;
          animation: tsFade 0.4s ease both;
        }
        .ts-modal::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(circle at 50% 50%, rgba(0,163,255,0.14), transparent 55%),
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px) 0 0 / 60px 60px,
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px) 0 0 / 60px 60px;
          animation: tsZoom 1.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .ts-close {
          position: absolute; top: 2rem; right: 3rem; z-index: 10000;
          background: transparent; border: none; color: #FFFFFF;
          font-size: 2.5rem; line-height: 1; cursor: pointer;
          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease, text-shadow 0.3s;
        }
        .ts-close:hover { transform: rotate(90deg); color: #00A3FF; text-shadow: 0 0 20px rgba(0,163,255,0.8); }
        .ts-modal-content {
          position: relative; width: 100%; height: 100%; box-sizing: border-box; padding: 2rem;
          display: flex; align-items: center; justify-content: center; flex-direction: column; text-align: center;
        }
        .ts-modal-content > * { opacity: 0; animation: tsUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .ts-modal-content > *:nth-child(1) { animation-delay: 0.15s; }
        .ts-modal-content > *:nth-child(2) { animation-delay: 0.25s; }
        .ts-modal-content > *:nth-child(3) { animation-delay: 0.35s; }
        .ts-modal-tag {
          color: #00A3FF; font-family: 'Hind', sans-serif; font-size: 0.8rem;
          letter-spacing: 2px; text-transform: uppercase; margin-bottom: 0.75rem;
        }
        .ts-modal-title { color: #FFFFFF; font-family: 'Hind', sans-serif; font-size: 2rem; margin: 0 0 1rem; }
        .ts-modal-text { color: #888888; font-family: 'Hind', sans-serif; margin: 0; }

        @keyframes tsGradient { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes tsProgress { 0% { transform: scaleX(0); } 80%,100% { transform: scaleX(1); } }
        @keyframes tsEq       { 0%,100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
        @keyframes tsStar     { 0% { opacity: 0; transform: scale(0) rotate(-90deg); } 100% { opacity: 1; transform: none; } }
        @keyframes tsSweep    { 0% { background-position: 0 -100%; } 100% { background-position: 0 100%; } }
        @keyframes tsSpin     { to { transform: rotate(360deg); } }
        @keyframes tsGlow     { from { transform: translate(0, 0); } to { transform: translate(140px, -60px); } }
        @keyframes tsFade     { from { opacity: 0; } to { opacity: 1; } }
        @keyframes tsZoom     { from { transform: scale(1.15); opacity: 0; } to { transform: none; opacity: 1; } }
        @keyframes tsUp       { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }

        @media (max-width: 1024px) {
          .ts-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .ts-title { font-size: 2.4rem; }
          .ts-grid { grid-template-columns: 1fr; }
          .ts-cell--tall { grid-row: auto; min-height: 460px; }
          .ts-close { right: 1.5rem; top: 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default Testimonials;