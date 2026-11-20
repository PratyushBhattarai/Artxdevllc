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
// Logos taken from each company's own website
import logoDeConstruction from '../../assets/de-construction-logo.png';
import logoTotalLandscape from '../../assets/total-landscape-solutions-logo.png';
import logoMitchells from '../../assets/mitchells-logo.png';
import Arrow from '../../components/Arrow';

// "Other projects we've built" – logo + short description; clicking a card opens the live website
const otherProjects = [
  { name: 'Trikore Services', url: 'https://www.trikoreservices.com/', logo: logoTrikore,
    desc: 'A clean, modern business website that presents their services clearly and makes it easy for customers to get in touch.' },
  { name: 'Sam Landscaping SVCS', url: 'https://landscapinginsandiego.com/', logo: logoSamLandscaping,
    desc: 'A landscaping website for San Diego homeowners – services, past work and a quick way to request a free estimate.' },
  { name: 'Habiff Builders Group', url: 'https://hbgtexas.com/', logo: logoHabiff,
    desc: 'A professional site for a Texas builders group, showcasing their construction projects and building services.' },
  { name: 'Carolina Stump Services', url: 'https://carolinastumpservices.com/', logo: logoCarolinaStump,
    desc: 'A simple, fast website for a stump grinding and removal company, built to bring in local service calls.' },
  { name: 'DE Construction', url: 'https://deconstructionph.com/', logo: logoDeConstruction,
    desc: 'A construction company website presenting their services, completed projects and contact details in one place.' },
  { name: 'Total Landscape Solutions', url: 'https://www.totallandscapesolution.com/', logo: logoTotalLandscape,
    desc: 'A landscaping and outdoor services website with clear service pages and an easy quote request for new clients.' },
  { name: "Mitchell's Handyman Service", url: 'https://mitchellshandymanservice.com/', logo: logoMitchells,
    desc: 'A website for a trusted handyman in Richlands, NC – drywall, painting, decks, fencing and pressure washing, with a project gallery and quick quote requests.' },
  // A project without a logo file shows a name tile instead. Add  logo: yourImport  to use an image,
  // and optionally  mark: 'AB'  to choose the letters on the name tile.
];

