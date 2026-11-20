// src/pages/Team/Team.jsx
//
// Our Team page – clean, minimal, black & white with an electric-blue touch.
//   1. Hero (black)        – headline, short intro, team avatars + quick facts
//   2. Leadership (white)  – founder spotlight with photo and message
//   3. The team (black)    – filterable grid (All / Engineering / Sales / SEO)
//   4. How we work (white) – four short principles
//   5. Call to action (black)
// Animations are small and calm: soft fade-ups on scroll, photos turn from
// black & white to colour on hover, the filter pill slides between tabs.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Arrow from '../../components/Arrow';

import raybeenImg from '../../assets/team/raybeen.jpg';
import prashantImg from '../../assets/team/prashant.jpg';
import ankitImg from '../../assets/team/ankit.jpg';
import pratyushImg from '../../assets/team/pratyush.jpg';

/* ===================== EDIT THE TEAM HERE ===================== */
const LEADER = {
  name: 'Rabin Lamichhane, (Raybeen)',
  title: 'Founder, CEO & Project Manager',
  desc: 'Sets the vision for Artx Dev and manages every project from first call to launch, keeping the team aligned and clients in the loop.',
  image: raybeenImg,
  pos: 'center 40%',
};

// teams: which filter tabs the person appears under
const MEMBERS = [
  { name: 'Prashant', title: 'Lead Developer', teams: ['Engineering'], image: prashantImg, pos: 'center 15%', lead: true },
  { name: 'Ankit Jung Thapa', title: 'Developer · Sales', teams: ['Engineering', 'Sales'], image: ankitImg, pos: 'center 20%' },
  { name: 'Pratyush Bhattarai', title: 'Developer · Sales', teams: ['Engineering', 'Sales'], image: pratyushImg, pos: 'center 30%' },
  { name: 'Rabin Lamichhane', title: 'Project Manager', teams: ['Sales'], image: raybeenImg, pos: 'center 40%' },
  // SEO – add photos/names when ready (a silhouette shows until then)
  { name: 'SEO Specialist', title: 'Joining soon', teams: ['SEO'], image: null },
  { name: 'Content Strategist', title: 'Joining soon', teams: ['SEO'], image: null },
];

const PRINCIPLES = [
  { title: 'Senior attention', text: 'You work directly with the people designing and building your product.' },
  { title: 'Clear communication', text: 'One point of contact and regular updates from the first call to launch.' },
  { title: 'Built to last', text: 'Clean code and tidy design systems that are easy to grow later.' },
  { title: 'Two time zones', text: 'Teams in Nepal and the USA keep your project moving around the clock.' },
];
/* ============================================================== */

const TABS = ['All', 'Engineering', 'Sales', 'SEO'];
const EASE = [0.22, 1, 0.36, 1];

// Soft fade-up when an element scrolls into view
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -10% 0px' },
  transition: { duration: 0.8, ease: EASE, delay },
});

// Team photos are protected: no right-click menu, no dragging, no long-press save
const blockSave = (e) => e.preventDefault();

const Photo = ({ image, name, pos, className = '' }) => (
  <div className={`tm2-photo ${className}`.trim()} onContextMenu={blockSave}>
    {image ? (
      <img src={image} alt={name} loading="lazy" draggable={false} style={{ objectPosition: pos || 'center 25%' }} />
    ) : (
      <div className="tm2-silhouette" aria-hidden="true" />
    )}
  </div>
);

