// src/pages/Team/sections/Sales.jsx

import raybeenImg from '../../../assets/team/raybeen.jpg';
import ankitImg from '../../../assets/team/ankit.jpg';
import pratyushImg from '../../../assets/team/pratyush.jpg';

// Photo or silhouette placeholder
const Avatar = ({ image, name, size = 120, pos }) => (
  <div className="tp-avatar" style={{ width: size, height: size }}>
    <div className="tp-avatar-inner">
      {image ? <img src={image} alt={name} style={{ objectPosition: pos || 'center' }} /> : <div className="tp-silhouette" aria-hidden="true" />}
    </div>
  </div>
);

// Blue spotlight follows the mouse inside the card
const spotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

const Sales = () => {
  const salesTeam = [
    { name: 'Raybeen', title: 'Project Manager', image: raybeenImg, pos: 'center 45%' },
    { name: 'Ankit Jung Thapa', title: 'Sales Representative', image: ankitImg, pos: 'center 20%' },
    { name: 'Pratyush Bhattarai', title: 'Sales Representative', image: pratyushImg, pos: 'center 30%' },
  ];

  return (
    <div className="tp-outer">
      <section className="tp-section">
        <div className="tp-glow" style={{ bottom: '-260px', left: '-220px' }} aria-hidden="true" />

        <div className="tp-head">
          <div>
            <p className="ax-eyebrow" data-reveal="left">Growth</p>
            <h2 className="tp-title" data-reveal="up" style={{ '--d': '0.1s' }}>
              Sales Team<span className="tp-title-dot">.</span>
            </h2>
          </div>
          <span className="tp-count" data-reveal="right"><strong>{String(salesTeam.length).padStart(2, '0')}</strong> members</span>
        </div>

        <div className="tp-grid-3">
          {salesTeam.map((member, index) => (
            <div key={index} data-reveal="zoom" style={{ '--d': `${index * 0.12}s` }}>
              <article className="tp-card tp-hover" onMouseMove={spotlight}>
                <Avatar image={member.image} name={member.name} pos={member.pos} />
                <h3 className="tp-name">{member.name}</h3>
                <p className="tp-role">{member.title}</p>
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Sales;