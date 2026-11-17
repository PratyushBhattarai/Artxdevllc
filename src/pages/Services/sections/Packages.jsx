// src/pages/Services/sections/Packages.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CountUp from './CountUp';

/*
  Edit packages, prices and features here.
  Each package:
    price  – a number (shown as $price) … or leave it out to show priceLabel instead
    priceLabel – text shown when there is no fixed price (e.g. 'Custom quote')
    cta        – button text (every button opens the Contact form with this plan chosen)
*/
const GROUPS = [
  {
    id: 'web',
    tab: 'Web Development',
    title: 'Web development',
    outline: 'packages.',
    sub: 'Choose the perfect solution for your business. All packages include professional support, SEO optimization and full ownership.',
    packages: [
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
        plus: true,
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
        cta: 'Consult With Expert',
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
    ],
  },
  {
    id: 'seo',
    tab: 'SEO',
    title: 'SEO',
    outline: 'packages.',
    sub: 'Get found on Google by the customers who are already searching for you. Every SEO plan is tailored to your business, so talk to an expert for a quote.',
    packages: [
      {
        name: 'SEO Starter',
        tagline: 'Get found in your local area.',
        priceLabel: 'Custom quote',
        cta: 'Consult with an expert',
        features: [
          'Full website SEO audit',
          'Keyword research',
          'On-page optimization',
          'Google Business Profile setup',
          'Google Analytics & Search Console',
          'Monthly progress report',
        ],
      },
      {
        name: 'SEO Growth',
        tagline: 'Climb the rankings and grow traffic.',
        priceLabel: 'Custom quote',
        featured: true,
        cta: 'Consult with an expert',
        features: [
          'Everything in SEO Starter',
          'Technical SEO fixes',
          'Content plan & blog optimization',
          'Local listings & citations',
          'Quality backlink building',
          'Competitor tracking',
          'Monthly strategy call',
        ],
      },
      {
        name: 'SEO Pro',
        tagline: 'For competitive markets and bigger goals.',
        priceLabel: 'Custom quote',
        cta: 'Consult with an expert',
        features: [
          'Everything in SEO Growth',
          'Advanced link building',
          'Conversion & lead tracking',
          'Multi-location SEO',
          'Dedicated SEO specialist',
          'Priority support',
        ],
      },
    ],
  },
  {
    id: 'hosting',
    tab: 'Hosting & Maintenance',
    title: 'Hosting &',
    outline: 'maintenance.',
    sub: 'Keep your website fast, secure and always online – we handle the technical side so you can focus on your business. Talk to an expert to find the right plan.',
    packages: [
      {
        name: 'Essential Care',
        tagline: 'Secure hosting for small websites.',
        priceLabel: 'Custom quote',
        cta: 'Consult with an expert',
        features: [
          'Managed hosting & SSL',
          'Regular backups',
          'Software & security updates',
          'Uptime monitoring',
          'Email support',
        ],
      },
      {
        name: 'Business Care',
        tagline: 'Hands-off care for growing businesses.',
        priceLabel: 'Custom quote',
        featured: true,
        cta: 'Consult with an expert',
        features: [
          'Everything in Essential Care',
          'Priority support',
          'Monthly content updates',
          'Speed & performance optimization',
          'Monthly website health report',
        ],
      },
      {
        name: 'Premium Care',
        tagline: 'Full support for business-critical sites.',
        priceLabel: 'Custom quote',
        cta: 'Consult with an expert',
        features: [
          'Everything in Business Care',
          'Dedicated account manager',
          'Advanced security & firewall',
          'Fastest response times',
          'Development hours for new features',
        ],
      },
    ],
  },
];

// Every package button opens the Contact form with that plan already chosen,
// so the form skips the service / budget / timeline questions.
const planLink = (p, group) => {
  const price = typeof p.price === 'number'
    ? `$${p.price.toLocaleString('en-US')}${p.plus ? '+' : ''}`
    : p.priceLabel || 'Custom quote';
  const params = new URLSearchParams({ plan: p.name, type: group.tab, price });
  return `/contact?${params.toString()}`;
};

const trackMouse = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

const Packages = () => {
  const [groupIndex, setGroupIndex] = useState(0);
  const group = GROUPS[groupIndex];

  return (
    <section className="svc-packages" id="packages">
      <div className="svc-container">
        <div className="svc-head svc-head-center svc-reveal">
          <p className="svc-eyebrow">[ PACKAGES ]</p>

          {/* Tabs: Web Development / SEO / Hosting & Maintenance */}
          <div
            className="svc-pack-tabs"
            role="tablist"
            aria-label="Package type"
            style={{ '--tab': groupIndex, '--tabs': GROUPS.length }}
          >
            <span className="svc-pack-tab-thumb" aria-hidden="true" />
            {GROUPS.map((g, i) => (
              <button
                key={g.id}
                type="button"
                role="tab"
                aria-selected={groupIndex === i}
                className={`svc-pack-tab${groupIndex === i ? ' is-active' : ''}`}
                onClick={() => setGroupIndex(i)}
              >
                {g.tab}
              </button>
            ))}
          </div>

          <h2 className="svc-title" key={`t-${group.id}`}>
            <span className="svc-pack-swap">
              {group.title} <span className="svc-outline">{group.outline}</span>
            </span>
          </h2>
          <p className="svc-sub svc-pack-swap" key={`s-${group.id}`}>{group.sub}</p>
        </div>

        {/* Outer div: scroll fade-in (never re-created). Inner grid: key changes with the
            tab, so the cards replay their entrance animation. */}
        <div className="svc-reveal">
        <div className="svc-pack-grid" key={group.id} role="tabpanel" aria-label={`${group.tab} packages`}>
          {group.packages.map((p, i) => (
            <div
              key={p.name}
              className={`svc-pack is-visible svc-pack-enter${p.featured ? ' is-featured' : ''}`}
              style={{ '--d': `${i * 120}ms` }}
              onMouseMove={trackMouse}
            >
              {p.featured && <span className="svc-pack-badge">Most popular</span>}

              <div className="svc-pack-head">
                <h3 className="svc-pack-name">{p.name}</h3>
                <p className="svc-pack-tagline">{p.tagline}</p>
                {typeof p.price === 'number' ? (
                  <div className="svc-pack-price">
                    <CountUp to={p.price} prefix="$" />
                    {p.plus && <span className="svc-pack-plus">+</span>}
                    <span className="svc-pack-once">one-time</span>
                  </div>
                ) : (
                  <div className="svc-pack-price svc-pack-price--quote">
                    {p.priceLabel || 'Custom quote'}
                    <span className="svc-pack-once">tailored to you</span>
                  </div>
                )}
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

              <Link to={planLink(p, group)} className={`svc-btn ${p.featured ? 'svc-btn-accent' : 'svc-btn-light'} svc-btn-block`}>
                {p.cta} <span className="svc-arrow">→</span>
              </Link>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
