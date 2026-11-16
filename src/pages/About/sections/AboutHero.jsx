// src/pages/About/sections/AboutHero.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Subtle 3D tilt of the logo box following the mouse
const handleTilt = (e) => {
  const box = e.currentTarget;
  const r = box.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  box.style.setProperty('--rx', `${-y * 10}deg`);
  box.style.setProperty('--ry', `${x * 10}deg`);
};

const resetTilt = (e) => {
  e.currentTarget.style.setProperty('--rx', '0deg');
  e.currentTarget.style.setProperty('--ry', '0deg');
};

const MARQUEE_ITEMS = [
  'Web Design',
  'Web Development',
  'Mobile Apps',
  'UI / UX',
  'Practical AI',
  'Branding',
];

const AboutHero = () => {
  return (
    <>
      <section className="about-hero-section">
        <div className="hero-bg-grid" aria-hidden="true" />

        <div className="hero-container">
          <div className="hero-text-content">
            <p className="hero-eyebrow">
              <span className="live-dot" /> Kathmandu · Wyoming
            </p>

            <h1 className="hero-title">
              <span className="title-line">
                <span className="title-main">About</span>
              </span>
              <span className="title-line">
                <span className="title-sub">Us.</span>
              </span>
            </h1>

            <p className="hero-description">
              We are a leading IT company based in Kathmandu, Nepal. We are a team of
              10+ individuals who are extremely dedicated and passionate about
              building digital products that drive success.
            </p>

            <Link to="/book-meeting" className="btn-solid-light">
              Start project <span className="arrow">→</span>
            </Link>
          </div>

          <div
            className="hero-graphic-box"
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
          >
            {/* Background animation layers */}
            <div className="hero-radar" aria-hidden="true" />
            <div className="hero-pulse" aria-hidden="true" />
            <div className="hero-pulse p2" aria-hidden="true" />
            <div className="hero-pulse p3" aria-hidden="true" />
            <div className="hero-ring" aria-hidden="true">
              <span className="orbit-dot" />
            </div>
            <div className="hero-ring ring-2" aria-hidden="true">
              <span className="orbit-dot small" />
            </div>
            <div className="hero-ring ring-3" aria-hidden="true" />

            {/* Transparent ArtX mark – drawn as SVG so there is no box behind it */}
            <svg
              className="hero-logo-svg"
              viewBox="0 0 200 240"
              role="img"
              aria-label="ArtX Logo"
            >
              <line className="stroke s1" x1="60" y1="10" x2="175" y2="228" />
              <line className="stroke s2" x1="140" y1="10" x2="25" y2="228" />
              <line className="stroke s3" x1="52" y1="172" x2="148" y2="172" />
            </svg>
          </div>
        </div>

        <div className="scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </section>

      <div className="about-marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="marquee-item">
              {item} <span className="marquee-star">✦</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutHero;
