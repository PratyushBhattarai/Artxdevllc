// src/pages/About/sections/Companies.jsx
import React, { useEffect, useState } from 'react';
import artxLogo from '../../../assets/artx-logo.png';

const COMPANIES = [
  {
    name: 'Artx Dev LLC',
    subtitle: 'Where we serve and help business grow',
    address: '30 N Gould Ste R, Sheridan Wyoming 82801',
    country: 'USA',
    timeZone: 'America/Denver',
  },
  {
    name: 'Artx Dev Pvt ltd',
    subtitle: 'Where we plan and work',
    address: 'Shital height Imadol Mahalaxmi,Lalitpur Nepal',
    country: 'Nepal',
    timeZone: 'Asia/Kathmandu',
  },
];

// Live local time for each office, ticking every second
const useNow = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
};

const Companies = () => {
  const now = useNow();

  return (
    <section className="companies-section">
      <div className="container">
        <h2 className="companies-title reveal">
          One Studio. <span className="outline-text">Two Companies.</span>
        </h2>

        <div className="companies-grid">
          {COMPANIES.map((c, i) => (
            <div key={c.name} className="company-card reveal" style={{ '--d': `${i * 150}ms` }}>
              <div className="card-top-row">
                <img src={artxLogo} alt="ArtX Logo" className="company-logo" />
                <span className="company-badge">
                  <span className="live-dot" /> {c.country} ·{' '}
                  {now.toLocaleTimeString('en-US', {
                    timeZone: c.timeZone,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </span>
              </div>

              <div className="card-main-content">
                <h3>{c.name}</h3>
                <p className="company-subtitle">{c.subtitle}</p>
              </div>

              <div className="card-footer">
                <p>{c.address}</p>
                <span className="card-arrow">↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
