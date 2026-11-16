// src/pages/Team/sections/Sales.jsx

// 1. IMPORT SALES PHOTOS HERE
// import sales1 from '../../../assets/sales1.png';
// import sales2 from '../../../assets/sales2.png';
// import sales3 from '../../../assets/sales3.png';

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

const Sales = () => {
  // 2. REPLACE null WITH YOUR IMPORTS
  const salesTeam = [
    { name: '[Sales Name]', title: 'Head of Sales', image: null /* change to: sales1 */ },
    { name: '[Sales Name]', title: 'Account Executive', image: null /* change to: sales2 */ },
    { name: '[Sales Name]', title: 'Sales Representative', image: null /* change to: sales3 */ },
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
                <Avatar image={member.image} name={member.name} />
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