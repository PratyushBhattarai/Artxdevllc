// src/pages/Team/sections/TeamHero.jsx

// 1. IMPORT YOUR CEO PHOTO HERE
// import ceoPhoto from '../../../assets/ceo-photo.png';

// 2. REPLACE null WITH YOUR IMPORT (image: ceoPhoto)
const ceo = {
  name: '[CEO Full Name]',
  title: 'Chief Executive Officer',
  desc: '[Place CEO description here. Talk about their vision, experience, and how they lead the company towards success.]',
  image: null,
};

const TeamHero = () => {
  const handleSpotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div className="tp-outer">
      <section className="tp-section tp-section--first th-section">
        <div className="ax-grid-bg" aria-hidden="true" />
        <div className="th-glow" aria-hidden="true" />

        {/* Heading */}
        <div className="th-head">
          <p className="ax-eyebrow ax-fade-up" style={{ animationDelay: '0.1s' }}>The Minds Behind</p>
          <h1 className="th-title">
            <span className="ax-line">
              <span className="ax-word" style={{ animationDelay: '0.25s' }}>Our</span>
              <span className="ax-word" style={{ animationDelay: '0.37s' }}>
                <span className="ax-shimmer">Team</span>
              </span>
            </span>
          </h1>
        </div>

        {/* CEO card */}
        <div data-reveal="up">
          <article className="th-ceo tp-hover" onMouseMove={handleSpotlight}>

            {/* CEO IMAGE */}
            <div className="th-photo-wrap">
              <span className="th-photo-ring" aria-hidden="true" />
              <span className="th-photo-ring th-photo-ring--2" aria-hidden="true" />
              <div className="th-photo">
                {ceo.image ? (
                  <img src={ceo.image} alt={ceo.name} />
                ) : (
                  <div className="th-silhouette" aria-hidden="true" />
                )}
              </div>
            </div>

            <div className="th-info">
              <span className="tp-pill">Leadership</span>
              <h2 className="th-name">{ceo.name}</h2>
              <p className="th-role">{ceo.title}</p>
              <p className="th-desc">{ceo.desc}</p>
            </div>
          </article>
        </div>

        <style>{`
          .th-section { padding-bottom: 6rem; }
          .th-glow {
            position: absolute; top: -260px; left: 50%; width: 900px; height: 520px; z-index: 0;
            transform: translateX(-50%); border-radius: 50%; pointer-events: none;
            background: radial-gradient(ellipse, rgba(0,163,255,0.2), rgba(255,255,255,0.03) 45%, transparent 70%);
            animation: thBreath 6s ease-in-out infinite;
          }

          .th-head { text-align: center; margin-bottom: 5rem; display: flex; flex-direction: column; align-items: center; }
          .th-head .ax-eyebrow { margin-bottom: 1rem; letter-spacing: 3px; }
          .th-title {
            color: #FFFFFF; font-family: 'Hanuman', serif;
            font-size: 4.5rem; font-weight: 400; line-height: 1.2; margin: 0;
          }

          /* CEO card */
          .th-ceo {
            position: relative; isolation: isolate; overflow: hidden;
            display: flex; align-items: center; gap: 4rem;
            padding: 3rem; border-radius: 24px;
            background: #121212; border: 1px solid #2A2A2A;
            transition: border-color 0.4s ease, box-shadow 0.5s ease;
          }
          .th-ceo::before {
            content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none;
            background: radial-gradient(520px circle at var(--mx, 30%) var(--my, 50%), rgba(0,163,255,0.12), transparent 50%);
            opacity: 0; transition: opacity 0.4s ease;
          }
          .th-ceo::after {
            content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
            background: linear-gradient(90deg, transparent, #00A3FF, transparent);
            background-size: 40% 100%; background-repeat: no-repeat;
            animation: thScan 4s linear infinite;
          }
          .th-ceo:hover { border-color: rgba(0,163,255,0.4); box-shadow: 0 30px 70px -30px rgba(0,163,255,0.55); }
          .th-ceo:hover::before { opacity: 1; }

          .th-photo-wrap { position: relative; width: 350px; height: 350px; flex-shrink: 0; }
          .th-photo {
            position: absolute; inset: 0; border-radius: 50%; overflow: hidden;
            border: 2px solid #444444; background: #2A2A2A;
            display: flex; align-items: flex-end; justify-content: center;
            transition: border-color 0.4s ease;
          }
          .th-photo img {
            width: 100%; height: 100%; object-fit: cover;
            filter: grayscale(1) contrast(1.05);
            transition: filter 0.7s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .th-ceo:hover .th-photo img { filter: grayscale(0); transform: scale(1.05); }
          .th-ceo:hover .th-photo { border-color: #00A3FF; }
          .th-silhouette {
            width: 80%; height: 90%; background: #444444;
            border-top-left-radius: 100px; border-top-right-radius: 100px;
            transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .th-ceo:hover .th-silhouette { transform: translateY(-6px) scale(1.03); }

          /* Orbiting rings around the CEO photo */
          .th-photo-ring {
            position: absolute; inset: -16px; border-radius: 50%; pointer-events: none;
            border: 1px dashed rgba(255,255,255,0.12);
            animation: tpSpin 30s linear infinite;
          }
          .th-photo-ring::after {
            content: ''; position: absolute; top: 50%; left: -5px; width: 9px; height: 9px; margin-top: -4.5px;
            border-radius: 50%; background: #00A3FF; box-shadow: 0 0 14px 3px rgba(0,163,255,0.7);
          }
          .th-photo-ring--2 { inset: -32px; border-style: solid; border-color: rgba(0,163,255,0.12); animation-duration: 18s; animation-direction: reverse; }
          .th-photo-ring--2::after { width: 6px; height: 6px; margin-top: -3px; left: -3.5px; opacity: 0.7; }

          .th-info { min-width: 0; }
          .th-name { color: #FFFFFF; font-family: 'Hanuman', serif; font-size: 3rem; line-height: 1.2; margin: 0 0 0.5rem; }
          .th-role {
            color: #00A3FF; font-family: 'Hind', sans-serif; font-size: 1.2rem; font-weight: 600;
            letter-spacing: 1px; margin: 0 0 1.5rem;
          }
          .th-desc { color: #888888; font-family: 'Hind', sans-serif; font-size: 1.1rem; line-height: 1.8; max-width: 600px; margin: 0; }

          @keyframes thBreath { 0%,100% { opacity: 0.7; transform: translateX(-50%) scale(1); } 50% { opacity: 1; transform: translateX(-50%) scale(1.08); } }
          @keyframes thScan   { 0% { background-position: -60% 0; } 100% { background-position: 160% 0; } }

          @media (max-width: 1024px) {
            .th-photo-wrap { width: 260px; height: 260px; }
            .th-ceo { gap: 3rem; }
          }
          @media (max-width: 760px) {
            .th-title { font-size: 3rem; }
            .th-ceo { flex-direction: column; text-align: center; padding: 3rem 1.5rem 2rem; }
            .th-photo-wrap { width: 220px; height: 220px; }
            .th-name { font-size: 2.2rem; }
          }
        `}</style>
      </section>
    </div>
  );
};

export default TeamHero;