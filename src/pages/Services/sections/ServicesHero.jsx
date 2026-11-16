// src/pages/Services/sections/ServicesHero.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HIGHLIGHTS = [
  { value: '3', label: 'Website packages' },
  { value: '6', label: 'Add-on services' },
  { value: '30', label: 'Days free support' },
  { value: '100%', label: 'Full ownership' },
];

const ServicesHero = () => {
  return (
    <section className="svc-hero">
      <div className="svc-grid-bg" aria-hidden="true" />
      <div className="svc-glow" aria-hidden="true" />

      <div className="svc-container svc-hero-inner">
        <div className="svc-hero-text">
          <p className="svc-pill">
            <span className="svc-dot" /> What we do
          </p>

          <h1 className="svc-hero-title">
            <span className="svc-line"><span>Our</span></span>
            <span className="svc-line"><span className="svc-outline svc-shine">Services.</span></span>
          </h1>

          <p className="svc-hero-sub">
            Professional web development solutions tailored to your business needs.
            From simple websites to complex applications — designed, built and
            supported by one team.
          </p>

          <div className="svc-hero-actions">
            <a href="#packages" className="svc-btn svc-btn-accent">
              View packages <span className="svc-arrow">→</span>
            </a>
            <Link to="/book-meeting" className="svc-btn svc-btn-ghost">
              Book a free call
            </Link>
          </div>
        </div>

        {/* Rotating circular badge */}
        <div className="svc-badge" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="svc-badge-text">
            <defs>
              <path id="svcCircle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
            </defs>
            <text>
              <textPath href="#svcCircle" textLength="486" lengthAdjust="spacing">
                DESIGN ✦ DEVELOP ✦ LAUNCH ✦ SUPPORT ✦ GROW ✦
              </textPath>
            </text>
          </svg>
          <div className="svc-badge-core">
            <span>✦</span>
          </div>
          <div className="svc-badge-ring" />
        </div>
      </div>

      <div className="svc-container">
        <div className="svc-highlights">
          {HIGHLIGHTS.map((h, i) => (
            <div key={h.label} className="svc-highlight" style={{ '--d': `${900 + i * 120}ms` }}>
              <span className="svc-highlight-value">{h.value}</span>
              <span className="svc-highlight-label">{h.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
