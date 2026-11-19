// src/pages/Home/sections/Portfolio.jsx

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../../../components/Arrow';

/*
  =========================================
  ADDING A PREVIEW TO A PROJECT:
  - GIF  →︎ put it in public/gifs/ and set 'gifUrl'  (e.g. '/gifs/name.gif').
           It loops on its own – no hover, no sound or timeline controls.
  - Video →︎ put it in public/videos/ and set 'videoUrl'.
           The card plays a muted preview on hover; the popup has controls.
  If both are set, the GIF is used.
  =========================================
*/
const projects = [
  { title: 'Seabrook Texas Town', category: 'Web App', description: 'A destination and community website for Seabrook, Texas on Galveston Bay – covering ecotourism, wildlife, local history and news, with a local business section, an online shop and an AI chat assistant for visitors.', videoUrl: '/videos/seabrook.mp4', projectLink: 'https://seabrooktexastown.com/' },
  { title: 'Actexas', category: 'Website', description: 'A clean, professional business website for ACTS – Acoustical Ceiling Tile Solutions – presenting their acoustical ceiling tile services clearly so customers know exactly what they offer.', videoUrl: '/videos/actexas.mp4', projectLink: 'https://actexas.com' },
  { title: 'Stelgh', category: 'Website', description: 'A premium Gulf Coast apparel brand and store – print-on-demand tees, hoodies and caps shipped worldwide – paired with a Seabrook travel guide covering things to do, places to stay and local wildlife.', videoUrl: '/videos/stelgh.mp4', projectLink: 'https://stelgh.com' },
  { title: 'RRLCLLC', category: 'Website', description: 'A website for DoubleR LawnCare (RRLC LLC) showcasing weekly lawn maintenance, aeration, fertilization and weed control, with before-and-after concepts and a free estimate request.', videoUrl: '/videos/rrlcllc.mp4', projectLink: 'https://rrlcllc.com' },
];

// One project card – 3D tilt + light that follows the mouse
const ProjectCard = ({ project, index, onOpen }) => {
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const number = String(index + 1).padStart(2, '0');

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
  const open = () => onOpen(project);
  const hasPreview = Boolean(project.gifUrl || project.videoUrl);

  return (
    <div data-reveal="up" style={{ '--d': `${(index % 2) * 0.15}s` }}>
      <article className="pf-card">
        <div
          ref={mediaRef}
          className="pf-media"
          role="button"
          tabIndex={0}
          aria-label={`Open ${project.title}`}
          onClick={open}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
          }}
          onMouseMove={handleMove}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {project.gifUrl ? (
            <img className="pf-video" src={project.gifUrl} alt={`${project.title} preview`} loading="lazy" decoding="async" />
          ) : project.videoUrl ? (
            <video
              ref={videoRef}
              className="pf-video"
              src={`${project.videoUrl}#t=0.1`}
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              aria-label={`${project.title} preview`}
            />
          ) : (
            <div className="pf-placeholder">
              <span className="pf-placeholder-text">Video Placeholder {index + 1}</span>
            </div>
          )}

          <span className="pf-shine" aria-hidden="true" />
          <span className="pf-badge"><span className="pf-badge-dot" />{hasPreview ? 'VIEW PROJECT' : 'PLAY VIDEO'}</span>
          <span className="pf-index" aria-hidden="true">{number}</span>
          {!hasPreview && <span className="ax-play"><span className="ax-play-tri" /></span>}

          <div className="pf-overlay">
            <p>{project.description}</p>
          </div>
        </div>

        <div className="pf-meta" onClick={open}>
          <div className="pf-meta-text">
            <h3 className="pf-name">{project.title}</h3>
            <p className="pf-category"><span className="pf-category-dot" />{project.category}</p>
          </div>
          <span className="pf-arrow" aria-hidden="true"><Arrow dir="up-right" /></span>
        </div>
      </article>
    </div>
  );
};