const Team = () => {
  const [tab, setTab] = useState('All');
  const visible = tab === 'All' ? MEMBERS.filter((m, i, arr) => arr.findIndex((x) => x.name === m.name) === i) : MEMBERS.filter((m) => m.teams.includes(tab));
  const countFor = (t) => (t === 'All'
    ? new Set(MEMBERS.map((m) => m.name)).size
    : MEMBERS.filter((m) => m.teams.includes(t)).length);
  const faces = [LEADER, ...MEMBERS.filter((m) => m.image && m.name !== LEADER.name)];

  return (
    <main className="tm2">
      {/* ===================== 1. HERO ===================== */}
      <section className="tm2-hero">
        <div className="tm2-hero-grid" aria-hidden="true" />
        <div className="tm2-hero-glow" aria-hidden="true" />

        <div className="tm2-wrap tm2-hero-inner">
          <motion.p className="tm2-eyebrow" {...reveal(0.05)}>Our Team</motion.p>
          <motion.h1 className="tm2-hero-title" {...reveal(0.15)}>
            The people behind<br />every <span className="tm2-accent">pixel.</span>
          </motion.h1>
          <motion.p className="tm2-hero-sub" {...reveal(0.3)}>
            A small, senior team across Nepal and the USA – designers, developers and
            strategists who care about the details.
          </motion.p>

          <motion.div className="tm2-hero-meta" {...reveal(0.45)}>
            <div className="tm2-faces" aria-hidden="true" onContextMenu={blockSave}>
              {faces.map((f) => (
                <span key={f.name} className="tm2-face">
                  <img src={f.image} alt="" draggable={false} style={{ objectPosition: f.pos || 'center' }} />
                </span>
              ))}
            </div>
            <div className="tm2-facts">
              <span><strong>{String(new Set(MEMBERS.filter((m) => m.image).map((m) => m.name)).size).padStart(2, '0')}</strong> core members</span>
              <span className="tm2-dot" aria-hidden="true" />
              <span><strong>02</strong> countries</span>
              <span className="tm2-dot" aria-hidden="true" />
              <span><strong>03</strong> teams</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== 2. LEADERSHIP ===================== */}
      <section className="tm2-lead">
        <div className="tm2-wrap tm2-lead-grid">
          <motion.div className="tm2-lead-photo-wrap" {...reveal(0)}>
            <Photo image={LEADER.image} name={LEADER.name} pos={LEADER.pos} className="tm2-lead-photo" />
            <span className="tm2-lead-chip">Founder</span>
          </motion.div>

          <div className="tm2-lead-text">
            <motion.p className="tm2-eyebrow tm2-eyebrow--dark" {...reveal(0.05)}>Leadership</motion.p>
            <motion.h2 className="tm2-lead-name" {...reveal(0.12)}>{LEADER.name}</motion.h2>
            <motion.p className="tm2-lead-role" {...reveal(0.18)}>{LEADER.title}</motion.p>
            <motion.blockquote className="tm2-lead-quote" {...reveal(0.26)}>
              {LEADER.desc}
            </motion.blockquote>
            <motion.div {...reveal(0.34)}>
              <Link to="/book-meeting" className="tm2-link">
                Book a meeting with {LEADER.name} <Arrow />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================== 3. THE TEAM ===================== */}
      <section className="tm2-team">
        <div className="tm2-wrap">
          <div className="tm2-team-head">
            <div>
              <motion.p className="tm2-eyebrow" {...reveal(0)}>Meet everyone</motion.p>
              <motion.h2 className="tm2-h2" {...reveal(0.08)}>The team<span className="tm2-accent">.</span></motion.h2>
            </div>

            <motion.div className="tm2-tabs" role="tablist" aria-label="Filter team" {...reveal(0.15)}>
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  className={`tm2-tab${tab === t ? ' is-active' : ''}`}
                  onClick={() => setTab(t)}
                >
                  {tab === t && (
                    <motion.span layoutId="tm2-tab-pill" className="tm2-tab-pill" transition={{ duration: 0.45, ease: EASE }} />
                  )}
                  <span className="tm2-tab-label">{t}</span>
                  <span className="tm2-tab-count">{countFor(t)}</span>
                </button>
              ))}
            </motion.div>
          </div>

          <motion.div className="tm2-grid" layout>
            <AnimatePresence mode="popLayout">
              {visible.map((m, i) => (
                <motion.article
                  key={m.name + m.title}
                  className="tm2-card"
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                >
                  <Photo image={m.image} name={m.name} pos={m.pos} />
                  {m.lead && <span className="tm2-card-badge">Team Lead</span>}
                  <div className="tm2-card-info">
                    <h3 className="tm2-card-name">{m.name}</h3>
                    <p className="tm2-card-role">{m.title}</p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ===================== 4. HOW WE WORK ===================== */}
      <section className="tm2-values">
        <div className="tm2-wrap">
          <motion.p className="tm2-eyebrow tm2-eyebrow--dark" {...reveal(0)}>How we work</motion.p>
          <motion.h2 className="tm2-h2 tm2-h2--dark" {...reveal(0.08)}>Small team. Real care.</motion.h2>

          <div className="tm2-values-grid">
            {PRINCIPLES.map((p, i) => (
              <motion.div key={p.title} className="tm2-value" {...reveal(0.1 + i * 0.08)}>
                <span className="tm2-value-num">0{i + 1}</span>
                <h3 className="tm2-value-title">{p.title}</h3>
                <p className="tm2-value-text">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 5. CTA ===================== */}
      <section className="tm2-cta">
        <div className="tm2-wrap tm2-cta-inner">
          <motion.h2 className="tm2-cta-title" {...reveal(0)}>
            Let&apos;s build something <span className="tm2-accent">premium</span> together.
          </motion.h2>
          <motion.div className="tm2-cta-actions" {...reveal(0.12)}>
            <Link to="/contact" className="tm2-btn tm2-btn--light">Start a project <Arrow /></Link>
            <Link to="/book-meeting" className="tm2-btn tm2-btn--ghost">Book a meeting <Arrow /></Link>
          </motion.div>
        </div>
      </section>

      <style>{styles}</style>
    </main>
  );
};

const styles = `
  .tm2 { background: #FFFFFF; }
  .tm2-wrap { width: 100%; max-width: 1240px; margin: 0 auto; padding: 0 5%; box-sizing: border-box; }

  .tm2-eyebrow {
    display: inline-flex; align-items: center; gap: 0.7rem; margin: 0 0 1rem;
    color: #9A9A9A; font-family: 'Hind', sans-serif; font-size: 0.78rem;
    letter-spacing: 2.5px; text-transform: uppercase;
  }
  .tm2-eyebrow::before { content: ''; width: 26px; height: 1px; background: #00A3FF; }
  .tm2-eyebrow--dark { color: #777777; }
  .tm2-accent { color: #00A3FF; }

  .tm2-h2 {
    margin: 0; color: #FFFFFF;
    font-family: 'Kantumruy Pro', sans-serif; font-weight: 600;
    font-size: clamp(2.2rem, 4vw, 3.4rem); line-height: 1.1; letter-spacing: -0.02em;
  }
  .tm2-h2--dark { color: #0A0A0A; }

  /* ---------- Photo protection ---------- */
  .tm2-photo, .tm2-faces { -webkit-touch-callout: none; -webkit-user-select: none; user-select: none; }
  .tm2-photo img, .tm2-face img {
    pointer-events: none; -webkit-user-drag: none; user-drag: none;
    -webkit-touch-callout: none; -webkit-user-select: none; user-select: none;
  }

  /* ---------- Photo (shared) ---------- */
  .tm2-photo { position: relative; overflow: hidden; background: #1A1A1A; }
  .tm2-photo img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    filter: grayscale(1) contrast(1.04);
    transition: filter 0.8s ease, transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .tm2-silhouette { position: absolute; inset: 0; background: linear-gradient(180deg, #242424, #141414); }
  .tm2-silhouette::before {
    content: ''; position: absolute; top: 24%; left: 50%; width: 30%; aspect-ratio: 1 / 1;
    transform: translateX(-50%); border-radius: 50%; background: #333333;
  }
  .tm2-silhouette::after {
    content: ''; position: absolute; bottom: 0; left: 50%; width: 64%; height: 36%;
    transform: translateX(-50%); background: #333333; border-radius: 999px 999px 0 0;
  }

  /* ===================== HERO ===================== */
  .tm2-hero {
    position: relative; overflow: hidden; background: #000000;
    padding: 7rem 0 6rem; border-bottom: 6px solid #FFFFFF;
  }
  .tm2-hero-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 64px 64px;
    -webkit-mask-image: radial-gradient(ellipse 70% 80% at 70% 40%, #000 10%, transparent 75%);
            mask-image: radial-gradient(ellipse 70% 80% at 70% 40%, #000 10%, transparent 75%);
  }
  .tm2-hero-glow {
    position: absolute; top: -30%; right: -10%; width: 60%; aspect-ratio: 1 / 1; border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle, rgba(255,255,255,0.08), transparent 65%);
  }
  .tm2-hero-inner { position: relative; z-index: 1; }
  .tm2-hero-title {
    margin: 0 0 1.5rem; color: #FFFFFF;
    font-family: 'Kantumruy Pro', sans-serif; font-weight: 600;
    font-size: clamp(2.6rem, 6vw, 5.2rem); line-height: 1.05; letter-spacing: -0.035em;
  }
  .tm2-hero-sub {
    max-width: 560px; margin: 0 0 2.75rem;
    color: #A1A1A1; font-family: 'Inter', sans-serif; font-size: 1.08rem; line-height: 1.7;
  }
  .tm2-hero-meta { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
  .tm2-faces { display: flex; }
  .tm2-face {
    width: 46px; height: 46px; border-radius: 50%; overflow: hidden;
    border: 2px solid #000000; margin-left: -12px; background: #222;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .tm2-face:first-child { margin-left: 0; }
  .tm2-face img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1); }
  .tm2-faces:hover .tm2-face { transform: translateX(4px); }
  .tm2-faces:hover .tm2-face:first-child { transform: none; }
  .tm2-facts {
    display: flex; align-items: center; gap: 0.9rem; flex-wrap: wrap;
    color: #8A8A8A; font-family: 'Hind', sans-serif; font-size: 0.92rem;
  }
  .tm2-facts strong { color: #FFFFFF; font-weight: 600; margin-right: 4px; }
  .tm2-dot { width: 4px; height: 4px; border-radius: 50%; background: #444444; }

  /* ===================== LEADERSHIP ===================== */
  .tm2-lead { background: #FFFFFF; padding: 7rem 0; }
  .tm2-lead-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 5rem; align-items: center; }
  .tm2-lead-photo-wrap { position: relative; }
  .tm2-lead-photo { aspect-ratio: 4 / 5; border-radius: 24px; }
  .tm2-lead-photo-wrap:hover .tm2-photo img { filter: grayscale(0); transform: scale(1.04); }
  .tm2-lead-chip {
    position: absolute; left: 1.2rem; bottom: 1.2rem;
    padding: 6px 14px; border-radius: 999px;
    background: rgba(255,255,255,0.9); color: #0A0A0A;
    -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
    font-family: 'Hind', sans-serif; font-size: 0.75rem; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600;
  }
  .tm2-lead-name {
    margin: 0; color: #0A0A0A;
    font-family: 'Kantumruy Pro', sans-serif; font-weight: 600;
    font-size: clamp(2.6rem, 5vw, 4.2rem); line-height: 1; letter-spacing: -0.03em;
  }
  .tm2-lead-role { margin: 0.9rem 0 2rem; color: #6A6A6A; font-family: 'Hind', sans-serif; font-size: 1.05rem; }
  .tm2-lead-quote {
    position: relative; margin: 0 0 2.25rem; padding: 0 0 0 1.5rem;
    border-left: 2px solid #0A0A0A;
    color: #333333; font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.75;
  }
  .tm2-link {
    display: inline-flex; align-items: center; gap: 10px;
    color: #0A0A0A; text-decoration: none; font-family: 'Hind', sans-serif; font-weight: 600; font-size: 1rem;
    padding-bottom: 4px; border-bottom: 1px solid #0A0A0A;
    transition: gap 0.35s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s ease, border-color 0.3s ease;
  }
  .tm2-link:hover { gap: 16px; color: #00A3FF; border-color: #00A3FF; }

  /* ===================== THE TEAM ===================== */
  .tm2-team { background: #000000; padding: 7rem 0; }
  .tm2-team-head {
    display: flex; justify-content: space-between; align-items: flex-end; gap: 2rem; flex-wrap: wrap;
    margin-bottom: 3rem;
  }
  .tm2-tabs {
    display: inline-flex; gap: 4px; padding: 5px; border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.03);
  }
  .tm2-tab {
    position: relative; display: inline-flex; align-items: center; gap: 8px;
    padding: 9px 16px; border: none; border-radius: 999px; background: none; cursor: pointer;
    color: #9A9A9A; font-family: 'Hind', sans-serif; font-size: 0.9rem;
    transition: color 0.3s ease;
  }
  .tm2-tab:hover { color: #FFFFFF; }
  .tm2-tab.is-active { color: #000000; }
  .tm2-tab-pill { position: absolute; inset: 0; z-index: 0; border-radius: 999px; background: #FFFFFF; }
  .tm2-tab-label, .tm2-tab-count { position: relative; z-index: 1; }
  .tm2-tab-count { font-size: 0.72rem; opacity: 0.6; }

  .tm2-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem 1.5rem; }
  .tm2-card { position: relative; }
  .tm2-card .tm2-photo { aspect-ratio: 4 / 5; border-radius: 18px; }
  .tm2-card-badge {
    position: absolute; top: 0.85rem; left: 0.85rem;
    padding: 4px 10px; border-radius: 999px;
    background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.25); color: #FFFFFF;
    -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
    font-family: 'Hind', sans-serif; font-size: 0.65rem; letter-spacing: 1.4px; text-transform: uppercase;
  }
  .tm2-card-info { padding: 1rem 0.25rem 0; }
  .tm2-card-name {
    margin: 0 0 0.25rem; color: #FFFFFF;
    font-family: 'Kantumruy Pro', sans-serif; font-weight: 600; font-size: 1.15rem; letter-spacing: -0.01em;
  }
  .tm2-card-role { margin: 0; color: #8A8A8A; font-family: 'Hind', sans-serif; font-size: 0.9rem; }
  @media (hover: hover) and (pointer: fine) {
    .tm2-card:hover .tm2-photo img { filter: grayscale(0); transform: scale(1.05); }
  }

  /* ===================== HOW WE WORK ===================== */
  .tm2-values { background: #FFFFFF; padding: 7rem 0; }
  .tm2-values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2.5rem; margin-top: 3.5rem; }
  .tm2-value { padding-top: 1.5rem; border-top: 1px solid #E2E2E2; position: relative; }
  .tm2-value::before {
    content: ''; position: absolute; top: -1px; left: 0; width: 40px; height: 1px; background: #0A0A0A;
    transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .tm2-value:hover::before { width: 100%; }
  .tm2-value-num { display: block; margin-bottom: 1.25rem; color: #00A3FF; font-family: monospace, sans-serif; font-size: 0.85rem; letter-spacing: 2px; }
  .tm2-value-title { margin: 0 0 0.6rem; color: #0A0A0A; font-family: 'Kantumruy Pro', sans-serif; font-weight: 600; font-size: 1.2rem; }
  .tm2-value-text { margin: 0; color: #666666; font-family: 'Hind', sans-serif; font-size: 0.95rem; line-height: 1.6; }

  /* ===================== CTA ===================== */
  .tm2-cta { background: #000000; padding: 6.5rem 0; }
  .tm2-cta-inner { display: flex; flex-direction: column; align-items: center; text-align: center; }
  .tm2-cta-title {
    max-width: 820px; margin: 0 0 2.5rem; color: #FFFFFF;
    font-family: 'Kantumruy Pro', sans-serif; font-weight: 600;
    font-size: clamp(2rem, 4.2vw, 3.4rem); line-height: 1.15; letter-spacing: -0.02em;
  }
  .tm2-cta-actions { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
  .tm2-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 14px 30px; border-radius: 999px; text-decoration: none;
    font-family: 'Hind', sans-serif; font-weight: 600; font-size: 1rem;
    transition: background 0.35s ease, color 0.35s ease, border-color 0.35s ease, gap 0.35s ease;
  }
  .tm2-btn:hover { gap: 14px; }
  .tm2-btn--light { background: #FFFFFF; color: #000000; border: 1px solid #FFFFFF; }
  .tm2-btn--light:hover { background: #E9E9E9; }
  .tm2-btn--ghost { color: #FFFFFF; border: 1px solid rgba(255,255,255,0.3); }
  .tm2-btn--ghost:hover { border-color: #FFFFFF; }

  /* ===================== RESPONSIVE ===================== */
  @media (max-width: 1024px) {
    .tm2-grid { grid-template-columns: repeat(3, 1fr); }
    .tm2-values-grid { grid-template-columns: repeat(2, 1fr); }
    .tm2-lead-grid { gap: 3rem; }
  }
  @media (max-width: 768px) {
    .tm2-hero { padding: 5rem 0 4.5rem; }
    .tm2-lead, .tm2-team, .tm2-values { padding: 4.5rem 0; }
    .tm2-cta { padding: 4.5rem 0; }
    .tm2-lead-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .tm2-lead-photo { aspect-ratio: 1 / 1; }
    .tm2-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem 0.9rem; }
    .tm2-team-head { margin-bottom: 2rem; }
    .tm2-tabs { width: 100%; overflow-x: auto; }
    .tm2-tab { padding: 8px 12px; font-size: 0.82rem; white-space: nowrap; }
  }
  @media (max-width: 560px) {
    .tm2-hero-sub { font-size: 0.98rem; }
    .tm2-face { width: 38px; height: 38px; }
    .tm2-lead-quote { font-size: 1rem; }
    .tm2-card .tm2-photo { border-radius: 14px; }
    .tm2-card-name { font-size: 0.98rem; }
    .tm2-card-role { font-size: 0.8rem; }
    .tm2-values-grid { grid-template-columns: 1fr; gap: 2rem; margin-top: 2.5rem; }
    .tm2-btn { width: 100%; justify-content: center; }
    .tm2-cta-actions { width: 100%; max-width: 340px; flex-direction: column; }
  }
`;

export default Team;
