// src/pages/Home/sections/Hero.jsx

import { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';

import handHuman from '../../../assets/hand-human.png';
import handRobot from '../../../assets/hand-robot.png';
import heroWeb from '../../../assets/hero-web.png';
import heroX from '../../../assets/hero-x.png';

// Headline words – each word slides up one after another
const HEADLINE = [
  ['We', 'build', 'Digital'],
  ['Products', 'That', 'Feel'],
];

const Hero = () => {
  const sectionRef = useRef(null);
  const humanRef = useRef(null);
  const robotRef = useRef(null);
  const sparkRef = useRef(null);

  // Floating light particles (generated once)
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        size: `${1 + Math.random() * 2.5}px`,
        delay: `${Math.random() * 12}s`,
        duration: `${10 + Math.random() * 12}s`,
        blue: i % 3 === 0,
      })),
    []
  );

  // Mouse parallax – hands and spark follow the cursor (desktop only)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !window.matchMedia('(pointer: fine)').matches) return undefined;

    let frame = 0;
    const move = (x, y) => {
      if (humanRef.current) humanRef.current.style.transform = `translate3d(${x * 28}px, ${y * 16}px, 0)`;
      if (robotRef.current) robotRef.current.style.transform = `translate3d(${x * -28}px, ${y * -16}px, 0)`;
      if (sparkRef.current) sparkRef.current.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 0)`;
    };
    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => move(x, y));
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      move(0, 0);
    };

    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="hx-outer">
      <section ref={sectionRef} className="hx-section">

        {/* 3D WEB IMAGE - zooms in, floats and glows */}
        <img src={heroWeb} alt="3D Web" className="hx-web" />

        {/* Moving grid + light beam + particles */}
        <div className="hx-grid" aria-hidden="true" />
        <div className="hx-beam" aria-hidden="true" />
        <div className="hx-particles" aria-hidden="true">
          {particles.map((p, i) => (
            <span
              key={i}
              className={`hx-particle${p.blue ? ' hx-particle--blue' : ''}`}
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>

        {/* HANDS - slide in towards each other, then follow the mouse */}
        <div ref={humanRef} className="hx-hand-wrap hx-hand-wrap--human">
          <img src={handHuman} alt="Human Hand" className="hx-hand hx-hand--human" />
        </div>

        {/* X GRAPHIC - electric spark between the hands */}
        <div ref={sparkRef} className="hx-spark">
          <span className="hx-spark-glow" />
          <span className="hx-spark-ring" />
          <span className="hx-spark-ring hx-spark-ring--2" />
          <img src={heroX} alt="X Graphic" className="hx-x" />
        </div>

        <div ref={robotRef} className="hx-hand-wrap hx-hand-wrap--robot">
          <img src={handRobot} alt="Robotic Hand" className="hx-hand hx-hand--robot" />
        </div>

        {/* TEXT CONTENT */}
        <div className="hx-content">
          <span className="hx-pill">
            <span className="hx-pill-dot" />
            Design · Development · AI
          </span>

          <h1 className="hx-title">
            {HEADLINE.map((line, li) => (
              <span key={li} className="hx-line">
                {line.map((word, wi) => (
                  <span
                    key={word}
                    className="hx-word"
                    style={{ animationDelay: `${0.35 + (li * 3 + wi) * 0.09}s` }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            ))}
            <span className="hx-line">
              <span className="hx-word hx-premium" style={{ animationDelay: '0.95s' }}>
                <span className="ax-shimmer">Premium.</span>
              </span>
            </span>
          </h1>

          <p className="hx-sub">
            Website, Web apps, Design, App and Marketing. Design and develop with care, <br />
            engineered to be fast and supported after launch.
          </p>

          <div className="hx-actions">
            <Link to="/contact" className="ax-btn ax-btn--solid hx-cta">
              Start a project <span className="ax-btn-arrow">→</span>
            </Link>
            <Link to="/portfolio" className="ax-link hx-link">
              See Our Work <span className="ax-link-arrow">→</span>
            </Link>
          </div>
        </div>

        {/* AI AUTOMATION TEXT - neon flicker in */}
        <h2 className="hx-ai">AI Automation</h2>

        {/* SCROLL INDICATOR */}
        <div className="hx-scroll" aria-hidden="true">
          <span className="hx-mouse"><span className="hx-wheel" /></span>
          SCROLL
        </div>

        <style>{`
          .hx-outer { background: #FFFFFF; padding: 0 0.5px; }

          .hx-section {
            position: relative; background: #000000;
            width: calc(100% - 4px); margin: 0 auto;
            height: 85vh; min-height: 620px;
            display: flex; align-items: center;
            padding: 0 5%; overflow: hidden; box-sizing: border-box;
          }

          /* ---------- Background layers ---------- */
          .hx-web {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            z-index: 1; object-fit: cover;
            animation:
              hxZoomIn 3s cubic-bezier(0.25, 1, 0.5, 1) forwards,
              hxFloat 6s ease-in-out 3s infinite,
              hxGlow 4s ease-in-out 3s infinite;
          }
          .hx-grid {
            position: absolute; inset: 0; z-index: 2; pointer-events: none;
            background-image:
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
            background-size: 60px 60px;
            -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, #000 15%, transparent 75%);
                    mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, #000 15%, transparent 75%);
            opacity: 0;
            animation: hxFadeIn 2s ease 1s forwards, hxGridPan 12s linear infinite;
          }
          .hx-beam {
            position: absolute; top: -50%; left: -40%; width: 25%; height: 200%;
            z-index: 2; pointer-events: none;
            background: linear-gradient(90deg, transparent, rgba(0,163,255,0.09), rgba(255,255,255,0.05), transparent);
            transform: rotate(18deg);
            animation: hxBeam 9s ease-in-out 3s infinite;
          }
          .hx-particles { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
          .hx-particle {
            position: absolute; bottom: -10px; border-radius: 50%;
            background: #FFFFFF; opacity: 0;
            animation-name: hxRise; animation-timing-function: linear; animation-iteration-count: infinite;
          }
          .hx-particle--blue { background: #00A3FF; box-shadow: 0 0 8px #00A3FF; }

          /* ---------- Hands ---------- */
          .hx-hand-wrap {
            position: absolute; z-index: 3;
            transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
            will-change: transform;
          }
          .hx-hand-wrap--human { bottom: 0; left: 0%; width: 43%; }
          .hx-hand-wrap--robot { bottom: 8%; right: 0%; width: 40%; }
          .hx-hand { display: block; width: 100%; opacity: 0; }
          .hx-hand--human {
            animation:
              hxFromLeft 2.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards,
              hxIdleA 7s ease-in-out 2.8s infinite;
          }
          .hx-hand--robot {
            animation:
              hxFromRight 2.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards,
              hxIdleB 7s ease-in-out 2.8s infinite;
          }

          /* ---------- Spark (X graphic) ---------- */
          .hx-spark {
            position: absolute; top: 26.5%; left: 48%; width: 45px; z-index: 4;
            transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .hx-spark-glow {
            position: absolute; left: 50%; top: 50%; width: 220px; height: 220px;
            border-radius: 50%; pointer-events: none; filter: blur(4px);
            background: radial-gradient(circle, rgba(0,163,255,0.55) 0%, rgba(0,163,255,0.15) 35%, transparent 70%);
            transform: translate(-50%, -50%); opacity: 0;
            animation: hxFadeIn 1s ease 2s forwards, hxSparkPulse 2.8s ease-in-out 3s infinite;
          }
          .hx-spark-ring {
            position: absolute; left: 50%; top: 50%; width: 60px; height: 60px; margin: -30px 0 0 -30px;
            border-radius: 50%; border: 1px solid rgba(0,163,255,0.9); opacity: 0; pointer-events: none;
            animation: hxRing 2.8s cubic-bezier(0.22, 1, 0.36, 1) 2.4s infinite;
          }
          .hx-spark-ring--2 { animation-delay: 3.8s; }
          .hx-x {
            position: relative; display: block; width: 100%; opacity: 0;
            filter: drop-shadow(0 0 10px rgba(0,163,255,0.9));
            animation:
              hxPop 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 1.8s forwards,
              hxBreath 3s ease-in-out 3s infinite;
          }

          /* ---------- Text ---------- */
          .hx-content { position: relative; z-index: 10; max-width: 600px; }

          .hx-pill {
            display: inline-flex; align-items: center; gap: 10px;
            padding: 6px 14px; margin-bottom: 1.4rem;
            border: 1px solid rgba(255,255,255,0.18); border-radius: 999px;
            background: rgba(255,255,255,0.04);
            -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
            color: #bdbdbd; font-family: 'Hind', sans-serif; font-size: 0.72rem;
            letter-spacing: 1.5px; text-transform: uppercase;
            opacity: 0; animation: hxFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
          }
          .hx-pill-dot {
            width: 7px; height: 7px; border-radius: 50%; background: #00A3FF;
            animation: hxDot 1.8s infinite;
          }

          .hx-title {
            font-size: 3.5rem; line-height: 1.1; margin: 0 0 1rem;
            font-family: 'Kantumruy Pro', sans-serif; font-weight: 600; color: #c9c9c9;
          }
          .hx-line { display: block; overflow: hidden; padding-bottom: 0.12em; margin-bottom: -0.12em; }
          .hx-word {
            display: inline-block; margin-right: 0.25em;
            transform: translateY(115%);
            animation: hxWordUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          .hx-premium { font-family: 'Sansation', sans-serif; font-weight: 700; letter-spacing: 1px; }

          .hx-sub {
            color: #FFFFFF; max-width: 500px; margin: 0 0 4.5rem;
            font-size: 0.85rem; line-height: 3; font-family: 'Karma', serif;
            opacity: 0; animation: hxFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 1.1s forwards;
          }

          .hx-actions {
            position: relative; top: 40px;
            display: flex; gap: 1.5rem; align-items: center;
            opacity: 0; animation: hxFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 1.3s forwards;
          }
          .hx-cta { padding: 12px 28px; font-family: 'Karma', serif; font-size: 0.9rem; }
          .hx-link { font-family: 'Karma', serif; font-size: 0.9rem; }

          .hx-ai {
            position: absolute; top: 25%; right: 7.5%; z-index: 10;
            font-size: 3.5rem; font-family: 'Kantumruy Pro', sans-serif; font-weight: 600; color: #c9c9c9;
            opacity: 0;
            animation: hxFlicker 2.2s linear 0.9s forwards, hxNeon 4s ease-in-out 3.2s infinite;
          }
          .hx-ai::after {
            content: ''; display: block; height: 2px; width: 60%; margin-left: auto; margin-top: 0.4rem;
            background: linear-gradient(90deg, transparent, #00A3FF);
            box-shadow: 0 0 12px rgba(0,163,255,0.8);
            transform: scaleX(0); transform-origin: right;
            animation: hxDraw 1.2s cubic-bezier(0.22, 1, 0.36, 1) 2.4s forwards;
          }

          /* ---------- Scroll indicator ---------- */
          .hx-scroll {
            position: absolute; bottom: 22px; left: 50%; transform: translateX(-50%); z-index: 10;
            display: flex; flex-direction: column; align-items: center; gap: 8px;
            color: #777; font-family: 'Hind', sans-serif; font-size: 0.6rem; letter-spacing: 3px;
            opacity: 0; animation: hxFadeIn 1s ease 2.6s forwards;
          }
          .hx-mouse {
            position: relative; width: 20px; height: 32px; border-radius: 12px;
            border: 1.5px solid #666; box-sizing: border-box;
          }
          .hx-wheel {
            position: absolute; top: 6px; left: 50%; width: 3px; height: 7px; margin-left: -1.5px;
            border-radius: 2px; background: #00A3FF; box-shadow: 0 0 8px #00A3FF;
            animation: hxWheel 1.8s ease-in-out infinite;
          }

          /* ---------- Keyframes ---------- */
          @keyframes hxZoomIn   { 0% { transform: scale(0.1); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
          @keyframes hxFloat    { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-15px) scale(1.02); } }
          @keyframes hxGlow     { 0%,100% { filter: brightness(1) contrast(1); } 50% { filter: brightness(1.4) contrast(1.1); } }
          @keyframes hxFadeIn   { to { opacity: 1; } }
          @keyframes hxFadeUp   { 0% { opacity: 0; transform: translateY(24px); } 100% { opacity: 1; transform: translateY(0); } }
          @keyframes hxGridPan  { to { background-position: 0 60px, 60px 0; } }
          @keyframes hxBeam     { 0% { left: -40%; } 55%, 100% { left: 130%; } }
          @keyframes hxRise {
            0%   { transform: translateY(0); opacity: 0; }
            10%  { opacity: 0.8; }
            90%  { opacity: 0.4; }
            100% { transform: translateY(-90vh); opacity: 0; }
          }
          @keyframes hxFromLeft  { 0% { opacity: 0; transform: translate(-90px, 50px); } 100% { opacity: 1; transform: translate(0, 0); } }
          @keyframes hxFromRight { 0% { opacity: 0; transform: translate(90px, -30px); } 100% { opacity: 1; transform: translate(0, 0); } }
          @keyframes hxIdleA     { 0%,100% { transform: translate(0, 0); } 50% { transform: translate(8px, -8px); } }
          @keyframes hxIdleB     { 0%,100% { transform: translate(0, 0); } 50% { transform: translate(-8px, 6px); } }
          @keyframes hxSparkPulse {
            0%,100% { transform: translate(-50%, -50%) scale(0.85); }
            50%     { transform: translate(-50%, -50%) scale(1.2); }
          }
          @keyframes hxRing   { 0% { transform: scale(0.4); opacity: 0.9; } 100% { transform: scale(3); opacity: 0; } }
          @keyframes hxPop    { 0% { opacity: 0; transform: scale(0) rotate(-180deg); } 100% { opacity: 1; transform: scale(1) rotate(0); } }
          @keyframes hxBreath { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
          @keyframes hxWordUp { to { transform: translateY(0); } }
          @keyframes hxDot {
            0%   { box-shadow: 0 0 0 0 rgba(0,163,255,0.7); }
            70%  { box-shadow: 0 0 0 9px rgba(0,163,255,0); }
            100% { box-shadow: 0 0 0 0 rgba(0,163,255,0); }
          }
          @keyframes hxFlicker {
            0% { opacity: 0; } 8% { opacity: 0.8; } 10% { opacity: 0.1; } 18% { opacity: 1; }
            20% { opacity: 0.2; } 28% { opacity: 1; } 31% { opacity: 0.5; } 36%, 100% { opacity: 1; }
          }
          @keyframes hxNeon {
            0%,100% { text-shadow: 0 0 12px rgba(0,163,255,0.25); }
            50%     { text-shadow: 0 0 22px rgba(0,163,255,0.6), 0 0 44px rgba(0,163,255,0.25); }
          }
          @keyframes hxDraw  { to { transform: scaleX(1); } }
          @keyframes hxWheel { 0% { transform: translateY(0); opacity: 1; } 70% { transform: translateY(10px); opacity: 0; } 100% { opacity: 0; } }

          /* ---------- Responsive ---------- */
          @media (max-width: 900px) {
            .hx-section { height: auto; min-height: 85vh; padding: 7rem 6% 9rem; }
            .hx-title, .hx-premium { font-size: 2.5rem; }
            .hx-ai { top: 6%; right: 6%; font-size: 1.6rem; }
            .hx-hand-wrap--human { width: 60%; opacity: 0.55; }
            .hx-hand-wrap--robot { width: 55%; opacity: 0.55; }
            .hx-sub br { display: none; }
          }
        `}</style>
      </section>
    </div>
  );
};

export default Hero;