// src/pages/Team/sections/Culture.jsx

// 1. IMPORT YOUR GALLERY PHOTOS HERE
// import teamGroup from '../../../assets/team-group.jpg';
// import office1 from '../../../assets/office1.jpg';
// import office2 from '../../../assets/office2.jpg';

const Culture = () => {
  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '0 0.15rem' }}>
      <section style={{ backgroundColor: '#000000', padding: '6rem 5%', display: 'flex', flexDirection: 'column', borderTop: '1px solid #333' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ color: '#FFFFFF', fontFamily: "'Hanuman', serif", fontSize: '3.5rem', margin: '0 0 1rem 0' }}>Our Culture</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: '1.5rem' }}>
          
          {/* BIG TEAM PHOTO */}
          <div style={{ gridColumn: '1 / -1', width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#222', border: '1px solid #444' }}>
            {/* 2. UNCOMMENT THIS IMG TAG AND DELETE THE PLACEHOLDER SPAN BELOW IT */}
            {/* <img src={teamGroup} alt="Team Group" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#666', fontFamily: "'Hind', sans-serif", fontSize: '1.2rem' }}>[Big Team Photo Placeholder]</span>
            </div>
          </div>

          {/* WORKING PHOTO 1 */}
          <div style={{ width: '100%', height: '300px', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#222', border: '1px solid #444' }}>
            {/* <img src={office1} alt="Working" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#666', fontFamily: "'Hind', sans-serif", fontSize: '1.2rem' }}>[Working Photo 1]</span>
            </div>
          </div>

          {/* WORKING PHOTO 2 */}
          <div style={{ width: '100%', height: '300px', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#222', border: '1px solid #444' }}>
            {/* <img src={office2} alt="Working" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#666', fontFamily: "'Hind', sans-serif", fontSize: '1.2rem' }}>[Working Photo 2]</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Culture;