// src/pages/Home/sections/Testimonials.jsx

const Testimonials = () => {
  return (
    <div className="ts-outer">
      <section className="ts-section">
        <div className="ts-glow" aria-hidden="true" />

        {/* Section Title */}
        <div className="ts-header">
          <p className="ax-eyebrow" data-reveal="left">Testimonials</p>
          <h2 className="ts-title" data-reveal="up" style={{ '--d': '0.1s' }}>
            What clients say
          </h2>
        </div>

        {/* ================= COMING SOON CONTENT ================= */}
        <div className="ts-coming-soon">
          <div className="ts-cs-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              <line x1="9" y1="10" x2="15" y2="10"></line>
              <line x1="9" y1="14" x2="15" y2="14"></line>
            </svg>
          </div>
          <h3 className="ts-cs-title">Coming Soon</h3>
          <p className="ts-cs-text">
            We are currently gathering video testimonials and reviews from our amazing clients. 
            Check back soon to see what they have to say.
          </p>
        </div>

      </section>

      <style>{`
        .ts-outer { background: #FFFFFF; padding: 0 0.15rem; }
        .ts-section {
          position: relative; background: #000000; padding: 5rem 5%;
          display: flex; flex-direction: column; overflow: hidden;
          min-height: 60vh; /* Ensures the section has good height */
        }
        .ts-glow {
          position: absolute; bottom: -250px; left: -150px; width: 650px; height: 650px;
          border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(0,163,255,0.12), transparent 65%);
          animation: tsGlow 12s ease-in-out infinite alternate;
        }

        .ts-header { position: relative; margin-bottom: 3rem; }
        .ts-title {
          color: #FFFFFF; font-family: 'Inknut Antiqua', serif;
          font-size: 3.5rem; font-weight: 400; line-height: 1.2; margin: 0;
        }

        /* Coming Soon Styles */
        .ts-coming-soon {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4rem 2rem;
          position: relative;
          z-index: 1;
        }
        
        .ts-cs-icon {
          width: 80px; height: 80px;
          border-radius: 50%;
          background: rgba(0, 163, 255, 0.1);
          border: 1px solid rgba(0, 163, 255, 0.3);
          display: flex; align-items: center; justify-content: center;
          color: #00A3FF;
          margin-bottom: 2rem;
          box-shadow: 0 0 30px rgba(0, 163, 255, 0.2);
        }

        .ts-cs-title {
          color: #FFFFFF;
          font-family: 'Hind', sans-serif;
          font-size: 2.5rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          letter-spacing: 1px;
        }

        .ts-cs-text {
          color: #888888;
          font-family: 'Hind', sans-serif;
          font-size: 1.1rem;
          line-height: 1.6;
          max-width: 500px;
          margin: 0;
        }

        @keyframes tsGlow { from { transform: translate(0, 0); } to { transform: translate(140px, -60px); } }

        @media (max-width: 640px) {
          .ts-title { font-size: 2.4rem; }
          .ts-cs-title { font-size: 2rem; }
        }
      `}</style>
    </div>
  );
};

export default Testimonials;