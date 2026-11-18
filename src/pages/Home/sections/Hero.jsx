// src/pages/Home/sections/Hero.jsx
//
// Premium black & white hero, text in the centre.
// Background: a fine grid where a few cells softly light up, a soft white glow
// at the top and a light spotlight that follows the mouse.
// Electric blue is only used as a touch in the text ("Premium." and the pill dot).

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeroRobot from './HeroRobot';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

// Headline – each word blurs in and slides up, one after another
const HEADLINE = [
  ['We', 'build', 'Digital'],
  ['Products', 'That', 'Feel'],
];

const EASE = [0.22, 1, 0.36, 1];

// Services strip along the bottom of the hero (scrolls forever)
const SERVICES_STRIP = [
  'Web Design',
  'Web Development',
  'Mobile Apps',
  'UI / UX',
  'Practical AI',
  'Branding',
];

const wordVariants = {
  hidden: { y: '110%', opacity: 0, filter: 'blur(14px)' },
  show: { y: '0%', opacity: 1, filter: 'blur(0px)', transition: { duration: 1, ease: EASE } },
};

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, ease: EASE, delay },
});

// Grid cells that softly light up in the background (column, row, delay)
const GRID_CELLS = [
  [3, 2, 0], [19, 1, 1.4], [6, 7, 2.6], [16, 6, 0.8], [11, 9, 3.4],
  [1, 5, 4.2], [21, 4, 2.0], [8, 1, 5.0], [14, 3, 3.0], [18, 9, 4.6],
  [4, 10, 1.8], [12, 0, 5.6],
];

