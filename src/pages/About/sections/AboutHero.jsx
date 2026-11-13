// src/pages/About/sections/AboutHero.jsx
import React from 'react';

const AboutHero = () => {
  return (
    <section className="about-hero-section">
      <div className="hero-container">
        
        <div className="hero-text-content">
          {/* Separate spans for different sizes */}
          <h1 className="hero-title">
            <span className="title-main">About</span>
            <span className="title-sub">Us.</span>
          </h1>
          
          <p className="hero-description">
            We are a leading IT company based in Kathmandu, Nepal. We
            are a team of 10+ individuals who are extremely dedicated and
            passionate about building digital products that drive success.
          </p>
          <button className="btn-solid-light">Start project<span className="arrow">→</span> </button>
        </div>

        <div className="hero-graphic-box">
          <div className="large-x-placeholder">X</div> 
        </div>
        
      </div>
    </section>
  );
};

export default AboutHero;