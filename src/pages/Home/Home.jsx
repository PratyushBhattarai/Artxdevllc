// src/pages/Home/Home.jsx
import { useEffect, useRef } from 'react';
import Hero from './sections/Hero';
import Brands from './sections/Brands';
import WhatWeDo from './sections/WhatWeDo';
import Portfolio from './sections/Portfolio';
import HowWeWork from './sections/HowWeWork';
import Testimonials from './sections/Testimonials';
import Team from './sections/Team';
import FAQ from './sections/FAQ';

/*
  ===========================================================
  HOME PAGE ANIMATION SYSTEM
  Palette: Black / White + Electric Blue (#00A3FF) as accent
  -----------------------------------------------------------
  1. Scroll reveal: put data-reveal="up | down | left | right | zoom | blur"
     on any element and it animates in when it scrolls into view.
     Stagger with:  style={{ '--d': '0.2s' }}
  2. Shared classes used by the sections:
     .ax-btn (+ --solid / --outline), .ax-link, .ax-play, .ax-shimmer, .ax-eyebrow
  3. Scroll progress bar
  ===========================================================
*/

const globalStyles = `
  :root { --ax-blue: #00A3FF; }

  ::selection { background: #00A3FF; color: #000; }

  /* ---------- Scroll reveal ---------- */
  [data-reveal] {
    opacity: 0;
    transition:
      opacity 1s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0s),
      transform 1s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0s),
      filter 1s ease var(--d, 0s);
    will-change: opacity, transform;
  }
  [data-reveal="up"]    { transform: translateY(22px); }
  [data-reveal="down"]  { transform: translateY(-16px); }
  [data-reveal="left"]  { transform: translateX(-24px); }
  [data-reveal="right"] { transform: translateX(24px); }
  [data-reveal="zoom"]  { transform: translateY(18px); }
  [data-reveal="blur"]  { transform: translateY(12px); filter: blur(6px); }
  [data-reveal][data-visible="true"] { opacity: 1; transform: none; filter: none; }

  /* ---------- Scroll progress ---------- */
  .ax-progress {
    position: fixed; top: 0; left: 0; width: 100%; height: 3px;
    z-index: 10001; pointer-events: none;
    transform-origin: 0 50%; transform: scaleX(0);
    background: linear-gradient(90deg, #00A3FF, #7fd3ff, #ffffff);
    box-shadow: 0 0 12px rgba(0, 163, 255, 0.8);
  }

  /* ---------- Eyebrow label ---------- */
  .ax-eyebrow {
    display: inline-flex; align-items: center; gap: 0.7rem;
    font-family: 'Hind', sans-serif; font-size: 0.8rem;
    letter-spacing: 2px; text-transform: uppercase;
    color: #888888; margin: 0 0 0.6rem;
  }
  .ax-eyebrow::before {
    content: ''; width: 28px; height: 1px;
    background: #00A3FF; box-shadow: 0 0 8px #00A3FF;
  }

  /* ---------- Shimmer text ---------- */
  .ax-shimmer {
    background: linear-gradient(90deg, #ffffff 0%, #ffffff 38%, #00A3FF 50%, #ffffff 62%, #ffffff 100%);
    background-size: 250% 100%;
    -webkit-background-clip: text; background-clip: text;
    color: transparent; -webkit-text-fill-color: transparent;
    animation: axShimmer 5s linear infinite;
  }
  @keyframes axShimmer {
    0%   { background-position: 100% 0; }
    100% { background-position: 0% 0; }
  }

  /* ---------- Buttons ---------- */
  .ax-btn {
    position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    padding: 12px 34px; border-radius: 30px;
    font-family: 'Hind', sans-serif; font-size: 0.95rem;
    cursor: pointer; overflow: hidden; isolation: isolate; text-decoration: none;
    transition: color 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, transform 0.2s ease;
    box-sizing: border-box;
  }
  .ax-btn:active { transform: scale(0.97); }
  .ax-btn-arrow { display: inline-block; transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
  .ax-btn:hover .ax-btn-arrow { transform: translateX(5px); }

  .ax-btn--outline { background: transparent; color: #FFFFFF; border: 1px solid #FFFFFF; }
  .ax-btn--outline::before {
    content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
    background: #FFFFFF; transform: translateY(101%);
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .ax-btn--outline:hover { color: #000000; box-shadow: 0 10px 40px -8px rgba(0, 163, 255, 0.7); }
  .ax-btn--outline:hover::before { transform: translateY(0); }

  .ax-btn--solid { background: #FFFFFF; color: #000000; border: 1px solid #FFFFFF; font-weight: 600; }
  .ax-btn--solid::after {
    content: ''; position: absolute; top: 0; left: -75%; width: 50%; height: 100%; z-index: -1;
    background: linear-gradient(100deg, transparent, rgba(0, 163, 255, 0.45), transparent);
    transform: skewX(-20deg);
  }
  .ax-btn--solid:hover { box-shadow: 0 0 0 1px #FFFFFF, 0 0 32px rgba(0, 163, 255, 0.75); }
  .ax-btn--solid:hover::after { animation: axShine 0.8s ease forwards; }
  @keyframes axShine { to { left: 125%; } }

  /* Outline button for white sections */
  .ax-btn--ink { background: transparent; color: #0A0A0A; border: 1px solid #0A0A0A; }
  .ax-btn--ink::before {
    content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
    background: #0A0A0A; transform: translateY(101%);
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .ax-btn--ink:hover { color: #FFFFFF; box-shadow: 0 10px 34px -10px rgba(0, 163, 255, 0.6); }
  .ax-btn--ink:hover::before { transform: translateY(0); }

  /* Dark versions for white sections */
  .ax-link.ax-link--ink { color: #0A0A0A; }
  .ax-shimmer--ink {
    background: linear-gradient(90deg, #0A0A0A 0%, #0A0A0A 38%, #00A3FF 50%, #0A0A0A 62%, #0A0A0A 100%);
    background-size: 250% 100%;
    -webkit-background-clip: text; background-clip: text;
    color: transparent; -webkit-text-fill-color: transparent;
    animation: axShimmer 6s linear infinite;
  }

  /* ---------- Underline link ---------- */
  .ax-link {
    position: relative; display: inline-flex; align-items: center; gap: 6px;
    color: #FFFFFF; text-decoration: none; padding-bottom: 4px;
    font-family: 'Hind', sans-serif; font-size: 0.95rem;
  }
  .ax-link::after {
    content: ''; position: absolute; left: 0; bottom: 0; width: 100%; height: 1px;
    background: #00A3FF; box-shadow: 0 0 8px #00A3FF;
    transform: scaleX(0); transform-origin: right;
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .ax-link:hover::after { transform: scaleX(1); transform-origin: left; }
  .ax-link-arrow { display: inline-block; transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s; }
  .ax-link:hover .ax-link-arrow { transform: translateX(5px); color: #00A3FF; }
  .ax-link:hover .ax-link-arrow--diag { transform: translate(3px, -3px); }

  /* ---------- Play button with pulse rings ---------- */
  .ax-play {
    position: relative; z-index: 2; flex-shrink: 0;
    width: 60px; height: 60px; border-radius: 50%; background: #FFFFFF;
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease;
  }
  .ax-play::before, .ax-play::after {
    content: ''; position: absolute; inset: 0; border-radius: 50%;
    border: 1.5px solid rgba(0, 163, 255, 0.85); pointer-events: none;
    animation: axRing 2.6s cubic-bezier(0.22, 1, 0.36, 1) infinite;
  }
  .ax-play::after { animation-delay: 1.3s; }
  .ax-play-tri {
    width: 0; height: 0; margin-left: 5px;
    border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-left: 15px solid #000000;
  }
  .ax-play--sm { width: 50px; height: 50px; }
  .ax-play--sm .ax-play-tri { border-top-width: 8px; border-bottom-width: 8px; border-left-width: 12px; margin-left: 4px; }
  @keyframes axRing {
    0%   { transform: scale(1);   opacity: 0.9; }
    100% { transform: scale(1.9); opacity: 0; }
  }

  /* ---------- Accessibility: respect reduced motion ---------- */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      transition-delay: 0s !important;
    }
    [data-reveal] { opacity: 1 !important; transform: none !important; filter: none !important; }
  }
`;

const Home = () => {
  const mainRef = useRef(null);
  const progressRef = useRef(null);

  // Scroll reveal – every [data-reveal] element animates in once
  useEffect(() => {
    const root = mainRef.current;
    if (!root) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    root.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll progress bar
  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <main ref={mainRef}>
      <div ref={progressRef} className="ax-progress" aria-hidden="true" />

      <Hero />
      {/* Sections alternate: white / black */}
      <WhatWeDo />
      <HowWeWork />
      <Portfolio />
      <Testimonials />
      <Team />
      <FAQ />
      <Brands />

      <style>{globalStyles}</style>
    </main>
  );
};

export default Home;