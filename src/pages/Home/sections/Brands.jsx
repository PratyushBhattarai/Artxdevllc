// src/pages/Home/sections/Brands.jsx

const imageModules = import.meta.glob('../../../assets/*.{png,jpg,jpeg,avif,webp}', { eager: true });
const allImages = Object.keys(imageModules)
  .filter(path => path.includes('/brand') || path.includes('/barnd'))
  .sort()
  .map(path => imageModules[path].default);

const Brands = () => {
  const logos = allImages;

  return (
    <section className="br-section">

      {/* Label with lines that draw in from both sides */}
      <div className="br-head" data-reveal="up">
        <span className="br-line" />
        <p className="br-label">
          <span className="br-dot" />
          Trusted by
        </p>
        <span className="br-line br-line--right" />
      </div>

      {/* Infinite marquee – pauses on hover, edges fade out */}
      <div className="br-viewport" data-reveal="blur" style={{ '--d': '0.15s' }}>
        <div className="br-track">
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="br-item">
              <img
                src={logo}
                alt={`Brand ${(index % logos.length) + 1}`}
                className="br-logo"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .br-section {
          background: #FFFFFF; padding: 3rem 0;
          display: flex; flex-direction: column; align-items: center;
          border-bottom: 1px solid #E5E5E5; overflow: hidden;
        }

        .br-head { display: flex; align-items: center; gap: 1rem; margin-bottom: 2.5rem; }
        .br-line {
          width: 80px; height: 1px;
          background: linear-gradient(90deg, transparent, #000000);
          transform: scaleX(0); transform-origin: right;
          transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.35s;
        }
        .br-line--right { background: linear-gradient(90deg, #000000, transparent); transform-origin: left; }
        .br-head[data-visible="true"] .br-line { transform: scaleX(1); }

        .br-label {
          margin: 0; display: flex; align-items: center; gap: 0.6rem;
          color: #000000; font-family: 'Hind', sans-serif;
          font-size: 1rem; font-weight: 600; letter-spacing: 0.5px;
        }
        .br-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #00A3FF;
          animation: brPulse 2s infinite;
        }

        .br-viewport {
          width: 100%; overflow: hidden; position: relative;
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 12%, #000 88%, transparent 100%);
                  mask-image: linear-gradient(90deg, transparent 0, #000 12%, #000 88%, transparent 100%);
        }
        .br-track {
          display: flex; align-items: center; gap: 4rem;
          padding: 2rem 4rem 2rem 0; width: max-content;
          animation: brScroll 30s linear infinite;
        }
        .br-viewport:hover .br-track { animation-play-state: paused; }

        .br-item {
          position: relative; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          height: 70px; width: 120px; cursor: pointer;
        }
        /* Electric blue underline on hover */
        .br-item::after {
          content: ''; position: absolute; left: 15%; right: 15%; bottom: -22px; height: 2px;
          border-radius: 2px; background: #00A3FF; box-shadow: 0 0 12px #00A3FF;
          transform: scaleX(0); transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .br-item:hover::after { transform: scaleX(1); }

        .br-logo {
          max-height: 100%; max-width: 100%; object-fit: contain;
          transform: scale(1.4);
          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.45s ease;
        }
        .br-item:hover .br-logo {
          transform: scale(1.55) translateY(-4px);
          filter: drop-shadow(0 8px 16px rgba(0, 163, 255, 0.35));
        }

        @keyframes brScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes brPulse {
          0%   { box-shadow: 0 0 0 0 rgba(0,163,255,0.6); }
          70%  { box-shadow: 0 0 0 8px rgba(0,163,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,163,255,0); }
        }
      `}</style>
    </section>
  );
};

export default Brands;