// "Total Landscape Solutions" -> "TLS" (used when there's no logo image)
const initials = (name) => name.split(/\s+/).map((w) => w[0]).join('').slice(0, 3).toUpperCase();


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
    projectLink: 'https://actstexas.com/',
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

        </section>
      </div>

      <div className="pp-outer pp-outer--dark">
        <section className="pp-section pp-section--dark">
          {/* Other projects – logo + short description */}
          <div className="pp-other">
            <div className="pp-other-head" data-reveal="up">
              <p className="ax-eyebrow">More work</p>
              <h2 className="pp-other-title">Other projects we've built</h2>
              <p className="pp-other-sub">A few more websites we've designed and developed. Click a card to visit the live site.</p>
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
                  <span className={`pp-other-logo${p.logo ? '' : ' pp-other-logo--text'}`}>
                    {p.logo ? (
                      <img src={p.logo} alt={`${p.name} logo`} loading="lazy" decoding="async" />
                    ) : (
                      <span className="pp-other-mark" aria-hidden="true">
                        <span className="pp-other-initials">{p.mark || initials(p.name)}</span>
                        <span className="pp-other-wordmark">{p.name}</span>
                      </span>
                    )}
                  </span>
                  <span className="pp-other-info">
                    <span className="pp-other-name">{p.name}</span>
                    <span className="pp-other-desc">{p.desc}</span>
                  </span>
                  <span className="pp-other-arrow" aria-hidden="true"><Arrow dir="up-right" /></span>
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
              Start a project <span className="ax-btn-arrow"><Arrow /></span>
            </Link>
          </div>

        </section>
      </div>

      <style>{projectSectionStyles + `
        .pp-outer { background: #FFFFFF; }
        .pp-section { position: relative; background: #FFFFFF; padding: 4.5rem 5% 5rem; }
        .pp-outer--dark { background: #000000; }
        .pp-section--dark { background: #000000; padding: 5rem 5% 5rem; }

        /* project cards on white */
        .pp-section:not(.pp-section--dark) .ps-title { color: #0A0A0A; }
        .pp-section:not(.pp-section--dark) .ps-category { color: #777777; }
        .pp-section:not(.pp-section--dark) .ps-media { border-color: #E5E5E5; }
        .pp-section:not(.pp-section--dark) .ps-arrow { border-color: #D4D4D4; color: #0A0A0A; }
        .pp-section:not(.pp-section--dark) .ps-card:hover .ps-arrow {
          background: #0A0A0A; border-color: #0A0A0A; color: #FFFFFF; box-shadow: none;
        }
        .pp-section:not(.pp-section--dark) .ps-media:hover { border-color: #0A0A0A; box-shadow: 0 24px 50px -28px rgba(0,0,0,0.5); }

        /* Filters */
        .pp-toolbar {
          display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;
          margin-bottom: 3rem;
        }
        .pp-filters { display: flex; gap: 0.6rem; flex-wrap: wrap; }
        .pp-filter {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px; border-radius: 30px; cursor: pointer;
          background: transparent; border: 1px solid #DADADA; color: #444444;
          font-family: 'Hind', sans-serif; font-size: 0.85rem;
          transition: background 0.35s ease, color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, transform 0.2s ease;
        }
        .pp-filter:hover { border-color: #0A0A0A; color: #0A0A0A; }
        .pp-filter:active { transform: scale(0.96); }
        .pp-filter.is-active {
          background: #0A0A0A; border-color: #0A0A0A; color: #FFFFFF; font-weight: 600;
        }
        .pp-filter-count {
          min-width: 20px; height: 20px; padding: 0 6px; box-sizing: border-box; border-radius: 10px;
          display: inline-flex; align-items: center; justify-content: center;
          background: #EFEFEF; color: #777777; font-size: 0.7rem;
          transition: background 0.35s ease, color 0.35s ease;
        }
        .pp-filter.is-active .pp-filter-count { background: #FFFFFF; color: #0A0A0A; }
        .pp-showing { margin: 0; color: #777777; font-family: 'Hind', sans-serif; font-size: 0.85rem; }
        .pp-showing strong { color: #0A0A0A; }

        /* Grid */
        .pp-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem; }
        .pp-item { animation: ppIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i) * 0.1s) both; }
        @keyframes ppIn {
          from { opacity: 0; transform: translateY(40px) scale(0.97); filter: blur(6px); }
          to   { opacity: 1; transform: none; filter: none; }
        }

        /* Other projects (logo links) */
        .pp-other { margin-top: 0; }
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
        .pp-other-card:hover { transform: translateY(-4px); border-color: #3A3A3A; }
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

        /* Name tile – used until a real logo image is added */
        .pp-other-logo--text {
          background: linear-gradient(135deg, #0B0B0B 0%, #10202E 100%);
          border: 1px solid #1F1F1F;
        }
        .pp-other-mark {
          display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pp-other-card:hover .pp-other-mark { transform: scale(1.07); }
        .pp-other-initials {
          display: grid; place-items: center;
          min-width: 54px; height: 54px; padding: 0 10px; box-sizing: border-box;
          border-radius: 14px; background: #FFFFFF; color: #000000;
          font-family: 'Inter', sans-serif; font-weight: 800; font-size: 1.15rem; letter-spacing: 1px;
          box-shadow: 0 8px 24px -10px rgba(0, 163, 255, 0.6);
        }
        .pp-other-wordmark {
          color: #FFFFFF; font-family: 'Inter', sans-serif; font-weight: 700;
          font-size: 0.82rem; letter-spacing: 1.5px; text-transform: uppercase; line-height: 1.3;
        }
        .pp-other-info { display: flex; flex-direction: column; gap: 6px; padding: 0 4px; min-width: 0; }
        .pp-other-card { cursor: pointer; }
        .pp-other-card:focus-visible { outline: 2px solid #FFFFFF; outline-offset: 3px; }
        .pp-other-name { font-family: 'Hind', sans-serif; font-weight: 600; font-size: 1.02rem; line-height: 1.3; }
        /* short description – 3 lines */
        .pp-other-desc {
          font-family: 'Hind', sans-serif; font-size: 0.86rem; line-height: 1.5; color: #9A9A9A;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
        .pp-other-arrow {
          position: absolute; top: 22px; right: 22px; z-index: 2;
          width: 30px; height: 30px; border-radius: 50%;
          display: grid; place-items: center; font-size: 0.9rem;
          background: rgba(0,0,0,0.7); border: 1px solid rgba(255,255,255,0.2); color: #FFFFFF;
          transition: background 0.35s ease, border-color 0.35s ease, color 0.35s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pp-other-card:hover .pp-other-arrow {
          background: #FFFFFF; border-color: #FFFFFF; color: #000000; transform: rotate(45deg);
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
          background: radial-gradient(ellipse, rgba(255,255,255,0.08), transparent 70%);
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
          .pp-other-desc { font-size: 0.78rem; }
        }
      `}</style>
    </main>
  );
};

export default PortfolioPage;