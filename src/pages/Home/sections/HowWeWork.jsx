// src/pages/Home/sections/HowWeWork.jsx

import { useEffect, useRef, useState } from 'react';

const steps = [
  { num: '01', title: 'Discover', desc: 'We discuss and discover your plans and ideas as our first step.' },
  { num: '02', title: 'Design', desc: 'Wireframes, then a high-fidelity design you can click through before any code.' },
  { num: '03', title: 'Build', desc: 'Clean, tested code with weekly previews so you always see progress.' },
  { num: '04', title: 'Launch & Support', desc: 'We go live, monitor performance and keep improving month after month.' },
];

const HowWeWork = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer - REPLAYS the animation every time it enters the screen
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hww-outer">
      <section ref={sectionRef} className={`hww-section${isVisible ? ' is-visible' : ''}`}>

        <div className="hww-header">
          <p className="ax-eyebrow hww-eyebrow">Process</p>
          <h2 className="hww-title">How we Work</h2>
        </div>

        {/* Timeline – line draws across, nodes light up, a blue dot travels along it */}
        <div className="hww-timeline" aria-hidden="true">
          <span className="hww-track">
            <span className="hww-track-fill" />
            <span className="hww-traveler" />
          </span>
          {steps.map((step, index) => (
            <span key={step.num} className="hww-node-cell" style={{ '--i': index }}>
              <span className="hww-node" />
            </span>
          ))}
        </div>

        <div className="hww-grid">
          {steps.map((step, index) => (
            <div key={step.num} className="hww-card-wrap" style={{ '--i': index }}>
              <div className="hww-card">
                <span className="hww-watermark" aria-hidden="true">{step.num}</span>
                <p className="hww-num">{step.num}</p>
                <div className="hww-rule" />
                <h3 className="hww-card-title">{step.title}</h3>
                <p className="hww-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          .hww-outer { background: #000000; }
          .hww-section {
            position: relative; background: #000000; padding: 5rem 5%;
            display: flex; flex-direction: column; overflow: hidden;
          }
          /* Fine grid in the corner */
          .hww-section::before {
            content: ''; position: absolute; inset: 0; pointer-events: none;
            background-image:
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
            background-size: 56px 56px;
            -webkit-mask-image: radial-gradient(ellipse 55% 70% at 100% 0%, #000, transparent 70%);
                    mask-image: radial-gradient(ellipse 55% 70% at 100% 0%, #000, transparent 70%);
          }

          .hww-header { position: relative; margin-bottom: 2.5rem; }
          .hww-eyebrow { color: #888888; }
          .hww-title {
            color: #FFFFFF; font-family: 'Hanuman', serif;
            font-size: 3rem; font-weight: 700; margin: 0;
            opacity: 0; transform: translateY(16px);
            transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .is-visible .hww-title { opacity: 1; transform: none; }

          /* ---------- Timeline ---------- */
          .hww-timeline {
            position: relative; display: grid; grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem; height: 14px; align-items: center; margin-bottom: 1.75rem;
          }
          .hww-track {
            position: absolute; left: 0; right: 0; top: 50%; height: 1px;
            background: rgba(255,255,255,0.12); transform: translateY(-50%);
          }
          .hww-track-fill {
            position: absolute; inset: 0; background: rgba(255,255,255,0.6);
            transform: scaleX(0); transform-origin: left;
            transition: transform 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
          }
          .is-visible .hww-track-fill { transform: scaleX(1); }
          .hww-traveler {
            position: absolute; top: 50%; left: 0; width: 6px; height: 6px; margin-top: -3px;
            border-radius: 50%; background: #FFFFFF; opacity: 0;
          }
          .is-visible .hww-traveler { animation: hwwTravel 5s ease-in-out 2.2s infinite; }

          .hww-node-cell { position: relative; padding-left: 1.5rem; }
          .hww-node {
            position: relative; z-index: 1; display: block;
            width: 10px; height: 10px; border-radius: 50%; box-sizing: border-box;
            background: #000000; border: 1px solid rgba(255,255,255,0.3);
            transition: background-color 0.6s ease calc(var(--i) * 0.3s + 0.5s), border-color 0.6s ease calc(var(--i) * 0.3s + 0.5s);
          }
          .is-visible .hww-node { background: #00A3FF; border-color: #00A3FF; }

          /* ---------- Cards ---------- */
          .hww-grid {
            display: grid; grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem; width: 100%;
          }
          .hww-card-wrap {
            opacity: 0; transform: translateY(20px);
            transition:
              opacity 0.8s ease calc(var(--i) * 0.12s),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i) * 0.12s);
          }
          .is-visible .hww-card-wrap { opacity: 1; transform: none; }

          .hww-card {
            position: relative; overflow: hidden;
            height: 100%; box-sizing: border-box;
            display: flex; flex-direction: column;
            padding: 2rem 1.5rem; border-radius: 12px;
            background: #0A0A0A; border: 1px solid rgba(255,255,255,0.1);
            transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s ease;
          }
          .hww-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.35); }
          .hww-card > *:not(.hww-watermark) { position: relative; }

          .hww-watermark {
            position: absolute; right: -0.4rem; bottom: -1.8rem; pointer-events: none;
            font-family: 'Hanuman', serif; font-weight: 700; font-size: 6.5rem; line-height: 1;
            color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.07);
            transition: -webkit-text-stroke-color 0.4s ease;
          }
          .hww-card:hover .hww-watermark { -webkit-text-stroke-color: rgba(255,255,255,0.16); }

          .hww-num {
            color: #777777; font-family: 'Gowun Dodum', sans-serif; font-size: 1rem; margin: 0 0 1rem;
            transition: color 0.4s ease;
          }
          .hww-card:hover .hww-num { color: #00A3FF; }

          .hww-rule {
            width: 100%; height: 1px; background: rgba(255,255,255,0.12); margin-bottom: 1.5rem;
            transform: scaleX(0); transform-origin: left;
            transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i) * 0.12s + 0.3s), background-color 0.4s ease;
          }
          .is-visible .hww-rule { transform: scaleX(1); }
          .hww-card:hover .hww-rule { background-color: rgba(255,255,255,0.45); }

          .hww-card-title {
            color: #FFFFFF; font-family: 'Hanuman', serif; font-size: 1.4rem; font-weight: 700; margin: 0 0 1rem;
          }
          .hww-desc {
            color: #8A8A8A; font-family: 'Hanuman', serif; font-size: 0.9rem; line-height: 1.6; margin: 0;
            transition: color 0.4s ease;
          }
          .hww-card:hover .hww-desc { color: #BDBDBD; }

          @keyframes hwwTravel {
            0%   { left: 0%;   opacity: 0; }
            15%  { opacity: 0.9; }
            85%  { opacity: 0.9; }
            100% { left: 100%; opacity: 0; }
          }

          @media (max-width: 1024px) {
            .hww-grid { grid-template-columns: repeat(2, 1fr); }
            .hww-timeline { display: none; }
          }
          @media (max-width: 600px) {
            .hww-section { padding: 3.5rem 5%; }
            .hww-grid { grid-template-columns: 1fr; }
            .hww-title { font-size: 2.3rem; }
          }
        `}</style>
      </section>
    </div>
  );
};

export default HowWeWork;