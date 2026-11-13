// src/pages/Team/sections/TeamHero.jsx

// 1. IMPORT YOUR CEO PHOTO HERE
// import ceoPhoto from '../../../assets/ceo-photo.png';

const TeamHero = () => {
  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '0 0.15rem' }}>
      <section style={{ backgroundColor: '#000000', padding: '6rem 5%', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <p style={{ color: '#888', fontFamily: "'Hind', sans-serif", fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>The Minds Behind</p>
          <h1 style={{ color: '#FFFFFF', fontFamily: "'Hanuman', serif", fontSize: '4.5rem', fontWeight: '400', margin: 0, marginBottom: '1.5rem' }}>Our Team</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4rem', backgroundColor: '#121212', border: '1px solid #333', borderRadius: '24px', padding: '3rem', marginBottom: '6rem' }}>
          
          {/* CEO IMAGE CONTAINER */}
          <div style={{ width: '350px', height: '350px', borderRadius: '50%', flexShrink: 0, overflow: 'hidden', border: '2px solid #444', backgroundColor: '#2A2A2A' }}>
             
             {/* 2. UNCOMMENT THIS IMG TAG AND DELETE THE PLACEHOLDER DIV BELOW IT */}
             {/* <img src={ceoPhoto} alt="CEO" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
             
             {/* PLACEHOLDER - DELETE THIS WHEN YOU ADD THE IMAGE */}
             <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div style={{ width: '80%', height: '90%', backgroundColor: '#444', borderTopLeftRadius: '100px', borderTopRightRadius: '100px' }}></div>
             </div>
          </div>

          <div>
            <h2 style={{ color: '#FFFFFF', fontFamily: "'Hanuman', serif", fontSize: '3rem', margin: '0 0 0.5rem 0' }}>[CEO Full Name]</h2>
            <p style={{ color: '#A1A1AA', fontFamily: "'Hind', sans-serif", fontSize: '1.2rem', fontWeight: '600', margin: '0 0 1.5rem 0', letterSpacing: '1px' }}>Chief Executive Officer</p>
            <p style={{ color: '#888', fontFamily: "'Hind', sans-serif", fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px' }}>
              [Place CEO description here. Talk about their vision, experience, and how they lead the company towards success.]
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamHero;