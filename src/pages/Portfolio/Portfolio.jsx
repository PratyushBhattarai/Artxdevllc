// src/pages/Portfolio/Portfolio.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';

import PageEffects from '../../components/PageEffects';
import PortfolioHero from './sections/PortfolioHero';
import ProjectSection, { projectSectionStyles } from './sections/ProjectSection';

const projects = [
  {
    title: 'Seabrook Texas Town',
    category: 'Web App',
    description: 'A complete digital overhaul for a coastal town. We built a custom booking system, integrated local business directories, and designed a stunning visual experience.',
    videoUrl: '/videos/seabrook.mp4',
    projectLink: 'https://seabrooktexastown.com/',
  },
  {
    title: 'ACTS',
    category: 'Website',
    description: 'A robust, secure platform for a national organization. We focused on accessibility, fast load times, and a clean user interface.',
    videoUrl: null,
    projectLink: 'https://example.com',
  },
  {
    title: 'AI Automation Platform',
    category: 'AI System',
    description: 'We developed a custom AI dashboard for a logistics company, automating their entire inventory tracking process.',
    videoUrl: null,
    projectLink: 'https://example.com',
  },
  {
    title: 'E-Commerce Store',
    category: 'Shopify',
    description: 'A high-converting e-commerce store with custom animations and a seamless checkout experience.',
    videoUrl: null,
    projectLink: 'https://example.com',
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
                  videoUrl={project.videoUrl}
                  projectLink={project.projectLink}
                  index={projects.indexOf(project)}
                />
              </div>
            ))}
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

        @media (max-width: 860px) {
          .pp-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .pp-cta-title { font-size: 1.8rem; }
        }
      `}</style>
    </main>
  );
};

export default PortfolioPage;