// src/pages/Home/sections/WhatWeDo.jsx

import { Link } from 'react-router-dom';

import iconWebDesign from '../../../assets/icon-web-design.png';
import iconWebDev from '../../../assets/icon-web-dev.png';
import iconWebApps from '../../../assets/icon-web-apps.png';
import iconApp from '../../../assets/icon-app.png';
import iconMarketing from '../../../assets/icon-marketing.png';
import iconAI from '../../../assets/icon-ai.png';

const services = [
  { icon: iconWebDesign, title: 'Website Design', desc: 'We craft beautiful, user-centric interfaces that are strategically designed to convert visitors into loyal customers and elevate your brand.' },
  { icon: iconWebDev, title: 'Website Development', desc: 'Building fast, secure, and highly scalable websites using the latest technologies to ensure your business runs smoothly online.' },
  { icon: iconWebApps, title: 'Web Apps', desc: 'Custom web applications tailored to your specific business needs, automating processes and delivering seamless user experiences.' },
  { icon: iconApp, title: 'Application', desc: 'We develop high-performance mobile and desktop applications that engage users and extend your brand reach across all platforms.' },
  { icon: iconMarketing, title: 'Marketing', desc: 'Data-driven marketing strategies and campaigns designed to grow your audience, boost engagement, and drive measurable revenue.' },
  { icon: iconAI, title: 'AI Automation', desc: 'Implementing smart, automated workflows and AI-driven solutions to save you time, reduce costs, and eliminate manual effort.' },
];

// One service card – blue spotlight follows the mouse, rotating border on hover
const ServiceCard = ({ service, index }) => {
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div data-reveal="up" style={{ '--d': `${(index % 3) * 0.12 + Math.floor(index / 3) * 0.1}s` }}>
      <Link to="/services" className="wwd-card" onMouseMove={handleMove}>
        <span className="wwd-card-border" aria-hidden="true" />

        <div className="wwd-card-top">
          <div className="wwd-card-head">
            <div className="wwd-icon" style={{ animationDelay: `${index * 0.4}s` }}>
              <img src={service.icon} alt="" />
            </div>
            <h3 className="wwd-card-title">{service.title}</h3>
          </div>

          <span className="wwd-card-corner" aria-hidden="true">
            <span className="wwd-card-num">{String(index + 1).padStart(2, '0')}</span>
            <span className="wwd-card-arrow">↗</span>
          </span>
        </div>

        <p className="wwd-card-desc">{service.desc}</p>
        <span className="wwd-card-bar" aria-hidden="true" />
      </Link>
    </div>
  );
};

