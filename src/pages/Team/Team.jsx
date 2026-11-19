// src/pages/Team/Team.jsx

import PageEffects from '../../components/PageEffects';
import TeamHero from './sections/TeamHero';
import Developers from './sections/Developers';
import Sales from './sections/Sales';
import SEO from './sections/SEO';
import Culture from './sections/Culture';

const Team = () => {
  return (
    <main style={{ backgroundColor: '#FFFFFF' }}>
      <PageEffects />
      <TeamHero />
      <Developers />
      <Sales />
      <SEO />
      <Culture />
      <style>{teamStyles}</style>
    </main>
  );
};

// Shared styles for every section on the Team page
const teamStyles = `
  .tp-outer { background: #FFFFFF; }
  .tp-section {
    position: relative; overflow: hidden;
    background: #FFFFFF; padding: 6rem 5%;
    display: flex; flex-direction: column;
  }
  .tp-section--first { border-top: none; }
  /* the page hero stays black like every other page */
  .tp-section.th-section { background: #000000; }
  .tp-glow { display: none;
    position: absolute; width: 640px; height: 640px; border-radius: 50%; pointer-events: none; z-index: 0;
    background: radial-gradient(circle, rgba(255,255,255,0.05), transparent 65%);
    animation: tpFloat 16s ease-in-out infinite alternate;
  }
  .tp-section > :not([aria-hidden="true"]) { position: relative; z-index: 1; }

  /* Highlighted word in titles, dark version for the white background */
  .tp-section:not(.th-section) .ax-shimmer {
    background: linear-gradient(90deg, #0A0A0A 0%, #0A0A0A 38%, #00A3FF 50%, #0A0A0A 62%, #0A0A0A 100%);
    background-size: 250% 100%;
    -webkit-background-clip: text; background-clip: text;
    color: transparent; -webkit-text-fill-color: transparent;
  }

  /* ---------- Section header ---------- */
  .tp-head {
    display: flex; justify-content: space-between; align-items: flex-end; gap: 1rem; flex-wrap: wrap;
    margin-bottom: 3rem;
  }
  .tp-title { color: #0A0A0A; font-family: 'Hanuman', serif; font-size: 3rem; font-weight: 700; line-height: 1.15; margin: 0; }
  .tp-title-dot { color: #00A3FF; }
  .tp-count {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px; border-radius: 30px; border: 1px solid #DADADA;
    color: #555555; font-family: 'Hind', sans-serif; font-size: 0.8rem; letter-spacing: 1px;
  }
  .tp-count strong { color: #0A0A0A; }

  /* ---------- Avatar (photo or silhouette) ---------- */
  .tp-avatar {
    position: relative; flex-shrink: 0; border-radius: 50%;
    width: 120px; height: 120px;
  }
  .tp-avatar-inner {
    position: absolute; inset: 0; border-radius: 50%; overflow: hidden;
    background: #2A2A2A; border: 1px solid #333333;
    display: flex; align-items: flex-end; justify-content: center;
    transition: border-color 0.4s ease, box-shadow 0.4s ease;
  }
  .tp-avatar img {
    width: 100%; height: 100%; object-fit: cover;
    filter: grayscale(1) contrast(1.05);
    transition: filter 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
  /* Rotating blue ring around the photo on hover */
  .tp-avatar::before {
    content: ''; position: absolute; inset: -7px; border-radius: 50%;
    background: conic-gradient(from 0deg, transparent 0 55%, #8A8A8A 80%, #FFFFFF 88%, transparent 100%);
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1.5px));
            mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1.5px));
    opacity: 0; transition: opacity 0.4s ease;
    animation: tpSpin 3s linear infinite;
  }
  .tp-silhouette { position: relative; width: 76%; height: 86%; transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
  .tp-silhouette::before {
    content: ''; position: absolute; top: 6%; left: 50%; width: 44%; aspect-ratio: 1 / 1;
    transform: translateX(-50%); border-radius: 50%; background: #4A4A4A;
  }
  .tp-silhouette::after {
    content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 44%;
    background: #4A4A4A; border-top-left-radius: 999px; border-top-right-radius: 999px;
  }

  /* Hover states (any member card) */
  .tp-hover:hover .tp-avatar::before { opacity: 1; }
  .tp-hover:hover .tp-avatar-inner { border-color: transparent; }
  .tp-hover:hover .tp-avatar img { filter: grayscale(0); transform: scale(1.06); }
  .tp-hover:hover .tp-silhouette { transform: translateY(-4px) scale(1.04); }

  /* ---------- Member card ---------- */
  .tp-card {
    position: relative; isolation: isolate; overflow: hidden; box-sizing: border-box; height: 100%;
    display: flex; flex-direction: column; align-items: center; text-align: center;
    padding: 2.5rem 2rem 2rem; border-radius: 18px;
    background: #0A0A0A; border: 1px solid #0A0A0A;
    box-shadow: 0 18px 40px -26px rgba(0,0,0,0.55);
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s ease, box-shadow 0.5s ease;
  }
  .tp-card::before {
    content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none;
    background: radial-gradient(380px circle at var(--mx, 50%) var(--my, 0%), rgba(255,255,255,0.06), transparent 50%);
    opacity: 0; transition: opacity 0.4s ease;
  }
  .tp-card::after {
    content: ''; position: absolute; left: 0; bottom: 0; height: 2px; width: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
    transform: scaleX(0); transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .tp-card:hover { transform: translateY(-4px); box-shadow: 0 28px 56px -26px rgba(0,0,0,0.6); }
  .tp-card:hover::before { opacity: 1; }
  .tp-card:hover::after { transform: scaleX(1); }
  .tp-card .tp-avatar { margin-bottom: 1.5rem; }

  .tp-name { color: #FFFFFF; font-family: 'Hind', sans-serif; font-size: 1.2rem; font-weight: 600; margin: 0 0 0.3rem; }
  .tp-role {
    color: #888888; font-family: 'Hind', sans-serif; font-size: 0.9rem; margin: 0;
    transition: color 0.3s ease;
  }
  .tp-hover:hover .tp-role { color: #CFCFCF; }
  .tp-desc { color: #A1A1AA; font-family: 'Hind', sans-serif; font-size: 0.95rem; line-height: 1.6; margin: 1rem 0 0; }

  /* Horizontal card variant */
  .tp-card--row { flex-direction: row; align-items: center; text-align: left; gap: 2rem; padding: 2rem; }
  .tp-card--row .tp-avatar { margin-bottom: 0; }

  .tp-pill {
    display: inline-flex; align-items: center; gap: 6px; margin-bottom: 0.8rem;
    padding: 3px 12px; border-radius: 20px;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.18);
    color: #DDDDDD; font-family: 'Hind', sans-serif; font-size: 0.7rem; letter-spacing: 1.5px; text-transform: uppercase;
  }
  .tp-pill::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: #00A3FF; }

  .tp-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
  .tp-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }

  @keyframes tpSpin  { to { transform: rotate(360deg); } }
  @keyframes tpFloat { from { transform: translate(0, 0); } to { transform: translate(-120px, 90px); } }

  @media (max-width: 960px) {
    .tp-grid-3 { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .tp-section { padding: 4.5rem 6%; }
    .tp-title { font-size: 2.2rem; }
    .tp-grid-3, .tp-grid-2 { grid-template-columns: 1fr; }
    .tp-card--row { flex-direction: column; text-align: center; }
  }
`;

export default Team;