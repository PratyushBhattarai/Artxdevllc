// src/pages/Portfolio/Portfolio.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';

import PageEffects from '../../components/PageEffects';
import PortfolioHero from './sections/PortfolioHero';
import ProjectSection, { projectSectionStyles } from './sections/ProjectSection';

// Logos (same files used in the "Trusted by" brands strip)
import logoTrikore from '../../assets/brand5.png';
import logoSamLandscaping from '../../assets/brand4.png';
import logoHabiff from '../../assets/brand7.png';
import logoCarolinaStump from '../../assets/barnd8.png';

// "Other projects we've built" – logo + link only (no video needed)
const otherProjects = [
  { name: 'Trikore Services', url: 'https://www.trikoreservices.com/', logo: logoTrikore },
  { name: 'Sam Landscaping SVCS', url: 'https://landscapinginsandiego.com/', logo: logoSamLandscaping },
  { name: 'Habiff Builders Group', url: 'https://hbgtexas.com/', logo: logoHabiff },
  { name: 'Carolina Stump Services', url: 'https://carolinastumpservices.com/', logo: logoCarolinaStump },
];

// "https://www.example.com/" -> "example.com"
const prettyDomain = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const projects = [
  {
    title: 'Seabrook Texas Town',
    category: 'AI System',
    description: 'A destination and community website for Seabrook, Texas on Galveston Bay – covering ecotourism, wildlife, local history and news, with a local business section, an online shop and an AI chat assistant for visitors.',
    videoUrl: '/videos/seabrook.mp4',
    projectLink: 'https://seabrooktexastown.com/',
  },
  {
    title: 'Actexas',
    category: 'Website',
    description: 'A clean, professional business website for ACTS – Acoustical Ceiling Tile Solutions – presenting their acoustical ceiling tile services clearly so customers know exactly what they offer.',
    videoUrl: '/videos/actexas.mp4',
    projectLink: 'https://actexas.com',
  },
  {
    title: 'Stelgh',
    category: 'Web App',
    description: 'A premium Gulf Coast apparel brand and store – print-on-demand tees, hoodies and caps shipped worldwide – paired with a Seabrook travel guide covering things to do, places to stay and local wildlife.',
    videoUrl: '/videos/stelgh.mp4',
    projectLink: 'https://stelgh.com',
  },
  {
    title: 'Indiana',
    category: 'Shopify',
    description: "An online apparel store for Indiana State Apparel – tees, hoodies and sweatshirts printed fresh and shipped nationwide – with storytelling about Indiana's lakes, forests and wetlands.",
    videoUrl: '/videos/Indiana.mp4',
    projectLink: 'https://indianastateapparel.com',
  },
  {
    title: 'Mitchells handyman service',
    category: 'Website',
    description: 'A website for a trusted handyman in Richlands, NC – presenting drywall, painting, decks, fencing and pressure-washing services, a project gallery and a simple request-a-quote process.',
    videoUrl: '/videos/mitchellshandymanservice.mp4',
    projectLink: 'https://mitchellshandymanservice.com',
  },
];

// Filter buttons are created automatically from the categories above
const categories = ['All', ...new Set(projects.map((p) => p.category))];

