// src/pages/Team/sections/Sales.jsx

// 1. IMPORT SALES PHOTOS HERE
// import sales1 from '../../../assets/sales1.png';
// import sales2 from '../../../assets/sales2.png';
// import sales3 from '../../../assets/sales3.png';

const Sales = () => {
  // 2. REPLACE null WITH YOUR IMPORTS
  const salesTeam = [
    { name: '[Sales Name]', title: 'Head of Sales', image: null /* change to: sales1 */ },
    { name: '[Sales Name]', title: 'Account Executive', image: null /* change to: sales2 */ },
    { name: '[Sales Name]', title: 'Sales Representative', image: null /* change to: sales3 */ },
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '0 0.15rem' }}>
      <section style={{ backgroundColor: '#000000', padding: '6rem 5%', display: 'flex', flexDirection: 'column', borderTop: '1px solid #333' }}>
        <h2 style={{ color: '#FFFFFF', fontFamily: "'Hanuman', serif", fontSize: '3rem', marginBottom: '3rem' }}>Sales Team</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {salesTeam.map((member, index) => (
            <div key={index} style={{ backgroundColor: '#121212', border: '1px solid #333', borderRadius: '16px', padding: '2rem', textAlign: 'center' }}>
              
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 1.5rem auto', overflow: 'hidden', backgroundColor: '#2A2A2A' }}>
                {member.image ? (
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '2rem' }}>👤</div>
                )}
              </div>

              <h3 style={{ color: '#FFF', fontFamily: "'Hind', sans-serif", fontSize: '1.2rem', fontWeight: '600', margin: '0 0 0.3rem 0' }}>{member.name}</h3>
              <p style={{ color: '#888', fontFamily: "'Hind', sans-serif", fontSize: '0.9rem', margin: 0 }}>{member.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Sales;