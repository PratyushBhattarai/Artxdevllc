// src/pages/Portfolio/sections/ProjectSection.jsx

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// gifUrl (looping GIF) takes priority over videoUrl when both are set
const ProjectSection = ({ title, description, gifUrl, videoUrl, projectLink, category, index = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const number = String(index + 1).padStart(2, '0');

  // 3D tilt + light that follows the mouse
  const handleMove = (e) => {
    const el = mediaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--rx', `${(0.5 - y) * 7}deg`);
    el.style.setProperty('--ry', `${(x - 0.5) * 9}deg`);
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
  };
  // Video plays only while the mouse is over the card
  const handleEnter = () => {
    videoRef.current?.play().catch(() => {});
  };
  const handleLeave = () => {
    const el = mediaRef.current;
    if (el) {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    }
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0.1; // back to the first frame
    }
  };

  // Escape closes the popup, page behind doesn't scroll
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const open = () => setIsOpen(true);

  return (
    <>
      {/* ================= MAIN GRID CARD ================= */}
      <article className="ps-card">
        <div
          ref={mediaRef}
          className="ps-media"
          role="button"
          tabIndex={0}
          aria-label={`Open ${title}`}
          onClick={open}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } }}
          onMouseMove={handleMove}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {gifUrl ? (
            <img className="ps-video" src={gifUrl} alt={`${title} preview`} loading="lazy" decoding="async" />
          ) : videoUrl ? (
            <video ref={videoRef} className="ps-video" src={`${videoUrl}#t=0.1`} loop muted playsInline preload="metadata" disablePictureInPicture />
          ) : (
            <div className="ps-placeholder" aria-hidden="true" />
          )}

          <span className="ps-shine" aria-hidden="true" />
          <span className="ps-badge"><span className="ps-badge-dot" />VIEW PROJECT</span>
          <span className="ps-index" aria-hidden="true">{number}</span>
          {!gifUrl && !videoUrl && <span className="ax-play ax-play--sm"><span className="ax-play-tri" /></span>}

          <div className="ps-overlay">
            <p>{description}</p>
          </div>
        </div>

        {/* Text Below Card */}
        <div className="ps-meta" onClick={open}>
          <div className="ps-meta-text">
            <p className="ps-category"><span className="ps-category-dot" />{category}</p>
            <h3 className="ps-title">{title}</h3>
          </div>
          <span className="ps-arrow" aria-hidden="true">↗</span>
        </div>
      </article>

      {/* ================= POPUP MODAL =================
          Rendered into <body> so it always sits above everything */}
      {isOpen && createPortal(
        <div className="ps-modal" role="dialog" aria-modal="true" aria-label={title} onClick={() => setIsOpen(false)}>
          <div className="ps-modal-window" onClick={(e) => e.stopPropagation()}>

            <button className="ps-close" onClick={() => setIsOpen(false)} aria-label="Close">✕</button>

            {/* LEFT SIDE: VIDEO */}
            <div className="ps-modal-video">
              {gifUrl ? (
                <img src={gifUrl} alt={`${title} preview`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : videoUrl ? (
                <video src={videoUrl} autoPlay muted loop playsInline disablePictureInPicture style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <div className="ps-modal-placeholder">
                  <span className="ps-loader" />
                  <p>[Video Player Placeholder]</p>
                </div>
              )}
            </div>

            {/* RIGHT SIDE: INFO & LINKS */}
            <div className="ps-modal-info">
              <p className="ps-modal-cat">{category}</p>
              <h2 className="ps-modal-title">{title}</h2>
              <p className="ps-modal-desc">{description}</p>
              <a
                href={projectLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="ax-btn ax-btn--solid ps-visit"
              >
                Visit Website <span className="ax-btn-arrow">↗</span>
              </a>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
};

// Styles for the card + popup (rendered once by Portfolio.jsx)
export const projectSectionStyles = `
  .ps-card { display: flex; flex-direction: column; }

  .ps-media {
    position: relative; width: 100%; aspect-ratio: 16 / 9; margin-bottom: 1rem;
    border-radius: 16px; overflow: hidden; cursor: pointer; outline: none;
    background: #1A1A1A; border: 1px solid #333333;
    display: flex; align-items: center; justify-content: center;
    transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
    transition: transform 0.25s ease-out, border-color 0.4s ease, box-shadow 0.5s ease;
    will-change: transform;
  }
  .ps-media:hover, .ps-media:focus-visible {
    border-color: rgba(0,163,255,0.7);
    box-shadow: 0 30px 70px -30px rgba(0,163,255,0.6);
  }

  .ps-placeholder {
    position: absolute; inset: 0;
    background: linear-gradient(120deg, #141414 0%, #1d1d1d 30%, #0c1a25 50%, #1d1d1d 70%, #141414 100%);
    background-size: 300% 300%;
    animation: psGradient 10s ease infinite;
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .ps-placeholder::before {
    content: ''; position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 32px 32px;
  }
  .ps-video {
    position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .ps-media:hover .ps-video, .ps-media:hover .ps-placeholder { transform: scale(1.06); }

  .ps-shine {
    position: absolute; inset: 0; z-index: 2; pointer-events: none;
    background: radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.09), transparent 40%);
    opacity: 0; transition: opacity 0.4s ease;
  }
  .ps-media:hover .ps-shine { opacity: 1; }

  .ps-badge {
    position: absolute; top: 1rem; left: 1rem; z-index: 3;
    display: flex; align-items: center; gap: 6px;
    background: rgba(0,0,0,0.6); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
    border: 1px solid #333333; padding: 3px 10px; border-radius: 10px;
    font-size: 0.6rem; color: #FFFFFF; font-family: 'Hind', sans-serif; letter-spacing: 1px;
    transition: border-color 0.3s ease;
  }
  .ps-media:hover .ps-badge { border-color: rgba(0,163,255,0.6); }
  .ps-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: #00A3FF; box-shadow: 0 0 6px #00A3FF; animation: psBlink 1.4s ease-in-out infinite; }

  .ps-index {
    position: absolute; top: 0.4rem; right: 1.2rem; z-index: 3;
    font-family: 'Inknut Antiqua', serif; font-size: 2.6rem; line-height: 1.4;
    color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.2);
    transition: -webkit-text-stroke-color 0.4s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .ps-media:hover .ps-index { -webkit-text-stroke-color: #00A3FF; transform: translateY(-4px); }

  .ps-media .ax-play { z-index: 3; }
  .ps-media:hover .ax-play {
    transform: scale(1.14);
    box-shadow: 0 0 0 6px rgba(0,163,255,0.15), 0 0 40px rgba(0,163,255,0.6);
  }

  .ps-overlay {
    position: absolute; left: 0; right: 0; bottom: 0; z-index: 3;
    padding: 3rem 1.5rem 1.25rem;
    background: linear-gradient(to top, rgba(0,0,0,0.92), transparent);
    transform: translateY(100%);
    transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .ps-media:hover .ps-overlay, .ps-media:focus-visible .ps-overlay { transform: translateY(0); }
  .ps-overlay p { margin: 0; color: #d4d4d4; font-family: 'Hind', sans-serif; font-size: 0.9rem; line-height: 1.5; text-align: left; }

  .ps-meta { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; cursor: pointer; }
  .ps-meta-text { transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
  .ps-card:hover .ps-meta-text { transform: translateX(6px); }
  .ps-category {
    display: flex; align-items: center; gap: 8px; margin: 0 0 0.3rem;
    color: #888888; font-family: 'Hind', sans-serif; font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase;
  }
  .ps-category-dot { width: 5px; height: 5px; border-radius: 50%; background: #00A3FF; }
  .ps-title { color: #FFFFFF; font-family: 'Inknut Antiqua', serif; font-size: 1.5rem; font-weight: 400; margin: 0 0 0.5rem; line-height: 1.4; }
  .ps-arrow {
    width: 40px; height: 40px; flex-shrink: 0; border-radius: 50%;
    border: 1px solid #333333; color: #FFFFFF;
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s, border-color 0.3s, color 0.3s, box-shadow 0.3s;
  }
  .ps-card:hover .ps-arrow {
    transform: rotate(45deg); background: #00A3FF; border-color: #00A3FF; color: #000000;
    box-shadow: 0 0 20px rgba(0,163,255,0.6);
  }

  /* ===== Modal ===== */
  .ps-modal {
    position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 9999;
    display: flex; align-items: center; justify-content: center; padding: 1rem; box-sizing: border-box;
    background: rgba(0,0,0,0.9); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
    animation: psFade 0.35s ease both;
  }
  .ps-modal-window {
    position: relative; width: 90%; max-width: 1100px;
    display: flex; flex-direction: row; overflow: hidden;
    background: #111111; border-radius: 16px; border: 1px solid #333333;
    box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 60px -20px rgba(0,163,255,0.35);
    animation: psPop 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  .ps-modal-window::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; z-index: 5;
    background: linear-gradient(90deg, transparent, #00A3FF, transparent);
    background-size: 50% 100%; background-repeat: no-repeat;
    animation: psScanLine 2.5s linear infinite;
  }
  .ps-close {
    position: absolute; top: 1rem; right: 1rem; z-index: 10;
    width: 38px; height: 38px; border-radius: 50%;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
    color: #FFFFFF; font-size: 1rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s, border-color 0.3s, color 0.3s;
  }
  .ps-close:hover { transform: rotate(90deg); background: #00A3FF; border-color: #00A3FF; color: #000000; }
  .ps-modal-video { width: 60%; min-height: 420px; background: #000000; display: flex; align-items: center; justify-content: center; }
  .ps-modal-placeholder {
    display: flex; flex-direction: column; align-items: center; gap: 1.25rem;
    padding: 2rem; color: #666666; font-family: 'Hind', sans-serif; text-align: center;
  }
  .ps-modal-placeholder p { margin: 0; }
  .ps-loader {
    width: 46px; height: 46px; border-radius: 50%;
    border: 2px solid #222222; border-top-color: #00A3FF;
    box-shadow: 0 0 20px rgba(0,163,255,0.25);
    animation: psSpin 1s linear infinite;
  }
  .ps-modal-info { width: 40%; padding: 3rem 2rem; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; }
  .ps-modal-info > * { opacity: 0; animation: psUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .ps-modal-info > *:nth-child(1) { animation-delay: 0.15s; }
  .ps-modal-info > *:nth-child(2) { animation-delay: 0.22s; }
  .ps-modal-info > *:nth-child(3) { animation-delay: 0.29s; }
  .ps-modal-info > *:nth-child(4) { animation-delay: 0.36s; }
  .ps-modal-cat { color: #00A3FF; font-family: 'Hind', sans-serif; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 0.5rem; }
  .ps-modal-title { color: #FFFFFF; font-family: 'Inknut Antiqua', serif; font-size: 2.5rem; font-weight: 400; line-height: 1.25; margin: 0 0 1rem; }
  .ps-modal-desc { color: #A1A1AA; font-family: 'Hind', sans-serif; font-size: 1rem; line-height: 1.7; margin: 0 0 2rem; }
  .ps-visit { width: 100%; padding: 12px 30px; }

  @keyframes psGradient { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  @keyframes psBlink    { 0%,100% { opacity: 1; } 50% { opacity: 0.25; } }
  @keyframes psFade     { from { opacity: 0; } to { opacity: 1; } }
  @keyframes psPop      { from { opacity: 0; transform: translateY(30px) scale(0.94); } to { opacity: 1; transform: none; } }
  @keyframes psUp       { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
  @keyframes psSpin     { to { transform: rotate(360deg); } }
  @keyframes psScanLine { 0% { background-position: -100% 0; } 100% { background-position: 200% 0; } }

  @media (max-width: 860px) {
    .ps-modal-window { flex-direction: column; max-height: 92vh; overflow-y: auto; }
    .ps-modal-video, .ps-modal-info { width: 100%; }
    .ps-modal-video { min-height: 220px; }
    .ps-modal-title { font-size: 1.8rem; }
  }
`;

export default ProjectSection;