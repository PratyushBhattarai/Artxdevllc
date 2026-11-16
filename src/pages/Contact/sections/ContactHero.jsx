// src/pages/Contact/sections/ContactHero.jsx

import { Link } from 'react-router-dom';

const ContactHero = () => {
  return (
    <div className="ch-outer">
      <section className="ch-section">

        {/* Background */}
        <div className="ax-grid-bg" aria-hidden="true" />
        <div className="ch-glow" aria-hidden="true" />
        <div className="ch-orbit" aria-hidden="true"><span /><span /><span /></div>

        <div className="ch-content">
          <span className="ax-badge ax-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="ax-badge-dot" />
            We reply within 24 hours
          </span>

          <h1 className="ch-title">
            <span className="ax-line">
              <span className="ax-word" style={{ animationDelay: '0.25s' }}>Get</span>
              <span className="ax-word" style={{ animationDelay: '0.35s' }}>In</span>
              <span className="ax-word" style={{ animationDelay: '0.45s' }}>
                <span className="ax-shimmer">Touch</span>
              </span>
            </span>
          </h1>

          <p className="ch-sub ax-fade-up" style={{ animationDelay: '0.65s' }}>
            Ready to start your project? Let's discuss how we can bring your vision to life with our professional web development services.
          </p>

          {/* Quick contact chips */}
          <div className="ch-chips ax-fade-up" style={{ animationDelay: '0.85s' }}>
            <a href="mailto:raybeen@artxdevllc.com" className="ch-chip">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
              Email us
            </a>
            <a href="tel:+13342184725" className="ch-chip">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              Call us
            </a>
            <Link to="/book-meeting" className="ch-chip ch-chip--accent">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              Book a meeting
            </Link>
          </div>
        </div>

        <style>{`
          .ch-outer { background: #FFFFFF; padding: 0 0.15rem; }
          .ch-section {
            position: relative; overflow: hidden;
            background: #000000; padding: 8rem 5% 4rem;
            display: flex; flex-direction: column; align-items: center; text-align: center;
          }
          .ch-glow {
            position: absolute; top: -35%; left: 50%; width: 800px; height: 460px;
            transform: translateX(-50%); border-radius: 50%; pointer-events: none;
            background: radial-gradient(ellipse, rgba(0,163,255,0.2) 0%, rgba(255,255,255,0.04) 40%, transparent 70%);
            animation: chBreath 6s ease-in-out infinite;
          }
          /* Three blue dots orbiting behind the title */
          .ch-orbit {
            position: absolute; top: 46%; left: 50%; width: 640px; height: 220px;
            margin: -110px 0 0 -320px; pointer-events: none;
            border: 1px solid rgba(255,255,255,0.05); border-radius: 50%;
          }
          .ch-orbit span {
            position: absolute; top: 50%; left: 50%; width: 6px; height: 6px; margin: -3px;
            border-radius: 50%; background: #00A3FF; box-shadow: 0 0 12px 2px rgba(0,163,255,0.7);
            offset-path: ellipse(320px 110px at 50% 50%);
            animation: chOrbit 12s linear infinite;
          }
          .ch-orbit span:nth-child(2) { animation-delay: -4s; opacity: 0.6; }
          .ch-orbit span:nth-child(3) { animation-delay: -8s; opacity: 0.35; }

          .ch-content { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; }
          .ch-content > .ax-badge { margin-bottom: 1.5rem; }
          .ch-title {
            color: #FFFFFF; font-family: 'Inknut Antiqua', serif;
            font-size: 3.5rem; font-weight: 400; line-height: 1.3; margin: 0 0 1.5rem;
          }
          .ch-sub {
            color: #A1A1AA; font-family: 'Hind', sans-serif;
            font-size: 1.1rem; line-height: 1.6; max-width: 600px; margin: 0 0 2rem;
          }

          .ch-chips { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; }
          .ch-chip {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 9px 18px; border-radius: 30px;
            border: 1px solid #333333; background: rgba(255,255,255,0.03);
            color: #FFFFFF; font-family: 'Hind', sans-serif; font-size: 0.9rem; text-decoration: none;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .ch-chip svg { color: #00A3FF; transition: color 0.3s ease; }
          .ch-chip:hover {
            border-color: #00A3FF; transform: translateY(-3px);
            box-shadow: 0 10px 30px -10px rgba(0,163,255,0.8);
          }
          .ch-chip--accent { background: #FFFFFF; color: #000000; border-color: #FFFFFF; font-weight: 600; }
          .ch-chip--accent svg { color: #000000; }
          .ch-chip--accent:hover { background: #00A3FF; border-color: #00A3FF; }

          @keyframes chOrbit  { from { offset-distance: 0%; } to { offset-distance: 100%; } }
          @keyframes chBreath { 0%,100% { opacity: 0.7; transform: translateX(-50%) scale(1); } 50% { opacity: 1; transform: translateX(-50%) scale(1.08); } }

          @media (max-width: 640px) {
            .ch-section { padding: 5rem 6% 3rem; }
            .ch-title { font-size: 2.5rem; }
            .ch-orbit { display: none; }
          }
        `}</style>
      </section>
    </div>
  );
};

export default ContactHero;