const Portfolio = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  // Close popup with Escape + stop the page from scrolling behind it
  useEffect(() => {
    if (!activeVideo) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setActiveVideo(null); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [activeVideo]);

  return (
    <div className="pf-outer">
      <section className="pf-section">
        <div className="pf-orb" aria-hidden="true" />

        {/* Header Row */}
        <div className="pf-header">
          <div>
            <p className="ax-eyebrow" data-reveal="left">Selected work</p>
            <h2 className="pf-title" data-reveal="up" style={{ '--d': '0.1s' }}>
              Portfolio
              <sup className="pf-count">({String(projects.length).padStart(2, '0')})</sup>
            </h2>
          </div>
          <div data-reveal="right">
            <Link to="/portfolio" className="ax-link ax-link--ink">
              All Projects <span className="ax-link-arrow"><Arrow /></span>
            </Link>
          </div>
        </div>

        {/* Portfolio Grid (2 Columns) */}
        <div className="pf-grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} onOpen={setActiveVideo} />
          ))}
        </div>

        {/* See More Button */}
        <div className="pf-more" data-reveal="up">
          <Link to="/portfolio" className="ax-btn ax-btn--ink">
            See More <span className="ax-btn-arrow"><Arrow /></span>
          </Link>
        </div>
      </section>

      {/* ================= FULL SCREEN SPLIT POPUP MODAL ================= */}
      {activeVideo && (
        <div
          className="pf-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
          onClick={() => setActiveVideo(null)}
        >
          <div className="pf-modal-window" onClick={(e) => e.stopPropagation()}>

            <button className="pf-close" onClick={() => setActiveVideo(null)} aria-label="Close">✕</button>

            {/* LEFT SIDE: VIDEO */}
            <div className="pf-modal-video">
              {activeVideo.gifUrl ? (
                <img src={activeVideo.gifUrl} alt={`${activeVideo.title} preview`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : activeVideo.videoUrl ? (
                <video src={activeVideo.videoUrl} autoPlay muted loop playsInline disablePictureInPicture style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <div className="pf-modal-placeholder">
                  <span className="pf-loader" />
                  <p>[Video Player Placeholder for {activeVideo.title}]</p>
                </div>
              )}
            </div>

            {/* RIGHT SIDE: INFO & LINKS */}
            <div className="pf-modal-info">
              <p className="pf-modal-cat">{activeVideo.category}</p>
              <h2 className="pf-modal-title">{activeVideo.title}</h2>
              <p className="pf-modal-desc">{activeVideo.description}</p>
              <a
                href={activeVideo.projectLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="ax-btn ax-btn--solid pf-visit"
              >
                Visit Website <span className="ax-btn-arrow"><Arrow dir="up-right" /></span>
              </a>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .pf-outer { background: #FFFFFF; padding: 0; }
        .pf-section {
          position: relative; background: #FFFFFF; padding: 5rem 5%;
          display: flex; flex-direction: column; overflow: hidden;
        }
        .pf-orb {
          position: absolute; top: -150px; right: -150px; width: 600px; height: 600px;
          border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(0,0,0,0.035), transparent 65%);
          animation: pfOrb 18s ease-in-out infinite alternate;
        }

        /* Header */
        .pf-header {
          position: relative; display: flex; justify-content: space-between; align-items: flex-end;
          gap: 1rem; width: 100%; margin-bottom: 3rem;
        }
        .pf-title {
          color: #0A0A0A; font-family: 'Inknut Antiqua', serif;
          font-size: 3.5rem; font-weight: 400; line-height: 1.2; margin: 0;
        }
        .pf-count {
          font-family: 'Hind', sans-serif; font-size: 1rem; color: #00A3FF;
          margin-left: 0.4rem; vertical-align: super; letter-spacing: 1px;
        }

        /* Grid */
        .pf-grid {
          position: relative; display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 2rem; width: 100%; margin-bottom: 5rem;
        }
        .pf-card { display: flex; flex-direction: column; }

        .pf-media {
          position: relative; height: 300px; margin-bottom: 1rem;
          border-radius: 16px; overflow: hidden; cursor: pointer; outline: none;
          background: #111111; border: 1px solid #E5E5E5;
          display: flex; align-items: center; justify-content: center;
          transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
          transition: transform 0.25s ease-out, border-color 0.4s ease, box-shadow 0.5s ease;
          will-change: transform;
        }
        .pf-media:hover, .pf-media:focus-visible {
          border-color: #0A0A0A;
          box-shadow: 0 24px 50px -28px rgba(0,0,0,0.5);
        }

        .pf-placeholder {
          position: absolute; inset: 0;
          display: flex; align-items: flex-end; justify-content: center; padding-bottom: 1.25rem;
          background: linear-gradient(120deg, #141414 0%, #1d1d1d 30%, #0c1a25 50%, #1d1d1d 70%, #141414 100%);
          background-size: 300% 300%;
          animation: pfGradient 10s ease infinite;
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pf-placeholder::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .pf-placeholder-text { position: relative; color: #555555; font-family: 'Hind', sans-serif; font-size: 0.9rem; }

        .pf-video {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pf-media:hover .pf-video, .pf-media:hover .pf-placeholder { transform: scale(1.06); }

        .pf-shine {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background: radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.09), transparent 40%);
          opacity: 0; transition: opacity 0.4s ease;
        }
        .pf-media:hover .pf-shine { opacity: 1; }

        .pf-badge {
          position: absolute; top: 1rem; left: 1rem; z-index: 3;
          display: flex; align-items: center; gap: 6px;
          background: rgba(0,0,0,0.6); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
          border: 1px solid #333333; padding: 3px 10px; border-radius: 10px;
          font-size: 0.6rem; color: #FFFFFF; font-family: 'Hind', sans-serif; letter-spacing: 1px;
          transition: border-color 0.3s ease;
        }
        .pf-media:hover .pf-badge { border-color: rgba(0,163,255,0.6); }
        .pf-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: #00A3FF; box-shadow: 0 0 6px #00A3FF; animation: pfBlink 1.4s ease-in-out infinite; }

        .pf-index {
          position: absolute; top: 0.6rem; right: 1.2rem; z-index: 3;
          font-family: 'Inknut Antiqua', serif; font-size: 2.6rem; line-height: 1.4;
          color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          transition: -webkit-text-stroke-color 0.4s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pf-media:hover .pf-index { -webkit-text-stroke-color: #00A3FF; transform: translateY(-4px); }

        .pf-media .ax-play { z-index: 3; }
        .pf-media:hover .ax-play {
          transform: scale(1.14);
          box-shadow: 0 0 0 6px rgba(255,255,255,0.15);
        }

        .pf-overlay {
          position: absolute; left: 0; right: 0; bottom: 0; z-index: 3;
          padding: 3rem 1.5rem 1.25rem;
          background: linear-gradient(to top, rgba(0,0,0,0.92), transparent);
          transform: translateY(100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pf-media:hover .pf-overlay, .pf-media:focus-visible .pf-overlay { transform: translateY(0); }
        .pf-overlay p { margin: 0; color: #d4d4d4; font-family: 'Hind', sans-serif; font-size: 0.9rem; line-height: 1.5; }

        /* Text below the card */
        .pf-meta { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; cursor: pointer; }
        .pf-meta-text { transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
        .pf-card:hover .pf-meta-text { transform: translateX(6px); }
        .pf-name {
          color: #0A0A0A; font-family: 'Kantumruy Pro', sans-serif;
          font-size: 1.2rem; font-weight: 700; margin: 0 0 0.2rem;
        }
        .pf-category {
          display: flex; align-items: center; gap: 8px; margin: 0;
          color: #666666; font-family: 'Hind', sans-serif; font-size: 0.85rem;
        }
        .pf-category-dot { width: 5px; height: 5px; border-radius: 50%; background: #00A3FF; }
        .pf-arrow {
          width: 38px; height: 38px; flex-shrink: 0; border-radius: 50%;
          border: 1px solid #D4D4D4; color: #0A0A0A;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s, border-color 0.3s, color 0.3s;
        }
        .pf-card:hover .pf-arrow {
          transform: rotate(45deg); background: #0A0A0A; border-color: #0A0A0A; color: #FFFFFF;
        }

        .pf-more { display: flex; justify-content: center; width: 100%; }

        /* ===== Modal ===== */
        .pf-modal {
          position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 9999;
          display: flex; align-items: center; justify-content: center; padding: 1rem; box-sizing: border-box;
          background: rgba(0,0,0,0.9); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
          animation: pfFade 0.35s ease both;
        }
        .pf-modal-window {
          position: relative; width: 90%; max-width: 1100px;
          display: flex; flex-direction: row; overflow: hidden;
          background: #111111; border-radius: 16px; border: 1px solid #333333;
          box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 60px -20px rgba(0,163,255,0.35);
          animation: pfPop 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .pf-modal-window::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; z-index: 5;
          background: linear-gradient(90deg, transparent, #00A3FF, transparent);
          background-size: 50% 100%; background-repeat: no-repeat;
          animation: pfScanLine 2.5s linear infinite;
        }
        .pf-close {
          position: absolute; top: 1rem; right: 1rem; z-index: 10;
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
          color: #FFFFFF; font-size: 1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s, border-color 0.3s, color 0.3s;
        }
        .pf-close:hover { transform: rotate(90deg); background: #00A3FF; border-color: #00A3FF; color: #000000; }

        .pf-modal-video {
          width: 60%; min-height: 420px; background: #000000;
          display: flex; align-items: center; justify-content: center;
        }
        .pf-modal-placeholder {
          display: flex; flex-direction: column; align-items: center; gap: 1.25rem;
          padding: 2rem; color: #666666; font-family: 'Hind', sans-serif; text-align: center;
        }
        .pf-modal-placeholder p { margin: 0; }
        .pf-loader {
          width: 46px; height: 46px; border-radius: 50%;
          border: 2px solid #222222; border-top-color: #00A3FF;
          box-shadow: 0 0 20px rgba(0,163,255,0.25);
          animation: pfSpin 1s linear infinite;
        }

        .pf-modal-info {
          width: 40%; padding: 3rem 2rem; box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: center;
        }
        .pf-modal-info > * { opacity: 0; animation: pfUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .pf-modal-info > *:nth-child(1) { animation-delay: 0.15s; }
        .pf-modal-info > *:nth-child(2) { animation-delay: 0.22s; }
        .pf-modal-info > *:nth-child(3) { animation-delay: 0.29s; }
        .pf-modal-info > *:nth-child(4) { animation-delay: 0.36s; }
        .pf-modal-cat {
          color: #00A3FF; font-family: 'Hind', sans-serif; font-size: 0.8rem;
          letter-spacing: 2px; text-transform: uppercase; margin: 0 0 0.5rem;
        }
        .pf-modal-title {
          color: #FFFFFF; font-family: 'Inknut Antiqua', serif;
          font-size: 2.5rem; font-weight: 400; line-height: 1.25; margin: 0 0 1rem;
        }
        .pf-modal-desc {
          color: #A1A1AA; font-family: 'Hind', sans-serif;
          font-size: 1rem; line-height: 1.7; margin: 0 0 2rem;
        }
        .pf-visit { width: 100%; padding: 12px 30px; }

        @keyframes pfGradient { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes pfOrb      { from { transform: translate(0, 0); } to { transform: translate(-120px, 80px); } }
        @keyframes pfBlink    { 0%,100% { opacity: 1; } 50% { opacity: 0.25; } }
        @keyframes pfFade     { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pfPop      { from { opacity: 0; transform: translateY(30px) scale(0.94); } to { opacity: 1; transform: none; } }
        @keyframes pfUp       { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes pfSpin     { to { transform: rotate(360deg); } }
        @keyframes pfScanLine { 0% { background-position: -100% 0; } 100% { background-position: 200% 0; } }

        @media (max-width: 860px) {
          .pf-title { font-size: 2.4rem; }
          .pf-grid { grid-template-columns: 1fr; }
          .pf-modal-window { flex-direction: column; max-height: 92vh; overflow-y: auto; }
          .pf-modal-video, .pf-modal-info { width: 100%; }
          .pf-modal-video { min-height: 220px; }
          .pf-modal-title { font-size: 1.8rem; }
        }
        /* Small phones: "All Projects" link drops under the title instead of overflowing */
        @media (max-width: 420px) {
          .pf-header { flex-wrap: wrap; align-items: flex-start; }
          .pf-header .ax-link { white-space: nowrap; }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;