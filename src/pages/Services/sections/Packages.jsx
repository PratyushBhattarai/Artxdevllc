// src/pages/Services/sections/Packages.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import CountUp from './CountUp';

// Edit packages, prices and features here
const PACKAGES = [
  {
    name: 'Basic Website',
    tagline: 'Perfect for small businesses getting online.',
    price: 500,
    cta: 'Choose plan',
    features: [
      'Up to 5 custom pages',
      'Fully responsive design',
      'SEO optimization',
      'Contact forms',
      'Social media integration',
      'Cross-browser compatibility',
      '1 year free hosting & domain',
      '30 days of free support',
      'Full website ownership',
    ],
  },
  {
    name: 'E-Commerce Store',
    tagline: 'Everything you need to sell online.',
    price: 1000,
    featured: true,
    cta: 'Choose plan',
    features: [
      'Complete online store setup',
      'Product catalog (up to 50 products)',
      'Secure payment processing',
      'Customer account system',
      'Inventory management',
      'Order tracking system',
      'Email notifications',
      'Admin management panel',
      'SEO & marketing tools',
      'SSL certificate included',
    ],
  },
  {
    name: 'Enterprise Solution',
    tagline: 'Custom builds for growing companies.',
    price: 1500,
    plus: true,
    cta: 'Get a quote',
    features: [
      'Unlimited custom pages',
      'Advanced CMS integration',
      'Multi-language support',
      'Advanced security features',
      'Third-party integrations',
      'Analytics and reporting',
      'Scalable architecture',
      'Priority support',
      'Custom functionality',
      'Performance optimization',
    ],
  },
];

const trackMouse = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

const Packages = () => {
  return (
    <section className="svc-packages" id="packages">
      <div className="svc-container">
        <div className="svc-head svc-head-center svc-reveal">
          <p className="svc-eyebrow">[ PACKAGES ]</p>
          <h2 className="svc-title">
            Web development <span className="svc-outline">packages.</span>
          </h2>
          <p className="svc-sub">
            Choose the perfect solution for your business. All packages include
            professional support, SEO optimization and full ownership.
          </p>
        </div>

        <div className="svc-pack-grid">
          {PACKAGES.map((p, i) => (
            <div
              key={p.name}
              className={`svc-pack svc-reveal${p.featured ? ' is-featured' : ''}`}
              style={{ '--d': `${i * 150}ms` }}
              onMouseMove={trackMouse}
            >
              {p.featured && <span className="svc-pack-badge">Most popular</span>}

              <div className="svc-pack-head">
                <h3 className="svc-pack-name">{p.name}</h3>
                <p className="svc-pack-tagline">{p.tagline}</p>
                <div className="svc-pack-price">
                  <CountUp to={p.price} prefix="$" />
                  {p.plus && <span className="svc-pack-plus">+</span>}
                  <span className="svc-pack-once">one-time</span>
                </div>
              </div>

              <ul className="svc-pack-features">
                {p.features.map((f, j) => (
                  <li key={f} style={{ '--i': j }}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link to="/book-meeting" className={`svc-btn ${p.featured ? 'svc-btn-accent' : 'svc-btn-light'} svc-btn-block`}>
                {p.cta} <span className="svc-arrow">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
