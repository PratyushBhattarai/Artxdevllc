// src/pages/Home/sections/WhatWeDo.jsx

import { Link } from 'react-router-dom'; 

import iconWebDesign from '../../../assets/icon-web-design.png';
import iconWebDev from '../../../assets/icon-web-dev.png';
import iconWebApps from '../../../assets/icon-web-apps.png';
import iconApp from '../../../assets/icon-app.png';
import iconMarketing from '../../../assets/icon-marketing.png';
import iconAI from '../../../assets/icon-ai.png';

const WhatWeDo = () => {
  const services = [
    { icon: iconWebDesign, title: 'Website Design:' },
    { icon: iconWebDev, title: 'Website Development:' },
    { icon: iconWebApps, title: 'Web Apps:' },
    { icon: iconApp, title: 'Application' },
    { icon: iconMarketing, title: 'Marketing' },
    { icon: iconAI, title: 'AI Automation' },
  ];

  return (
    // 1. WHITE WRAPPER: Padding is now '0 1.5rem' (0 top/bottom, 1.5rem left/right)
    <div style={{ 
      backgroundColor: '#FFFFFF', 
      padding: '0 0.15rem' // <--- CHANGED: No top/bottom gap, only left/right gap
    }}>
      
      {/* 2. BLACK CANVAS */}
      <section style={{ 
        backgroundColor: '#000000', 
        padding: '5rem 5%', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        
        {/* Small "Services:" text */}
        <p style={{
          color: '#888888',
          fontFamily: "'Hind', sans-serif", 
          fontSize: '0.9rem',
          alignSelf: 'flex-start',
          marginBottom: '0.5rem'
        }}>
          Services:
        </p>

        {/* Main Title */}
        <h2 style={{ 
          color: '#FFFFFF', 
          fontFamily: "'Hind', sans-serif", 
          fontSize: '3.5rem', 
          fontWeight: '700',
          alignSelf: 'flex-start',
          marginBottom: '3rem'
        }}>
          What We do:
        </h2>
        
        {/* Services Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '1.5rem', 
          width: '100%',
          marginBottom: '4rem' 
        }}>
          {services.map((service, index) => (
            <div 
              key={index} 
              style={{ 
                backgroundColor: '#0A0A0A', 
                border: '1px solid #444444', 
                borderRadius: '16px', 
                padding: '2rem',
                height: '260px', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between', 
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#444444';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img 
                src={service.icon} 
                alt={service.title} 
                style={{ width: '52px', height: '52px', objectFit: 'contain' }} 
              />
              
              <h3 style={{ 
                color: '#FFFFFF', 
                fontFamily: "'Hind', sans-serif", 
                fontSize: '1.1rem', 
                fontWeight: '600',
                margin: 0
              }}>
                {service.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Learn More Button */}
        <Link to="/services" style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'transparent',
            color: '#FFFFFF',
            border: '1px solid #FFFFFF',
            borderRadius: '30px',
            padding: '12px 40px',
            fontSize: '1rem',
            fontFamily: "'Hind', sans-serif", 
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#FFFFFF';
            e.target.style.color = '#000000';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#FFFFFF';
          }}
          >
            Learn More
          </button>
        </Link>
        
      </section>
    </div>
  );
};

export default WhatWeDo;