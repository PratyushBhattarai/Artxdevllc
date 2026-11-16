// src/pages/Services/sections/ServicesCTA.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ServicesCTA = () => {
  return (
    <section className="svc-cta">
      <div className="svc-cta-bg" aria-hidden="true">
        <span>LET'S TALK ✦ LET'S TALK ✦ LET'S TALK ✦ LET'S TALK ✦&nbsp;</span>
        <span>LET'S TALK ✦ LET'S TALK ✦ LET'S TALK ✦ LET'S TALK ✦&nbsp;</span>
      </div>

      <div className="svc-container svc-cta-inner">
        <h2 className="svc-cta-title">
          <span className="svc-line svc-reveal"><span>Ready to get</span></span>
          <span className="svc-line svc-reveal" style={{ '--d': '150ms' }}>
            <span className="svc-outline">started?</span>
          </span>
        </h2>

        <p className="svc-cta-sub svc-reveal" style={{ '--d': '250ms' }}>
          Let's discuss your project and find the perfect solution for your business.
          Contact us today for a free consultation.
        </p>

        <div className="svc-hero-actions svc-reveal" style={{ '--d': '350ms' }}>
          <Link to="/book-meeting" className="svc-btn svc-btn-accent">
            Start your project <span className="svc-arrow">→</span>
          </Link>
          <Link to="/contact" className="svc-btn svc-btn-ghost">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;
