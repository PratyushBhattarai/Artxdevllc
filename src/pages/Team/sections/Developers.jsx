// src/pages/Team/sections/Developers.jsx

// 1. IMPORT DEVELOPER PHOTOS HERE
// import leadDevImg from '../../../assets/lead-dev.png';
// import dev1Img from '../../../assets/dev1.png';
// import dev2Img from '../../../assets/dev2.png';
// import dev3Img from '../../../assets/dev3.png';

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

const Developers = () => {
  // 2. REPLACE null WITH YOUR IMPORTS
  const leadDev = { name: '[Lead Developer Name]', title: 'Lead Developer', desc: 'Architects the core infrastructure.', image: null /* change to: leadDevImg */ };
  const otherDevs = [
    { name: '[Dev Name]', title: 'Frontend Developer', image: null /* change to: dev1Img */ },
    { name: '[Dev Name]', title: 'Backend Developer', image: null /* change to: dev2Img */ },
    { name: '[Dev Name]', title: 'Full Stack Developer', image: null /* change to: dev3Img */ },
  ];
  const total = otherDevs.length + 1;

  return (
    <div className="tp-outer">
      <section className="tp-section">
        <div className="tp-glow" style={{ top: '-200px', right: '-200px' }} aria-hidden="true" />

        <div className="tp-head">
          <div>
            <p className="ax-eyebrow" data-reveal="left">Engineering</p>
            <h2 className="tp-title" data-reveal="up" style={{ '--d': '0.1s' }}>
              Developer Team<span className="tp-title-dot">.</span>
            </h2>
          </div>
          <span className="tp-count" data-reveal="right"><strong>{String(total).padStart(2, '0')}</strong> members</span>
        </div>

        {/* Lead Developer */}
        <div data-reveal="up" style={{ marginBottom: '2rem' }}>
          <article className="tp-card tp-card--row tp-hover" onMouseMove={spotlight}>
            <Avatar image={leadDev.image} name={leadDev.name} size={150} />
            <div>
              <span className="tp-pill">Team Lead</span>
              <h3 className="tp-name" style={{ fontSize: '1.5rem' }}>{leadDev.name}</h3>
              <p className="tp-role" style={{ fontSize: '1rem' }}>{leadDev.title}</p>
              <p className="tp-desc">{leadDev.desc}</p>
            </div>
          </article>
        </div>

        {/* Other Developers */}
        <div className="tp-grid-3">
          {otherDevs.map((dev, index) => (
            <div key={index} data-reveal="zoom" style={{ '--d': `${index * 0.12}s` }}>
              <article className="tp-card tp-hover" onMouseMove={spotlight}>
                <Avatar image={dev.image} name={dev.name} />
                <h3 className="tp-name">{dev.name}</h3>
                <p className="tp-role">{dev.title}</p>
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Developers;