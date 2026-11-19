// src/pages/About/sections/MissionVision.jsx
import React from 'react';

const MissionVision = () => {
  return (
    <section className="mission-vision-section bg-white text-black">
      <div className="container grid-2-cols">
        <div className="card mission-card reveal">
          <span className="card-label">01 — Our Mission</span>
          <h2>To Help Businesses look premium and work smarter online - through thoughtful design, clean code and practical AI.</h2>
        </div>
        <div className="card vision-card bg-dark-gray text-white reveal" style={{ '--d': '150ms' }}>
          <span className="card-label">02 — Our Vision</span>
          <h2>To be the studio growing businesses trust first for everything digital.</h2>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
