// src/pages/About/sections/Clients.jsx
import React from 'react';

// Import your logos from the assets folder (make sure the paths match your folder structure)
import brand1 from '../../../assets/brand1.png';
import brand2 from '../../../assets/brand2.png';
import brand3 from '../../../assets/brand3.png';
import brand4 from '../../../assets/brand4.png';
import brand5 from '../../../assets/brand5.png';
import brand6 from '../../../assets/brand6.png';
import brand7 from '../../../assets/brand7.png';
import brand8 from '../../../assets/brand8.png';

const Clients = () => {
  const logos = [brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8];

  return (
    <section style={{ 
      backgroundColor: '#FFFFFF', 
      padding: '4rem 5%', // Increased top/bottom padding slightly for the About page layout
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      borderTop: '1px solid #E5E5E5' // Using border-top to separate it from the black section above
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
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '100%',
        maxWidth: '1300px', // Keeps it aligned with the rest of your About page containers
        flexWrap: 'wrap', 
        gap: '2rem'
      }}>
        {logos.map((logo, index) => (
          <img 
            key={index} 
            src={logo} 
            alt={`Brand ${index + 1}`} 
            style={{ 
              height: '70px', 
              width: 'auto',
              objectFit: 'contain',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)'; 
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Clients;