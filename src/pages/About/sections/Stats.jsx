// src/pages/About/sections/Stats.jsx
import React, { useEffect, useRef, useState } from 'react';

// Edit these numbers/labels any time — the cards update automatically.
const STATS = [
  {
    value: 10,
    suffix: '+',
    label: 'Team members',
    desc: 'Designers and developers fully dedicated to building your product.',
  },
  {
    value: 2024,
    from: 1990,
    label: 'Founded',
    desc: 'Started as a freelance studio in Kathmandu, Nepal.',
  },
  {
    value: 2,
    label: 'Countries',
    desc: 'Offices in Nepal and the USA, working across time zones for you.',
  },
  {
    value: 8,
    suffix: '+',
    label: 'Brands trust us',
    desc: 'Businesses that rely on us for design, code and AI.',
  },
];

// Counts from `from` to `to` once the element scrolls into view
const CountUp = ({ to, from = 0, duration = 1800, suffix = '' }) => {
  const ref = useRef(null);
  const [val, setVal] = useState(from);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(from + (to - from) * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, from, duration]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
};

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="stats-bg-grid" aria-hidden="true" />
      <div className="container">
        <div className="stats-header reveal">
          <p className="section-eyebrow">[ BY THE NUMBERS ]</p>
          <h2 className="stats-heading">
            Small team. <span className="outline-text">Big output.</span>
          </h2>
          <p className="stats-sub">
            We stay small on purpose — so every project gets senior attention, fast
            decisions and work we're proud to put our name on.
          </p>
        </div>

        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="stat-card reveal"
              style={{ '--d': `${i * 120}ms` }}
            >
              <span className="stat-index">0{i + 1}</span>
              <div className="stat-number">
                <span className="bracket bracket-l">[</span>
                <CountUp to={s.value} from={s.from} suffix={s.suffix} />
                <span className="bracket bracket-r">]</span>
              </div>
              <h3 className="stat-label">{s.label}</h3>
              <p className="stat-desc">{s.desc}</p>
              <span className="stat-bar" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