const WhatWeDo = () => {
  return (
    <div className="wwd-outer">
      <section className="wwd-section">

        {/* ================= BACKGROUND ANIMATION ================= */}
        <div className="wwd-gridbg" aria-hidden="true" />
        <div className="wwd-orb wwd-orb--1" aria-hidden="true" />
        <div className="wwd-orb wwd-orb--2" aria-hidden="true" />

        {/* ================= CONTENT ================= */}
        <div className="wwd-content">
          <div className="wwd-header">
            <p className="ax-eyebrow" data-reveal="left">Services</p>
            <h2 className="wwd-title" data-reveal="up" style={{ '--d': '0.1s' }}>
              What We Do<span className="wwd-title-dot">.</span>
            </h2>
          </div>

          <div className="wwd-grid">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>

          <div data-reveal="up">
            <Link to="/services" className="ax-btn ax-btn--outline wwd-btn">
              Learn More <span className="ax-btn-arrow">→</span>
            </Link>
          </div>
        </div>

        <style>{`
          @property --wwd-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }

          .wwd-outer { background: #FFFFFF; padding: 0 0.15rem; }
          .wwd-section {
            position: relative; background: #000000; padding: 5rem 5%;
            display: flex; flex-direction: column; align-items: center; overflow: hidden;
          }

          /* Background */
          .wwd-gridbg {
            position: absolute; inset: 0; z-index: 0; pointer-events: none;
            background-image:
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
            background-size: 56px 56px;
            -webkit-mask-image: radial-gradient(ellipse 60% 45% at 50% 0%, #000, transparent 70%);
                    mask-image: radial-gradient(ellipse 60% 45% at 50% 0%, #000, transparent 70%);
            animation: wwdPan 20s linear infinite;
          }
          .wwd-orb { position: absolute; border-radius: 50%; pointer-events: none; z-index: 0; }
          .wwd-orb--1 {
            top: 20%; left: 20%; width: 600px; height: 600px;
            background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%);
            animation: wwdFloat 15s ease-in-out infinite alternate;
          }
          .wwd-orb--2 {
            bottom: 5%; right: 5%; width: 560px; height: 560px;
            background: radial-gradient(circle, rgba(0,163,255,0.12) 0%, transparent 70%);
            animation: wwdFloat 20s ease-in-out infinite alternate-reverse;
          }

          .wwd-content {
            position: relative; z-index: 1; width: 100%;
            display: flex; flex-direction: column; align-items: center;
          }
          .wwd-header { align-self: flex-start; margin-bottom: 3rem; }
          .wwd-title {
            color: #FFFFFF; font-family: 'Hind', sans-serif;
            font-size: 3.5rem; font-weight: 700; line-height: 1.1; margin: 0;
          }
          .wwd-title-dot { color: #00A3FF; text-shadow: 0 0 18px rgba(0,163,255,0.8); }

          .wwd-grid {
            display: grid; grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem; width: 100%; margin-bottom: 4rem;
          }

          /* Card */
          .wwd-card {
            position: relative; isolation: isolate; overflow: hidden; box-sizing: border-box;
            display: flex; flex-direction: column; justify-content: space-between;
            height: 280px; padding: 2rem; border-radius: 16px;
            background: #0A0A0A; border: 1px solid #444444; text-decoration: none;
            transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s ease, box-shadow 0.5s ease;
          }
          .wwd-card::before {
            content: ''; position: absolute; inset: 0; z-index: -1;
            background: radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(0,163,255,0.16), transparent 45%);
            opacity: 0; transition: opacity 0.4s ease;
          }
          .wwd-card-border {
            position: absolute; inset: 0; border-radius: inherit; padding: 1px; pointer-events: none;
            background: conic-gradient(from var(--wwd-angle), transparent 0 65%, #00A3FF 82%, #FFFFFF 90%, transparent 100%);
            -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            -webkit-mask-composite: xor;
                    mask-composite: exclude;
            opacity: 0; transition: opacity 0.4s ease;
            animation: wwdSpin 4s linear infinite;
          }
          .wwd-card:hover {
            transform: translateY(-8px); border-color: rgba(0,163,255,0.25);
            box-shadow: 0 24px 60px -24px rgba(0,163,255,0.55);
          }
          .wwd-card:hover::before, .wwd-card:hover .wwd-card-border { opacity: 1; }

          .wwd-card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }
          .wwd-card-head { display: flex; align-items: center; gap: 1rem; }

          .wwd-icon { width: 52px; height: 52px; flex-shrink: 0; animation: wwdBob 5s ease-in-out infinite; }
          .wwd-icon img {
            width: 100%; height: 100%; object-fit: contain;
            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.4s ease;
          }
          .wwd-card:hover .wwd-icon img {
            transform: scale(1.12) rotate(-6deg);
            filter: drop-shadow(0 0 12px rgba(0,163,255,0.8));
          }

          .wwd-card-title {
            color: #FFFFFF; font-family: 'Hind', sans-serif;
            font-size: 1.2rem; font-weight: 600; margin: 0;
          }

          .wwd-card-corner { position: relative; width: 30px; height: 24px; flex-shrink: 0; overflow: hidden; }
          .wwd-card-num, .wwd-card-arrow {
            position: absolute; right: 0; top: 0;
            transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
          }
          .wwd-card-num { font-family: 'Gowun Dodum', sans-serif; color: #555555; font-size: 0.85rem; }
          .wwd-card-arrow { color: #00A3FF; font-size: 1.1rem; transform: translate(-14px, 14px); opacity: 0; }
          .wwd-card:hover .wwd-card-num { transform: translate(14px, -14px); opacity: 0; }
          .wwd-card:hover .wwd-card-arrow { transform: none; opacity: 1; }

          .wwd-card-desc {
            color: #888888; font-family: 'Hind', sans-serif;
            font-size: 0.95rem; line-height: 1.6; margin: 0;
            transition: color 0.4s ease;
          }
          .wwd-card:hover .wwd-card-desc { color: #cfcfcf; }

          .wwd-card-bar {
            position: absolute; left: 0; bottom: 0; height: 2px; width: 100%;
            background: linear-gradient(90deg, #00A3FF, transparent);
            transform: scaleX(0); transform-origin: left;
            transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .wwd-card:hover .wwd-card-bar { transform: scaleX(1); }

          .wwd-btn { padding: 12px 40px; font-size: 1rem; }

          @keyframes wwdSpin  { to { --wwd-angle: 360deg; } }
          @keyframes wwdBob   { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
          @keyframes wwdPan   { to { background-position: 0 56px, 56px 0; } }
          @keyframes wwdFloat {
            0%   { transform: translate(0, 0) scale(1); opacity: 0.5; }
            50%  { transform: translate(50px, -50px) scale(1.2); opacity: 0.9; }
            100% { transform: translate(-30px, 30px) scale(1); opacity: 0.5; }
          }

          @media (max-width: 1024px) { .wwd-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 640px) {
            .wwd-grid { grid-template-columns: 1fr; }
            .wwd-title { font-size: 2.4rem; }
            .wwd-card { height: auto; min-height: 240px; gap: 1.5rem; }
          }
        `}</style>
      </section>
    </div>
  );
};

export default WhatWeDo;