const Hero = () => {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Soft white spotlight that follows the mouse
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const spotX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.6 });
  const spotY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.6 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !window.matchMedia('(pointer: fine)').matches) return undefined;
    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      mouseX.set(e.clientX - r.left);
      mouseY.set(e.clientY - r.top);
    };
    section.addEventListener('mousemove', onMove);
    return () => section.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  // Scroll: text lifts and fades out
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={sectionRef} className="hx">
      {/* ================= BACKGROUND (black & white) ================= */}
      <div className="hx-bg" aria-hidden="true">
        <div className="hx-topglow" />
        <div className="hx-grid">
          {GRID_CELLS.map(([col, row, delay]) => (
            <span
              key={`${col}-${row}`}
              className="hx-cell"
              style={{ '--col': col, '--row': row, animationDelay: `${delay}s` }}
            />
          ))}
        </div>
        <motion.div className="hx-spot" style={{ x: spotX, y: spotY }} />
        <div className="hx-noise" />
        <div className="hx-vignette" />
      </div>

      {/* ================= CONTENT (left) + ROBOT (right) ================= */}
      <div className="hx-layout">
      <motion.div
        className="hx-inner"
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.span className="hx-pill" {...fadeUp(0.1)}>
          <span className="hx-pill-dot" />
          Design · Development · AI
        </motion.span>

        <motion.h1
          className="hx-title"
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08, delayChildren: 0.3 }}
        >
          {HEADLINE.map((line, li) => (
            <span key={li} className="hx-line">
              {line.map((word) => (
                <span key={word} className="hx-word-mask">
                  <motion.span className="hx-word" variants={wordVariants}>
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
          <span className="hx-line">
            <span className="hx-word-mask">
              <motion.span className="hx-word hx-word--accent" variants={wordVariants}>
                <span className="hx-premium">Premium.</span>
              </motion.span>
            </span>
          </span>
        </motion.h1>

        <motion.div className="hx-actions" {...fadeUp(1.15)}>
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <Link to="/contact" className="hx-btn hx-btn--primary">
              <span className="hx-btn-shine" aria-hidden="true" />
              Start a project <span className="hx-btn-arrow">→︎</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <Link to="/portfolio" className="hx-btn hx-btn--glass">
              See Our Work <span className="hx-btn-arrow">→︎</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

        <div className="hx-robot">
          <HeroRobot />
        </div>
      </div>

      {/* ================= SERVICES STRIP (bottom) ================= */}
      <motion.div
        className="hx-strip"
        aria-hidden="true"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 1.4 }}
      >
        <div className="hx-strip-fade">
        <div className="hx-strip-track">
          {/* 6 copies: each half is wider than any screen, so the loop never shows a gap */}
          {Array.from({ length: 6 }, () => SERVICES_STRIP).flat().map((item, i) => (
            <span key={i} className="hx-strip-item">
              {item}
            </span>
          ))}
        </div>
        </div>
      </motion.div>

      <style>{`
        .hx {
          position: relative; overflow: hidden; isolation: isolate;
          background: #000000;
          min-height: calc(100svh - 90px); max-height: 900px;
          display: flex; align-items: center; justify-content: center;
          padding: 5rem 6% 7rem; box-sizing: border-box;
          border-bottom: 6px solid #FFFFFF; /* white band between the hero and What We Do */
        }

        /* ---------- Background ---------- */
        .hx-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }

        .hx-topglow {
          position: absolute; top: -35%; left: 50%; width: 120%; height: 80%; transform: translateX(-50%);
          background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.03) 40%, transparent 70%);
          animation: hxBreathe 8s ease-in-out infinite;
        }
        /* Grid pattern – fine lines, a few cells softly light up */
        .hx-grid {
          --cell: 64px;
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
          background-size: var(--cell) var(--cell);
          background-position: -1px -1px;
          -webkit-mask-image: radial-gradient(ellipse 75% 70% at 50% 45%, #000 20%, transparent 85%);
                  mask-image: radial-gradient(ellipse 75% 70% at 50% 45%, #000 20%, transparent 85%);
        }
        .hx-cell {
          position: absolute;
          left: calc(var(--col) * var(--cell)); top: calc(var(--row) * var(--cell));
          width: calc(var(--cell) - 1px); height: calc(var(--cell) - 1px);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
          opacity: 0;
          animation: hxCell 6.5s ease-in-out infinite;
        }

        .hx-spot {
          position: absolute; top: 0; left: 0; width: 600px; height: 600px; margin: -300px 0 0 -300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 35%, transparent 68%);
        }
        .hx-noise {
          position: absolute; inset: 0; opacity: 0.07; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .hx-vignette { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 70%, #000 100%); }

        /* ---------- Layout: text left, robot right ---------- */
        .hx-layout {
          position: relative; z-index: 2; width: 100%; max-width: 1280px;
          display: grid; grid-template-columns: 1.2fr 0.8fr; align-items: center; gap: 2rem;
        }
        .hx-robot { display: flex; justify-content: center; }
        .hx-inner {
          position: relative; z-index: 2; width: 100%;
          display: flex; flex-direction: column; align-items: flex-start; text-align: left;
        }

        .hx-pill {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 8px 18px; margin-bottom: 2rem; border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
          -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
          color: #D4D4D4; font-family: 'Hind', sans-serif; font-size: 0.74rem;
          letter-spacing: 2px; text-transform: uppercase;
        }
        .hx-pill-dot { width: 7px; height: 7px; border-radius: 50%; background: #00A3FF; animation: hxDot 1.8s infinite; }

        .hx-title {
          margin: 0 0 2.6rem; color: #FFFFFF;
          font-family: 'Kantumruy Pro', sans-serif; font-weight: 600;
          font-size: clamp(2.6rem, 5vw, 4.8rem); line-height: 1.02; letter-spacing: -0.035em;
        }
        .hx-line { display: block; }
        .hx-word-mask { display: inline-block; overflow: hidden; padding: 0 0.06em 0.14em 0; margin: 0 0.18em -0.14em 0; vertical-align: top; }
        .hx-word {
          display: inline-block; will-change: transform, filter;
          background: linear-gradient(180deg, #FFFFFF 35%, #BDBDBD 100%);
          -webkit-background-clip: text; background-clip: text;
          color: transparent; -webkit-text-fill-color: transparent;
        }
        .hx-word--accent { background: none; }
        .hx-premium {
          display: inline-block;
          font-family: 'Sansation', sans-serif; font-weight: 700; letter-spacing: -0.01em;
          background: linear-gradient(90deg, #00A3FF 0%, #7FD3FF 25%, #FFFFFF 45%, #7FD3FF 65%, #00A3FF 85%, #00A3FF 100%);
          background-size: 220% 100%;
          -webkit-background-clip: text; background-clip: text;
          color: transparent; -webkit-text-fill-color: transparent;
          animation: hxShine 5s linear infinite;
        }

        .hx-actions { display: flex; flex-wrap: wrap; justify-content: flex-start; gap: 1rem; }
        .hx-btn {
          position: relative; overflow: hidden; isolation: isolate;
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 15px 32px; border-radius: 999px; box-sizing: border-box;
          font-family: 'Hind', sans-serif; font-size: 1rem; font-weight: 600; text-decoration: none;
          transition: box-shadow 0.4s ease, background 0.4s ease, border-color 0.4s ease, color 0.4s ease;
        }
        .hx-btn-arrow { display: inline-block; transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
        .hx-btn:hover .hx-btn-arrow { transform: translateX(4px); }

        .hx-btn--primary {
          background: #FFFFFF; color: #000000;
          box-shadow: 0 12px 40px -14px rgba(255, 255, 255, 0.45);
        }
        .hx-btn--primary:hover { box-shadow: 0 0 0 1px #FFFFFF, 0 16px 48px -12px rgba(255, 255, 255, 0.55); }
        .hx-btn-shine {
          position: absolute; top: 0; left: -80%; width: 50%; height: 100%; z-index: -1;
          background: linear-gradient(100deg, transparent, rgba(0, 0, 0, 0.12), transparent);
          transform: skewX(-20deg); animation: hxBtnShine 3.8s ease-in-out 2.2s infinite;
        }
        .hx-btn--glass {
          color: #FFFFFF; border: 1px solid rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.04);
          -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
        }
        .hx-btn--glass:hover { border-color: #FFFFFF; background: rgba(255, 255, 255, 0.1); }

        /* ---------- Services strip ---------- */
        .hx-strip {
          position: absolute; left: 0; right: 0; bottom: 0; z-index: 2;
          overflow: hidden; padding: 0.95rem 0;
          background: transparent;
        }
        .hx-strip-fade {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 18%, #000 82%, transparent 100%);
                  mask-image: linear-gradient(90deg, transparent 0, #000 18%, #000 82%, transparent 100%);
        }
        .hx-strip-track { display: flex; width: max-content; animation: hxStrip 90s linear infinite; }
        .hx-strip:hover .hx-strip-track { animation-play-state: paused; }
        .hx-strip-item {
          display: inline-flex; align-items: center; white-space: nowrap;
          color: rgba(255, 255, 255, 0.26); font-family: 'Inter', sans-serif; font-size: 0.78rem; font-weight: 400;
          letter-spacing: 1.5px; text-transform: uppercase;
          padding-right: 3.5rem;
        }

        /* ---------- Keyframes ---------- */
        @keyframes hxStrip { to { transform: translateX(-50%); } }
        @keyframes hxCell    { 0%, 100% { opacity: 0; } 18%, 34% { opacity: 1; } 55% { opacity: 0; } }
        @keyframes hxBreathe { 0%,100% { opacity: 0.8; } 50% { opacity: 1; } }
        @keyframes hxShine   { 0% { background-position: 100% 0; } 100% { background-position: -120% 0; } }
        @keyframes hxBtnShine { 0% { left: -80%; } 45%, 100% { left: 130%; } }
        @keyframes hxDot {
          0%   { box-shadow: 0 0 0 0 rgba(0,163,255,0.6); }
          70%  { box-shadow: 0 0 0 9px rgba(0,163,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,163,255,0); }
        }

        /* ---------- Tablet & phone ---------- */
        @media (max-width: 900px) {
          .hx { min-height: 0; max-height: none; padding: 5rem 6% 7rem; }
          .hx-spot { display: none; }
          .hx-grid { --cell: 44px; }
          .hx-layout { grid-template-columns: 1fr; gap: 2.5rem; justify-items: center; }
          .hx-inner { align-items: center; text-align: center; }
          .hx-actions { justify-content: center; }
          .rb { width: min(56vw, 260px); }
        }
        @media (max-width: 560px) {
          .hx { padding: 4.5rem 5% 6rem; min-height: min(640px, calc(100svh - 80px)); }
          .hx-pill { font-size: 0.64rem; letter-spacing: 1.4px; margin-bottom: 1.5rem; padding: 7px 14px; }
          .hx-title { font-size: clamp(2rem, 9.6vw, 3rem); margin-bottom: 2rem; }
          .hx-actions { flex-direction: column; align-items: stretch; width: 100%; max-width: 340px; gap: 0.7rem; }
          .hx-actions > div { width: 100%; }
          .hx-btn { width: 100%; padding: 13px 22px; }
          .hx-strip { padding: 0.75rem 0; }
          .hx-strip-item { font-size: 0.72rem; letter-spacing: 1.2px; }
          .hx-strip-item { padding-right: 2.25rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hx-btn-shine, .hx-premium, .hx-topglow, .hx-cell, .hx-strip-track { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
