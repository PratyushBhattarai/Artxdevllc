// src/pages/Team/sections/SEO.jsx

// 1. IMPORT SEO PHOTOS HERE
// import seo1 from '../../../assets/seo1.png';
// import seo2 from '../../../assets/seo2.png';

// Photo or silhouette placeholder
const Avatar = ({ image, name, size = 120 }) => (
  <div className="tp-avatar" style={{ width: size, height: size }}>
    <div className="tp-avatar-inner">
      {image ? <img src={image} alt={name} /> : <div className="tp-silhouette" aria-hidden="true" />}
    </div>
  </div>
);

// Blue spotlight follows the mouse inside the card
const spotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

const SEO = () => {
  // 2. REPLACE null WITH YOUR IMPORTS
  const seoTeam = [
    { name: '[SEO Name]', title: 'SEO Specialist', image: null /* change to: seo1 */ },
    { name: '[SEO Name]', title: 'Content Strategist', image: null /* change to: seo2 */ },
  ];

  return (
    <div className="tp-outer">
      <section className="tp-section">
        <div className="tp-glow" style={{ top: '-220px', right: '10%' }} aria-hidden="true" />

        <div className="tp-head">
          <div>
            <p className="ax-eyebrow" data-reveal="left">Search &amp; Content</p>
            <h2 className="tp-title" data-reveal="up" style={{ '--d': '0.1s' }}>
              SEO Team<span className="tp-title-dot">.</span>
            </h2>
          </div>
          <span className="tp-count" data-reveal="right"><strong>{String(seoTeam.length).padStart(2, '0')}</strong> members</span>
        </div>

        <div className="tp-grid-2">
          {seoTeam.map((member, index) => (
            <div key={index} data-reveal={index % 2 === 0 ? 'left' : 'right'} style={{ '--d': `${index * 0.12}s` }}>
              <article className="tp-card tp-card--row tp-hover" onMouseMove={spotlight}>
                <Avatar image={member.image} name={member.name} size={100} />
                <div>
                  <h3 className="tp-name">{member.name}</h3>
                  <p className="tp-role">{member.title}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SEO;