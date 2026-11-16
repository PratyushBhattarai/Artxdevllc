// src/pages/About/sections/Clients.jsx
import React from 'react';

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
    <section className="clients-marquee-section">
      <p className="clients-label reveal">Trusted by</p>

      {/* Logos are rendered twice so the loop is seamless */}
      <div className="clients-marquee">
        <div className="clients-track">
          {[...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={index < logos.length ? `Brand ${index + 1}` : ''}
              aria-hidden={index >= logos.length}
              className="client-logo"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
