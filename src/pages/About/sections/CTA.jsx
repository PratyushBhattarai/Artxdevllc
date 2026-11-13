// src/pages/About/sections/CTA.jsx
import React from 'react';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <h2 className="cta-title">
          Have a project<br />In mind
        </h2>
        
        <div className="cta-actions">
          <button className="btn-cta">
            Start a project <span className="arrow">→</span>
          </button>
          <a href="mailto:Artxdevllc@gmail.com" className="cta-email">
            Artxdevllc@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

// THIS LINE IS CRITICAL TO FIX THE ERROR
export default CTA;