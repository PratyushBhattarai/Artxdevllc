// src/pages/About/sections/WhyChooseUs.jsx
import React from 'react';

// Simple line icons (drawn with strokes so they can animate)
const icons = {
  layout: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M7 13h4v3H7z" />
      <path d="M14 13h3M14 16h3" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M10 13l-2 2 2 2M14 13l2 2-2 2" />
    </svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  ),
};

// Edit the card text here
const REASONS = [
  {
    icon: 'layout',
    title: 'Design that sells',
    desc: 'Every layout is built to turn visitors into enquiries, not just to look good.',
  },
  {
    icon: 'code',
    title: 'Clean, fast code',
    desc: 'Modern tech, fast load times and sites that are easy to keep up to date.',
  },
  {
    icon: 'chip',
    title: 'AI built in',
    desc: 'We add automation where it saves you real time — chatbots, workflows, integrations.',
  },
  {
    icon: 'user',
    title: 'One team, start to finish',
    desc: 'Design, build, launch and support — one point of contact the whole way.',
  },
];

// Moves the spotlight glow to follow the mouse inside a card
const trackMouse = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us-section">
      <div className="container">
        <div className="why-header reveal">
          <div className="why-header-left">
            <p className="why-label">WHY ARTX</p>
            <h2 className="why-title">Why clients choose us</h2>
          </div>
          <div className="why-header-right">
            <p className="why-subtitle">What working with us actually feels like.</p>
          </div>
        </div>

        <div className="why-grid">
          {REASONS.map((r, i) => (
            <article
              key={r.title}
              className="why-card reveal"
              style={{ '--d': `${i * 130}ms` }}
              onMouseMove={trackMouse}
            >
              <div className="why-card-top">
                <div className="why-icon">{icons[r.icon]}</div>
                <span className="why-num">0{i + 1}</span>
              </div>
              <h3 className="why-card-title">{r.title}</h3>
              <p className="why-card-desc">{r.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
