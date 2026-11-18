// src/pages/About/sections/CTA.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-bg-text" aria-hidden="true">
        <span>LET'S BUILD ✦ LET'S BUILD ✦ LET'S BUILD ✦ LET'S BUILD ✦&nbsp;</span>
        <span>LET'S BUILD ✦ LET'S BUILD ✦ LET'S BUILD ✦ LET'S BUILD ✦&nbsp;</span>
      </div>

      <div className="container">
        <h2 className="cta-title">
          <span className="title-line reveal"><span>Have a project</span></span>
          <span className="title-line reveal" style={{ '--d': '150ms' }}>
            <span className="outline-text">In mind?</span>
          </span>
        </h2>

        <div className="cta-actions reveal" style={{ '--d': '300ms' }}>
          <Link to="/book-meeting" className="btn-cta">
            Start a project <span className="arrow">→︎</span>
          </Link>
          <a href="mailto:Artxdevllc@gmail.com" className="cta-email">
            Artxdevllc@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
