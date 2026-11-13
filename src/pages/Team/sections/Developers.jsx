// src/pages/Team/sections/Developers.jsx

// 1. IMPORT DEVELOPER PHOTOS HERE
// import leadDevImg from '../../../assets/lead-dev.png';
// import dev1Img from '../../../assets/dev1.png';
// import dev2Img from '../../../assets/dev2.png';
// import dev3Img from '../../../assets/dev3.png';

const Developers = () => {
  // 2. REPLACE null WITH YOUR IMPORTS
  const leadDev = { name: '[Lead Developer Name]', title: 'Lead Developer', desc: 'Architects the core infrastructure.', image: null /* change to: leadDevImg */ };
  const otherDevs = [
    { name: '[Dev Name]', title: 'Frontend Developer', image: null /* change to: dev1Img */ },
    { name: '[Dev Name]', title: 'Backend Developer', image: null /* change to: dev2Img */ },
    { name: '[Dev Name]', title: 'Full Stack Developer', image: null /* change to: dev3Img */ },
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '0 0.15rem' }}>
      <section style={{ backgroundColor: '#000000', padding: '6rem 5%', display: 'flex', flexDirection: 'column', borderTop: '1px solid #333' }}>
        <h2 style={{ color: '#FFFFFF', fontFamily: "'Hanuman', serif", fontSize: '3rem', marginBottom: '3rem' }}>Developer Team</h2>
        
        {/* Lead Developer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', backgroundColor: '#121212', border: '1px solid #333', borderRadius: '16px', padding: '2rem', marginBottom: '3rem' }}>
          
          <div style={{ width: '150px', height: '150px', borderRadius: '50%', flexShrink: 0, overflow: 'hidden', backgroundColor: '#2A2A2A' }}>
             {/* IF IMAGE EXISTS, SHOW IT, ELSE SHOW PLACEHOLDER */}
             {leadDev.image ? (
               <img src={leadDev.image} alt={leadDev.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             ) : (
               <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '2rem' }}>👤</div>
             )}
          </div>

          <div>
            <h3 style={{ color: '#FFF', fontFamily: "'Hind', sans-serif", fontSize: '1.5rem', fontWeight: '600', margin: '0 0 0.3rem 0' }}>{leadDev.name}</h3>
            <p style={{ color: '#888', fontFamily: "'Hind', sans-serif", fontSize: '1rem', margin: '0 0 1rem 0' }}>{leadDev.title}</p>
            <p style={{ color: '#A1A1AA', fontFamily: "'Hind', sans-serif", fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>{leadDev.desc}</p>
          </div>
        </div>

        {/* Other Developers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {otherDevs.map((dev, index) => (
            <div key={index} style={{ backgroundColor: '#121212', border: '1px solid #333', borderRadius: '16px', padding: '2rem', textAlign: 'center' }}>
              
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 1.5rem auto', overflow: 'hidden', backgroundColor: '#2A2A2A' }}>
                {dev.image ? (
                  <img src={dev.image} alt={dev.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '2rem' }}>👤</div>
                )}
              </div>

              <h3 style={{ color: '#FFF', fontFamily: "'Hind', sans-serif", fontSize: '1.2rem', fontWeight: '600', margin: '0 0 0.3rem 0' }}>{dev.name}</h3>
              <p style={{ color: '#888', fontFamily: "'Hind', sans-serif", fontSize: '0.9rem', margin: 0 }}>{dev.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Developers;