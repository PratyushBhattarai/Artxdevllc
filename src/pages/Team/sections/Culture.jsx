// src/pages/Team/sections/Culture.jsx

// 1. IMPORT YOUR GALLERY PHOTOS HERE
// import teamGroup from '../../../assets/team-group.jpg';
// import office1 from '../../../assets/office1.jpg';
// import office2 from '../../../assets/office2.jpg';

// 2. REPLACE null WITH YOUR IMPORTS (image: teamGroup, etc.)
const photos = [
  { label: '[Big Team Photo Placeholder]', caption: 'The whole crew', image: null, big: true },
  { label: '[Working Photo 1]', caption: 'Heads down, building', image: null },
  { label: '[Working Photo 2]', caption: 'Ideas on the table', image: null },
];

const Culture = () => {
  return (
    <div className="tp-outer">
      <section className="tp-section cu-section">
        <div className="tp-glow" style={{ bottom: '-300px', left: '50%', marginLeft: '-320px' }} aria-hidden="true" />

        <div className="cu-head">
          <p className="ax-eyebrow" data-reveal="up">Life at Artx Dev</p>
          <h2 className="tp-title cu-title" data-reveal="up" style={{ '--d': '0.1s' }}>
            Our <span className="ax-shimmer">Culture</span>
          </h2>
        </div>

        <div className="cu-grid">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={photo.big ? 'cu-cell cu-cell--big' : 'cu-cell'}
              data-reveal={photo.big ? 'blur' : 'up'}
              style={{ '--d': `${index * 0.12}s` }}
            >
              <figure className="cu-photo">
                {photo.image ? (
                  <img src={photo.image} alt={photo.caption} />
                ) : (
                  <div className="cu-placeholder">
                    <span>{photo.label}</span>
                  </div>
                )}

                {/* Blue corner brackets on hover */}
                <span className="cu-corner cu-corner--tl" aria-hidden="true" />
                <span className="cu-corner cu-corner--tr" aria-hidden="true" />
                <span className="cu-corner cu-corner--bl" aria-hidden="true" />
                <span className="cu-corner cu-corner--br" aria-hidden="true" />

                <figcaption className="cu-caption">
                  <span className="cu-caption-num">{String(index + 1).padStart(2, '0')}</span>
                  {photo.caption}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>

        <style>{`
          .cu-head { text-align: center; margin-bottom: 4rem; display: flex; flex-direction: column; align-items: center; }
          .cu-title { font-size: 3.5rem; font-weight: 400; }

          .cu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
          .cu-cell--big { grid-column: 1 / -1; }

          .cu-photo {
            position: relative; margin: 0; overflow: hidden;
            width: 100%; height: 300px; border-radius: 16px;
            background: #222222; border: 1px solid #333333;
            transition: border-color 0.4s ease, box-shadow 0.5s ease;
          }
          .cu-cell--big .cu-photo { height: 400px; }
          .cu-photo:hover { border-color: #3A3A3A; }

          .cu-photo img {
            width: 100%; height: 100%; object-fit: cover; display: block;
            filter: grayscale(0.6) contrast(1.05);
            transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), filter 0.7s ease;
          }
          .cu-photo:hover img { transform: scale(1.07); filter: grayscale(0); }

          .cu-placeholder {
            position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
            background: linear-gradient(120deg, #1a1a1a 0%, #232323 35%, #0c1a25 55%, #1a1a1a 100%);
            background-size: 300% 300%;
            animation: cuGradient 10s ease infinite;
            transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .cu-placeholder::before {
            content: ''; position: absolute; inset: 0;
            background-image:
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 36px 36px;
          }
          .cu-placeholder span { position: relative; color: #666666; font-family: 'Hind', sans-serif; font-size: 1.2rem; }
          .cu-photo:hover .cu-placeholder { transform: scale(1.05); }

          .cu-corner {
            position: absolute; width: 22px; height: 22px; pointer-events: none;
            border-color: #00A3FF; border-style: solid; border-width: 0;
            opacity: 0; transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
            filter: drop-shadow(0 0 6px rgba(0,163,255,0.8));
          }
          .cu-corner--tl { top: 14px; left: 14px; border-top-width: 2px; border-left-width: 2px; transform: translate(8px, 8px); }
          .cu-corner--tr { top: 14px; right: 14px; border-top-width: 2px; border-right-width: 2px; transform: translate(-8px, 8px); }
          .cu-corner--bl { bottom: 14px; left: 14px; border-bottom-width: 2px; border-left-width: 2px; transform: translate(8px, -8px); }
          .cu-corner--br { bottom: 14px; right: 14px; border-bottom-width: 2px; border-right-width: 2px; transform: translate(-8px, -8px); }
          .cu-photo:hover .cu-corner { opacity: 1; transform: none; }

          .cu-caption {
            position: absolute; left: 0; right: 0; bottom: 0;
            display: flex; align-items: center; gap: 0.75rem;
            padding: 3rem 1.5rem 1.25rem;
            background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
            color: #FFFFFF; font-family: 'Hind', sans-serif; font-size: 1rem;
            transform: translateY(100%); transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .cu-photo:hover .cu-caption { transform: none; }
          .cu-caption-num { color: #00A3FF; font-family: 'Gowun Dodum', sans-serif; font-size: 0.8rem; }

          @keyframes cuGradient { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }

          @media (max-width: 640px) {
            .cu-title { font-size: 2.5rem; }
            .cu-grid { grid-template-columns: 1fr; }
            .cu-cell--big .cu-photo { height: 280px; }
            .cu-photo { height: 240px; }
          }
        `}</style>
      </section>
    </div>
  );
};

export default Culture;