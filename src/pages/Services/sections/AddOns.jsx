// src/pages/Services/sections/AddOns.jsx
import React from 'react';

// Line icons drawn with strokes so they can animate
const icons = {
  design: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.4-4-7.8-9-7.8z" />
      <circle cx="7.5" cy="11" r="1.2" />
      <circle cx="10.5" cy="7" r="1.2" />
      <circle cx="15" cy="7.5" r="1.2" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9l-3.8 3.8z" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
      <path d="M8 11h6M11 8v6" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20h16" />
      <path d="M7 16v-4M12 16V6M17 16v-7" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </svg>
  ),
};

// Edit add-on services here
const ADDONS = [
  { icon: 'design', title: 'UI/UX Design', desc: 'Custom design solutions that enhance user experience and drive conversions.' },
  { icon: 'mobile', title: 'Mobile Apps', desc: 'Native and cross-platform mobile applications for iOS and Android.' },
  { icon: 'wrench', title: 'Maintenance', desc: 'Ongoing website maintenance, updates and technical support.' },
  { icon: 'search', title: 'SEO Services', desc: "Search engine optimization to improve your website's visibility." },
  { icon: 'chart', title: 'Analytics Setup', desc: 'Comprehensive analytics implementation and reporting dashboards.' },
  { icon: 'briefcase', title: 'Consulting', desc: 'Strategic digital consulting to help grow your online presence.' },
];

const trackMouse = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

const AddOns = () => {
  return (
    <section className="svc-addons" id="add-ons">
      <div className="svc-container">
        <div className="svc-head svc-head-split svc-reveal">
          <div>
            <p className="svc-eyebrow">[ ADD-ONS ]</p>
            <h2 className="svc-title svc-title-dark">Additional services</h2>
          </div>
          <p className="svc-sub svc-sub-dark">
            Enhance your web presence with our specialized services.
          </p>
        </div>

        <div className="svc-addon-grid">
          {ADDONS.map((a, i) => (
            <article
              key={a.title}
              className="svc-addon svc-reveal"
              style={{ '--d': `${i * 100}ms` }}
              onMouseMove={trackMouse}
            >
              <div className="svc-addon-top">
                <div className="svc-icon">{icons[a.icon]}</div>
                <span className="svc-addon-num">0{i + 1}</span>
              </div>
              <h3 className="svc-addon-title">{a.title}</h3>
              <p className="svc-addon-desc">{a.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AddOns;
