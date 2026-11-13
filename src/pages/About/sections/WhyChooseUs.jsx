// src/pages/About/sections/WhyChooseUs.jsx
import React from 'react';
import whyChooseUsImg from '../../../assets/whychooseus.png'; // Your single image

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us-section">
      
      <div className="container">
        <div className="why-header">
          <div className="why-header-left">
            <p className="why-label">WHY ARTX</p>
            <h2 className="why-title">Why clients choose us</h2>
          </div>
          <div className="why-header-right">
            <p className="why-subtitle">What working with us actually feels like.</p>
          </div>
        </div>
      </div>

      {/* The Image block */}
      <div className="why-image-wrapper">
        <img 
          src={whyChooseUsImg} 
          alt="Why clients choose us cards" 
          className="full-block-img" 
        />
      </div>

    </section>
  );
};

export default WhyChooseUs;