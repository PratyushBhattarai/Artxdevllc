// src/pages/Home/sections/Brands.jsx

import { useState } from 'react';

const imageModules = import.meta.glob('../../../assets/*.{png,jpg,jpeg,avif,webp}', { eager: true });
const allImages = Object.keys(imageModules)
  .filter(path => path.includes('/brand') || path.includes('/barnd')) 
  .sort()
  .map(path => imageModules[path].default);

const Brands = () => {
  const logos = allImages;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section style={{ 
      backgroundColor: '#FFFFFF', 
      padding: '3rem 0', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      borderBottom: '1px solid #E5E5E5',
      overflow: 'hidden' 
    }}>
      
      <p style={{ 
        color: '#000000', 
        fontFamily: "'Hind', sans-serif", 
        fontSize: '1rem', 
        marginBottom: '2.5rem',
        fontWeight: '600',
        letterSpacing: '0.5px'
      }}>
        Trusted by:
      </p>

      <div style={{ 
        display: 'flex', 
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4rem', 
          paddingRight: '4rem', 
          paddingTop: '2rem', 
          paddingBottom: '2rem', 
          // This animation runs infinitely and smoothly
          animation: 'scroll-left 30s linear infinite',
          width: 'max-content' 
        }}>
          {[...logos, ...logos].map((logo, index) => (
            <div 
              key={index} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '70px', 
                width: '120px',
              }}
            >
              <img 
                src={logo} 
                alt={`Brand ${index + 1}`} 
                style={{ 
                  maxHeight: '100%', 
                  maxWidth: '100%',
                  objectFit: 'contain',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  
                  // Conditional Styling based on State
                  filter: hoveredIndex === index ? 'grayscale(0%)' : 'grayscale(100%)',
                  opacity: hoveredIndex === index ? '1' : '0.6',
                  transform: hoveredIndex === index ? 'scale(1.5)' : 'scale(1.4)',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 2rem)); }
          }
        `}
      </style>

    </section>
  );
};

export default Brands;