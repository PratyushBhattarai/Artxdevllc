// src/pages/About/sections/Timeline.jsx
import React from 'react';

const Timeline = () => {
  const milestones = [
    { year: "2024", title: "Artx Dev Founded", desc: "Started as a freelance studio in Kathmandu." },
    { year: "2025", title: "Artxdev Dev LLC", desc: "formed in Alabama" },
    { year: "2025", title: "Artxdev Dev Pvt.Ltd", desc: "formed" },
    { year: "2026", title: "Artxdev Dev LLC", desc: "formed in Wyoming" }
  ];

  return (
    <section className="timeline-section">
      <div className="container">
        <p className="timeline-label">Our story</p>
        <h2 className="section-title">How we got here</h2>
        
        <div className="timeline-grid">
          {milestones.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="dot"></div>
              <h3 className="timeline-year">[ {item.year} ]</h3>
              <h4 className="timeline-title">{item.title}</h4>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;