// src/pages/Portfolio/sections/PortfolioHero.jsx

const PortfolioHero = () => {
  return (
    <div className="ph-outer">
      <section className="ph-section">

        {/* BACKGROUND: grid, glow, orbiting rings */}
        <div className="ax-grid-bg" aria-hidden="true" />
        <div className="ph-glow" aria-hidden="true" />
        <div className="ph-ring ph-ring--1" aria-hidden="true" />
        <div className="ph-ring ph-ring--2" aria-hidden="true" />

        <div className="ph-content">

          {/* Small Top Label */}
          <span className="ax-badge ax-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="ax-badge-dot" />
            Our Work
          </span>

          {/* Title */}
          <h1 className="ph-title">
            <span className="ax-line">
              <span className="ax-word" style={{ animationDelay: '0.25s' }}>Our</span>
              <span className="ax-word ph-italic" style={{ animationDelay: '0.37s' }}>
                <span className="ph-shimmer">Portfolio.</span>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="ph-sub ax-fade-up" style={{ animationDelay: '0.6s' }}>
            Explore the digital experiences we've crafted for our clients. From high-performance web apps to full-scale marketing campaigns.
          </p>

          {/* Scroll Indicator */}
          <div className="ph-scroll ax-fade-up" style={{ animationDelay: '0.9s' }}>
            <p>Scroll to explore</p>
            <span className="ph-scroll-line"><span /></span>
          </div>

        </div>

        <style>{`
          .ph-outer { background: #FFFFFF; padding: 0 0.15rem; }
          .ph-section {
            position: relative; overflow: hidden;
            background: #000000; padding: 6rem 5% 5rem;
            display: flex; flex-direction: column; align-items: center; text-align: center;
          }
          .ph-glow {
            position: absolute; top: -30%; left: 50%; width: 760px; height: 420px;
            transform: translateX(-50%); border-radius: 50%; pointer-events: none; z-index: 0;
            background: radial-gradient(ellipse, rgba(0,163,255,0.18) 0%, rgba(255,255,255,0.04) 40%, transparent 70%);
            animation: phBreath 6s ease-in-out infinite;
          }
          .ph-ring {
            position: absolute; top: 50%; left: 50%; border-radius: 50%; pointer-events: none; z-index: 0;
            border: 1px dashed rgba(255,255,255,0.07);
          }
          .ph-ring--1 { width: 520px; height: 520px; margin: -260px 0 0 -260px; animation: phSpin 40s linear infinite; }
          .ph-ring--2 { width: 860px; height: 860px; margin: -430px 0 0 -430px; animation: phSpin 70s linear infinite reverse; }
          .ph-ring::after {
            content: ''; position: absolute; top: -4px; left: 50%; width: 8px; height: 8px; margin-left: -4px;
            border-radius: 50%; background: #00A3FF; box-shadow: 0 0 14px 3px rgba(0,163,255,0.7);
          }

          .ph-content { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; }
          .ph-content > .ax-badge { margin-bottom: 1.5rem; }

          .ph-title {
            color: #FFFFFF; font-family: 'Inknut Antiqua', serif;
            font-size: 3rem; font-weight: 400; line-height: 1.25; letter-spacing: -1px;
            margin: 0 0 1.5rem;
          }
          .ph-italic { font-style: italic; }
          .ph-shimmer {
            background: linear-gradient(90deg, #888888 0%, #888888 35%, #00A3FF 50%, #888888 65%, #888888 100%);
            background-size: 250% 100%;
            -webkit-background-clip: text; background-clip: text;
            color: transparent; -webkit-text-fill-color: transparent;
            animation: axShimmer 4.5s linear infinite;
            padding-right: 0.1em;
          }

          .ph-sub {
            color: #A1A1AA; font-family: 'Hind', sans-serif;
            font-size: 0.95rem; line-height: 1.7; max-width: 600px; margin: 0 auto;
          }

          .ph-scroll { margin-top: 3rem; display: flex; flex-direction: column; align-items: center; gap: 10px; }
          .ph-scroll p {
            margin: 0; color: rgba(255,255,255,0.55); font-family: 'Hind', sans-serif;
            font-size: 0.7rem; letter-spacing: 1px; text-transform: uppercase;
          }
          .ph-scroll-line { position: relative; width: 1px; height: 40px; background: rgba(255,255,255,0.2); overflow: hidden; }
          .ph-scroll-line span {
            position: absolute; left: 0; top: -40%; width: 1px; height: 40%;
            background: #00A3FF; box-shadow: 0 0 8px #00A3FF;
            animation: phDrip 1.8s ease-in-out infinite;
          }

          @keyframes phSpin   { to { transform: rotate(360deg); } }
          @keyframes phBreath { 0%,100% { opacity: 0.7; transform: translateX(-50%) scale(1); } 50% { opacity: 1; transform: translateX(-50%) scale(1.08); } }
          @keyframes phDrip   { 0% { top: -40%; } 100% { top: 100%; } }

          @media (max-width: 640px) {
            .ph-title { font-size: 2.3rem; }
            .ph-section { padding: 4.5rem 6% 4rem; }
          }
        `}</style>
      </section>
    </div>
  );
};

export default PortfolioHero;