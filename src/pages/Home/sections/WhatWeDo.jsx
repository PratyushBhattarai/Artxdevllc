// src/pages/Home/sections/WhatWeDo.jsx

import { Link } from 'react-router-dom';

import iconWebDesign from '../../../assets/icon-web-design.png';
import iconWebDev from '../../../assets/icon-web-dev.png';
import iconWebApps from '../../../assets/icon-web-apps.png';
import iconApp from '../../../assets/icon-app.png';
import iconMarketing from '../../../assets/icon-marketing.png';
import iconAI from '../../../assets/icon-ai.png';
import Arrow from '../../../components/Arrow';

const services = [
  { icon: iconWebDesign, title: 'Website Design', desc: 'We craft beautiful, user-centric interfaces that are strategically designed to convert visitors into loyal customers and elevate your brand.' },
  { icon: iconWebDev, title: 'Website Development', desc: 'Building fast, secure, and highly scalable websites using the latest technologies to ensure your business runs smoothly online.' },
  { icon: iconWebApps, title: 'Web Apps', desc: 'Custom web applications tailored to your specific business needs, automating processes and delivering seamless user experiences.' },
  { icon: iconApp, title: 'Application', desc: 'We develop high-performance mobile and desktop applications that engage users and extend your brand reach across all platforms.' },
  { icon: iconMarketing, title: 'Marketing', desc: 'Data-driven marketing strategies and campaigns designed to grow your audience, boost engagement, and drive measurable revenue.' },
  { icon: iconAI, title: 'AI Automation', desc: 'Implementing smart, automated workflows and AI-driven solutions to save you time, reduce costs, and eliminate manual effort.' },
];

