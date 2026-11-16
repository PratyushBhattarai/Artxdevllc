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
          .hww-outer { background: #FFFFFF; padding: 0 1.5rem; }
          .hww-section {
            position: relative; background: #FFFFFF; padding: 3rem 5%;
            display: flex; flex-direction: column; overflow: hidden;
            border-top: 1px solid #C0C0C0; border-bottom: 1px solid #C0C0C0;
          }
          /* Subtle dotted background */
          .hww-section::before {
            content: ''; position: absolute; inset: 0; pointer-events: none;
            background-image: radial-gradient(rgba(0,0,0,0.12) 1px, transparent 1px);
            background-size: 22px 22px;
            -webkit-mask-image: radial-gradient(ellipse 50% 70% at 100% 0%, #000, transparent 70%);
                    mask-image: radial-gradient(ellipse 50% 70% at 100% 0%, #000, transparent 70%);
          }

          .hww-header { position: relative; margin-bottom: 2rem; }
          .hww-eyebrow { color: #3D3D3D; }
          .hww-title {
            color: #000000; font-family: 'Hanuman', serif;
            font-size: 3rem; font-weight: 700; margin: 0;
            opacity: 0; transform: translateY(-20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
          .is-visible .hww-title { opacity: 1; transform: none; }

          /* ---------- Timeline ---------- */
          .hww-timeline {
            position: relative; display: grid; grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem; height: 14px; align-items: center; margin-bottom: 1.75rem;
          }
          .hww-track {
            position: absolute; left: 0; right: 0; top: 50%; height: 1px;
            background: #DADADA; transform: translateY(-50%);
          }
          .hww-track-fill {
            position: absolute; inset: 0;
            background: linear-gradient(90deg, #000000, #00A3FF);
            transform: scaleX(0); transform-origin: left;
            transition: transform 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
          }
          .is-visible .hww-track-fill { transform: scaleX(1); }
          .hww-traveler {
            position: absolute; top: 50%; left: 0; width: 8px; height: 8px; margin-top: -4px;
            border-radius: 50%; background: #00A3FF;
            box-shadow: 0 0 12px 3px rgba(0,163,255,0.7); opacity: 0;
          }
          .is-visible .hww-traveler { animation: hwwTravel 3.5s ease-in-out 2s infinite; }

          .hww-node-cell { position: relative; padding-left: 1.5rem; }
          .hww-node {
            position: relative; z-index: 1; display: block;
            width: 14px; height: 14px; border-radius: 50%; box-sizing: border-box;
            background: #FFFFFF; border: 1.5px solid #BBBBBB; transform: scale(0.6);
            transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--i) * 0.35s + 0.4s);
          }
          .is-visible .hww-node {
            transform: scale(1); background: #00A3FF; border-color: #00A3FF;
            box-shadow: 0 0 0 5px rgba(0,163,255,0.15), 0 0 14px rgba(0,163,255,0.6);
          }

          /* ---------- Cards ---------- */
          .hww-grid {
            display: grid; grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem; width: 100%; perspective: 1000px;
          }
          .hww-card-wrap {
            opacity: 0; transform: scale(0.8) rotateX(20deg) translateX(-30px);
            transition:
              opacity 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) calc(var(--i) * 0.15s),
              transform 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) calc(var(--i) * 0.15s);
          }
          .is-visible .hww-card-wrap { opacity: 1; transform: none; }

          .hww-card {
            position: relative; isolation: isolate; overflow: hidden;
            height: 100%; box-sizing: border-box;
            display: flex; flex-direction: column;
            padding: 2rem 1.5rem; border-radius: 12px;
            background: transparent; border: 1px solid #555555; cursor: pointer;
            transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease, border-color 0.4s ease;
          }
          /* Black fill sweeps up on hover */
          .hww-card::before {
            content: ''; position: absolute; inset: 0; z-index: -1; background: #000000;
            transform: translateY(101%);
            transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .hww-card:hover::before { transform: translateY(0); }
          .hww-card:hover {
            transform: translateY(-8px) scale(1.03); border-color: #000000;
            box-shadow: 0 26px 50px -20px rgba(0,163,255,0.55);
          }
          .hww-card > *:not(.hww-watermark) { position: relative; }

          .hww-watermark {
            position: absolute; right: -0.4rem; bottom: -1.8rem; pointer-events: none;
            font-family: 'Hanuman', serif; font-weight: 700; font-size: 6.5rem; line-height: 1;
            color: transparent; -webkit-text-stroke: 1px rgba(0,0,0,0.08);
            transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), -webkit-text-stroke-color 0.4s ease;
          }
          .hww-card:hover .hww-watermark { transform: translate(-8px, -8px); -webkit-text-stroke-color: rgba(0,163,255,0.45); }

          .hww-num {
            color: #000000; font-family: 'Gowun Dodum', sans-serif; font-size: 1.2rem; margin: 0 0 1rem;
            opacity: 0; transform: translateX(-20px);
            transition:
              opacity 0.8s ease calc(var(--i) * 0.15s + 0.4s),
              transform 0.8s ease calc(var(--i) * 0.15s + 0.4s),
              color 0.4s ease;
          }
          .is-visible .hww-num { opacity: 1; transform: none; }
          .hww-card:hover .hww-num { color: #00A3FF; }

          .hww-rule {
            width: 100%; height: 1px; background: #555555; margin-bottom: 1.5rem;
            transform: scaleX(0); transform-origin: left;
            transition: transform 1s ease calc(var(--i) * 0.15s + 0.3s), background-color 0.4s ease;
          }
          .is-visible .hww-rule { transform: scaleX(1); }
          .hww-card:hover .hww-rule { background-color: #00A3FF; box-shadow: 0 0 10px rgba(0,163,255,0.7); }

          .hww-card-title {
            color: #000000; font-family: 'Hanuman', serif; font-size: 1.4rem; font-weight: 700; margin: 0 0 1rem;
            opacity: 0;
            transition: opacity 0.8s ease calc(var(--i) * 0.15s + 0.5s), color 0.4s ease;
          }
          .is-visible .hww-card-title { opacity: 1; }
          .hww-card:hover .hww-card-title { color: #FFFFFF; }

          .hww-desc {
            color: #888888; font-family: 'Hanuman', serif; font-size: 0.9rem; line-height: 1.6; margin: 0;
            opacity: 0;
            transition: opacity 0.8s ease calc(var(--i) * 0.15s + 0.6s), color 0.4s ease;
          }
          .is-visible .hww-desc { opacity: 1; }
          .hww-card:hover .hww-desc { color: #BDBDBD; }

          @keyframes hwwTravel {
            0%   { left: 0%;   opacity: 0; }
            10%  { opacity: 1; }
            90%  { opacity: 1; }
            100% { left: 100%; opacity: 0; }
          }

          @media (max-width: 1024px) {
            .hww-grid { grid-template-columns: repeat(2, 1fr); }
            .hww-timeline { display: none; }
          }
          @media (max-width: 600px) {
            .hww-outer { padding: 0 0.5rem; }
            .hww-grid { grid-template-columns: 1fr; }
            .hww-title { font-size: 2.3rem; }
          }
        `}</style>
      </section>
    </div>
  );
};

export default HowWeWork;