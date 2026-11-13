// src/pages/Team/sections/SEO.jsx

// 1. IMPORT SEO PHOTOS HERE
// import seo1 from '../../../assets/seo1.png';
// import seo2 from '../../../assets/seo2.png';

const SEO = () => {
  // 2. REPLACE null WITH YOUR IMPORTS
  const seoTeam = [
    { name: '[SEO Name]', title: 'SEO Specialist', image: null /* change to: seo1 */ },
    { name: '[SEO Name]', title: 'Content Strategist', image: null /* change to: seo2 */ },
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '0 0.15rem' }}>
      <section style={{ backgroundColor: '#000000', padding: '6rem 5%', display: 'flex', flexDirection: 'column', borderTop: '1px solid #333' }}>
        <h2 style={{ color: '#FFFFFF', fontFamily: "'Hanuman', serif", fontSize: '3rem', marginBottom: '3rem' }}>SEO Team</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
          {seoTeam.map((member, index) => (
            <div key={index} style={{ backgroundColor: '#121212', border: '1px solid #333', borderRadius: '16px', padding: '2rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
              
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', flexShrink: 0, overflow: 'hidden', backgroundColor: '#2A2A2A' }}>
                {member.image ? (
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '1.5rem' }}>👤</div>
                )}
              </div>

              <div>
                <h3 style={{ color: '#FFF', fontFamily: "'Hind', sans-serif", fontSize: '1.2rem', fontWeight: '600', margin: '0 0 0.3rem 0' }}>{member.name}</h3>
                <p style={{ color: '#888', fontFamily: "'Hind', sans-serif", fontSize: '0.9rem', margin: 0 }}>{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SEO;