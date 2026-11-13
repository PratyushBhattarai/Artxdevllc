// src/pages/About/sections/Companies.jsx
import React from 'react';
import artxLogo from '../../../assets/artx-logo.png'; 

const Companies = () => {
  return (
    <section className="companies-section">
      <div className="container">
        <h2 className="companies-title">One Studio.Two Companies</h2>
        
        <div className="companies-grid">
          
          {/* Card 1: USA */}
          <div className="company-card">
            
            {/* Top Row: Logo and Badge */}
            <div className="card-top-row">
              <img src={artxLogo} alt="ArtX Logo" className="company-logo" />
              <span className="company-badge">Artx Dev LLC</span>
            </div>

            {/* Middle Section: Title and Subtitle */}
            <div className="card-main-content">
              <h3>Artx Dev LLC</h3>
              <p className="company-subtitle">Where we serve and help business grow</p>
            </div>

            {/* Bottom Section: Address */}
            <div className="card-footer">
              <p>30 N Gould Ste R, Sheridan Wyoming 82801</p>
            </div>
          </div>

          {/* Card 2: Nepal */}
          <div className="company-card">
            
            <div className="card-top-row">
              <img src={artxLogo} alt="ArtX Logo" className="company-logo" />
              <span className="company-badge">Artx Dev Pvt ltd</span>
            </div>

            <div className="card-main-content">
              <h3>Artx Dev Pvt ltd</h3>
              <p className="company-subtitle">Where we plan and work</p>
            </div>

            <div className="card-footer">
              <p>Shital height Imadol Mahalaxmi,Lalitpur Nepal</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Companies;