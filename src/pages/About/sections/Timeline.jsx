// src/pages/About/sections/Timeline.jsx
import React from 'react';

const Timeline = () => {
  const milestones = [
    { year: "2024", title: "Artx Dev Founded", desc: "Started as a freelance studio in Kathmandu." },
    { year: "2025", title: "Artxdev Dev LLC", desc: "Formed in USA" },
    { year: "2025", title: "Artxdev Dev Pvt.Ltd", desc: "Formed in Nepal" },
    { year: "2026", title: "Artxdev Dev LLC", desc: "Formed in Wyoming" }
  ];

  return (
    <section className="timeline-section">
      <div className="container">
        <div className="reveal">
          <p className="timeline-label">Our story</p>
          <h2 className="section-title">How we got here</h2>
        </div>

        <div className="timeline-grid reveal">
          {milestones.map((item, index) => (
            <div key={index} className="timeline-item" style={{ '--d': `${300 + index * 200}ms` }}>
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