const PortfolioPage = () => {
  const [filter, setFilter] = useState('All');

  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter);
  const countFor = (cat) => (cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length);

  return (
    <main style={{ backgroundColor: '#000000' }}>
      <PageEffects />
      <PortfolioHero />

      {/* THE GRID CONTAINER */}
      <div className="pp-outer">
        <section className="pp-section">

          {/* Filter bar */}
          <div className="pp-toolbar" data-reveal="up">
            <div className="pp-filters" role="tablist" aria-label="Filter projects">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={filter === cat}
                  className={`pp-filter${filter === cat ? ' is-active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                  <span className="pp-filter-count">{countFor(cat)}</span>
                </button>
              ))}
            </div>
            <p className="pp-showing">
              Showing <strong>{visible.length}</strong> {visible.length === 1 ? 'project' : 'projects'}
            </p>
          </div>

          {/* Projects (2 columns) */}
          <div className="pp-grid">
            {visible.map((project, i) => (
              <div key={`${filter}-${project.title}`} className="pp-item" style={{ '--i': i }}>
                <ProjectSection
                  title={project.title}
                  category={project.category}
                  description={project.description}
                  gifUrl={project.gifUrl}
                  videoUrl={project.videoUrl}
                  projectLink={project.projectLink}
                  index={projects.indexOf(project)}
                />
              </div>
            ))}
          </div>

          {/* Other projects – logos that link to the live websites */}
          <div className="pp-other">
            <div className="pp-other-head" data-reveal="up">
              <p className="ax-eyebrow">More work</p>
              <h2 className="pp-other-title">Other projects we've built</h2>
              <p className="pp-other-sub">A few more websites we've designed and developed. Tap a logo to visit the live site.</p>
            </div>

            <div className="pp-other-grid">
              {otherProjects.map((p, i) => (
                <a
                  key={p.url}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pp-other-card"
                  data-reveal="up"
                  style={{ '--d': `${i * 0.1}s` }}
                  aria-label={`Visit ${p.name} website (opens in a new tab)`}
                >
                  <span className="pp-other-logo">
                    <img src={p.logo} alt={`${p.name} logo`} loading="lazy" decoding="async" />
                  </span>
                  <span className="pp-other-info">
                    <span className="pp-other-name">{p.name}</span>
                    <span className="pp-other-domain" title={prettyDomain(p.url)}>{prettyDomain(p.url)}</span>
                  </span>
                  <span className="pp-other-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="pp-cta" data-reveal="up">
            <div className="pp-cta-glow" aria-hidden="true" />
            <p className="ax-eyebrow">Your project next</p>
            <h2 className="pp-cta-title">Have a project in <span className="ax-shimmer">mind?</span></h2>
            <Link to="/contact" className="ax-btn ax-btn--solid">
              Start a project <span className="ax-btn-arrow">→</span>
            </Link>
          </div>

        </section>
      </div>

      <style>{projectSectionStyles + `
        .pp-outer { background: #FFFFFF; padding: 0 0.15rem; }
        .pp-section {
          position: relative; background: #000000; padding: 4rem 5%;
          border-top: 1px solid #333333;
        }

        /* Filters */
        .pp-toolbar {
          display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;
          margin-bottom: 3rem;
        }
        .pp-filters { display: flex; gap: 0.6rem; flex-wrap: wrap; }
        .pp-filter {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px; border-radius: 30px; cursor: pointer;
          background: transparent; border: 1px solid #333333; color: #BBBBBB;
          font-family: 'Hind', sans-serif; font-size: 0.85rem;
          transition: background 0.35s ease, color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, transform 0.2s ease;
        }
        .pp-filter:hover { border-color: #00A3FF; color: #FFFFFF; }
        .pp-filter:active { transform: scale(0.96); }
        .pp-filter.is-active {
          background: #FFFFFF; border-color: #FFFFFF; color: #000000; font-weight: 600;
          box-shadow: 0 0 24px -4px rgba(0,163,255,0.7);
        }
        .pp-filter-count {
          min-width: 20px; height: 20px; padding: 0 6px; box-sizing: border-box; border-radius: 10px;
          display: inline-flex; align-items: center; justify-content: center;
          background: #1F1F1F; color: #888888; font-size: 0.7rem;
          transition: background 0.35s ease, color 0.35s ease;
        }
        .pp-filter.is-active .pp-filter-count { background: #00A3FF; color: #000000; }
        .pp-showing { margin: 0; color: #777777; font-family: 'Hind', sans-serif; font-size: 0.85rem; }
        .pp-showing strong { color: #00A3FF; }

        /* Grid */
        .pp-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem; }
        .pp-item { animation: ppIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i) * 0.1s) both; }
        @keyframes ppIn {
          from { opacity: 0; transform: translateY(40px) scale(0.97); filter: blur(6px); }
          to   { opacity: 1; transform: none; filter: none; }
        }

        /* Other projects (logo links) */
        .pp-other { margin-top: 5.5rem; }
        .pp-other-head { margin-bottom: 2.25rem; }
        .pp-other-title {
          color: #FFFFFF; font-family: 'Inknut Antiqua', serif; font-weight: 400;
          font-size: 2.2rem; line-height: 1.3; margin: 0.4rem 0 0.6rem;
        }
        .pp-other-sub { margin: 0; color: #8A8A8A; font-family: 'Hind', sans-serif; font-size: 0.95rem; }

        .pp-other-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .pp-other-card {
          position: relative; display: flex; flex-direction: column; gap: 1rem;
          padding: 14px 14px 18px; border-radius: 18px;
          background: #0D0D0D; border: 1px solid #222222;
          color: #FFFFFF; text-decoration: none;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease, box-shadow 0.45s ease;
        }
        .pp-other-card:hover, .pp-other-card:focus-visible {
          transform: translateY(-8px); border-color: #00A3FF; outline: none;
          box-shadow: 0 22px 44px -18px rgba(0, 163, 255, 0.55);
        }
        /* white tile so every logo (light or dark) looks clean */
        .pp-other-logo {
          display: flex; align-items: center; justify-content: center;
          height: 150px; padding: 16px; box-sizing: border-box;
          border-radius: 12px; background: #FFFFFF; overflow: hidden;
        }
        .pp-other-logo img {
          max-width: 100%; max-height: 100%; object-fit: contain;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pp-other-card:hover .pp-other-logo img { transform: scale(1.07); }
        .pp-other-info { display: flex; flex-direction: column; gap: 4px; padding: 0 4px; padding-right: 36px; min-width: 0; }
        .pp-other-name { font-family: 'Hind', sans-serif; font-weight: 600; font-size: 1.02rem; line-height: 1.3; }
        .pp-other-domain {
          font-family: 'Hind', sans-serif; font-size: 0.82rem; color: #00A3FF;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0;
        }
        .pp-other-arrow {
          position: absolute; right: 16px; bottom: 18px;
          width: 30px; height: 30px; border-radius: 50%;
          display: grid; place-items: center; font-size: 0.9rem;
          border: 1px solid #333333; color: #FFFFFF;
          transition: background 0.35s ease, border-color 0.35s ease, color 0.35s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pp-other-card:hover .pp-other-arrow {
          background: #00A3FF; border-color: #00A3FF; color: #000000; transform: rotate(45deg);
        }

        /* CTA */
        .pp-cta {
          position: relative; overflow: hidden; margin-top: 5rem;
          padding: 4rem 2rem; border-radius: 20px; border: 1px solid #222222;
          display: flex; flex-direction: column; align-items: center; text-align: center;
          background: #0A0A0A;
        }
        .pp-cta-glow {
          position: absolute; bottom: -180px; left: 50%; width: 700px; height: 360px;
          transform: translateX(-50%); border-radius: 50%; pointer-events: none;
          background: radial-gradient(ellipse, rgba(0,163,255,0.22), transparent 70%);
          animation: ppBreath 6s ease-in-out infinite;
        }
        .pp-cta > *:not(.pp-cta-glow) { position: relative; }
        .pp-cta-title {
          color: #FFFFFF; font-family: 'Inknut Antiqua', serif; font-weight: 400;
          font-size: 2.4rem; line-height: 1.3; margin: 0 0 2rem;
        }
        @keyframes ppBreath { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }

        @media (max-width: 1024px) {
          .pp-other-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 860px) {
          .pp-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .pp-cta-title { font-size: 1.8rem; }
          .pp-other { margin-top: 4rem; }
          .pp-other-title { font-size: 1.7rem; }
        }
        @media (max-width: 480px) {
          .pp-other-grid { gap: 0.8rem; }
          .pp-other-card { padding: 10px 10px 14px; border-radius: 14px; }
          .pp-other-logo { height: 110px; padding: 10px; }
          .pp-other-name { font-size: 0.92rem; }
          .pp-other-domain { font-size: 0.74rem; }
          .pp-other-info { padding-right: 0; }
          .pp-other-arrow { width: 24px; height: 24px; top: 16px; right: 16px; bottom: auto; font-size: 0.75rem; background: rgba(0,0,0,0.55); border-color: rgba(255,255,255,0.25); }
        }
      `}</style>
    </main>
  );
};

export default PortfolioPage;