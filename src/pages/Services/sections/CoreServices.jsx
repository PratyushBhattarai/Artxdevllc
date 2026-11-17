// src/pages/Services/sections/CoreServices.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Edit the list of core services here.
//   desc     – short line shown in the row
//   details  – longer description shown when the row is clicked / tapped
//   includes – checklist shown under the details
const CORE = [
  {
    title: 'Website Design',
    desc: 'Premium, on-brand layouts built to turn visitors into enquiries.',
    tags: ['UI/UX', 'Figma', 'Branding'],
    details:
      'We design custom, mobile-first websites around your brand and your customers. Every page is planned to guide visitors toward one clear action – a call, a booking or a purchase – so your site works as hard as you do.',
    includes: ['Custom layouts – no templates', 'Mobile-first, responsive design', 'Brand-matched colours & typography', 'Clickable prototype before we build'],
  },
  {
    title: 'Website Development',
    desc: 'Fast, responsive, SEO-ready sites that are easy to keep up to date.',
    tags: ['React', 'CMS', 'SEO'],
    details:
      'We turn designs into fast, secure websites built on modern technology – with the SEO basics done right from day one and a simple way for you to update your own content without calling a developer.',
    includes: ['React or CMS builds', 'Speed & performance optimisation', 'On-page SEO & analytics setup', 'Easy content editing for your team'],
  },
  {
    title: 'Web Apps',
    desc: 'Dashboards, portals and custom tools that run your business online.',
    tags: ['SaaS', 'Portals', 'APIs'],
    details:
      'Custom web applications that replace spreadsheets and manual work – customer portals, booking systems, dashboards and internal tools, designed around how your business actually runs and built to grow with it.',
    includes: ['User accounts & roles', 'Dashboards & reporting', 'Payments & third-party APIs', 'Secure cloud deployment'],
  },
  {
    title: 'Mobile Apps',
    desc: 'Native and cross-platform apps for iOS and Android.',
    tags: ['iOS', 'Android', 'Cross-platform'],
    details:
      'Apps for iPhone and Android from a single codebase – designed for smooth everyday use, connected to your website or backend, and taken all the way through to launch on the App Store and Google Play.',
    includes: ['iOS + Android from one codebase', 'Push notifications', 'App Store & Play Store launch', 'Connected to your website or backend'],
  },
  {
    title: 'Marketing & SEO',
    desc: 'Get found on Google and turn traffic into real customers.',
    tags: ['SEO', 'Social', 'Analytics'],
    details:
      'We help the right customers find you – fixing technical SEO, targeting the searches that matter for your business, and tracking which channels actually bring in leads so your budget goes where it works.',
    includes: ['Technical & on-page SEO', 'Google Business Profile', 'Content & social media', 'Clear monthly reporting'],
  },
  {
    title: 'AI Automation',
    desc: 'Chatbots, workflows and integrations that save you real time.',
    tags: ['Chatbots', 'Workflows', 'Integrations'],
    details:
      'Practical AI that saves your team hours every week – website chatbots that answer customers around the clock, and automations that connect the tools you already use so repetitive work happens on its own.',
    includes: ['AI chatbots for your website', 'Workflow automation', 'CRM & email integrations', 'Custom AI assistants'],
  },
  {
    title: 'Hosting & Maintenance',
    desc: 'Fast, secure hosting with updates, backups and support handled for you.',
    tags: ['Hosting', 'Backups', 'Support'],
    details:
      'We keep your website fast, secure and online – managed hosting, regular updates and backups, and quick help whenever something needs fixing or changing, so you never have to worry about the technical side.',
    includes: ['Managed hosting & SSL', 'Regular backups', 'Security & software updates', 'Uptime monitoring & quick fixes'],
  },
];

// "Marketing & SEO" -> "marketing-and-seo" (used for /services#... links)
const slug = (title) => title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-');

const CoreServices = () => {
  const [active, setActive] = useState(null); // index of the open service (only one at a time)
  const location = useLocation();

  // Click (or tap) a service to open it; click it again to close it.
  // Opening one closes the others. Moving the mouse never changes what's open.
  const handleClick = (i) => setActive((cur) => (cur === i ? null : i));

  // Opening /services#web-apps (e.g. from the navbar) opens that service
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    const index = CORE.findIndex((s) => slug(s.title) === id);
    if (index >= 0) setActive(index);
  }, [location.key, location.hash]);

  return (
    <section className="svc-core" id="what-we-build">
      <div className="svc-container">
        <div className="svc-head svc-reveal">
          <p className="svc-eyebrow">[ WHAT WE BUILD ]</p>
          <h2 className="svc-title">
            Everything digital, <span className="svc-outline">under one roof.</span>
          </h2>
          <p className="svc-core-hint">Click a service to see what's included.</p>
        </div>

        {/* A description stays open until another service is clicked */}
        <div className="svc-core-list">
          {CORE.map((s, i) => {
            const isOpen = active === i;
            const panelId = `svc-core-panel-${i}`;
            return (
              // Outer div only handles the scroll fade-in (its class is never changed by React,
              // so the "is-visible" class added on scroll is kept). Inner div handles open/close.
              <div key={s.title} className="svc-reveal" style={{ '--d': `${i * 80}ms` }}>
              <div className={`svc-core-item${isOpen ? ' is-open' : ''}`}>
                {/* Row – also a button so it works with tap (phones) and keyboard */}
                <div
                  id={slug(s.title)}
                  className={`svc-core-row${isOpen ? ' is-active' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => handleClick(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(isOpen ? null : i); }
                  }}
                >
                  <span className="svc-core-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="svc-core-title">{s.title}</h3>
                  <p className="svc-core-desc">{s.desc}</p>
                  <div className="svc-core-tags">
                    {s.tags.map((t) => (
                      <span key={t} className="svc-tag">{t}</span>
                    ))}
                  </div>
                  <span className="svc-core-arrow" aria-hidden="true">↗</span>
                </div>

                {/* Detailed description – slides open below the row */}
                <div className="svc-core-panel" id={panelId} role="region" aria-label={`${s.title} details`}>
                  <div className="svc-core-panel-inner">
                    <div className="svc-core-panel-body">
                      <p className="svc-core-details">{s.details}</p>
                      <div className="svc-core-includes">
                        <span className="svc-core-includes-label">What's included</span>
                        <ul>
                          {s.includes.map((item, j) => (
                            <li key={item} style={{ '--j': j }}>
                              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link
                        to="/book-meeting"
                        className="svc-core-cta"
                        tabIndex={isOpen ? 0 : -1}
                      >
                        Discuss this service <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