// One service card – bar fills along the bottom when it appears,
// black fill rises from the bottom on hover and the card turns to white text (like the About stats cards)
const ServiceCard = ({ service, index }) => {
  return (
    <div data-reveal="up" style={{ '--d': `${(index % 3) * 0.12 + Math.floor(index / 3) * 0.1}s` }}>
      <article className="wwd-card">

        <div className="wwd-card-top">
          <div className="wwd-card-head">
            <div className="wwd-icon">
              <img src={service.icon} alt="" />
            </div>
            <h3 className="wwd-card-title">{service.title}</h3>
          </div>

          <span className="wwd-card-corner" aria-hidden="true">
            <span className="wwd-card-num">{String(index + 1).padStart(2, '0')}</span>
          </span>
        </div>

        <p className="wwd-card-desc">{service.desc}</p>
        <span className="wwd-card-bar" aria-hidden="true" />
      </article>
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
            <Link to="/services" className="ax-btn ax-btn--ink wwd-btn">
              Learn More <span className="ax-btn-arrow"><Arrow /></span>
            </Link>
          </div>
        </div>

        <style>{`
          .wwd-outer { background: #FFFFFF; padding: 0; }
          .wwd-section {
            position: relative; background: #FFFFFF; padding: 5rem 5%;
            display: flex; flex-direction: column; align-items: center; overflow: hidden;
          }

          /* Background */
          .wwd-gridbg {
            position: absolute; inset: 0; z-index: 0; pointer-events: none;
            background-image:
              linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
            background-size: 56px 56px;
            -webkit-mask-image: radial-gradient(ellipse 60% 45% at 50% 0%, #000, transparent 70%);
                    mask-image: radial-gradient(ellipse 60% 45% at 50% 0%, #000, transparent 70%);
            animation: wwdPan 20s linear infinite;
          }
          .wwd-orb { position: absolute; border-radius: 50%; pointer-events: none; z-index: 0; }
          .wwd-orb--1 {
            top: 20%; left: 20%; width: 600px; height: 600px;
            background: radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%);
            animation: wwdFloat 15s ease-in-out infinite alternate;
          }
          .wwd-orb--2 {
            bottom: 5%; right: 5%; width: 560px; height: 560px;
            background: radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%);
            animation: wwdFloat 20s ease-in-out infinite alternate-reverse;
          }

          .wwd-content {
            position: relative; z-index: 1; width: 100%;
            display: flex; flex-direction: column; align-items: center;
          }
          .wwd-header { align-self: flex-start; margin-bottom: 3rem; }
          .wwd-title {
            color: #0A0A0A; font-family: 'Hind', sans-serif;
            font-size: 3.5rem; font-weight: 700; line-height: 1.1; margin: 0;
          }
          .wwd-title-dot { color: #00A3FF; }

          .wwd-grid {
            display: grid; grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem; width: 100%; margin-bottom: 4rem;
          }

          /* Card */
          .wwd-card {
            position: relative; isolation: isolate; overflow: hidden; box-sizing: border-box;
            display: flex; flex-direction: column; justify-content: flex-start; gap: 1.5rem;
            height: 100%; padding: 2rem; border-radius: 16px;
            background: #FFFFFF; border: 1px solid #E2E2E2; cursor: default;
            /* keeps the rising fill inside the rounded corners on iPhone Safari */
            -webkit-transform: translateZ(0); transform: translateZ(0);
            -webkit-mask-image: -webkit-radial-gradient(white, black);
            transition: border-color 0.4s ease;
          }
          /* Black fill that rises from the bottom on hover – the card inverts to white text */
          .wwd-card::before {
            content: ''; position: absolute; inset: 0; z-index: -1;
            background: #0A0A0A;
            transform: scaleY(0); transform-origin: bottom;
            transition: transform 0.5s cubic-bezier(0.7, 0, 0.3, 1);
          }
          @media (hover: hover) and (pointer: fine) { .wwd-card:hover::before { transform: scaleY(1); } }
          @media (hover: hover) and (pointer: fine) { .wwd-card:hover { border-color: #0A0A0A; } }
          .wwd-card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }
          .wwd-card-head { display: flex; align-items: center; gap: 1rem; }

          .wwd-icon { width: 52px; height: 52px; flex-shrink: 0; }
          .wwd-icon img { width: 100%; height: 100%; object-fit: contain; filter: invert(1); transition: filter 0.4s ease; }
          @media (hover: hover) and (pointer: fine) { .wwd-card:hover .wwd-icon img { filter: invert(0); } }
          .wwd-card-title {
            color: #0A0A0A; font-family: 'Hind', sans-serif;
            font-size: 1.2rem; font-weight: 600; margin: 0;
            transition: color 0.4s ease;
          }
          @media (hover: hover) and (pointer: fine) { .wwd-card:hover .wwd-card-title { color: #FFFFFF; } }
          .wwd-card-corner { position: relative; flex-shrink: 0; }
          .wwd-card-num {
            font-family: monospace, sans-serif; color: #9A9A9A; font-size: 0.85rem; letter-spacing: 2px;
            transition: color 0.4s ease;
          }
          @media (hover: hover) and (pointer: fine) { .wwd-card:hover .wwd-card-num { color: #888888; } }
          .wwd-card-desc {
            color: #555555; font-family: 'Hind', sans-serif;
            font-size: 0.95rem; line-height: 1.6; margin: 0;
            transition: color 0.4s ease;
          }
          @media (hover: hover) and (pointer: fine) { .wwd-card:hover .wwd-card-desc { color: #BDBDBD; } }
          /* Bar that fills along the bottom when the card scrolls in */
          .wwd-card-bar {
            position: absolute; left: 0; bottom: 0; height: 3px; width: 100%;
            background: #0A0A0A;
            transform: scaleX(0); transform-origin: left;
            transition: transform 1.4s cubic-bezier(0.6, 0, 0.2, 1) calc(var(--d, 0s) + 0.4s), background-color 0.4s ease;
          }
          [data-visible="true"] > .wwd-card .wwd-card-bar { transform: scaleX(1); }
          @media (hover: hover) and (pointer: fine) { .wwd-card:hover .wwd-card-bar { background: #FFFFFF; } }
          .wwd-btn { padding: 12px 40px; font-size: 1rem; }

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
            .wwd-card { height: auto; min-height: 0; gap: 0.75rem; padding: 1.1rem 1.15rem 1.2rem; border-radius: 14px; }
            .wwd-grid { gap: 0.8rem !important; }
            .wwd-icon { width: 38px; height: 38px; }
            .wwd-card-head { gap: 0.75rem; }
            .wwd-card-title { font-size: 1.05rem; }
            .wwd-card-desc { font-size: 0.86rem; line-height: 1.5; }
            .wwd-section { padding: 3.5rem 5%; }
          }
        `}</style>
      </section>
    </div>
  );
};

export default WhatWeDo;