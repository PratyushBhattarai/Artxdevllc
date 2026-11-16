// src/pages/Services/sections/CoreServices.jsx
import React from 'react';

// Edit the list of core services here
const CORE = [
  {
    title: 'Website Design',
    desc: 'Premium, on-brand layouts built to turn visitors into enquiries.',
    tags: ['UI/UX', 'Figma', 'Branding'],
  },
  {
    title: 'Website Development',
    desc: 'Fast, responsive, SEO-ready sites that are easy to keep up to date.',
    tags: ['React', 'CMS', 'SEO'],
  },
  {
    title: 'Web Apps',
    desc: 'Dashboards, portals and custom tools that run your business online.',
    tags: ['SaaS', 'Portals', 'APIs'],
  },
  {
    title: 'Mobile Apps',
    desc: 'Native and cross-platform apps for iOS and Android.',
    tags: ['iOS', 'Android', 'Cross-platform'],
  },
  {
    title: 'Marketing & SEO',
    desc: 'Get found on Google and turn traffic into real customers.',
    tags: ['SEO', 'Social', 'Analytics'],
  },
  {
    title: 'AI Automation',
    desc: 'Chatbots, workflows and integrations that save you real time.',
    tags: ['Chatbots', 'Workflows', 'Integrations'],
  },
];

const CoreServices = () => {
  return (
    <section className="svc-core" id="what-we-build">
      <div className="svc-container">
        <div className="svc-head svc-reveal">
          <p className="svc-eyebrow">[ WHAT WE BUILD ]</p>
          <h2 className="svc-title">
            Everything digital, <span className="svc-outline">under one roof.</span>
          </h2>
        </div>

        <div className="svc-core-list">
          {CORE.map((s, i) => (
            <div key={s.title} id={s.title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-")} className="svc-core-row svc-reveal" style={{ '--d': `${i * 80}ms` }}>
              <span className="svc-core-num">0{i + 1}</span>
              <h3 className="svc-core-title">{s.title}</h3>
              <p className="svc-core-desc">{s.desc}</p>
              <div className="svc-core-tags">
                {s.tags.map((t) => (
                  <span key={t} className="svc-tag">{t}</span>
                ))}
              </div>
              <span className="svc-core-arrow">↗</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
